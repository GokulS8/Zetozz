const cartDB = require("../model/cartSchema");
const orderDB = require("../model/orderSchema");
const productDB = require("../model/productSchema");
const User = require("../model/userSchema");



// ================= CHECKOUT / CREATE ORDER =================

const checkout = async (req, res) => {
    try {

        const { userId, addressIndex } = req.body;

        // Validation
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        // User Check
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Address Check
        if (
            addressIndex === undefined ||
            !user.addresses ||
            !user.addresses[addressIndex]
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid address"
            });
        }

        const selectedAddress =
            user.addresses[addressIndex];

        // Cart Check
        const cart = await cartDB.findOne({
            user_id: userId
        });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        let totalAmount = 0;

        const orderedProducts = [];

        // ================= VALIDATE STOCK =================

        for (const item of cart.items) {

            const product =
                await productDB.findById(
                    item.product_id
                );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            const variant =
                product.variants.id(
                    item.variant_id
                );

            if (!variant || !variant.isActive) {
                return res.status(404).json({
                    success: false,
                    message: "Variant not found"
                });
            }

            // Stock Check
            if (variant.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Insufficient stock for ${product.name}`
                });
            }

            // Reduce Stock
            variant.stock -= item.quantity;

            await product.save();

            // Calculate Total
            totalAmount +=
                item.price * item.quantity;

            // Push Order Product
            orderedProducts.push({
                product_id: item.product_id,
                variant_id: item.variant_id,
                quantity: item.quantity,
                price: item.price
            });
        }

        // ================= CREATE ORDER =================

        const order = await orderDB.create({

            user_id: userId,

            products: orderedProducts,

            address: selectedAddress,

            totalAmount
        });

        // ================= CLEAR CART =================

        cart.items = [];

        await cart.save();

        // ================= RESPONSE =================

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {

        console.log("Checkout Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= GET USER ORDERS =================

const getUserOrders = async (req, res) => {
    try {

        const { userId } = req.params;

        const orders = await orderDB.find({
            user_id: userId
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            data: orders
        });

    } catch (error) {

        console.log("Get User Orders Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= GET SINGLE ORDER =================

const getSingleOrder = async (req, res) => {
    try {

        const { orderId } = req.params;

        const order = await orderDB.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            data: order
        });

    } catch (error) {

        console.log("Get Single Order Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= UPDATE ORDER STATUS =================

const updateOrderStatus = async (req, res) => {
    try {

        const { orderId } = req.params;

        const { status } = req.body;

        const allowedStatus = [
            "pending",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const order = await orderDB.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        order.status = status;

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated",
            order
        });

    } catch (error) {

        console.log("Update Order Status Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};



// ================= CANCEL ORDER =================

const cancelOrder = async (req, res) => {
    try {

        const { orderId } = req.params;

        const order = await orderDB.findById(orderId);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        // Already Cancelled
        if (order.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order already cancelled"
            });
        }

        // Restore Stock
        for (const item of order.products) {

            const product =
                await productDB.findById(
                    item.product_id
                );

            if (product) {

                const variant =
                    product.variants.id(
                        item.variant_id
                    );

                if (variant) {

                    variant.stock += item.quantity;

                    await product.save();
                }
            }
        }

        order.status = "cancelled";

        await order.save();

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {

        console.log("Cancel Order Error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const status = req.query.status;
        const skip = (page - 1) * limit;
        // Match Stage
        const matchStage = {};
        // Status Filter
        if (status) {
            matchStage.status = status;
        }
        // Aggregate Orders
        const orders = await orderDB.aggregate([
            {
                $match: matchStage
            },
            // User Details
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: true
                }
            },
            // Sort Latest Orders First
            {
                $sort: {
                    createdAt: -1
                }
            },
            // Pagination
            {
                $skip: skip
            },
            {
                $limit: limit
            },
            // Final Response Fields
            {
                $project: {
                    _id: 1,
                    products: 1,
                    address: 1,
                    totalAmount: 1,
                    status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    user: {
                        _id: "$user._id",
                        name: "$user.name",
                        email: "$user.email",
                        phone: "$user.phone"
                    }
                }
            }
        ]);
        // Total Orders Count
        const totalOrders =
            await orderDB.countDocuments(matchStage);
        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(
                totalOrders / limit
            ),
            totalOrders,
            data: orders
        });
    } catch (error) {
        console.log(
            "Get All Orders Error:",
            error
        );
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// ================= EXPORTS =================

module.exports = {
    checkout,
    getUserOrders,
    getSingleOrder,
    updateOrderStatus,
    cancelOrder,
    getAllOrders
};