require('dotenv').config()
const express = require('express');
const axios = require("axios");
const router = express.Router();
const buyerController = require('../controllers/buyerControllers');
const {checkAuth} = require('../middlewares/auth');

const DJANGO_API_URL = `${process.env.DJANGO_URI}/api/valuation/predict/`; // Django API endpoint

// Route to get property valuation

router.post("/predict-price", async (req, res) => {
    try {
        const {
            area,
            bedrooms,
            bathrooms,
            stories,
            mainroad,
            guestroom,
            basement,
            hotwaterheating,
            airconditioning,
            parking,
            prefarea,
            furnishingstatus
        } = req.body;

        // Send a request to the Django ML model
        const response = await axios.post(DJANGO_API_URL, {
            area,
            bedrooms,
            bathrooms,
            stories,
            mainroad,
            guestroom,
            basement,
            hotwaterheating,
            airconditioning,
            parking,
            prefarea,
            furnishingstatus
        });

        return res.json(response.data); // Send Django's response back to the frontend
    } catch (error) {
        console.error("Error in price prediction:", error.response?.data || error.message);
        return res.status(500).json({ error: "Failed to predict price" });
    }
});

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
