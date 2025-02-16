require('dotenv').config()
const SubscriptionSchema = require("../models/subscriptionSchema")
const Razorpay = require('razorpay')
const crypto = require("crypto");
const subscriptionSchema = require('../models/subscriptionSchema');
const paymentSchema = require('../models/paymentSchema');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
});

const getKey = async (req, res) => {
    res.status(200).json({ key: instance.key_id });
  };

const buySubscription = async(req,res)=>{
    try{
        const subscription = await instance.subscriptions.create({
            plan_id: process.env.PLAN_ID,
            customer_notify: 1,
            total_count: 12,
          })
          
        
        const newSubscription = new SubscriptionSchema({
            userId: req.user._id,
            subscriptionId: subscription.id,
            plan:process.env.PLAN_ID,
            status:subscription.status,
        })
    
        await newSubscription.save();
        res.status(201).json({sucess:true,id:subscription.id})
    }catch(err){
        console.log(err)
        res.status(500).json({sucess:true,message:"Error in creating subscription"})
    }
    
}

const paymentVerification = async(req,res)=>{
    try{
        const {razorpay_subscription_id,razorpay_payment_id,razorpay_signature} = req.body
        const subsription = subscriptionSchema.findOne({userId:req.user_id});
        const shasum = crypto.createHmac("sha256", instance.key_secret);
        const gen_signature = shasum.update(`${razorpay_payment_id}|${subsription.subscriptionId}`).digest("hex");
        if(gen_signature === razorpay_signature){
            const payment = await paymentSchema.findOne({razorpay_payment_id:razorpay_payment_id});
            if(payment){
                res.status(200).json({sucess:true,message:"Payment already done!"})
            }else{
                await paymentSchema.create({
                    subscriptionId:subsription.subscriptionId,
                    razorpay_payment_id:razorpay_payment_id,
                    razorpay_subscription_id:razorpay_subscription_id,
                    razorpay_signature:razorpay_signature,
                }).then(async()=>{
                    await subscriptionSchema.findOneAndUpdate({userId:req.user._id},{status:"active"},{new:true});
                    res.status(200).json({sucess:true,message:"Payment successful"})
                })

            }
            }else{
                res.status(400).json({sucess:false,message:"Invalid signature"})
                }
    }catch(err){
        console.log(err)
        res.status(500).json({sucess:false,message:"Error in verifying payment"})
    }
}


module.exports = {buySubscription,paymentVerification,getKey}

