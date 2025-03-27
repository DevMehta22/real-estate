import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import BASE_URL from "../url";

const PropertyList = ({ userId }) => {
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
            } catch (err) {
                setError("Error fetching properties");
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handleSaveProperty = async (propertyId) => {
        try {
            const response = await axios.get(
                `${BASE_URL}api/buyer/save/${userId}/${propertyId}`,
                {
                    headers: { Authorization: `Bearer:${token}` },
                }
            );

            if (response.status === 200) {
                setSavedProperties((prev) => new Set(prev).add(propertyId));
            }
        } catch (err) {
            console.error("Error saving property:", err);
        }
    };

    if (loading) return <p>Loading properties...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Properties</h2>
            {properties.length === 0 ? (
                <p className="text-gray-600">No properties found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property) => (
                        <div key={property._id} className="border p-4 rounded-lg shadow-md bg-gray-50 relative">
                            {/* Save Button */}
                            <button
                                className="absolute top-2 right-2 text-red-500 text-2xl"
                                onClick={() => handleSaveProperty(property._id)}
                            >
                                {savedProperties.has(property._id) ? <FaHeart /> : <FaRegHeart />}
                            </button>

                            <h3 className="text-xl font-bold text-gray-700">{property.PropertyType}</h3>
                            <p className="text-gray-600">{property.Description}</p>

                            <ul className="mt-2 text-gray-800">
                                <li><strong>Location:</strong> {property.Location}</li>
                                <li><strong>Area:</strong> {property.Area} sq. ft.</li>
                                <li><strong>Bedrooms:</strong> {property.Bedrooms}</li>
                                <li><strong>Bathrooms:</strong> {property.Bathrooms}</li>
                                <li><strong>Price:</strong> ₹{property.Price}</li>
                                <li><strong>Phone:</strong> {property.PhoneNumber}</li>
                                <li><strong>Date Listed:</strong> {new Date(property.DateListed).toLocaleDateString()}</li>
                                <li><strong>Amenities:</strong> {property.Amenities?.join(", ")}</li>
                                <li><strong>Reviews:</strong> {(property.Reviews?.length > 0) ? property.Reviews.join(", ") : "No reviews yet"}</li>
                            </ul>

                            {/* Property Images */}
                            {property.images && property.images.length > 0 && (
                                <div className="mt-3">
                                    <h4 className="font-semibold text-gray-700">Images:</h4>
                                    <div className="flex gap-2 overflow-x-auto">
                                        {property.images[0].images.map((img, index) => (
                                            <img
                                                key={index}
                                                src={`${BASE_URL}uploads/${img.url}`}
                                                alt={`Property ${index}`}
                                                className="w-24 h-24 object-cover rounded-md"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PropertyList;