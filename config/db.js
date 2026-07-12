const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Points directly to your freshly installed local MongoDB engine
    const localURI = "mongodb://127.0.0.1:27017/veloce_menswear_db";
    
    console.log('Connecting to local database infrastructure...');
    
    const conn = await mongoose.connect(localURI);
    console.log(`📡 Local MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Local Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;