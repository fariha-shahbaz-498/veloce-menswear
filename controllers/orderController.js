const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc    Create new order & adjust variant stocks
// @route   POST /api/orders
// @access  Private
exports.addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ success: false, error: 'No order items provided' });
    }

    // 1. Create the order document linked to the authenticated user
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      totalPrice
    });

    const createdOrder = await order.save();

    // 2. Automatically loop through items and deduct counts from matching Product Variants
    for (const item of orderItems) {
      await Product.updateOne(
        { 
          _id: item.product, 
          'variants.size': item.size, 
          'variants.color': item.color 
        },
        { 
          $inc: { 'variants.$.stock': -item.qty } 
        }
      );
    }

    res.status(201).json({ success: true, data: createdOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};