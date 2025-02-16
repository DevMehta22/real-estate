const multer = require('multer');
const path = require('path');
const Seller = require('../models/sellerSchema');
const PropertyImage = require('../models/propertyImagesSchema');

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/properties/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter for image validation
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).array('images', 10); // Allow up to 10 images

// Create Seller Listing
const createSellerListing = async (req, res) => {
    try {
        const {userId} = req.params;
        const {propertyType, location, area, price, description, phoneNumber, amenities, bedrooms, bathrooms } = req.body;
        
        const newListing = new Seller({
            userId,
            propertyType,
            location,
            area,
            price,
            description,
            phoneNumber,
            amenities,
            bedrooms,
            bathrooms,
            createdBy: userId
        });

        const savedListing = await newListing.save();
        res.status(201).json(savedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get All Seller Listings
const getAllListings = async (req, res) => {
    try {
        const listings = await Seller.find()
            .populate('userId', 'Email')
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Single Listing
const getListingById = async (req, res) => {
    try {
        const listing = await Seller.findById(req.params.id)
            .populate('userId', 'Email')
        
        if (!listing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        const images = await PropertyImage.find({ sellerId: req.params.id });
        res.status(200).json({ ...listing.toObject(), images });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Listing
const updateListing = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        
        const updatedListing = await Seller.findByIdAndUpdate(id, updatedData, { new: true });
        
        if (!updatedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        res.status(200).json(updatedListing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Listing
const deleteListing = async (req, res) => {
    try {
        const { id } = req.params;
        
        const deletedListing = await Seller.findByIdAndDelete(id);
        
        if (!deletedListing) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        
        // Delete associated images
        await PropertyImage.deleteMany({ sellerId: id });
        
        res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add Images to Listing
const addImages = async (req, res) => {
    try {
        const { sellerId } = req.params;
        
        // Process uploaded files
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'No files uploaded' });
            }

            // Create image objects from uploaded files
            const images = req.files.map(file => ({
                url: file.path,
                description: file.originalname
            }));

            // Find or create image document
            let propertyImages = await PropertyImage.findOne({ sellerId });
            if (!propertyImages) {
                propertyImages = new PropertyImage({ sellerId, images: [] });
            }

            // Add new images
            propertyImages.images.push(...images);
            await propertyImages.save();

            res.status(201).json(propertyImages);
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};



module.exports = {
    createSellerListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
    addImages,
};
