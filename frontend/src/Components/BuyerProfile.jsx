import React, { useState } from "react";
import { 
    User, 
    Phone, 
    MapPin, 
    DollarSign, 
    Bed, 
    Bath, 
    Home, 
    Check, 
    ChevronRight 
} from "lucide-react";

const BuyerProfile = ({ createProfile }) => {
    const [formData, setFormData] = useState({
        contactInfo: { name: "", phone: "", address: "" },
        preferences: { 
            locations: [], 
            propertyTypes: [], 
            minPrice: "", 
            maxPrice: "", 
            minBedrooms: "", 
            minBathrooms: "" 
        },
        budget: "",
    });

    const [activeStep, setActiveStep] = useState(0);

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

    const formSteps = [
        {
            title: "Personal Details",
            fields: [
                {
                    name: "contactInfo.name",
                    label: "Full Name",
                    icon: <User />,
                    type: "text",
                    placeholder: "Enter your full name"
                },
                {
                    name: "contactInfo.phone",
                    label: "Phone Number",
                    icon: <Phone />,
                    type: "tel",
                    placeholder: "Your contact number"
                },
                {
                    name: "contactInfo.address",
                    label: "Address",
                    icon: <MapPin />,
                    type: "text",
                    placeholder: "Your current address"
                }
            ]
        },
        {
            title: "Property Preferences",
            fields: [
                {
                    name: "budget",
                    label: "Total Budget",
                    icon: <DollarSign />,
                    type: "number",
                    placeholder: "Your maximum budget"
                },
                {
                    name: "preferences.minBedrooms",
                    label: "Minimum Bedrooms",
                    icon: <Bed />,
                    type: "select",
                    options: [1, 2, 3, 4, 5].map(num => ({
                        value: num,
                        label: `${num} Bedroom${num > 1 ? 's' : ''}`
                    }))
                },
                {
                    name: "preferences.minBathrooms",
                    label: "Minimum Bathrooms",
                    icon: <Bath />,
                    type: "select",
                    options: [1, 2, 3, 4].map(num => ({
                        value: num,
                        label: `${num} Bathroom${num > 1 ? 's' : ''}`
                    }))
                }
            ]
        }
    ];

    const renderFormStep = (step) => {
        return step.fields.map((field) => (
            <div key={field.name} className="mb-6">
                <label className="block text-sm font-medium text-text mb-2 flex items-center gap-2">
                    {field.icon}
                    {field.label}
                </label>
                {field.type === 'select' ? (
                    <select
                        name={field.name}
                        value={field.name.includes('preferences') 
                            ? formData.preferences[field.name.split('.')[1]] 
                            : formData[field.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-secondary/10 border border-primary/30 rounded-lg text-text focus:ring-2 focus:ring-primary transition-all"
                    >
                        <option value="">{field.placeholder}</option>
                        {field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        type={field.type}
                        name={field.name}
                        value={field.name.includes('contactInfo') 
                            ? formData.contactInfo[field.name.split('.')[1]] 
                            : formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full px-4 py-3 bg-secondary/10 border border-primary/30 rounded-lg text-text focus:ring-2 focus:ring-primary transition-all"
                        required
                    />
                )}
            </div>
        ));
    };

    const nextStep = () => {
        if (activeStep < formSteps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const prevStep = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    return (
        <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-secondary/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-primary/20 p-6 border-b border-primary/30">
                    <h2 className="text-2xl font-bold text-text flex items-center justify-center gap-3">
                        <Home className="text-primary" size={32} />
                        Buyer Profile
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-6 flex justify-center space-x-3">
                        {formSteps.map((step, index) => (
                            <div 
                                key={index} 
                                className={`h-2 w-10 rounded-full transition-all ${
                                    activeStep === index 
                                        ? 'bg-primary' 
                                        : 'bg-primary/30'
                                }`}
                            />
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold text-text mb-6 text-center">
                        {formSteps[activeStep].title}
                    </h3>

                    {renderFormStep(formSteps[activeStep])}

                    <div className="flex justify-between mt-6">
                        {activeStep > 0 && (
                            <button 
                                type="button"
                                onClick={prevStep}
                                className="bg-secondary/20 text-text px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-secondary/30 transition-all"
                            >
                                <ChevronRight className="rotate-180" size={20} /> 
                                Back
                            </button>
                        )}

                        {activeStep < formSteps.length - 1 ? (
                            <button 
                                type="button"
                                onClick={nextStep}
                                className="ml-auto bg-primary text-secondary px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-all"
                            >
                                Next 
                                <ChevronRight size={20} />
                            </button>
                        ) : (
                            <button 
                                type="submit"
                                className="w-full bg-primary text-secondary px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-all"
                            >
                                <Check size={20} /> 
                                Create Profile
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BuyerProfile;