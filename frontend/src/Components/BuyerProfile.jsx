import React, { useState } from "react";

const BuyerProfile = ({ createProfile }) => {
    const [formData, setFormData] = useState({
        contactInfo: { name: "", phone: "", address: "" },
        preferences: { locations: [], propertyTypes: [], minPrice: "", maxPrice: "", minBedrooms: "", minBathrooms: "" },
        budget: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            if (name.includes("contactInfo")) {
                return { ...prev, contactInfo: { ...prev.contactInfo, [name.split(".")[1]]: value } };
            } else if (name.includes("preferences")) {
                return { ...prev, preferences: { ...prev.preferences, [name.split(".")[1]]: value } };
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createProfile(formData);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">Create Buyer Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Full Name</label>
                    <input type="text" name="contactInfo.name" value={formData.contactInfo.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Phone Number</label>
                    <input type="text" name="contactInfo.phone" value={formData.contactInfo.phone} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input type="text" name="contactInfo.address" value={formData.contactInfo.address} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block text-sm font-medium">Budget</label>
                    <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Create Profile</button>
            </form>
        </div>
    );
};

export default BuyerProfile;