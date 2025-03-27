import React, { useState } from "react";
import axios from "axios";
import BASE_URL from "../url";

const Valuation = () => {
    const [formData, setFormData] = useState({
        area: "",
        bedrooms: "",
        bathrooms: "",
        stories: "",
        mainroad: "no",
        guestroom: "no",
        basement: "no",
        hotwaterheating: "no",
        airconditioning: "no",
        parking: "",
        prefarea: "no",
        furnishingstatus: "furnished",
    });

    const token = localStorage.getItem("token")
    const [predictedPrice, setPredictedPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setPredictedPrice(null);

        try {
            const response = await axios.post(`${BASE_URL}api/buyer/predict-price`, formData,{
                headers:{"Authorization":`Bearer:${token}`}
            });
            setPredictedPrice(response.data.predicted_price);
        } catch (err) {
            setError("Failed to predict price. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AI-Powered Property Valuation</h2>
            <p className="text-gray-600 mb-4">
                Get an instant estimate of your property's value using our advanced AI model. 
                Gain insights into the market and make informed real estate decisions.
            </p>

            <h3 className="text-xl font-semibold text-gray-700 mb-2">Key Benefits</h3>
            <ul className="list-disc list-inside text-gray-600 mb-4">
                <li>Accurate property valuation based on real-time market trends.</li>
                <li>AI-driven insights to maximize your property's value.</li>
                <li>Compare estimated prices with similar listings.</li>
            </ul>

            {/* Form Section */}
            <h3 className="text-xl font-semibold text-gray-700 mb-4">Estimate Your Property Price</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                {/* Number Inputs */}
                {[
                    { name: "area", label: "Area (sq ft)" },
                    { name: "bedrooms", label: "Number of Bedrooms" },
                    { name: "bathrooms", label: "Number of Bathrooms" },
                    { name: "stories", label: "Number of Stories" },
                    { name: "parking", label: "Parking Spaces" },
                ].map((field) => (
                    <div key={field.name} className="flex flex-col">
                        <label className="text-gray-700 font-medium">{field.label}</label>
                        <input 
                            type="number" 
                            name={field.name} 
                            value={formData[field.name]} 
                            onChange={handleChange} 
                            required 
                            className="border p-2 rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                ))}

                {/* Dropdowns */}
                {[
                    { name: "mainroad", label: "Located on Main Road?" },
                    { name: "guestroom", label: "Guest Room Available?" },
                    { name: "basement", label: "Has a Basement?" },
                    { name: "hotwaterheating", label: "Hot Water Heating?" },
                    { name: "airconditioning", label: "Air Conditioning?" },
                    { name: "prefarea", label: "Preferred Area?" },
                ].map((field) => (
                    <div key={field.name} className="flex flex-col">
                        <label className="text-gray-700 font-medium">{field.label}</label>
                        <select 
                            name={field.name} 
                            value={formData[field.name]} 
                            onChange={handleChange} 
                            className="border p-2 rounded focus:ring focus:ring-blue-300"
                        >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                ))}

                {/* Furnishing Status */}
                <div className="flex flex-col col-span-2">
                    <label className="text-gray-700 font-medium">Furnishing Status</label>
                    <select 
                        name="furnishingstatus" 
                        value={formData.furnishingstatus} 
                        onChange={handleChange} 
                        className="border p-2 rounded focus:ring focus:ring-blue-300"
                    >
                        <option value="furnished">Furnished</option>
                        <option value="semi-furnished">Semi-Furnished</option>
                        <option value="unfurnished">Unfurnished</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="col-span-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {loading ? "Calculating..." : "Get Estimated Price"}
                </button>
            </form>

            {predictedPrice && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded text-center">
                    <strong>Estimated Price:</strong> ₹{predictedPrice}
                </div>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default Valuation;