import React, { useEffect, useState } from "react";
import { 
    PlusIcon, 
    EditIcon, 
    TrashIcon, 
    ImageIcon, 
    HomeIcon, 
    MapPinIcon, 
    AreaChartIcon, 
    DollarSignIcon,
    PhoneIcon,
    BedDoubleIcon,
    BathIcon,
    TagIcon
} from "lucide-react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import BASE_URL from "../url";

const SellerDashboard = ({ userId }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listingId, setListingId] = useState(null);
    const [error, setError] = useState("");
    const [editListing, setEditListing] = useState(null);
    const [formData, setFormData] = useState({
        propertyType: "",
        location: "",
        area: "",
        price: "",
        description: "",
        phoneNumber: "",
        amenities: "",
        bedrooms: "",
        bathrooms: "",
    });

    useEffect(() => {
        fetchListings();
    }, []);

    const token = localStorage.getItem('token');

    const fetchListings = async () => {
        try {
            const response = await axios.get(`${BASE_URL}api/seller/`, {
                headers: { Authorization: `Bearer:${token}` }
            });
            const listingsData = response.data;
    
            const listingsWithImages = await Promise.all(listingsData.map(async (listing) => {
                try {
                    const imagesResponse = await axios.get(`${BASE_URL}api/seller/images/${listing._id}`, {
                        headers: { Authorization: `Bearer:${token}` }
                    });
                    return { ...listing, images: imagesResponse.data };
                } catch (error) {
                    console.error(`Failed to fetch images for listing ${listing._id}`, error);
                    return { ...listing, images: [] };
                }
            }));
    
            setListings(listingsWithImages);
        } catch (err) {
            setError("Failed to load listings");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editListing) {
                await axios.put(`${BASE_URL}api/seller/${editListing._id}`, formData, {
                    headers: { Authorization: `Bearer:${token}` }
                });
                alert("Listing updated successfully!");
            } else {
                const response = await axios.post(`${BASE_URL}api/seller/${userId}`, formData, {
                    headers: { Authorization: `Bearer:${token}` }
                });
                setListings([...listings, response.data]);
                setListingId(response.data._id);
                alert("Listing created successfully!");
            }
            resetForm();
            fetchListings();
        } catch (err) {
            alert("Failed to process request: " + err.response?.data?.message);
        }
    };

    const handleEdit = (listing) => {
        setEditListing(listing);
        setFormData({
            propertyType: listing.PropertyType,
            location: listing.Location,
            area: listing.Area,
            price: listing.Price,
            description: listing.Description,
            phoneNumber: listing.PhoneNumber,
            amenities: listing.Amenities,
            bedrooms: listing.Bedrooms,
            bathrooms: listing.Bathrooms,
        });
    };

    const handleDelete = async (listingId) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await axios.delete(`${BASE_URL}api/seller/images/${listingId}`, {
                headers: { Authorization: `Bearer:${token}` }
            });
            await axios.delete(`${BASE_URL}api/seller/${listingId}`, {
                headers: { Authorization: `Bearer:${token}` }
            });
            alert("Listing deleted successfully!");
            setListings(listings.filter(listing => listing._id !== listingId));
        } catch (err) {
            alert("Failed to delete listing: " + err.response?.data?.message);
        }
    };

    const resetForm = () => {
        setEditListing(null);
        setFormData({
            propertyType: "",
            location: "",
            area: "",
            price: "",
            description: "",
            phoneNumber: "",
            amenities: "",
            bedrooms: "",
            bathrooms: "",
        });
    };

    return (
        <div className="bg-secondary text-text min-h-screen p-6">
            <div className="max-w-6xl mx-auto">
                {/* Listings Header */}
                <div className="flex items-center justify-between mb-8 border-b border-primary/30 pb-4">
                    <div className="flex items-center">
                        <HomeIcon className="text-primary mr-3" size={32} />
                        <h1 className="text-3xl font-bold text-primary">Your Property Listings</h1>
                    </div>
                </div>

                {/* Listings Grid */}
                {loading ? (
                    <div className="text-center text-highlight">Loading...</div>
                ) : error ? (
                    <div className="text-primary">{error}</div>
                ) : listings.length === 0 ? (
                    <div className="text-center text-highlight">
                        <p>No listings found. Create one now!</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {listings.map((listing) => (
                            <div 
                                key={listing._id} 
                                className="bg-secondary/50 border border-primary/30 rounded-2xl p-6 shadow-lg hover:shadow-xl transition"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-primary flex items-center">
                                            <HomeIcon className="mr-2" size={20} />
                                            {listing.PropertyType}
                                        </h2>
                                        <p className="text-highlight flex items-center">
                                            <MapPinIcon className="mr-1" size={16} />
                                            {listing.Location}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button 
                                            onClick={() => handleEdit(listing)} 
                                            className="text-primary hover:bg-primary/10 p-2 rounded-full"
                                        >
                                            <EditIcon size={20} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(listing._id)} 
                                            className="text-primary hover:bg-primary/10 p-2 rounded-full"
                                        >
                                            <TrashIcon size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Property Details */}
                                <div className="space-y-2 mb-4">
                                    <p className="flex items-center">
                                        <DollarSignIcon className="mr-2 text-primary" size={16} />
                                        Price: ₹{listing.Price.toLocaleString()}
                                    </p>
                                    <p className="flex items-center">
                                        <AreaChartIcon className="mr-2 text-primary" size={16} />
                                        Area: {listing.Area} sq ft
                                    </p>
                                    <p className="flex items-center">
                                        <BedDoubleIcon className="mr-2 text-primary" size={16} />
                                        Bedrooms: {listing.Bedrooms}
                                    </p>
                                    <p className="flex items-center">
                                        <BathIcon className="mr-2 text-primary" size={16} />
                                        Bathrooms: {listing.Bathrooms}
                                    </p>
                                </div>

                                {/* Images */}
                                {(listing.images && listing.images.length > 0) ? (
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {listing.images.slice(0, 3).map((image, index) => (
                                            <img 
                                                key={index} 
                                                src={`${BASE_URL}uploads/${image.url}`} 
                                                alt="Property" 
                                                className="w-full h-24 object-cover rounded-lg" 
                                            />
                                        ))}
                                        {listing.images.length > 3 && (
                                            <div className="bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                                                +{listing.images.length - 3}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center text-highlight bg-secondary/30 rounded-lg p-4">
                                        <ImageIcon className="mr-2" />
                                        No images
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Listing Form */}
                <div className="bg-secondary/50 border border-primary/30 rounded-2xl p-8">
                    <h2 className="text-2xl font-semibold text-primary mb-6 flex items-center">
                        <PlusIcon className="mr-3" size={28} />
                        {editListing ? "Edit Listing" : "Create New Listing"}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <HomeIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="text" 
                                    name="propertyType" 
                                    placeholder="Property Type" 
                                    value={formData.propertyType} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center">
                                <MapPinIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="text" 
                                    name="location" 
                                    placeholder="Location" 
                                    value={formData.location} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center">
                                <AreaChartIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="number" 
                                    name="area" 
                                    placeholder="Area (sq ft)" 
                                    value={formData.area} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center">
                                <DollarSignIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="number" 
                                    name="price" 
                                    placeholder="Price (₹)" 
                                    value={formData.price} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center">
                                <PhoneIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="text" 
                                    name="phoneNumber" 
                                    placeholder="Phone Number" 
                                    value={formData.phoneNumber} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center">
                                <TagIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="text" 
                                    name="amenities" 
                                    placeholder="Amenities (comma-separated)" 
                                    value={formData.amenities} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                />
                            </div>
                            <div className="flex items-center">
                                <BedDoubleIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="number" 
                                    name="bedrooms" 
                                    placeholder="Bedrooms" 
                                    value={formData.bedrooms} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                    required 
                                />
                            </div>
                            <div className="flex items-center">
                                <BathIcon className="text-primary mr-2" size={20} />
                                <input 
                                    type="number" 
                                    name="bathrooms" 
                                    placeholder="Bathrooms" 
                                    value={formData.bathrooms} 
                                    onChange={handleInputChange} 
                                    className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg" 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="flex items-start">
                            <HomeIcon className="text-primary mr-2 mt-2" size={20} />
                            <textarea 
                                name="description" 
                                placeholder="Property Description" 
                                value={formData.description} 
                                onChange={handleInputChange} 
                                className="w-full p-2 bg-secondary border border-primary/30 text-text rounded-lg min-h-[100px]" 
                                required
                            ></textarea>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <button 
                                type="submit" 
                                className="bg-primary text-secondary py-3 rounded-lg hover:bg-highlight transition"
                            >
                                {editListing ? "Update Listing" : "Create Listing"}
                            </button>
                            {editListing && (
                                <button 
                                    type="button" 
                                    onClick={resetForm} 
                                    className="bg-secondary/50 border border-primary/30 text-highlight py-3 rounded-lg hover:bg-secondary/70 transition"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Image Upload */}
                {(listingId || editListing) && (
                    <div className="mt-8">
                        <ImageUpload listingId={listingId || editListing._id} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SellerDashboard;