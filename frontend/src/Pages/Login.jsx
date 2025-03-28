import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import BASE_URL from "../url";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Validate email and password
        if (!email || !password) {
            setError("Please fill in all fields.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}api/auth/login`, {
                Email:email,
                Password:password
            });

            // Store authentication details
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('id', response.data.user.id);
            localStorage.setItem('userRole', response.data.user.role);

            // Redirect based on user role
            const redirectPath = response.data.user.role === 'Seller' ? '/seller' : '/buyer';
            window.location.href = redirectPath;

        } catch (err) {
            // Handle login errors
            const errorMessage = err.response?.data?.error || "Login failed. Please try again.";
            setError(errorMessage);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center px-4">
            <Navbar/>
            <div className="w-full max-w-md bg-highlight rounded-xl shadow-2xl overflow-hidden">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-secondary mb-2">Estate Vista</h1>
                        <p className="text-secondary text-opacity-70">Welcome back! Please login to your account</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-secondary text-sm font-medium mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-secondary text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-secondary">
                                    Remember me
                                </label>
                            </div>

                            <div>
                                <a href="/forgot-password" className="text-sm text-primary hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-secondary text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-primary hover:underline">
                                SignUp here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;