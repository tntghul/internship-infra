const mongoose = require("mongoose");

const connectDB = async (DATABASE_URL) => {
    try {
        const DB_OPTION = {
            dbName: 'ai_data',
        };

        const data = await mongoose.connect(DATABASE_URL, DB_OPTION);

        if (data) {
            console.log('connection built');
        } else {
            console.log('connection failed');
        }
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = connectDB;