const Seller = require('../models/sellerSchema');
const PropertyImage = require('../models/propertyImagesSchema');
const Subscription = require('../models/subscriptionSchema')
const expressHandler = require('express-async-handler')


// // File filter for image validation
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed!'), false);
//   }
// };



// Create Seller Listing
const createSellerListing = async (req, res) => {
    try {
        const {userId} = req.params;
        const isSubscribed  = await Subscription.findOne({userId:userId})
        console.log(isSubscribed)
        if(!isSubscribed || isSubscribed.status!='active'){
            return res.status(401).json({message: 'You are not subscribed to our service'})
        }
        
        const {propertyType, location, area, price, description, phoneNumber, amenities, bedrooms, bathrooms } = req.body;
        const plantype = isSubscribed.plantype
        const listingCount = await Seller.countDocuments({userId:userId})
        let maxlimt;
        switch (plantype) {
            case "basic":
                maxlimt = 5;
                break;
            case "premium":
                maxlimt = 15;
                break;
            case "enterprise":
                maxlimt = 10e9;
                break;
            default:
                res.status(400).json({ success: false, message: "Invalid plan" });
                break;
        }
        if(listingCount>=maxlimt){
            return res.status(400).json({ success: false, message: "You have reached your listing limit" });
        }

        
        const newListing = new Seller({
            userId:userId,
            PropertyType:propertyType,
            Location:location,
            Area:area,
            Price:price,
            Description:description,
            PhoneNumber:phoneNumber,
            Amenities:amenities,
            Bedrooms:bedrooms,
            Bathrooms:bathrooms,
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
        const id = req.user._id;
        const listings = await Seller.find({userId:id})
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
        const {propertyType, location, area, price, description, phoneNumber, amenities, bedrooms, bathrooms } = req.body;
        const userId = req.user._id;
        const updatedListing = await Seller.findByIdAndUpdate(id, { 
            userId:userId,
            PropertyType:propertyType,
            Location:location,
            Area:area,
            Price:price,
            Description:description,
            PhoneNumber:phoneNumber,
            Amenities:amenities,
            Bedrooms:bedrooms,
            Bathrooms:bathrooms}, { new: true });
        console.log(updatedListing)
        
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
const addImages = expressHandler(async (req, res) => {
    try {
        const { listingId } = req.params;
        
        // Process uploaded files
    
            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ message: 'No files uploaded' });
            }
            // Create image objects from uploaded files
            const images = req.files.map(file => ({
                url: file.filename,
                description: file.originalname
            }));

            // Find or create image document
            let propertyImages = await PropertyImage.findOne({ sellerId:listingId });
            if (!propertyImages) {
                propertyImages = new PropertyImage({ sellerId:listingId, images: [] });
            }

            // Add new images
            propertyImages.images.push(...images);
            await propertyImages.save();

            res.status(201).json(propertyImages);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

const getImages = async(req,res)=>{
    try{
        const {listingId} = req.params;
        const propertyImages = await PropertyImage.findOne({sellerId:listingId});
        if(!propertyImages){
            return res.status(404).json({message: 'No images found'});
            }
            res.status(200).json(propertyImages.images);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

const deleteAllImages = async(req,res)=>{
    try{
        const {listingId} = req.params;
        const propertyImages = await PropertyImage.findOne({sellerId:listingId});
        console.log(propertyImages)
        if(!propertyImages){
            return res.status(404).json({message: 'No images found'});
            }
            propertyImages.images = [];
            await propertyImages.save();
            res.status(200).json({message: 'Images deleted successfully'});

    }catch(error){
        res.status(500).json({message: error.message});
    }
}



module.exports = {
    createSellerListing,
    getAllListings,
    getListingById,
    updateListing,
    deleteListing,
    addImages,
    getImages,
    deleteAllImages
};
