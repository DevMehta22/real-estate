import React, { useEffect, useState } from "react";
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
    console.log(id)

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

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("id");
        navigate("/"); // Redirect to login page
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Seller Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
            {subscriptionActive ? (
                <SellerDashboard userId={id} />
            ) : (
                <div className="max-w-3xl mx-auto text-center mt-16">
                    <h1 className="text-3xl font-bold text-red-600">Subscription Required</h1>
                    <p className="text-gray-700 mt-4">To list properties and manage your seller account, please subscribe to a plan.</p>
                    <div className="mt-6">
                        <Subscriptions />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Seller;