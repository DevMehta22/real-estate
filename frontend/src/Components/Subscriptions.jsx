import React,{useState,useEffect} from "react";
import axios from "axios";
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
      features: [
        "List up to 5 properties.",
        "Limited property visibility.",
        "Access to basic analytics.",
        "Standard customer support.",
      ],
    },
    {
      name: "Premium",
      price: "₹3,000.00",
      frequency: "Every Month",
      features: [
        "List up to 15 properties.",
        "Priority visibility on property searches.",
        "Enhanced analytics.",
        "Featured property placement.",
        "Priority customer support.",
      ],
    },
    {
      name: "Enterprise",
      price: "₹5,000.00",
      frequency: "Every Month",
      features: [
        "Unlimited property listings.",
        "Top-tier visibility.",
        "Advanced analytics.",
        "Dedicated account manager and premium support.",
        "Integration with other services.",
      ],
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
                console.log(paymentResponse)
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
            theme: { color: "#3399cc" },
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
    <div className="flex justify-center gap-6 p-6 bg-gray-100">
      {plans.map((plan, index) => (
        <div key={index} className="border rounded-lg p-6 shadow-lg bg-white w-80 h-85">
          <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
          <p className="text-gray-700 text-lg font-semibold">{plan.price}</p>
          <p className="text-gray-600 mb-4">{plan.frequency}</p>
          <ul className="text-gray-600 mb-4">
            {plan.features.map((feature, i) => (
              <li key={i} className="list-disc ml-4">{feature}</li>
            ))}
          </ul>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 " onClick={() => handleSubscribe(plan.name)}>
          {loading ? "Processing..." : "Select Plan"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
