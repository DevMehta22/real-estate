import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../url";
import BuyerProfile from "../Components/BuyerProfile";
import PropertyList from "../Components/PropertyList";
import SavedProperties from "../Components/SavedProperties";

const BuyerDashboard = () => {
    const [buyerProfile, setBuyerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const navigate = useNavigate(); // Hook for redirection

    useEffect(() => {
        const fetchBuyerProfile = async () => {
            try {
                const response = await axios.get(`${BASE_URL}api/buyer/${userId}`, {
                    headers: { Authorization: `Bearer:${token}` },
                });
                setBuyerProfile(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setBuyerProfile(null); // No profile found
                } else {
                    setError("Error fetching buyer profile");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBuyerProfile();
    }, [userId, token]);

    const createProfile = async (profileData) => {
        try {
            const response = await axios.post(`${BASE_URL}api/buyer/${userId}`, profileData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBuyerProfile(response.data);
        } catch (err) {
            console.error("Error creating profile", err);
            setError("Failed to create profile");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/login"); // Redirect to login page
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold text-gray-800">Welcome, Buyer!</h1>
                <button 
                    onClick={handleLogout} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>

            {!buyerProfile ? (
                <BuyerProfile createProfile={createProfile} />
            ) : (
                <>  
                    {/* Search Bar */}
                    <input 
                        type="text"
                        placeholder="Search by location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md mb-6"
                    />

                    <PropertyList userId={userId} searchQuery={searchQuery} />
                    <SavedProperties buyer={buyerProfile} />
                </>
            )}
        </div>
    );
};

export default BuyerDashboard;