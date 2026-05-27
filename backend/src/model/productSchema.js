const mongoose = require('mongoose');
const uuid = require('uuid');
const variantSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    stock: {
        type: Number,
        required: true
    }

});
const productSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    variants: [variantSchema],
    freeShipping: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
    