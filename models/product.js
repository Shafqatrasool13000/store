const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        default: 4.45
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        emum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'

        }
    },
    featured: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Product', productSchema)