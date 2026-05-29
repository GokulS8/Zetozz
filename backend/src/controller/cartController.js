const cartDB = require('../model/cartSchema');
const { User } = require('../model/userSchema');
const productDB = require('../model/productSchema');



const addToCart = async (req, res) => {
    try {

        const { userId, productId, variantId, quantity } = req.body;
        const requestedQuantity = Number(quantity);

        // Validation
        if (!userId || !productId || !variantId || !requestedQuantity || requestedQuantity < 1) {
            return res.status(400).json({
                success: false,
                message: "All fields are required and quantity must be greater than 0"
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

        // Product Check
        const product = await productDB.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Variant Check
        const variantIndex = product.variants.findIndex(
            (item) => item._id.toString() === variantId
        );

        if (variantIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Variant not found"
            });
        }

        const variant = product.variants[variantIndex];

        // Stock Check
        let cart = await cartDB.findOne({ user_id: userId });

        const itemIndex = cart
            ? cart.items.findIndex(
                (item) =>
                    item.product_id.toString() === productId &&
                    item.variant_id.toString() === variantId
            )
            : -1;

        const currentQuantity = itemIndex > -1 ? cart.items[itemIndex].quantity : 0;

        if (variant.stock < currentQuantity + requestedQuantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        // Create Cart
        if (!cart) {
            cart = await cartDB.create({
                user_id: userId,
                items: []
            });
        }

        if (itemIndex > -1) {

            // Increase Quantity
            cart.items[itemIndex].quantity += requestedQuantity;

        } else {

            // Add New Item
            cart.items.push({
                product_id: productId,
                variant_id: variantId,
                quantity: requestedQuantity,
                price: variant.price
            });
        }
        // Save Cart
        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cart
        });

    } catch (error) {

        console.log("Add To Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const removecart = async (req, res) => {
    try {
        const { userId, productId, variantId } = req.body;
        if (!userId || !productId || !variantId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }
        const cart = await cartDB.findOne({ user_id: userId });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }
        const itemIndex = cart.items.findIndex(
            (item) =>
                item.product_id.toString() === productId &&
                item.variant_id.toString() === variantId
        );
        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }
        cart.items.splice(itemIndex, 1);
        await cart.save();
        return res.status(200).json({
            success: true,
            message: "Item removed from cart successfully",
            cart
        });
    } catch (error) {
        console.log("Remove from Cart Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

const viewCart = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }


        const cart = await cartDB.findOne({ user_id: userId }).lean();
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const productIds = cart.items.map((item) => item.product_id);
        const products = await productDB.find({ _id: { $in: productIds } }).lean();
        const productMap = new Map(products.map((product) => [product._id.toString(), product]));

        const items = cart.items.map((item) => {
            const product = productMap.get(item.product_id.toString());
            const variant = product?.variants?.find(
                (variantItem) => variantItem._id.toString() === item.variant_id.toString()
            );

            return {
                quantity: item.quantity,
                price: item.price,
                product: product
                    ? {
                        _id: product._id,
                        name: product.name,
                        description: product.description,
                        category: product.category,
                        shippingFee: product.shippingFee
                    }
                    : null,
                variant: variant
                    ? {
                        _id: variant._id,
                        quantity: variant.quantity,
                        price: variant.price,
                        images: variant.images,
                        stock: variant.stock,
                        isActive: variant.isActive
                    }
                    : null
            };
        });

        return res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            cart: {
                ...cart,
                items
            }
        });
    } catch (error) {
        console.log("View Cart Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

module.exports = {
    addToCart,
    removecart,
    viewCart
};
