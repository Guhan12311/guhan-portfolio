const mongoose = require('mongoose');

let retryCount = 0;
const MAX_RETRIES = 5;

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.warn('\x1b[33m[DB] MONGODB_URI not set — running without database\x1b[0m');
      return;
    }

    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      minPoolSize: 2,
      retryWrites: true,
    };

    mongoose.connection.on('connected', () => {
      console.log('\x1b[32m[DB] MongoDB connected successfully\x1b[0m');
      retryCount = 0;
    });

    mongoose.connection.on('error', (err) => {
      console.error('\x1b[31m[DB] MongoDB connection error:\x1b[0m', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('\x1b[33m[DB] MongoDB disconnected\x1b[0m');
      if (retryCount < MAX_RETRIES) {
        retryCount++;
        console.log(`\x1b[33m[DB] Retrying connection (${retryCount}/${MAX_RETRIES})...\x1b[0m`);
        setTimeout(connectDB, 5000 * retryCount);
      }
    });

    await mongoose.connect(uri, options);
  } catch (err) {
    console.error('\x1b[31m[DB] Initial connection failed:\x1b[0m', err.message);
    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`\x1b[33m[DB] Retrying in ${5 * retryCount}s...\x1b[0m`);
      setTimeout(connectDB, 5000 * retryCount);
    } else {
      console.error('\x1b[31m[DB] Max retries reached. Running without database.\x1b[0m');
    }
  }
};

module.exports = connectDB;
