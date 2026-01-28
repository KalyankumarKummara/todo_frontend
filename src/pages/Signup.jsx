import React, { useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom"
import PublicLayout from "../components/PublicLayout";

function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [focusedField, setFocusedField] = useState(null);

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (field) => (event) => {
        setFormData({
            ...formData,
            [field]: event.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setSuccessMsg("");

        if (formData.password !== formData.confirmPassword) {
            setErrorMsg("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("http://localhost:8000/signup", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                Confirm_password: formData.confirmPassword
            });

            if (response.data.success) {
                setSuccessMsg(response.data.message);
                localStorage.setItem("userId", response.data.user_id);
                navigate("/verify-email")
            
            } else {
                setErrorMsg(response.data.message || "Signup failed");
            }
            setFormData({ username: "", email: "", password: "", confirmPassword: "" });
        } catch (error) {
            setErrorMsg(error.response?.data?.detail || "Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };


    const UserIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    );

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

    const ShieldIcon = ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    );

    return (
        <PublicLayout>
        <div className="min-h-screen bg-gradient-to-br from-neutral-light via-neutral-white to-neutral-light flex items-center justify-center p-4 font-body relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/5 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-primary/3 to-accent/3 blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main Card */}
                <div className="bg-neutral-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-neutral-light/50 p-10 transform hover:scale-[1.01] transition-all duration-500">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent mb-6 shadow-lg transform hover:rotate-6 transition-transform duration-300">
                            <UserIcon className="text-neutral-white w-8 h-8" />
                        </div>
                        <h1 className="font-heading text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                            Create Account
                        </h1>
                        <p className="text-neutral-dark font-medium">
                            Join our community today
                        </p>
                    </div>
                    {successMsg && (
                        <div className="mb-4 p-3 rounded-lg text-sm font-medium text-green-600 bg-green-50 border border-green-200">
                            {successMsg}
                        </div>
                    )}
                    {errorMsg && (
                        <div className="mb-4 p-3 rounded-lg text-sm font-medium text-red-600 bg-red-50 border border-red-200">
                            {errorMsg}
                        </div>
                    )}
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Username Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <UserIcon className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'username' ? 'text-primary' : 'text-neutral-dark'
                                    }`} />
                            </div>
                            <input
                                type="text"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleInputChange('username')}
                                onFocus={() => setFocusedField('username')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full pl-12 pr-4 py-4 bg-neutral-white border-2 rounded-xl font-medium text-neutral-darkest placeholder-neutral-dark/60 transition-all duration-300 focus:outline-none ${focusedField === 'username'
                                    ? 'border-primary shadow-lg shadow-primary/20'
                                    : 'border-neutral-light hover:border-primary/50'
                                    }`}
                                required
                            />

                        </div>

                        {/* Email Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <MailIcon className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-primary' : 'text-neutral-dark'
                                    }`} />
                            </div>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={formData.email}
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

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'password' ? 'text-primary' : 'text-neutral-dark'
                                    }`} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                value={formData.password}
                                autoComplete='new-password'
                                onChange={handleInputChange('password')}
                                onFocus={() => setFocusedField('password')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full pl-12 pr-12 py-4 bg-neutral-white border-2 rounded-xl font-medium text-neutral-darkest placeholder-neutral-dark/60 transition-all duration-300 focus:outline-none ${focusedField === 'password'
                                    ? 'border-primary shadow-lg shadow-primary/20'
                                    : 'border-neutral-light hover:border-primary/50'
                                    }`}
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

                        {/* Confirm Password Field */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <LockIcon className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'confirmPassword' ? 'text-primary' : 'text-neutral-dark'
                                    }`} />
                            </div>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleInputChange('confirmPassword')}
                                onFocus={() => setFocusedField('confirmPassword')}
                                onBlur={() => setFocusedField(null)}
                                className={`w-full pl-12 pr-12 py-4 bg-neutral-white border-2 rounded-xl font-medium text-neutral-darkest placeholder-neutral-dark/60 transition-all duration-300 focus:outline-none ${focusedField === 'confirmPassword'
                                    ? 'border-primary shadow-lg shadow-primary/20'
                                    : 'border-neutral-light hover:border-primary/50'
                                    }`}
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-dark hover:text-primary transition-colors duration-200 focus:outline-none"
                            >
                                {showConfirmPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                            </button>

                        </div>
                        {formData.password && (
                            <div className="text-xs text-neutral-dark space-y-1">
                                <p className="font-medium">Password Requirements:</p>
                                <div className="flex flex-wrap gap-2">
                                    <span className={`px-2 py-1 rounded-full text-xs ${formData.password.length >= 6 ? 'bg-success/20 text-success' : 'bg-neutral-light text-neutral-dark'
                                        }`}>
                                        6+ characters
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${formData.password === formData.confirmPassword && formData.confirmPassword !== ''
                                        ? 'bg-success/20 text-success'
                                        : 'bg-neutral-light text-neutral-dark'
                                        }`}>
                                        Passwords match
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-neutral-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 font-heading text-lg relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-primary/30"
                        >
                            <span className="relative z-10">Create Account</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-hover to-accent-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="text-center mt-8 space-y-4">
                        <p className="text-neutral-dark text-sm">
                            Already have an account?{' '}
                            <a
                                href="/login"
                                className="text-accent hover:text-accent-hover font-semibold transition-colors duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-accent/30 rounded"
                            >
                                Sign in here
                            </a>
                        </p>

                        {/* Security Badge */}
                        <div className="flex items-center justify-center text-xs text-neutral-dark bg-success/5 py-2 px-4 rounded-full border border-success/20">
                            <ShieldIcon className="w-4 h-4 text-success mr-2" />
                            Your information is secure and encrypted
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </PublicLayout>
    );
}

export default Signup;