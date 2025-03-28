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
        console.log(req.user)
        const user_id = req.user._id;
        const existingSubscription = await subscriptionSchema.findOne({userId:user_id});
        const {plan_type} = req.body;

        if(existingSubscription && existingSubscription.status == "active"){
            return res.status(400).json({message:"You already have an active subscription"});
        }
        let planId;
        switch (plan_type) {
            case "base":
                planId = process.env.BASE_PLAN_ID;
                break;
            case "standard":
                planId = process.env.STANDARD_PLAN_ID;
                break;
            case "elite":
                planId = process.env.ELITE_PLAN_ID;
                break;
            case "basic":
                planId = process.env.BASIC_PLAN_ID;
                break;
            case "premium":
                planId = process.env.PREMIUM_PLAN_ID;
                break;
            case "enterprise":
                planId = process.env.ENTERPRISE_PLAN_ID;
                break;
            default:
                return res.status(400).json({ success: false, message: "Invalid plan type" });
        }
            
        await instance.subscriptions.create({
            plan_id: planId,
            customer_notify: 1,
            total_count: 12,
        }).then(async(subscription)=>{
            // subscription.status = "active"
            console.log(subscription)
          
        
            const newSubscription = new SubscriptionSchema({
            userId: req.user._id,
            subscriptionId: subscription.id,
            planId:planId,
            plantype:plan_type,
            status:subscription.status,
            })
    
        await newSubscription.save();
        res.status(201).json({success:true,id:subscription.id})   
        })   
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Error in creating subscription"})
    }
    
}

const paymentVerification = async(req,res)=>{
    try{
        const {razorpay_subscription_id,razorpay_payment_id,razorpay_signature} = req.body
        const subsription = await subscriptionSchema.findOne({userId:req.user._id});
        const shasum = crypto.createHmac("sha256", instance.key_secret);
        const gen_signature = shasum.update(`${razorpay_payment_id}|${subsription.subscriptionId}`).digest("hex");
        if(gen_signature === razorpay_signature){
            const payment = await paymentSchema.findOne({razorpay_payment_id:razorpay_payment_id});
            if(payment){
                res.status(200).json({success:true,message:"Payment already done!"})
            }else{
                await paymentSchema.create({
                    subscriptionId:subsription._id,
                    razorpay_payment_id:razorpay_payment_id,
                    razorpay_subscription_id:razorpay_subscription_id,
                    razorpay_signature:razorpay_signature,
                }).then(async()=>{
                    await subscriptionSchema.findOneAndUpdate({userId:req.user._id},{status:"active"},{new:true});
                    res.status(200).json({success:true,message:"Payment successful"})
                })

            }
            }else{
                res.status(400).json({success:false,message:"Invalid signature"})
                }
    }catch(err){
        console.log(err)
        res.status(500).json({success:false,message:"Error in verifying payment"})
    }
}

const isSubscribed = async(req,res)=>{
    try{
        const userId = req.user._id;
        console.log(userId)
        const subscription = await subscriptionSchema.findOne({userId:userId});
        if(subscription && subscription.status == 'active'){
            res.status(200).json({success:true,message:"You are subscribed"});
        }else{
            res.status(200).json({success:false,message:"You are not subscribed"});
        }
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:"Error in checking subscription"})
    }
}

module.exports = {buySubscription,paymentVerification,isSubscribed,getKey}

