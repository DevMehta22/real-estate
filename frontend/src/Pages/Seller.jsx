import React, { useState } from "react";
import Subscriptions from "../Components/Subscriptions";

const Seller = () => {
    const [subscriptionActive, setSubscriptionActive] = useState(true);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Subscriptions/>
        </div>
    );
};

export default Seller;