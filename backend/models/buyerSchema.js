const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contactInfo: {
        phone: {
            type: String,
            validate: {
                validator: function(v) {
                    return /^\d{10}$/.test(v);
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },
        address: {
            type: String,
            required: true
        }
    },
    preferences: {
        locations: [String],
        propertyTypes: [String],
        minPrice: Number,
        maxPrice: Number,
        minBedrooms: Number,
        minBathrooms: Number
    },
    savedProperties: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller'
    }],
    viewedProperties: [{
        property: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Seller'
        },
        viewDate: {
            type: Date,
            default: Date.now
        }
    }],
    budget: {
        type: Number,
        min: 0
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'purchased'],
        default: 'active'
    }
}, { timestamps: true });

module.exports = mongoose.model('Buyer', buyerSchema);
