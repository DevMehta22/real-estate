import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Crown, 
  Star, 
  Zap, 
  Check, 
  Rocket 
} from "lucide-react";
import BASE_URL from "../url";

const BuyerSubscriptions = ({ userId }) => {
  const [razorpayKey, setRazorpayKey] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${BASE_URL}api/subscription/razorpaykey`, {
        headers: { Authorization: `Bearer:${token}` },
      })
      .then((res) => setRazorpayKey(res.data.key))
      .catch((err) => console.error("Failed to fetch Razorpay Key", err));
  }, []);

  const plans = [
    {
      name: "Base",
      price: "₹299.00",
      frequency: "Every Month",
      features: [
        "AI-powered price prediction 5 times a month"
      ],
      icon: Star,
      color: "text-gray-500"
    },
    {
      name: "Standard",
      price: "₹499.00",
      frequency: "Every Month",
      features: [
        "AI-powered price prediction 15 times a month"
      ],
      icon: Zap,
      color: "text-primary"
    },
    {
      name: "Elite",
      price: "₹1000.00",
      frequency: "Every Month",
      features: [
        "Unlimited AI-powered price prediction"
      ],
      icon: Crown,
      color: "text-yellow-500"
    },
  ];

  const handleSubscribe = async (planName) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}api/subscription`, 
        { plan_type: planName.toLowerCase() },
        { headers: { Authorization: `Bearer:${token}` } }
      );
      const subscriptionId = response.data.id;

      if (!razorpayKey) throw new Error(`Razorpay key not loaded`);
      
      const options = {
        key: razorpayKey,
        subscription_id: subscriptionId,
        name: `Estate Vista`,
        description: `Subscription for ${planName} plan`,
        handler: async (paymentResponse) => {
          const verifyResponse = await axios.post(
            `${BASE_URL}api/subscription/paymentverification`, 
            {
              razorpay_subscription_id: paymentResponse.razorpay_subscription_id,
              razorpay_payment_id: paymentResponse.razorpay_payment_id,
              razorpay_signature: paymentResponse.razorpay_signature,
            },
            { headers: { Authorization: `Bearer:${token}` } }
          );
          
          if (verifyResponse.data.success) {
            alert(`Subscription activated successfully!`);
          }
        },
        theme: { color: "#C8A35F" },
      };
      
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Subscription Error", error);
      alert("Subscription failed. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="bg-secondary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-3xl font-bold text-text mb-10">
          Choose Your Subscription Plan
        </h1>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => {
            const PlanIcon = plan.icon;
            return (
              <div 
                key={index} 
                className="bg-[#2A2A2A] rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center mb-4">
                  <PlanIcon 
                    className={`${plan.color} mr-3`} 
                    size={32} 
                  />
                  <h2 className="text-xl font-semibold text-text">{plan.name}</h2>
                </div>
                <div className="mb-4">
                  <p className="text-2xl font-bold text-primary">{plan.price}</p>
                  <p className="text-highlight opacity-70">{plan.frequency}</p>
                </div>
                <ul className="mb-6 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li 
                      key={i} 
                      className="flex items-center text-text"
                    >
                      <Check 
                        size={20} 
                        className="text-primary mr-2" 
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handleSubscribe(plan.name)}
                  className="w-full bg-primary text-secondary py-3 rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center"
                >
                  {loading ? (
                    <Rocket className="animate-pulse" />
                  ) : (
                    "Select Plan"
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BuyerSubscriptions;