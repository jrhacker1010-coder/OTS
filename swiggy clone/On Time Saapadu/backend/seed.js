const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const MenuItem = require('./models/MenuItem');

// Sample data
const restaurants = [
  {
    name: "Spice Garden",
    cuisine: ["North Indian", "Chinese"],
    rating: 4.3,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400",
    address: "123 Main Street, Downtown"
  },
  {
    name: "Pizza Paradise",
    cuisine: ["Italian", "Fast Food"],
    rating: 4.5,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
    address: "456 Oak Avenue, Westside"
  },
  {
    name: "Burger Hub",
    cuisine: ["American", "Fast Food"],
    rating: 4.1,
    deliveryTime: "20-30 min",
    image: "https://images.unsplash.com/photo-1568901346375-23c9457c59f0?w=400",
    address: "789 Elm Street, Midtown"
  },
  {
    name: "Sushi Master",
    cuisine: ["Japanese", "Asian"],
    rating: 4.7,
    deliveryTime: "35-45 min",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400",
    address: "321 Pine Road, Eastside"
  },
  {
    name: "Taco Fiesta",
    cuisine: ["Mexican", "Latin American"],
    rating: 4.2,
    deliveryTime: "25-35 min",
    image: "https://images.unsplash.com/photo-1551501273-45803df3a8b5?w=400",
    address: "654 Maple Drive, Northside"
  },
  {
    name: "Dragon Wok",
    cuisine: ["Chinese", "Thai"],
    rating: 4.4,
    deliveryTime: "30-40 min",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400",
    address: "987 Cedar Lane, Southside"
  }
];

const menuItems = [
  // Spice Garden items
  {
    restaurantId: null, // Will be set dynamically
    name: "Butter Chicken",
    description: "Tender chicken in creamy tomato gravy",
    price: 280,
    image: "https://images.unsplash.com/photo-1603894589969-12a8d7b47e13?w=300",
    category: "Main Course",
    isVegetarian: false
  },
  {
    restaurantId: null,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices",
    price: 220,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300",
    category: "Starters",
    isVegetarian: true
  },
  {
    restaurantId: null,
    name: "Noodles",
    description: "Stir-fried noodles with vegetables",
    price: 180,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300",
    category: "Main Course",
    isVegetarian: true
  },
  // Pizza Paradise items
  {
    restaurantId: null,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato, mozzarella, basil",
    price: 350,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300",
    category: "Pizza",
    isVegetarian: true
  },
  {
    restaurantId: null,
    name: "Pepperoni Pizza",
    description: "Pizza with pepperoni and cheese",
    price: 420,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300",
    category: "Pizza",
    isVegetarian: false
  },
  // Burger Hub items
  {
    restaurantId: null,
    name: "Classic Burger",
    description: "Beef patty with lettuce, tomato, onion",
    price: 250,
    image: "https://images.unsplash.com/photo-1568901346375-23c9457c59f0?w=300",
    category: "Burgers",
    isVegetarian: false
  },
  {
    restaurantId: null,
    name: "Veggie Burger",
    description: "Plant-based patty with fresh vegetables",
    price: 220,
    image: "https://images.unsplash.com/photo-1568901346375-23c9457c59f0?w=300",
    category: "Burgers",
    isVegetarian: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ontimesaapadu');
    
    // Clear existing data
    await Restaurant.deleteMany({});
    await MenuItem.deleteMany({});
    
    // Insert restaurants
    const insertedRestaurants = await Restaurant.insertMany(restaurants);
    console.log('Restaurants seeded successfully');
    
    // Insert menu items for each restaurant
    for (let i = 0; i < insertedRestaurants.length; i++) {
      const restaurant = insertedRestaurants[i];
      
      // Add 3-4 menu items for each restaurant
      const itemsForRestaurant = menuItems.slice(0, 3 + Math.floor(Math.random() * 2)).map(item => ({
        ...item,
        restaurantId: restaurant._id,
        price: item.price + Math.floor(Math.random() * 50) // Add some price variation
      }));
      
      await MenuItem.insertMany(itemsForRestaurant);
    }
    
    console.log('Menu items seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
