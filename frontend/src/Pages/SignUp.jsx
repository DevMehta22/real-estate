import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../url";
import Navbar from "../Components/Navbar";

const SignUp = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Password strength calculation
        if (name === 'password') {
            let strength = 0;
            if (value.length >= 8) strength++;
            if (/[A-Z]/.test(value)) strength++;
            if (/[a-z]/.test(value)) strength++;
            if (/[0-9]/.test(value)) strength++;
            if (/[^A-Za-z0-9]/.test(value)) strength++;
            setPasswordStrength(strength);
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validation
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (passwordStrength < 3) {
            setError("Password is too weak. Include uppercase, lowercase, numbers, and special characters.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}api/auth/signup`, {
                Email: formData.email,
                Password: formData.password,
                Role: formData.role,
            });

            if (response.status === 200) {
                // Redirect to login or show success message
                window.location.href = '/login';
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Signup failed. Please try again.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
            <Navbar/>
            <div className="w-full max-w-md bg-highlight rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-6">
                        <h1 className="text-4xl font-bold text-secondary mb-2">Estate Vista</h1>
                        <p className="text-secondary text-opacity-70">Create Your Account</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label htmlFor="email" className="block text-secondary text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-secondary text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                            {formData.password && (
                                <div className="mt-2 h-1 w-full bg-gray-200 rounded">
                                    <div 
                                        className={`h-1 rounded transition-all duration-300 ${
                                            passwordStrength === 1 ? 'bg-red-500 w-1/4' :
                                            passwordStrength === 2 ? 'bg-yellow-500 w-1/2' :
                                            passwordStrength === 3 ? 'bg-green-500 w-3/4' :
                                            passwordStrength === 4 ? 'bg-green-600 w-full' : 'bg-gray-200 w-0'
                                        }`}
                                    ></div>
                                </div>
                            )}
                            <p className="text-xs text-secondary mt-1">
                                Password must be at least 8 characters with mix of uppercase, lowercase, numbers, and symbols
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-secondary text-sm font-medium mb-2">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>

                        <div>
                            <label htmlFor="role" className="block text-secondary text-sm font-medium mb-2">
                                Select Role
                            </label>
                            <select
                                id="role"
                                name="role"
                                required
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="" disabled>Choose Your Role</option>
                                <option value="Buyer">Buyer</option>
                                <option value="Seller">Seller</option>
                            </select>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
                            >
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-secondary text-sm">
                            Already have an account?{' '}
                            <a href="/login" className="text-primary hover:underline">
                                Login here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;