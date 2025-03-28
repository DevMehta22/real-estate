import React, { useState } from "react";
import BASE_URL from "../url";
import { 
    Trash2, 
    Heart, 
    MapPin, 
    Ruler, 
    Bed, 
    Bath, 
    Image as ImageIcon,
    Search as SearchIcon
} from "lucide-react";

const SavedPropertiesCard = ({ property, onRemove }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Image navigation function
    const navigateImages = (direction) => {
        if (!property.images || property.images.length === 0 || !property.images[0].images.length) return;
        
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
            {/* Property Image Section */}
            <div className="relative">
                {property.images && property.images.length > 0 && property.images[0].images.length > 0 ? (
                    <div className="relative">
                        <img
                            src={`${BASE_URL}uploads/${property.images[0].images[currentImageIndex].url}`}
                            alt={property.PropertyType}
                            className="w-full h-48 object-cover"
                        />
                        {/* Image Navigation */}
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
                        {/* Remove from Saved Button */}
                        <button
                            onClick={() => onRemove(property._id)}
                            className="absolute top-2 right-2 bg-red-500/80 p-2 rounded-full hover:bg-red-600 transition"
                            title="Remove from Saved"
                        >
                            <Trash2 className="text-white" size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
                        <ImageIcon className="text-gray-500" size={48} />
                        <span className="ml-2 text-gray-500">No Image Available</span>
                    </div>
                )}
            </div>

            {/* Property Details Section */}
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

                {/* Truncated Description */}
                <p className="text-text mb-4">
                    {property.Description.length > 100 
                        ? `${property.Description.slice(0, 100)}...` 
                        : property.Description}
                </p>
            </div>
        </div>
    );
};

const SavedProperties = ({ buyer, onRemoveSavedProperty }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter saved properties based on search query
    const filteredProperties = buyer.savedProperties.filter((property) =>
        property.Location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.PropertyType.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-secondary p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">
                    Saved Properties
                </h2>
                <div className="flex items-center">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search saved properties..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-3 py-2 bg-black border border-gray-800 rounded-lg text-text focus:outline-none focus:border-primary"
                        />
                        <SearchIcon 
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" 
                            size={20} 
                        />
                    </div>
                    <span className="ml-3 text-text">
                        {filteredProperties.length} Properties
                    </span>
                </div>
            </div>

            {buyer.savedProperties.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="mx-auto mb-4 text-primary" size={48} />
                    <p className="text-text">No saved properties found.</p>
                </div>
            ) : filteredProperties.length === 0 ? (
                <div className="text-center py-12">
                    <SearchIcon className="mx-auto mb-4 text-primary" size={48} />
                    <p className="text-text">No properties match your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProperties.map((property) => (
                        <SavedPropertiesCard 
                            key={property._id} 
                            property={property}
                            onRemove={onRemoveSavedProperty}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedProperties;