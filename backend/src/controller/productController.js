// controllers/productController.js

const productDB = require("../model/productSchema");
const cloudinary = require("../config/Cloudinary");



// ================= CREATE PRODUCT =================

const createProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            category,
            quantity,
            price,
            stock,
            shippingFee
        } = req.body;

        // Validation
        if (
            !name ||
            !description ||
            !category ||
            !quantity ||
            !price ||
            !stock
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Image Validation
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        // Upload Image
        const fileBase64 = req.file.buffer.toString("base64");

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${fileBase64}`,
            {
                folder: "Zetozz/Products"
            }
        );

        // Create Product
        const newProduct = await productDB.create({
            name,
            description,
            category,
            shippingFee,

            variants: [
                {
                    quantity,
                    price,
                    stock,
                    images: result.secure_url,
                    cloudinaryId: result.public_id
                }
            ]
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product: newProduct
        });

    } catch (error) {

        console.log("Create Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= ADD VARIANT =================

const addVariant = async (req, res) => {
    try {

        const { id } = req.params;

        const { quantity, price, stock } = req.body;

        const product = await productDB.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Image is required"
            });
        }

        const fileBase64 = req.file.buffer.toString("base64");

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${fileBase64}`,
            {
                folder: "Zetozz/Products"
            }
        );

        const newVariant = {
            quantity,
            price,
            stock,
            images: result.secure_url,
            cloudinaryId: result.public_id
        };

        product.variants.push(newVariant);

        await product.save();

        res.status(200).json({
            success: true,
            message: "Variant added successfully",
            product
        });

    } catch (error) {

        console.log("Add Variant Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= UPDATE PRODUCT =================

const updateProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const {
            name,
            description,
            category,
            shippingFee
        } = req.body;

        const product = await productDB.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        if (name !== undefined) product.name = name;

        if (description !== undefined)
            product.description = description;

        if (category !== undefined)
            product.category = category;

        if (shippingFee !== undefined)
            product.shippingFee = shippingFee;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {

        console.log("Update Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= UPDATE VARIANT =================

const updateVariant = async (req, res) => {
    try {

        const { productId, variantId } = req.params;

        const {
            quantity,
            price,
            stock
        } = req.body;

        const product = await productDB.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const variant = product.variants.id(variantId);

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "Variant not found"
            });
        }

        if (quantity !== undefined)
            variant.quantity = quantity;

        if (price !== undefined)
            variant.price = price;

        if (stock !== undefined)
            variant.stock = stock;

        // Update Image
        if (req.file) {

            const fileBase64 =
                req.file.buffer.toString("base64");

            const result =
                await cloudinary.uploader.upload(
                    `data:${req.file.mimetype};base64,${fileBase64}`,
                    {
                        folder: "Zetozz/Products"
                    }
                );

            // Delete Old Image
            if (variant.cloudinaryId) {
                await cloudinary.uploader.destroy(
                    variant.cloudinaryId
                );
            }

            variant.images = result.secure_url;

            variant.cloudinaryId = result.public_id;
        }

        await product.save();

        res.status(200).json({
            success: true,
            message: "Variant updated successfully",
            product
        });

    } catch (error) {

        console.log("Update Variant Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= DELETE PRODUCT =================

const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await productDB.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        product.isActive = false;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {

        console.log("Delete Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= DELETE VARIANT =================

const deleteVariant = async (req, res) => {
    try {

        const { productId, variantId } = req.params;

        const product = await productDB.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const variant = product.variants.id(variantId);

        if (!variant) {
            return res.status(404).json({
                success: false,
                message: "Variant not found"
            });
        }

        variant.isActive = false;

        await product.save();

        res.status(200).json({
            success: true,
            message: "Variant deleted successfully",
            product
        });

    } catch (error) {

        console.log("Delete Variant Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= GET PRODUCTS =================

const getProducts = async (req, res) => {
    try {

        const page =
            Number(req.query.page) || 1;

        const limit =
            Number(req.query.limit) || 10;

        const category =
            req.query.category;

        const skip = (page - 1) * limit;

        const matchStage = {
            isActive: true
        };

        if (category) {
            matchStage.category = category;
        }

        const products =
            await productDB.aggregate([

                {
                    $match: matchStage
                },

                {
                    $project: {

                        name: 1,
                        description: 1,
                        category: 1,
                        shippingFee: 1,
                        createdAt: 1,

                        variants: {
                            $filter: {
                                input: "$variants",
                                as: "variant",
                                cond: {
                                    $eq: [
                                        "$$variant.isActive",
                                        true
                                    ]
                                }
                            }
                        }
                    }
                },

                {
                    $skip: skip
                },

                {
                    $limit: limit
                }

            ]);

        const totalProducts =
            await productDB.countDocuments(matchStage);

        res.status(200).json({
            success: true,
            currentPage: page,
            totalProducts,
            totalPages: Math.ceil(
                totalProducts / limit
            ),
            data: products
        });

    } catch (error) {

        console.log("Get Products Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= GET SINGLE PRODUCT =================

const getSingleProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product =
            await productDB.aggregate([

                {
                    $match: {
                        _id: id,
                        isActive: true
                    }
                },

                {
                    $project: {

                        name: 1,
                        description: 1,
                        category: 1,
                        shippingFee: 1,
                        createdAt: 1,

                        variants: {
                            $filter: {
                                input: "$variants",
                                as: "variant",
                                cond: {
                                    $eq: [
                                        "$$variant.isActive",
                                        true
                                    ]
                                }
                            }
                        }
                    }
                }

            ]);

        if (!product.length) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product[0]
        });

    } catch (error) {

        console.log("Get Single Product Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= EXPORTS =================

module.exports = {
    createProduct,
    addVariant,
    updateProduct,
    updateVariant,
    deleteProduct,
    deleteVariant,
    getProducts,
    getSingleProduct
};