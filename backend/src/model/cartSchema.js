const mongoose = require('mongoose');
const uuid = require('uuid');
const cartSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    user_id: {
        type: String,
        ref: 'User',
        required: true
    },
    items: [{
        product_id: {
            type: String,
            ref: 'Product',
            required: true
        },
        variant_id: {
            type: String,
            ref: 'Variant',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;