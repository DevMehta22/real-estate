import React, { useEffect, useState } from "react";
import { 
    LogOutIcon, 
    UserIcon, 
    CreditCardIcon, 
    PackageIcon 
} from "lucide-react";
import Subscriptions from "../Components/Subscriptions";
import SellerDashboard from "../Components/SellerDashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../url";

const Seller = () => {
    const [subscriptionActive, setSubscriptionActive] = useState(false);
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            try {
                const { data } = await axios.get(`${BASE_URL}api/subscription/`,{
                    headers : {Authorization: `Bearer:${token}`}
                });
                setSubscriptionActive(data.success);
            } catch (error) {
                console.error("Error fetching subscription status:", error);
                setSubscriptionActive(false);
            }
        };

        fetchSubscriptionStatus();
    }, []);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="min-h-screen bg-secondary text-text p-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 border-b border-primary/30 pb-4">
                    <div className="flex items-center">
                        <UserIcon className="text-primary mr-3" size={32} />
                        <h1 className="text-3xl font-bold text-primary">Seller Dashboard</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center bg-primary/20 text-highlight px-4 py-2 rounded-lg hover:bg-primary/30 transition"
                    >
                        <LogOutIcon className="mr-2" size={20} />
                        Logout
                    </button>
                </div>

                {subscriptionActive ? (
                    <SellerDashboard userId={id} />
                ) : (
                    <div className="bg-secondary/50 border border-primary/30 rounded-2xl p-8 text-center">
                        <div className="max-w-xl mx-auto">
                            <div className="flex justify-center mb-6">
                                <CreditCardIcon className="text-primary" size={64} />
                            </div>
                            <h2 className="text-3xl font-bold text-primary mb-4">Subscription Required</h2>
                            <p className="text-highlight mb-6">
                                To unlock full seller features, listing capabilities, and property management tools, 
                                please subscribe to one of our premium plans.
                            </p>
                            
                            <div className="grid md:grid-cols-3 gap-4 mb-6">
                                {[
                                    { icon: PackageIcon, title: "List Properties" },
                                    { icon: UserIcon, title: "Manage Account" },
                                    { icon: CreditCardIcon, title: "Advanced Tools" }
                                ].map((feature, index) => (
                                    <div 
                                        key={index} 
                                        className="bg-secondary/30 border border-primary/20 p-4 rounded-lg"
                                    >
                                        <feature.icon className="text-primary mx-auto mb-2" size={32} />
                                        <p className="text-highlight text-center">{feature.title}</p>
                                    </div>
                                ))}
                            </div>

                            <Subscriptions />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Seller;