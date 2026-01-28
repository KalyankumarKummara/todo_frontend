import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Info } from "lucide-react";
import PublicLayout from "../components/PublicLayout";

function OTPVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const navigate = useNavigate();
  const location = useLocation();

  const user_id = location.state?.user_id;
  const email = location.state?.email;

  useEffect(() => {
    if (timer <= 0) return;
    const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return setError("Enter all 6 digits");
    if (!user_id) return setError("User ID missing. Please request OTP again.");
    setLoading(true);
    try {
      const res = await axios.post("https://todo-backend-6wde.onrender.com/verify-reset-otp", {
        user_id,
        otp: enteredOtp,
      });
      setMessage(res.data.message);
      navigate("/reset-password", { state: { user_id, otp: enteredOtp, email, } });
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return setError("Email missing. Please go back and request OTP.");
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await axios.post("https://todo-backend-6wde.onrender.com/resend-reset-otp", {
        email,
        otp: enteredOtp
      });
      setMessage(res.data.message);
      setTimer(120);
      setOtp(new Array(6).fill(""));
      if (inputsRef.current[0]) inputsRef.current[0].focus();
    } catch (err) {
      setError(err.response?.data?.detail || "Could not resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <PublicLayout>
    <div className="min-h-screen bg-gradient-to-br from-neutral-light via-neutral-white to-slate-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-neutral-white backdrop-blur-sm border border-slate-200/60 shadow-2xl shadow-slate-900/10 rounded-3xl p-8 relative overflow-hidden">
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-neutral-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded"></div>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading text-neutral-darkest mb-3">
              Verify Your Identity
            </h1>
            <p className="text-neutral-dark font-body text-sm leading-relaxed">
              We've sent a 6-digit verification code to
              <br />
              <span className="font-semibold text-primary">{email}</span>
            </p>
          </div>

          {message && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-success/10 to-success-light/10 border border-success/20">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-neutral-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-success font-medium font-body text-sm">
                  {message}
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-error/10 to-error-light/10 border border-error/20">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-3 h-3 text-neutral-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <p className="text-error font-medium font-body text-sm">
                  {error}
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleVerify} className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-neutral-darkest font-body">
                Enter Verification Code
              </label>
              <div className="flex justify-center gap-2">
                {otp.map((digit, i) => (
                  <div key={i} className="relative flex-1 min-w-[2.5rem] max-w-[3.5rem] sm:min-w-[3rem] sm:max-w-[3.5rem]">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      ref={(el) => (inputsRef.current[i] = el)}
                      onChange={(e) => handleChange(e.target.value, i)}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                      className={`w-full h-14 text-center text-xl font-bold rounded-2xl border-2 transition-all duration-200 ${digit
                        ? "border-primary bg-primary/5 text-neutral-darkest shadow-lg shadow-primary/20"
                        : "border-slate-200 bg-neutral-white hover:border-slate-300"
                        } focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary`}
                    />
                    {digit && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-neutral-white"></div>
                    )}
                  </div>
                ))}
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-primary to-primary-hover text-neutral-white py-4 px-6 rounded-2xl font-semibold font-body text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              <div className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-white/30 border-t-neutral-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Code</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </>
                )}
              </div>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0 || loading}
                className={`group font-semibold font-body text-sm transition-all duration-200 ${timer > 0 || loading
                  ? "text-slate-400 cursor-not-allowed"
                  : "text-accent hover:text-accent-hover"
                  }`}
              >
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>Resend Code</span>
                </div>
              </button>

              {timer > 0 && (
                <div className="flex items-center space-x-2 text-slate-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="font-mono text-sm font-semibold">
                    {formatTime(timer)}
                  </span>
                </div>
              )}
            </div>

            {timer <= 0 && (
              <p className="text-center text-xs text-slate-500 mt-3 font-body">
                Didn't receive the code? You can request a new one now.
              </p>
            )}
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Info className="w-4 h-4 text-success" />
              </div>
              <p className="text-xs text-slate-600 font-body leading-relaxed">
                For your security, this code will expire in {formatTime(timer)}. Never share this code with anyone.
              </p>
            </div>
          </div>

        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400 font-body">
            Secured with enterprise-grade encryption
          </p>
        </div>
      </div>
    </div>
    </PublicLayout>
  );
}

export default OTPVerification;
