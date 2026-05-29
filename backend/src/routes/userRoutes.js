const express=require("express")
const { register, login, updateProfile } = require("../controller/userController")
const verifyToken=require("../middleware/verifyToken")
const router=express.Router()

router.post('/register',register)
router.post('/login',login)
router.put('/updateprofile',verifyToken,updateProfile)

module.exports=router