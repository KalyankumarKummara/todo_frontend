import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react";
import PublicLayout from "../components/PublicLayout";

function EmailVerification() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resendMsg, setResendMsg] = useState("");
  const [resendError, setResendError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccess(false);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErrorMsg("User ID missing. Please signup again.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://todo-backend-6wde.onrender.com/verify-email?user_id=${userId}&otp=${otp.join("")}`
      );

      if (response.data.message) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 3000);
      } else {
        setErrorMsg(response.data.message || "Verification failed");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.detail || "Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    try {
      setResendLoading(true);
      setResendMsg("");
      setResendError("");
      const userId = localStorage.getItem("userId");
      const response = await axios.post(`https://todo-backend-6wde.onrender.com/resend-email?user_id=${userId}`);
      if (response.data.message) {
        setResendMsg(response.data.message);
        setResendCooldown(30);
      } else {
        setResendError("Failed to resend OTP");
      }
    } catch (err) {
      setResendError(err.response?.data?.detail || "Server error");
    } finally {
      setResendLoading(false);
    }
  };

  useEffect(() => {
    if (resendCooldown === 0) return;
    const timer = setInterval(() => setResendCooldown((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

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
              Verify Your Email
            </h1>
            <p className="text-neutral-dark font-body text-sm leading-relaxed">
              We've sent a 6-digit verification code to your email address.
              <br />
              <span className="font-semibold text-primary">Check your inbox and enter the code below</span>
            </p>
          </div>

          {success && (
            <div className="mb-6 flex justify-center">
              <svg className="w-24 h-24" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="48" stroke="#D1FAE5" strokeWidth="4" fill="none"/>
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#34D399"
                  strokeWidth="4"
                  fill="none"
                  strokeDasharray="301.44"
                  strokeDashoffset="301.44"
                  transform="rotate(-90 50 50) scale(-1 1) translate(-100 0)"
                  style={{ animation: "circle-anticlockwise 1s forwards" }}
                />
                <path
                  d="M30 50 L45 65 L70 35"
                  stroke="#34D399"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="70"
                  strokeDashoffset="70"
                  style={{ animation: "tick-bounce 0.7s forwards 1s" }}
                />
              </svg>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-error/10 to-error-light/10 border border-error/20">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-error rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-neutral-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-error font-medium font-body text-sm">{errorMsg}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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
                      className={`w-full h-14 text-center text-xl font-bold rounded-2xl border-2 transition-all duration-200 ${
                        digit
                          ? "border-primary bg-primary/5 text-neutral-darkest shadow-lg shadow-primary/20"
                          : "border-slate-200 bg-neutral-white hover:border-slate-300"
                      } focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mt-2">
              <button
                type="button"
                onClick={handleResend}
                disabled={resendLoading || resendCooldown > 0}
                className="text-sm text-primary hover:underline disabled:opacity-50"
              >
                {resendCooldown > 0
                  ? `Resend OTP in ${resendCooldown}s`
                  : resendLoading
                  ? "Resending..."
                  : "Resend OTP"}
              </button>
            </div>

            {resendMsg && <p className="text-green-600 text-sm mt-1">{resendMsg}</p>}
            {resendError && <p className="text-red-600 text-sm mt-1">{resendError}</p>}

            <button
              type="submit"
              disabled={loading}
              className="group w-full bg-gradient-to-r from-primary to-primary-hover text-neutral-white py-4 px-6 rounded-2xl font-semibold font-body text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none mt-4"
            >
              <div className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-neutral-white/30 border-t-neutral-white rounded-full animate-spin"></div>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify Email</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </div>
            </button>

            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="w-4 h-4 text-success" />
                </div>
                <p className="text-xs text-slate-600 font-body leading-relaxed">
                  Please check your email inbox (and spam folder) for the verification code. This code is required to complete your account setup.
                </p>
              </div>
            </div>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-slate-400 font-body">
            Secured with enterprise-grade encryption
          </p>
        </div>
      </div>

      <style>{`
        @keyframes circle-anticlockwise {
          to { stroke-dashoffset: 0; }
        }
        @keyframes tick-bounce {
          0% { stroke-dashoffset: 70; }
          70% { stroke-dashoffset: -10; }
          100% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
    </PublicLayout>
  );
}

export default EmailVerification;
