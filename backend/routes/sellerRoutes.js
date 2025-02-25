const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerControllers');
const {checkAuth,isSeller} = require('../middlewares/auth');
const {upload} = require('../upload')

// Create listing
router.post('/:userId', checkAuth,isSeller, sellerController.createSellerListing);

// Get all listings
router.get('/',checkAuth, sellerController.getAllListings);

// Get single listing
router.get('/:id',checkAuth, sellerController.getListingById);

// Update listing
router.put('/:id', checkAuth,isSeller, sellerController.updateListing);

// Delete listing
router.delete('/:id', checkAuth,isSeller, sellerController.deleteListing);

// Add images to listing
router.post('/images/:sellerId', checkAuth,isSeller,upload.array("images",10), sellerController.addImages);

module.exports = router;
