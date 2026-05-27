const mongoose =require('mongoose');
const uuid=require('uuid');
const {AddressSchema}=require('./userSchema');
const orderSchema=mongoose.Schema({
    _id:{
        type:String,
        default:uuid.v4
    },
    user_id:{
        type:String,    
        ref:'User',
        required:true
    },
    products:[
        {
            product_id:{
                type:String,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            variant_id:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    address:{
        type:AddressSchema,
        required:true
    },
    totalAmount:{
        type:Number,    
        required:true
    },
    status:{
        type:String,
        enum:['pending','shipped','delivered','cancelled'],
        default:'pending'
    }
},{
    timestamps:true
});
const Order=mongoose.model('Order',orderSchema);
module.exports=Order;