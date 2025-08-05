const Buyer = require('../models/buyerSchema');
const Seller = require("../models/sellerSchema");
const PropertyImages = require("../models/propertyImagesSchema")

// Create Buyer Profile
const createBuyerProfile = async (req, res) => {
    try {
        const {userId} = req.params;
        const {contactInfo, preferences, budget } = req.body;
        
        const newBuyer = new Buyer({
            userId,
            contactInfo,
            preferences,
            budget,
            status: 'active'
        });

        const savedBuyer = await newBuyer.save();
        res.status(201).json(savedBuyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get Buyer Profile
const getBuyerProfile = async (req, res) => {
    try {
        const buyer = await Buyer.findOne({ userId: req.params.userId })
            .populate('savedProperties')
            .populate('viewedProperties.property');
        
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer profile not found' });
        }
        
        res.status(200).json(buyer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Buyer Profile
const updateBuyerProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        
        const updatedBuyer = await Buyer.findOneAndUpdate(
            { userId },
            updatedData,
            { new: true }
        );
        
        if (!updatedBuyer) {
            return res.status(404).json({ message: 'Buyer profile not found' });
        }
        
        res.status(200).json(updatedBuyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Buyer Profile
const deleteBuyerProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        
        const deletedBuyer = await Buyer.findOneAndDelete({ userId });
        
        if (!deletedBuyer) {
            return res.status(404).json({ message: 'Buyer profile not found' });
        }
        
        res.status(200).json({ message: 'Buyer profile deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Save Property
const saveProperty = async (req, res) => {
    try {
        const { userId, propertyId } = req.params;
        
        const buyer = await Buyer.findOne({ userId });
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer profile not found' });
        }

        // Check if property already saved
        if (buyer.savedProperties.includes(propertyId)) {
            return res.status(400).json({ message: 'Property already saved' });
        }

        buyer.savedProperties.push(propertyId);
        await buyer.save();
        
        res.status(200).json(buyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Remove Saved Property
const removeSavedProperty = async (req, res) => {
    try {
        const { userId, propertyId } = req.params;
        
        const buyer = await Buyer.findOne({ userId });
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer profile not found' });
        }

        buyer.savedProperties = buyer.savedProperties.filter(
            id => id.toString() !== propertyId
        );
        await buyer.save();
        
        res.status(200).json(buyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Track Viewed Property
const trackViewedProperty = async (req, res) => {
    try {
        const { userId, propertyId } = req.params;
        
        const buyer = await Buyer.findOne({ userId:userId });
        if (!buyer) {
            return res.status(404).json({ message: 'Buyer profile not found' });
        }

        // Add or update view timestamp
        const existingView = buyer.viewedProperties.find(
            view => view.property.toString() === propertyId
        );

        if (existingView) {
            existingView.viewDate = new Date();
        } else {
            buyer.viewedProperties.push({
                property: propertyId,
                viewDate: new Date()
            });
        }

        await buyer.save();
        
        res.status(200).json(buyer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const listProperties = async (req, res) => {
    try {
        const properties = await Seller.find().lean(); // .lean() improves performance

        // Fetch images for all properties in parallel
        const propertiesWithImages = await Promise.all(properties.map(async (property) => {
            const images = await PropertyImages.find({ sellerId: property._id });
            return { ...property, images }; // Create a new object with images field
        }));

        res.status(200).json(propertiesWithImages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createBuyerProfile,
    getBuyerProfile,
    updateBuyerProfile,
    deleteBuyerProfile,
    saveProperty,
    removeSavedProperty,
    trackViewedProperty,
    listProperties
};
