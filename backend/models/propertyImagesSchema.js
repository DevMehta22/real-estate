const mongoose = require('mongoose');

const propertyImagesSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seller',
        required: true
    },
    images: [{
        url: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    }]
}, { timestamps: true });

module.exports = mongoose.model('PropertyImage', propertyImagesSchema);
