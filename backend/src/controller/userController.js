const {User} = require("../model/userSchema")
const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/generateToken")
const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const findData = await User.findOne({ email })
        if (findData) return res.status(409).json({ message: "User Already Exist" })
        const hashpwd = await bcrypt.hash(password, 10)
        const data = await User.create({ ...req.body, password: hashpwd })

        res.status(201).json({
            message: "Profile Created",
            data: data.insertedId
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body

        const data = await User.findOne({ email })

        if (!data) {
            return res.status(404).json({
                message: "Invalid Credential"
            })
        }

        const checkPassword = await bcrypt.compare(
            password,
            data.password
        )

        if (!checkPassword) {
            return res.status(404).json({
                message: "Invalid Credential"
            })
        }

        const token = await generateToken(data)
        const user = data.toObject()

        delete user.password

        res.status(200).json({
            message: "Logged In Successfully.",
            token,
            user
        })

    } catch (error) {

        console.log(error)

        if (error.message.includes("ENOTFOUND")) {

            return res.status(500).json({
                message: "Unable to connect to database. Please check your internet connection or database server."
            })

        }

        if (error.message.includes("bad auth")) {

            return res.status(500).json({
                message: "Database authentication failed."
            })

        }

        return res.status(500).json({
            message: "Something went wrong. Please try again later."
        })

    }
}

const updateProfile = async (req, res) => {
    try {
        const { address, ...data } = req.body
        const updatedData = await User.findByIdAndUpdate(req.user._id, data, { new: true })
        if (!updatedData) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        if (address) {
            updatedData.address.push(address)
            await updatedData.save()
        }

        res.status(200).json({
            message: "Profile Updated.",
            data: updatedData
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}


module.exports = {
    register,
    login,
    updateProfile,
}
