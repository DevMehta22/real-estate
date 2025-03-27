import React from "react";
import BASE_URL from "../url";

const SavedProperties = ({ buyer }) => {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Saved Properties</h2>
            {buyer.savedProperties.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {buyer.savedProperties.map((property) => (
                        <li key={property._id} className="border p-4 rounded-lg shadow-md bg-gray-50">
                            <h3 className="text-xl font-semibold text-gray-700">{property.PropertyType}</h3>
                            <p className="text-gray-600">{property.Description}</p>
                            
                            <ul className="mt-2 text-gray-800">
                                <li><strong>Location:</strong> {property.Location}</li>
                                <li><strong>Area:</strong> {property.Area} sq. ft.</li>
                                <li><strong>Bedrooms:</strong> {property.Bedrooms}</li>
                                <li><strong>Bathrooms:</strong> {property.Bathrooms}</li>
                                <li><strong>Price:</strong> ₹{property.Price}</li>
                            </ul>

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
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No saved properties found.</p>
            )}
        </div>
    );
};

export default SavedProperties;