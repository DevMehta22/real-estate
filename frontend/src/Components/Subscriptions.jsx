import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Star, 
  Crown, 
  Rocket, 
  CheckCircle, 
  ListChecks, 
  BarChart2, 
  Users, 
  ShieldCheck 
} from "lucide-react";
import BASE_URL from "../url";

const SubscriptionPlans = ({userId}) => {
    const [razorpayKey, setRazorpayKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('token')

    useEffect(() => {
        // Fetch Razorpay API key
        axios
          .get(`${BASE_URL}api/subscription/razorpaykey`,{
            headers: { Authorization: `Bearer:${token}` },
          })
          .then((res) => setRazorpayKey(res.data.key))
          .catch((err) => console.error("Failed to fetch Razorpay Key", err));
      }, []);
    

  const plans = [
    {
      name: "Basic",
      price: "₹1,000.00",
      frequency: "Every Month",
      icon: Star,
      features: [
        "List up to 5 properties.",
        "Limited property visibility.",
        "Access to basic analytics.",
        "Standard customer support.",
      ],
      color: "text-yellow-500"
    },
    {
      name: "Premium",
      price: "₹3,000.00",
      frequency: "Every Month",
      icon: Crown,
      features: [
        "List up to 15 properties.",
        "Priority visibility on property searches.",
        "Enhanced analytics.",
        "Featured property placement.",
        "Priority customer support.",
      ],
      color: "text-primary"
    },
    {
      name: "Enterprise",
      price: "₹5,000.00",
      frequency: "Every Month",
      icon: Rocket,
      features: [
        "Unlimited property listings.",
        "Top-tier visibility.",
        "Advanced analytics.",
        "Dedicated account manager and premium support.",
        "Integration with other services.",
      ],
      color: "text-blue-600"
    },
  ];

  const handleSubscribe = async(planName) => {
    setLoading(true);
    try {
        // Step 1: Create a Subscription
        const response = await axios.post(`${BASE_URL}api/subscription`, { plan_type: planName.toLowerCase() },{ headers: { Authorization: `Bearer:${token}`}});
        const subscriptionId = response.data.id;
  
        // Step 2: Open Razorpay Checkout
        if (!razorpayKey) throw new Error(`Razorpay key not loaded`);
        const options = {
            key: razorpayKey,
            subscription_id: subscriptionId,
            name: `Estate Vista`,
            description: `Subscription for ${planName} plan`,
            handler: async (paymentResponse) => {
              // Step 3: Verify Payment
              const verifyResponse = await axios.post(`${BASE_URL}api/subscription/paymentverification`, {
                razorpay_subscription_id: paymentResponse.razorpay_subscription_id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_signature: paymentResponse.razorpay_signature,
              },{ headers: { Authorization: `Bearer:${token}`}});
              
              if (verifyResponse.data.success) {
                alert(`Subscription activated successfully!`);
                // Handle UI updates for subscription activation
              }
            },
            theme: { color: "#C8A35F" },
          }
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        console.error("Subscription Error", error);
        alert("Subscription failed. Try again!");
      }
      setLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
      <div className="flex justify-center gap-8 w-full max-w-5xl">
        {plans.map((plan, index) => {
          const PlanIcon = plan.icon;
          return (
            <div 
              key={index} 
              className="border-2 border-highlight rounded-2xl p-6 shadow-2xl bg-secondary w-96 transform transition-all duration-300 hover:scale-105 hover:shadow-primary/50"
            >
              <div className="flex items-center mb-4">
                <PlanIcon className={`mr-4 ${plan.color} w-12 h-12`} />
                <h2 className="text-2xl font-bold text-text">{plan.name}</h2>
              </div>
              <div className="mb-4">
                <p className="text-text text-3xl font-semibold">{plan.price}</p>
                <p className="text-highlight/70 text-sm">{plan.frequency}</p>
              </div>
              <ul className="text-text mb-6 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <CheckCircle className="mr-2 text-primary w-5 h-5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                className="w-full py-3 rounded-lg transition-all duration-300 
                bg-primary text-secondary hover:bg-highlight 
                font-semibold flex items-center justify-center"
                onClick={() => handleSubscribe(plan.name)}
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <ShieldCheck className="mr-2 animate-pulse" />
                    Processing...
                  </div>
                ) : (
                  <>
                    <Users className="mr-2" />
                    Select Plan
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SubscriptionPlans;