const cartDB=require('../model/cartModel');
const {User}=require('../model/userSchema');
const productDB=require('../model/productSchema');



const addToCart = async (req, res) => {
    try {

        const { userId, productId, variantId, quantity } = req.body;

        // Validation
        if (!userId || !productId || !variantId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
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
        if (variant.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock"
            });
        }

        // Find Cart
        let cart = await cartDB.findOne({ user_id: userId });

        // Create Cart
        if (!cart) {
            cart = await cartDB.create({
                user_id: userId,
                items: []
            });
        }

        // Existing Item Check
        const itemIndex = cart.items.findIndex(
            (item) =>
                item.product_id.toString() === productId &&
                item.variant_id.toString() === variantId
        );

        if (itemIndex > -1) {

            // Increase Quantity
            cart.items[itemIndex].quantity += Number(quantity);

        } else {

            // Add New Item
            cart.items.push({
                product_id: productId,
                variant_id: variantId,
                quantity: Number(quantity),
                price: variant.price || product.price
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

