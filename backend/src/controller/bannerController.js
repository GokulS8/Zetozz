const BannerDB = require("../model/bannerSchema")
const cloudinary = require("../config/Cloudinary")
const createBanner = async (req, res) => {
    try {
        // Check image
        if (!req.file) {
            return res.status(400).json({
                message: "Image Required"
            })
        }

        const fileBase64 = req.file.buffer.toString("base64")

        // Upload to cloudinary
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${fileBase64}`,
            {
                folder: "Zetozz/Banners"
            }
        )

        const imageUrl = result.secure_url



        const { link } = req.body
        const banner = await BannerDB.create({ imageUrl, link, cloudinaryId: result.public_id })
        res.status(201).json({ message: "Banner created successfully", banner })
    } catch (error) {
        res.status(500).json({ message: "Failed to create banner", error: error.message })
    }
}

const getBanners = async (req, res) => {
    try {
        const banners = await BannerDB.find()
        res.status(200).json({ message: "Banners retrieved successfully", banners })
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve banners", error: error.message })
    }
}

const deleteBanner = async (req, res) => {
    try {
        const { id } = req.params
        const banner = await BannerDB.findByIdAndDelete(id)
        if (!banner) {
            return res.status(404).json({ message: "Banner not found" })
        }
        if (banner.cloudinaryId) {
            await cloudinary.uploader.destroy(banner.cloudinaryId)
        }
        res.status(200).json({ message: "Banner deleted successfully" })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete banner", error: error.message })
    }
}

module.exports = { createBanner, getBanners, deleteBanner }