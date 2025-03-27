const express = require('express');
const router = express.Router();
const {buySubscription,paymentVerification, getKey, isSubscribed} = require('../controllers/subscriptionControllers');
const {checkAuth} = require('../middlewares/auth');

router.post('/',checkAuth,buySubscription)
router.post('/paymentverification',checkAuth,paymentVerification)
router.get('/',checkAuth,isSubscribed)
router.get('/razorpaykey',checkAuth,getKey)

module.exports = router;
