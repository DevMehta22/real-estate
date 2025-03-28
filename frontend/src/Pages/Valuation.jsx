import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  HomeIcon, 
  CalculatorIcon, 
  BuildingIcon, 
  BedDoubleIcon, 
  BathIcon, 
  ParkingCircleIcon, 
  ArrowLeftIcon 
} from "lucide-react";
import BASE_URL from "../url";

const Valuation = () => {
    const navigate = useNavigate();
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
        <div className="min-h-screen bg-secondary text-text p-6 flex flex-col">
            {/* Navigation Header */}
            <div className="flex items-center mb-6">
                <button 
                    onClick={() => navigate('/buyer')}
                    className="flex items-center text-highlight hover:text-primary transition mr-4"
                >
                    <ArrowLeftIcon className="mr-2" />
                    Back to Dashboard
                </button>
            </div>

            <div className="bg-secondary border border-primary/30 shadow-2xl rounded-2xl p-8 max-w-4xl w-full mx-auto">
                <div className="flex items-center mb-6">
                    <CalculatorIcon className="text-primary mr-4" size={40} />
                    <h2 className="text-3xl font-bold text-primary">AI-Powered Property Valuation</h2>
                </div>

                <p className="text-highlight mb-6 flex items-center">
                    <HomeIcon className="mr-2 text-primary" />
                    Get an instant, data-driven estimate of your property's market value using our advanced AI model.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Benefits Section */}
                    <div className="bg-secondary/50 border border-primary/20 rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-primary mb-4">Key Benefits</h3>
                        <ul className="space-y-3">
                            {[
                                "Accurate valuations based on real-time market trends",
                                "AI-driven insights to maximize property value",
                                "Comprehensive market comparison"
                            ].map((benefit, index) => (
                                <li 
                                    key={index} 
                                    className="flex items-center text-highlight"
                                >
                                    <BuildingIcon className="mr-2 text-primary" size={20} />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Valuation Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { name: "area", label: "Area (sq ft)", icon: HomeIcon },
                                { name: "bedrooms", label: "Bedrooms", icon: BedDoubleIcon },
                                { name: "bathrooms", label: "Bathrooms", icon: BathIcon },
                                { name: "stories", label: "Stories", icon: BuildingIcon },
                                { name: "parking", label: "Parking Spaces", icon: ParkingCircleIcon },
                            ].map((field) => (
                                <div key={field.name} className="flex flex-col">
                                    <label className="flex items-center text-highlight mb-1">
                                        <field.icon className="mr-2 text-primary" size={18} />
                                        {field.label}
                                    </label>
                                    <input 
                                        type="number" 
                                        name={field.name} 
                                        value={formData[field.name]} 
                                        onChange={handleChange} 
                                        required 
                                        className="border border-primary/50 bg-secondary text-text p-2 rounded-lg focus:ring-2 focus:ring-primary transition"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Dropdowns */}
                        <div className="grid md:grid-cols-2 gap-4">
                            {[
                                { name: "mainroad", label: "Located on Main Road?" },
                                { name: "guestroom", label: "Guest Room Available?" },
                                { name: "basement", label: "Has a Basement?" },
                                { name: "hotwaterheating", label: "Hot Water Heating?" },
                                { name: "airconditioning", label: "Air Conditioning?" },
                                { name: "prefarea", label: "Preferred Area?" },
                            ].map((field) => (
                                <div key={field.name} className="flex flex-col">
                                    <label className="text-highlight mb-1">{field.label}</label>
                                    <select 
                                        name={field.name} 
                                        value={formData[field.name]} 
                                        onChange={handleChange} 
                                        className="border border-primary/50 bg-secondary text-text p-2 rounded-lg focus:ring-2 focus:ring-primary transition"
                                    >
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                            ))}
                        </div>

                        {/* Furnishing Status */}
                        <div className="flex flex-col">
                            <label className="text-highlight mb-1">Furnishing Status</label>
                            <select 
                                name="furnishingstatus" 
                                value={formData.furnishingstatus} 
                                onChange={handleChange} 
                                className="border border-primary/50 bg-secondary text-text p-2 rounded-lg focus:ring-2 focus:ring-primary transition"
                            >
                                <option value="furnished">Furnished</option>
                                <option value="semi-furnished">Semi-Furnished</option>
                                <option value="unfurnished">Unfurnished</option>
                            </select>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-primary text-secondary py-3 rounded-lg hover:bg-highlight transition flex items-center justify-center"
                        >
                            <CalculatorIcon className="mr-2" />
                            {loading ? "Calculating..." : "Get Estimated Price"}
                        </button>
                    </form>
                </div>

                {/* Result Section */}
                {predictedPrice && (
                    <div className="mt-6 p-6 bg-primary/10 border border-primary rounded-xl text-center">
                        <h3 className="text-xl font-semibold text-primary mb-2">Estimated Property Value</h3>
                        <p className="text-3xl font-bold text-highlight">₹{predictedPrice.toLocaleString()}</p>
                        <p className="text-text mt-2 text-sm">Based on current market trends and property features</p>
                    </div>
                )}

                {error && (
                    <div className="mt-4 p-4 bg-primary/10 border border-primary text-primary rounded-lg text-center">
                        {error}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Valuation;