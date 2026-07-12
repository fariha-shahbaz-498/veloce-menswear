const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

// Connect to your local database engine directly
const runSeeder = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/veloce_menswear_db");
    console.log('📡 Connected to local database for seeding process...');

    // Clear existing products to prevent duplicates
    await Product.deleteMany();
    console.log('🧹 Old products cleared from database.');

    // Mock Premium Inventory items matching your model configuration
    const premiumProducts = [
      {
        name: "Veloce Signature Heavyweight Hoodie",
        sku: "VL-HD-001",
        description: "Premium 450GSM ultra-soft loopback cotton hoodie. Double-lined hood with dropped shoulder minimalist design aesthetic.",
        price: 85,
        category: "Hoodies",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Jet Black", "Off-White", "Dusty Pink"],
        material: "100% Organic Heavyweight Cotton",
        variants: [
          { size: "M", color: "Jet Black", stock: 25 },
          { size: "L", color: "Jet Black", stock: 20 },
          { size: "M", color: "Off-White", stock: 15 }
        ],
        images: ["https://placehold.co/600x800/png?text=Black+Hoodie"],
        isFeatured: true
      },
      {
        name: "Minimalist Essential Box Fit Tee",
        sku: "VL-TS-002",
        description: "Premium boxy silhouette t-shirt. Clean neckline stitch work crafted for daily comfort and high-end streetwear styling.",
        price: 45,
        category: "T-Shirts",
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Chalk White", "Slate Grey"],
        material: "100% Premium Combed Cotton",
        variants: [
          { size: "S", color: "Chalk White", stock: 40 },
          { size: "M", color: "Chalk White", stock: 50 }
        ],
        images: ["https://placehold.co/600x800/png?text=White+Tee"],
        isFeatured: true
      },
      {
        name: "Veloce Luxury Suede Travel Bag",
        sku: "VL-LG-003",
        description: "Handcrafted top-tier luxury suede duffle bag with silver-toned premium hardware zippers. Includes custom luggage tag.",
        price: 240,
        category: "Leather Goods",
        sizes: ["Custom"],
        colors: ["Tan Walnut"],
        material: "Premium Suede & Full-Grain Leather Trim",
        variants: [
          { size: "Custom", color: "Tan Walnut", stock: 8 }
        ],
        images: ["https://placehold.co/600x800/png?text=Leather+Bag"],
        isFeatured: false
      }
    ];

    // Insert into database
    await Product.insertMany(premiumProducts);
    console.log('✅ Premium inventory successfully injected into database!');
    
    mongoose.connection.close();
    process.exit();
  } catch (error) {
    console.error(`❌ Seeder Failed: ${error.message}`);
    process.exit(1);
  }
};

runSeeder();