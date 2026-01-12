const express = require('express');
const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');

const router = express.Router();

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const { search, cuisine, minRating } = req.query;
    let query = { isActive: true };

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (cuisine) {
      query.cuisine = { $in: [cuisine] };
    }

    if (minRating) {
      query.rating = { $gte: parseFloat(minRating) };
    }

    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get menu items for a restaurant
router.get('/:id/menu', async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ 
      restaurantId: req.params.id,
      isAvailable: true 
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
