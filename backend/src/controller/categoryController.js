const categoryDB = require('../model/categorySchema');
const productDB = require('../model/productSchema');
const cloudinary= require('../config/Cloudinary');

const createCategory = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "Image Required" });
        }
        const fileBase64 = req.file.buffer.toString("base64");
        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${fileBase64}`,
            {
                folder: "Zetozz/Categories"
            }
        );
        const imageUrl = result.secure_url;
        const { name, description } = req.body;
        const category = await categoryDB.create({ name, description, imageUrl });
        res.status(201).json({ message: "Category created successfully", category });
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getCategories = async (req, res) => {
    try {
        const categories = await categoryDB.find();
        res.status(200).json({ message: "Categories retrieved successfully", categories });
    } catch (error) {
        console.error("Error retrieving categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryDB.findById(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }   
        const { name, description } = req.body;
        if (name) category.name = name;
        if (description) category.description = description;
        if(req.file) {
            const fileBase64 = req.file.buffer.toString("base64");
            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${fileBase64}`,
                {
                    folder: "Zetozz/Categories"
                }
            );
            await cloudinary.uploader.destroy(category.cloudinaryId);
            category.imageUrl = result.secure_url;
        }
        await category.save();
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        console.error("Error updating category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;  
        const category = await categoryDB.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        category.isActive = false;
        await category.save();
        await productDB.updateMany({ category: category.name }, { isActive: false });
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };