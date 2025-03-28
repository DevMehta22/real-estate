import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
    Heart, 
    MapPin, 
    Ruler, 
    Bed, 
    Bath, 
    DollarSign, 
    Phone, 
    Calendar, 
    Star, 
    Image as ImageIcon 
} from "lucide-react";
import BASE_URL from "../url";

const PropertyCard = ({ property, onSave, isSaved }) => {
    const [expanded, setExpanded] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const navigateImages = (direction) => {
        if (!property.images || property.images.length === 0) return;
        
        const imageCount = property.images[0].images.length;
        setCurrentImageIndex((prevIndex) => {
            if (direction === 'next') {
                return (prevIndex + 1) % imageCount;
            } else {
                return (prevIndex - 1 + imageCount) % imageCount;
            }
        });
    };

    return (
        <div className="bg-black border border-gray-800 rounded-xl overflow-hidden shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
             {property.images && property.images.length > 0 && property.images[0].images.length > 0 ? (
                <div className="relative">
                    <img
                        src={`${BASE_URL}uploads/${property.images[0].images[currentImageIndex].url}`}
                        alt={property.PropertyType}
                        className="w-full h-48 object-cover"
                    />
                    {/* Image Navigation Buttons */}
                    {property.images[0].images.length > 1 && (
                        <>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigateImages('prev');
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
                            >
                                ←
                            </button>
                            <button 
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigateImages('next');
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
                            >
                                →
                            </button>
                        </>
                    )}
                    {/* Save Button */}
                    <div className="absolute top-2 right-2">
                        <button
                            onClick={() => onSave(property._id)}
                            className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
                        >
                            {isSaved ? (
                                <Heart className="text-red-500 fill-current" size={24} />
                            ) : (
                                <Heart className="text-white" size={24} />
                            )}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                    <ImageIcon className="text-gray-500" size={48} />
                    <span className="ml-2 text-gray-500">No Image Available</span>
                </div>
            )}

            {/* Property Details */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-primary">
                        {property.PropertyType}
                    </h3>
                    <span className="text-xl font-semibold text-green-500">
                        ₹{property.Price.toLocaleString()}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center text-text">
                        <MapPin className="mr-2 text-primary" size={20} />
                        <span className="truncate">{property.Location}</span>
                    </div>
                    <div className="flex items-center text-text">
                        <Ruler className="mr-2 text-primary" size={20} />
                        {property.Area} sq. ft.
                    </div>
                    <div className="flex items-center text-text">
                        <Bed className="mr-2 text-primary" size={20} />
                        {property.Bedrooms} Beds
                    </div>
                    <div className="flex items-center text-text">
                        <Bath className="mr-2 text-primary" size={20} />
                        {property.Bathrooms} Baths
                    </div>
                </div>

                {/* Expandable Description */}
                <div className="mb-4">
                    <p className="text-text">
                        {expanded 
                            ? property.Description 
                            : `${property.Description.slice(0, 100)}...`}
                    </p>
                    {property.Description.length > 100 && (
                        <button 
                            onClick={() => setExpanded(!expanded)}
                            className="text-primary hover:underline mt-2"
                        >
                            {expanded ? "Show Less" : "Show More"}
                        </button>
                    )}
                </div>

                {/* Additional Details Toggle */}
                <details className="border-t border-gray-800 pt-4">
                    <summary className="cursor-pointer text-primary font-semibold">
                        More Details
                    </summary>
                    <div className="mt-4 space-y-2">
                        <div className="flex items-center text-text">
                            <Phone className="mr-2 text-primary" size={20} />
                            {property.PhoneNumber}
                        </div>
                        <div className="flex items-center text-text">
                            <Calendar className="mr-2 text-primary" size={20} />
                            Listed: {new Date(property.DateListed).toLocaleDateString()}
                        </div>
                        {property.Amenities && property.Amenities.length > 0 && (
                            <div className="text-text">
                                <span className="text-primary mr-2">🏠 Amenities:</span>
                                {property.Amenities.join(", ")}
                            </div>
                        )}
                        {property.Reviews && property.Reviews.length > 0 && (
                            <div className="flex items-center text-text">
                                <Star className="mr-2 text-yellow-500" size={20} />
                                Reviews: {property.Reviews.join(", ")}
                            </div>
                        )}
                    </div>
                </details>
            </div>
        </div>
    );
};

const PropertyList = ({ userId, searchQuery }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savedProperties, setSavedProperties] = useState(new Set());

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get(`${BASE_URL}api/buyer`, {
                    headers: { Authorization: `Bearer:${token}` },
                });
                setProperties(response.data);
                setLoading(false);
            } catch (err) {
                setError("Error fetching properties");
                setLoading(false);
            }
        };
        fetchProperties();
    }, [token]);

    const handleSaveProperty = async (propertyId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}api/buyer/save/${userId}/${propertyId}`,
                {
                    headers: { Authorization: `Bearer:${token}` },
                }
            );

            if (response.status === 200) {
                setSavedProperties((prev) => {
                    const newSaved = new Set(prev);
                    if (newSaved.has(propertyId)) {
                        newSaved.delete(propertyId);
                    } else {
                        newSaved.add(propertyId);
                    }
                    return newSaved;
                });
            }
        } catch (err) {
            console.error("Error saving property:", err);
        }
    };

    const filteredProperties = properties.filter((property) =>
        property.Location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return (
        <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-pulse text-primary">Loading properties...</div>
        </div>
    );

    if (error) return (
        <div className="bg-red-50 p-6 rounded-lg text-red-500">
            {error}
        </div>
    );

    return (
        <div className="bg-secondary p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">
                    Available Properties
                </h2>
                <div className="text-text">
                    {filteredProperties.length} Properties Found
                </div>
            </div>

            {filteredProperties.length === 0 ? (
                <div className="text-center text-text py-12">
                    <ImageIcon className="mx-auto mb-4 text-primary" size={48} />
                    <p>No properties match your search criteria.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                        <PropertyCard 
                            key={property._id} 
                            property={property}
                            onSave={handleSaveProperty}
                            isSaved={savedProperties.has(property._id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyList;