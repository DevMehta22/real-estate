import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }
        // Simulate login process
        await axios.post("http://localhost:3000/api/auth/login",{Email:email,Password:password}).then((res)=>{
                console.log(res.data.user.id);
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('id',res.data.user.id)
                const user = res.data.user;
                user.role == 'Seller'?window.location.href = '/seller': window.location.href ='buyer';
                
        }).catch((err)=>{
            console.log(err.response)
            setError(err.data.error);
        })
        // Reset error message
        setError("");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl mb-4">Login</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-2 p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
