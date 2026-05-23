const mongoose = require("mongoose");

const DB_Connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log("MongoDB Connected Successfully");

    } catch (error) {
        console.error("Database Connection Failed:", error.message);
        process.exit(1);
    }
};

module.exports = DB_Connection;