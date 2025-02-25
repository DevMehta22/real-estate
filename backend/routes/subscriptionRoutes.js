const express = require('express');
const router = express.Router();
const {buySubscription,paymentVerification, getKey} = require('../controllers/subscriptionControllers');
const {checkAuth,isSeller} = require('../middlewares/auth');

router.post('/',checkAuth,isSeller,buySubscription)
router.post('/paymentverification',checkAuth,isSeller,paymentVerification)
router.get('/razorpaykey',checkAuth,isSeller,getKey)

module.exports = router;
