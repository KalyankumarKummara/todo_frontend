import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PublicLayout from "../components/PublicLayout";

const SuccessAnimation = () => {
  return (
    <div className="flex items-center justify-center">
      <svg className="w-20 h-20" viewBox="0 0 52 52">
        <circle
          className="text-green-500"
          cx="26"
          cy="26"
          r="25"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="157"
          strokeDashoffset="157"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="157"
            to="0"
            dur="0.8s"
            fill="freeze"
          />
        </circle>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="48"
          strokeDashoffset="48"
          d="M14 27 l7 7 l17 -17"
          className="text-green-500"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="48"
            to="0"
            dur="0.5s"
            begin="0.8s"
            fill="freeze"
          />
        </path>
      </svg>
    </div>
  );
};

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const res = await axios.post("https://todo-backend-6wde.onrender.com/login", formData);
      if (res.data.access_token) {
        localStorage.setItem("token", res.data.access_token);
        setSuccess(true);
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setError(res.data.error || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const MailIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const LockIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const EyeIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = ({ className }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L12 12m0 0l3.122-3.122M12 12l-3.122 3.122" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
    </svg>
  );

  return (
    <PublicLayout>
      <div className="min-h-screen bg-gradient-to-br from-neutral-light via-neutral-white to-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 20%, rgba(79, 70, 229, 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%)`
            }}
          ></div>
        </div>
        <div className="relative w-full max-w-md">
          <div className="bg-neutral-white/90 backdrop-blur-xl shadow-2xl border border-neutral-light/50 rounded-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <svg
                    className="w-8 h-8 text-neutral-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="font-heading text-3xl font-bold text-neutral-darkest mb-2">
                Welcome Back
              </h1>
              <p className="font-body text-neutral-dark text-sm">
                Sign in to your account to continue
              </p>
            </div>
            {success && <SuccessAnimation />}
            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm font-medium text-red-600 bg-red-50 border border-red-200">
                {error}
              </div>
            )}
            {!success && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block font-body font-medium text-neutral-darkest text-sm">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <MailIcon className={`w-5 h-5 transition-colors duration-200 ${focusedField === "email" ? "text-primary" : "text-neutral-dark"}`} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      className={`w-full pl-12 pr-4 py-4 bg-neutral-white border-2 rounded-xl font-medium text-neutral-darkest placeholder-neutral-dark/60 transition-all duration-300 focus:outline-none ${focusedField === "email" ? "border-primary shadow-lg shadow-primary/20" : "border-neutral-light hover:border-primary/50"}`}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block font-body font-medium text-neutral-darkest text-sm">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <LockIcon className={`w-5 h-5 transition-colors duration-200 ${focusedField === "password" ? "text-primary" : "text-neutral-dark"}`} />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      autoComplete="new-password"
                      onChange={handleChange}
                      onFocus={() => handleFocus("password")}
                      onBlur={handleBlur}
                      className={`w-full pl-12 pr-12 py-4 bg-neutral-white border-2 rounded-xl font-medium text-neutral-darkest placeholder-neutral-dark/60 transition-all duration-300 focus:outline-none ${focusedField === "password" ? "border-primary shadow-lg shadow-primary/20" : "border-neutral-light hover:border-primary/50"}`}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-dark hover:text-primary transition-colors duration-200 focus:outline-none"
                    >
                      {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="font-body text-sm text-primary hover:text-primary-hover transition-colors duration-200 hover:underline"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot your password?
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover text-neutral-white font-body font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/30"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-light"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-neutral-white text-neutral-dark font-body">
                      New to our platform?
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="font-body text-neutral-dark text-sm mb-4">
                    Create an account to get started
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="inline-flex items-center justify-center w-full px-6 py-3 font-body font-medium text-primary bg-primary/5 border-2 border-primary/20 rounded-xl hover:bg-primary/10 hover:border-primary/30 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <p className="font-body text-xs text-neutral-dark">
              By signing in, you agree to our{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => console.log("Terms clicked")}
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="text-primary hover:underline"
                onClick={() => console.log("Privacy clicked")}
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default Login;
