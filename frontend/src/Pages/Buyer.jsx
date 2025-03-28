import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
    Search, 
    LogOut, 
    Star, 
    CreditCard, 
    CheckCircle, 
    X, 
    Zap, 
    TrendingUp 
} from "lucide-react";
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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}api/subscription/`,{
                    headers: { Authorization: `Bearer:${token}` }
                });
                setSubscriptionActive(data.success);
            } catch (error) {
                console.error("Error fetching subscription status:", error);
                setSubscriptionActive(false);
            }
        };

        const fetchBuyerProfile = async () => {
            try {
                const response = await axios.get(`${BASE_URL}api/buyer/${userId}`, {
                    headers: { Authorization: `Bearer:${token}` },
                });
                setBuyerProfile(response.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setBuyerProfile(null);
                } else {
                    setError("Error fetching buyer profile");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchSubscriptionStatus();
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
        navigate("/");
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="animate-pulse text-2xl text-primary">Loading...</div>
        </div>
    );

    if (error) return (
        <div className="flex justify-center items-center min-h-screen bg-red-50">
            <div className="text-red-500 text-2xl">{error}</div>
        </div>
    );

    return (
        <div className="bg-secondary min-h-screen text-white p-6">
            <div className="max-w-9xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-primary">
                            Buyer Dashboard
                        </h1>
                        <p className="text-text mt-2">
                            {buyerProfile 
                                ? `Welcome back, ${buyerProfile.contactInfo.name || 'Buyer'}!` 
                                : 'Create your profile to get started'}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        <LogOut className="mr-2" size={20} />
                        Logout
                    </button>
                </div>

                {!buyerProfile ? (
                    <div className="bg-black p-8 rounded-lg shadow-xl">
                        <BuyerProfile createProfile={createProfile} />
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Left Sidebar - Property Search */}
                        <div className="md:col-span-2 space-y-6">
                            {/* Search Bar */}
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder="Search properties by location..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full p-4 pl-10 bg-black rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                                <Search 
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text" 
                                    size={20} 
                                />
                            </div>

                            {/* Property List */}
                            <PropertyList userId={userId} searchQuery={searchQuery} />
                            
                            {/* Saved Properties */}
                            <SavedProperties buyer={buyerProfile} />
                        </div>

                        {/* Right Sidebar - AI Valuation & Subscription */}
                        <div className="space-y-3">
                            {/* AI-powered Property Valuation */}
                            <div className="bg-black p-6 rounded-lg shadow-xl">
                                <div className="flex items-center mb-4">
                                    <Zap className="text-primary mr-3" size={24} />
                                    <h2 className="text-2xl font-semibold text-primary">
                                        AI Property Valuation
                                    </h2>
                                </div>
                                <p className="text-text mb-4">
                                    Get accurate real estate price predictions using our advanced machine learning model.
                                </p>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-text">
                                        <TrendingUp className="mr-2 text-green-500" size={20} />
                                        Accurate market trend analysis
                                    </div>
                                    <div className="flex items-center text-text">
                                        <CheckCircle className="mr-2 text-blue-500" size={20} />
                                        Real-time data insights
                                    </div>
                                </div>

                                <div className="bg-gray-800 p-4 rounded-lg mb-4">
                                    <h3 className="text-lg font-medium text-primary mb-2">
                                        Pricing Options
                                    </h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-text">
                                            <span>One-time Valuation</span>
                                            <span className="font-bold">₹499</span>
                                        </div>
                                        <div className="flex justify-between text-text">
                                            <span>Monthly Subscription</span>
                                            <span className="font-bold">₹999</span>
                                        </div>
                                    </div>
                                </div>

                                {!subscriptionActive ? (
                                    <button 
                                        onClick={() => setModalOpen(true)}
                                        className="w-full flex items-center justify-center bg-primary text-secondary px-4 py-3 rounded-lg hover:bg-opacity-90 transition"
                                    >
                                        <CreditCard className="mr-2" size={20} />
                                        Subscribe Now
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => navigate("/predict")}
                                        className="w-full flex items-center justify-center bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition"
                                    >
                                        <Star className="mr-2" size={20} />
                                        Predict Property Value
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Subscription Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="bg-secondary rounded-xl shadow-2xl w-full max-w-4xl relative p-8">
                        <button 
                            onClick={() => setModalOpen(false)}
                            className="absolute top-6 right-6 text-primary hover:text-opacity-80 z-10"
                        >
                            <X size={28} />
                        </button>
                        <BuyerSubscriptions userId={userId} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerDashboard;