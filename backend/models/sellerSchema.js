const mongoose = require('mongoose')

const sellerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    PropertyType: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Area:{
        type : String,
        required: true
    },
    Price: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: Number,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    Amenities: {
        type: [String],
        default: []
    },
    Status: {
        type: String,
        enum: ['available', 'sold', 'pending'],
        default: 'available'
    },
    DateListed: {
        type: Date,
        default: Date.now
    },
    Reviews: [{
        rating: {
            type: Number,
            min: 1,
            max: 5
        },
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    Bedrooms: {
        type: Number,
        min: 1
    },
    Bathrooms: {
        type: Number,
        min: 1
    }
},{timestamps:true})

module.exports = mongoose.model('Seller',sellerSchema)
