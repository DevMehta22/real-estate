import React, { useEffect, useState } from "react";
import ImageUpload from "./ImageUpload";
import axios from "axios";
import BASE_URL from "../url";

const SellerDashboard = ({ userId }) => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [listingId,setListingId] = useState(null);
    const [error, setError] = useState("");
    const [editListing, setEditListing] = useState(null); // Stores listing data for editing
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
            const response = await axios.get(`${BASE_URL}api/seller/`,{headers:{Authorization:`Bearer:${token}`}}, { withCredentials: true });
            const listingsData = response.data;
    
            // Fetch images for each listing
            const listingsWithImages = await Promise.all(listingsData.map(async (listing) => {
                try {
                    const imagesResponse = await axios.get(`${BASE_URL}api/seller/images/${listing._id}`, {headers:{Authorization:`Bearer:${token}`}}, { withCredentials: true });
                    return { ...listing, images: imagesResponse.data }; // Attach images to the listing object
                } catch (error) {
                    console.error(`Failed to fetch images for listing ${listing._id}`, error);
                    return { ...listing, images: [] }; // Fallback to empty array if fetching fails
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

    // Create or Update Listing
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editListing) {
                const resp = await axios.put(`${BASE_URL}api/seller/${editListing._id}`, formData,{headers: {Authorization: `Bearer:${token}`}}, { withCredentials: true });
                console.log(resp.data)
                alert("Listing updated successfully!");
            } else {
                // Create new listing
                const response = await axios.post(`${BASE_URL}api/seller/${userId}`, formData,{headers: {Authorization: `Bearer:${token}`}}, { withCredentials: true });
                setListings([...listings, response.data]);
                setListingId(response.data._id);
                alert("Listing created successfully!");
            }
            resetForm();
            fetchListings(); // Refresh listings
        } catch (err) {
            alert("Failed to process request: " + err.response?.data?.message);
        }
    };

    // Set data for editing
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

    // Delete Listing
    const handleDelete = async (listingId) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await axios.delete(`${BASE_URL}api/seller/images/${listingId}`,{headers: {Authorization: `Bearer:${token}`}}, { withCredentials: true });
            await axios.delete(`${BASE_URL}api/seller/${listingId}`,{headers: {Authorization: `Bearer:${token}`}}, { withCredentials: true });
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
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Your Listings</h1>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : listings.length === 0 ? (
                <p>No listings found. Create one now!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {listings.map((listing) => (
    <div key={listing._id} className="p-4 border rounded bg-white shadow">
        <h2 className="text-lg font-semibold">{listing.PropertyType} - {listing.Location}</h2>
        <p>Price: ₹{listing.Price}</p>
        <p>Area: {listing.Area} sq ft</p>
        <p>{listing.Description}</p>
        
        {/* Display Images */}
        {(listing.images && listing.images.length > 0) ? (
            <div className="grid grid-cols-2 gap-2 mt-2">
                {listing.images.map((image, index) => (
                    <img key={index} src={`${BASE_URL}uploads/${image.url}`} alt="Property" className="w-full h-32 object-cover rounded" />
                ))}
            </div>
        ) : (
            <p className="text-gray-500">No images available</p>
        )}

        <div className="mt-2 flex space-x-2">
            <button onClick={() => handleEdit(listing)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
            <button onClick={() => handleDelete(listing._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
    </div>
))}
                </div>
            )}

            <h2 className="text-xl font-semibold mt-6 mb-2">{editListing ? "Edit Listing" : "Create a New Listing"}</h2>
            <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
                <div className="grid grid-cols-2 gap-4">
                    <input type="text" name="propertyType" placeholder="Property Type" value={formData.propertyType} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="number" name="area" placeholder="Area (sq ft)" value={formData.area} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="number" name="price" placeholder="Price (₹)" value={formData.price} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="text" name="amenities" placeholder="Amenities (comma-separated)" value={formData.amenities} onChange={handleInputChange} className="p-2 border rounded" />
                    <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleInputChange} className="p-2 border rounded" required />
                    <input type="number" name="bathrooms" placeholder="Bathrooms" value={formData.bathrooms} onChange={handleInputChange} className="p-2 border rounded" required />
                </div>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="p-2 border rounded w-full mt-4" required></textarea>
                <button type="submit" className="mt-4 bg-blue-600 text-white p-2 rounded w-full">{editListing ? "Update Listing" : "Create Listing"}</button>
                {editListing && <button type="button" onClick={resetForm} className="mt-2 bg-gray-500 text-white p-2 rounded w-full">Cancel Edit</button>}
            </form>
            {listingId && <ImageUpload listingId={listingId} />}
            {editListing && <ImageUpload listingId={editListing._id}/>}
        </div>
    );
};

export default SellerDashboard;