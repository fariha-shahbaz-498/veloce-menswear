const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  sku: {
    type: String,
    required: [true, 'Please add a unique SKU'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a product price'],
    min: [0, 'Price must be a positive number']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: ['T-Shirts', 'Hoodies', 'Suits', 'Leather Goods', 'Accessories']
  },
  // Accommodates multiple premium garment sizes
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom']
  }],
  // Array of color strings or hex codes
  colors: [{
    type: String,
    required: true
  }],
  material: {
    type: String,
    trim: true,
    default: '100% Premium Cotton'
  },
  // Structured variants to manage stock perfectly per color/size combo
  variants: [{
    size: String,
    color: String,
    stock: {
      type: Number,
      default: 0,
      min: [0, 'Stock cannot be negative']
    }
  }],
  images: [{
    type: String, // URLs to images (stored locally or cloud bucket)
    required: true
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);