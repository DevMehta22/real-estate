const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerControllers');
const {checkAuth} = require('../middlewares/auth');

// Create buyer profile
router.post('/:userId', checkAuth, buyerController.createBuyerProfile);

// Get buyer profile
router.get('/:userId', checkAuth, buyerController.getBuyerProfile);

// Update buyer profile
router.put('/:userId', checkAuth, buyerController.updateBuyerProfile);

// Delete buyer profile
router.delete('/:userId', checkAuth, buyerController.deleteBuyerProfile);

// Save property
router.get('/save/:userId/:propertyId', checkAuth, buyerController.saveProperty);

// Remove saved property
router.delete('/delete/:userId/:propertyId', checkAuth, buyerController.removeSavedProperty);

// Track viewed property
router.get('/view/:userId/:propertyId', checkAuth, buyerController.trackViewedProperty);

//List all properties
router.get('/', checkAuth, buyerController.listProperties);

module.exports = router;
