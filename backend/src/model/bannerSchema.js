const mongoose = require('mongoose');
const uuid = require('uuid');
const bannerSchema = mongoose.Schema({
    _id: {
        type: String,   
        default: uuid.v4
    },
    imageUrl: {
        type: String,
        required: true
    },
    link: { 
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
const Banner = mongoose.model('Banner', bannerSchema);
module.exports = Banner;