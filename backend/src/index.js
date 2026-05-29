const express = require('express');
const cors = require('cors');
const connectDB = require('./config/DB_connection');
const userRoutes = require('./routes/userRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Create an Express application
const app = express();


//Db connection
connectDB();


// Middleware
app.use(cors(
    {   
        origin: "*",
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/users', userRoutes);  
app.use('/banners', bannerRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/products', productRoutes);
app.use('/categories', categoryRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});