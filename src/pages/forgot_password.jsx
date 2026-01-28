import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Shield, Lock, Mail, ArrowLeft, Info } from "lucide-react";
import PublicLayout from "../components/PublicLayout";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [focusedField, setFocusedField] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (field) => (event) => {
    setEmail(event.target.value);
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            const res = await axios.post("http://127.0.0.1:8000/forgot-password", { email });
            setMessage(res.data.message);
            navigate("/verify-otp", { state: { email, user_id: res.data.user_id } });
        } catch (err) {
            setError(
                Array.isArray(err.response?.data?.detail)
                    ? err.response.data.detail.map(d => d.msg).join(", ")
                    : err.response?.data?.detail || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };
    const MailIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );

    return (
        <PublicLayout>
        <div className="min-h-screen bg-gradient-to-br from-neutral-light via-neutral-white to-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-accent/8"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.12) 0%, transparent 60%), 
                            radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.08) 0%, transparent 60%),
                            radial-gradient(circle at 50% 10%, rgba(79, 70, 229, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 10% 90%, rgba(37, 99, 235, 0.06) 0%, transparent 50%)
                        `
                    }}
                ></div>
            </div>

            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-accent/8 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-5 w-16 h-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-lg animate-pulse delay-500"></div>

            <div className="relative w-full max-w-md">
                <div className="bg-neutral-white/95 backdrop-blur-2xl shadow-2xl border border-neutral-light/60 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/2 via-transparent to-accent/2"></div>

                    <div className="relative z-10">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                                <div className="w-8 h-8 bg-neutral-white rounded-lg flex items-center justify-center">
                                    <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded"></div>
                                </div>
                            </div>

                            <h1 className="font-heading text-3xl font-bold text-neutral-darkest mb-3 tracking-tight">
                                Forgot Password
                            </h1>
                            <p className="font-body text-neutral-dark text-base leading-relaxed max-w-xs mx-auto">
                                Enter your email and we'll send you a secure code to reset your password
                            </p>
                        </div>

                        {message && (
                            <div className="mb-6 p-4 rounded-xl text-sm font-medium text-green-700 bg-gradient-to-r from-green-50 to-green-50/80 border border-green-200/60 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    {message}
                                </div>
                            </div>
                        )}
                        {error && (
                            <div className="mb-6 p-4 rounded-xl text-sm font-medium text-red-700 bg-gradient-to-r from-red-50 to-red-50/80 border border-red-200/60 shadow-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                    </div>
                                    {error}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <label className="block font-body font-semibold text-neutral-darkest text-sm tracking-wide">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <MailIcon className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-primary' : 'text-neutral-dark'
                                            }`} />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={handleInputChange('email')}
                                        onFocus={() => setFocusedField('email')}
                                        onBlur={() => setFocusedField(null)}
                                        className={`w-full pl-12 pr-4 py-4 bg-neutral-white border-2 rounded-xl font-medium text-neutral-darkest placeholder-neutral-dark/60 transition-all duration-300 focus:outline-none ${focusedField === 'email'
                                            ? 'border-primary shadow-lg shadow-primary/20'
                                            : 'border-neutral-light hover:border-primary/50'
                                            }`}
                                        required
                                    />

                                </div>

                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent-hover disabled:from-neutral-dark/20 disabled:to-neutral-dark/20 text-neutral-white font-body font-semibold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-primary/40 disabled:hover:transform-none disabled:cursor-not-allowed relative overflow-hidden group"
                            >
                                <span className={`relative z-10 transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                                    Send Security Code
                                </span>
                                {loading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-6 h-6 border-2 border-neutral-white/30 border-t-neutral-white rounded-full animate-spin"></div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            </button>

                            <div className="text-center mt-8">
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

                        <div className="mt-8 pt-6 border-t border-neutral-light/50">
                            <div className="flex items-center justify-center gap-3 text-center">
                                <div className="flex-shrink-0">
                                    <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                                        <Info className="w-4 h-4 text-success" />
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="font-body text-xs font-semibold text-neutral-darkest">
                                        Secure & Trusted
                                    </p>
                                    <p className="font-body text-xs text-neutral-dark">
                                        Your information is encrypted and protected
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </PublicLayout>
    );
}

export default ForgotPassword;