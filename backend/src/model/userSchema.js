const mongoose=require('mongoose');
const uuid=require('uuid');
const AddressSchema=mongoose.Schema({
    _id:{
        type:String,
        default:uuid.v4
    },
    doorNo:{
        type:String,
        required:true
    },
    addressLine1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
    },
    city:{
        type:String,
        required:true
    },
    state:{ 
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
});
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true   
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    cart_id:{
        type:String,
        ref:'Cart'
    },
    address:[AddressSchema]
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);
module.exports={User,AddressSchema};