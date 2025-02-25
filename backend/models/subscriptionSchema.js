const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subscriptionId: {
        type: String
    },
    planId: {
        type: String
    },
    plantype:{
        type:String
    },
    status: {
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model('Subscription',subscriptionSchema)