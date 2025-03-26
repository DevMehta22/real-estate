const express = require('express');
const router = express.Router();
const {buySubscription,paymentVerification, getKey, isSubscribed} = require('../controllers/subscriptionControllers');
const {checkAuth,isSeller} = require('../middlewares/auth');

router.post('/',checkAuth,isSeller,buySubscription)
router.post('/paymentverification',checkAuth,isSeller,paymentVerification)
router.get('/',checkAuth,isSeller,isSubscribed)
router.get('/razorpaykey',checkAuth,isSeller,getKey)

module.exports = router;
