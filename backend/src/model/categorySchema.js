const mongoose = require('mongoose');
const uuid = require('uuid');
const { AddressSchema } = require('./userSchema');
const categorySchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuid.v4
    },
    name: { 
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    cloudinaryId: {
        type: String
    },
    isActive: { 
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
