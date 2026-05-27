const jwt=require("jsonwebtoken")

const generateToken=async (data)=>{
    const { name, email, role, _id } = data
    return await jwt.sign({ name, email, role, _id }, process.env.SECRET_KEY, { expiresIn: "1d" })
}
module.exports={generateToken}
