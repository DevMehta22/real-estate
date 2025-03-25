import React, { useState } from "react";

const Buyer = () => {
    const [properties, setProperties] = useState([
        { id: 1, title: "Luxury Apartment", price: "$500,000", detailsLocked: true },
        { id: 2, title: "Beachfront Villa", price: "$750,000", detailsLocked: true }
    ]);

    const unlockDetails = (id) => {
        setProperties(prev => prev.map(prop => prop.id === id ? { ...prop, detailsLocked: false } : prop));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Buyer Dashboard</h1>
            
            <div className="mb-6 p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Upgrade to Featured Buyer</h2>
                <p className="text-gray-600">Get priority access to premium listings before others.</p>
                <button className="bg-blue-500 text-white px-4 py-2 mt-3 rounded-lg">Upgrade Now</button>
            </div>
            
            <h2 className="text-xl font-semibold mb-4">Available Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {properties.map(property => (
                    <div key={property.id} className="border p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-bold">{property.title}</h3>
                        <p className="text-gray-700">Price: {property.price}</p>
                        {property.detailsLocked ? (
                            <button 
                                className="bg-green-500 text-white px-4 py-2 mt-3 rounded-lg"
                                onClick={() => unlockDetails(property.id)}
                            >
                                Unlock Details (₹199)
                            </button>
                        ) : (
                            <p className="text-gray-700 mt-2">Full details available!</p>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-6 p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">Mortgage Assistance</h2>
                <p className="text-gray-600">Need financing? We help you connect with top banks for home loans.</p>
                <button className="bg-purple-500 text-white px-4 py-2 mt-3 rounded-lg">Get Assistance</button>
            </div>
        </div>
    );
};

export default Buyer;
