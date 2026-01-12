const express = require('express');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = express.Router();

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantId, items, deliveryAddress } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    const orderItems = items.map(item => {
      totalAmount += item.price * item.quantity;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price
      };
    });

    // Generate estimated delivery time (30-45 minutes from now)
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + (30 + Math.random() * 15) * 60000);
    const estimatedDeliveryTime = deliveryTime.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const order = new Order({
      userId: req.user._id,
      restaurantId,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      estimatedDeliveryTime,
      status: 'confirmed'
    });

    await order.save();
    await order.populate('restaurantId', 'name address');
    await order.populate('items.menuItemId', 'name image');

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's orders
router.get('/my-orders', auth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .populate('restaurantId', 'name address image')
      .populate('items.menuItemId', 'name image')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
