const mongoose = require('mongoose');

const connectDB = async() => {
    const conn = await mongoose.connect(MONGODB_ATLAS_DEV, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;