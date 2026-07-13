const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = async () => {
  const db = require('./config/db');
  await db();
};

// 1. Load environment variables from your .env file
dotenv.config();

// 2. Establish connection to your local database engine
connectDB();

const app = express();

// 3. Global Middleware Layers
app.use(cors());                  // Enables Cross-Origin requests for front-end integration
app.use(express.json());          // Body parser for JSON payloads (essential for POST requests)
app.use(express.urlencoded({ extended: false }));

// 4. Mount API Application Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 5. Fallback Root Diagnostic Route
app.get('/', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Welcome to the Veloce Menswear Backend API engine.' 
  });
});

// 6. Define Hosting Port
const PORT = process.env.PORT || 5000;

// 7. Start Listening Engine
const server = app.listen(PORT, () => {
  console.log(`🚀 Server processing smoothly on port ${PORT}`);
});

// Handle unhandled promise rejections cleanly
process.on('unhandledRejection', (err, promise) => {
  console.log(`❌ Critical Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});