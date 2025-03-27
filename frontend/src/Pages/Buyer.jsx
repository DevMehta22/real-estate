import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../url";
import BuyerProfile from "../Components/BuyerProfile";
import PropertyList from "../Components/PropertyList";
import SavedProperties from "../Components/SavedProperties";
import BuyerSubscriptions from "../Components/BuyerSubscriptions";

const BuyerDashboard = () => {
    const [buyerProfile, setBuyerProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [subscriptionActive, setSubscriptionActive] = useState(false);
    
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("id");
    const navigate = useNavigate(); // Hook for redirection

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}api/subscription/`,{headers : {Authorization: `Bearer:${token}`}});
                if (data.success) {
                    console.log(data)
                    setSubscriptionActive(true);
                } else {
                    setSubscriptionActive(false);
                }
            } catch (error) {
                console.error("Error fetching subscription status:", error);
                setSubscriptionActive(false);
            }
        };

        fetchSubscriptionStatus();
    }, []);

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
                headers: { Authorization: `Bearer:${token}` },
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

                {/* AI-powered Property Valuation Section */}
                <div className="mt-10 p-6 bg-white shadow-lg rounded-xl">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">AI-powered Property Valuation</h2>
                        <p className="text-gray-600 mb-4">
                            Get accurate real estate price predictions using our machine learning model trained on market trends.
                        </p>
                        <ul className="list-disc list-inside text-gray-700 mb-4">
                            <li>Accurate price estimation based on real-time data.</li>
                            <li>Compare market trends before making a decision.</li>
                            <li>Helps in negotiation and budgeting.</li>
                        </ul>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Subscription Plans</h3>
                        <p className="text-gray-600">Buyers can access the price prediction feature via:</p>
                        <ul className="list-disc list-inside text-gray-700 mb-4">
                            <li><strong>One-time Payment:</strong> ₹499 per property valuation.</li>
                            <li><strong>Subscription:</strong> ₹999/month for unlimited valuations.</li>
                        </ul>
                        {!subscriptionActive ? (
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" onClick={() => setModalOpen(true)}>
                                Subscribe Now
                            </button>
                        ) : (
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition" onClick={() => navigate("/predict")}>
                                Predict Pricing
                            </button>
                        )}
                    </div> 
                </>
            )}

{modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-50">
                        <BuyerSubscriptions userId={userId}/>
                        <button 
                            onClick={() => setModalOpen(false)} 
                            className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            
        </div>
    );
};

export default BuyerDashboard;