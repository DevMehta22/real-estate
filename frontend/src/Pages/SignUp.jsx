import React, { useState } from "react";
import axios from "axios"; // Import Axios
import BASE_URL from "../url"; // Import BASE_URL

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role,setRole] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
            return;
        }
        try {
            const response = await axios.post(`${BASE_URL}api/auth/signup`, {
                Email:email,
                Password:password,
                Role:role
            });
            if (response.status === 200) {
                console.log("User signed up successfully");
                window.location.href = '/login'
            }
        } catch (error) {
            setError("Signup failed: " + error.response.data.error);
            console.log(error.response.data)
            setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
        }

        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setRole("");
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                {error && <p className="text-red-500">{error}</p>}
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="border p-2 w-full"
                    >
                        <option value="" disabled>Select Role</option>
                        <option value="Buyer">Buyer</option>
                        <option value="Seller">Seller</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
