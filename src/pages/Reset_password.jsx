import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { KeyRound, Eye, EyeOff, Shield, ArrowLeft } from "lucide-react";
import axios from "axios";
import PublicLayout from "../components/PublicLayout";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { user_id, otp } = location.state || {};

  const getPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const LockIcon = ({ className }) => (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
      />
    </svg>
  );

  const passwordStrength = getPasswordStrength(password);
  const strengthColors = [
    "bg-red-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-green-500",
  ];
  const strengthTexts = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (passwordStrength < 3) {
      setError("Please choose a stronger password");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/reset-password", {
        user_id,
        otp,
        new_password: password,
      });
      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(
        Array.isArray(err.response?.data?.detail)
          ? err.response.data.detail.map((d) => d.msg).join(", ")
          : err.response?.data?.detail || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-indigo-500/5 to-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-600/5 to-indigo-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl z-10">
        <div className="bg-white/95 backdrop-blur-xl shadow-2xl border border-slate-100/60 rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent rounded-3xl"></div>
          <div className="relative z-10">
            <div className="text-center mb-8 sm:mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 bg-neutral-white rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded"></div>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
                Reset Your Password
              </h1>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed max-w-sm mx-auto">
                Create a new secure password to protect your account
              </p>
            </div>

            {message && (
              <div className="mb-6 flex flex-col items-center justify-center">
                {/* Success Animation */}
                <svg className="w-24 h-24" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="48"
                    stroke="#D1FAE5"
                    strokeWidth="4"
                    fill="none"
                  />
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
                <p className="mt-4 text-green-600 font-semibold text-lg">
                  {message}
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 rounded-2xl text-sm font-medium text-red-700 bg-red-50 border border-red-200 shadow-sm">
                {error}
              </div>
            )}

            {!message && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    New Password
                  </label>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${
                      focusedField === "password"
                        ? "border-primary shadow-md"
                        : "border-slate-200"
                    }`}
                  >
                    <LockIcon className="w-5 h-5 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField("")}
                      placeholder="Enter new password"
                      className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {password && (
                    <div className="mt-3 space-y-2">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-500 ${strengthColors[passwordStrength - 1]
                            }`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <p
                        className={`text-xs font-medium ${strengthColors[passwordStrength - 1]
                          .replace("bg", "text")}`}
                      >
                        Strength: {strengthTexts[passwordStrength - 1]}
                      </p>
                    </div>
                  )}
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <div
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2 transition-all duration-300 ${focusedField === "confirmPassword"
                        ? "border-primary shadow-md"
                        : "border-slate-200"
                      }`}
                  >
                    <KeyRound className="w-5 h-5 text-slate-500" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      onFocus={() => setFocusedField("confirmPassword")}
                      onBlur={() => setFocusedField("")}
                      placeholder="Confirm new password"
                      className="flex-1 bg-transparent outline-none text-slate-900 placeholder-slate-400"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="text-slate-500 hover:text-slate-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>
                    Use at least 8 characters, including uppercase, lowercase,
                    number, and symbol
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading || password !== confirmPassword || passwordStrength < 3
                  }
                  className="w-full bg-gradient-to-r from-primary to-accent enabled:hover:from-primary-hover enabled:hover:to-accent-hover text-white font-semibold py-3 sm:py-4 rounded-2xl shadow-lg enabled:hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed transform enabled:hover:scale-[1.02] enabled:active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Resetting Password...</span>
                    </>
                  ) : (
                    <span>Reset Password</span>
                  )}
                </button>

                <div className="text-center pt-4">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="font-body text-sm text-primary hover:text-primary-hover transition-all duration-200 hover:underline inline-flex items-center gap-2 group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back to Login
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="text-center mt-6 text-xs sm:text-sm text-slate-700">
          <p>Protected by enterprise-grade security</p>
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

export default ResetPassword;
