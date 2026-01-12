import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const RestaurantMenu = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantResponse, menuResponse] = await Promise.all([
          api.get(`/restaurants/${id}`),
          api.get(`/restaurants/${id}/menu`)
        ]);
        
        setRestaurant(restaurantResponse.data);
        setMenuItems(menuResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item) => {
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: id,
      restaurantName: restaurant?.name
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Restaurant not found.</p>
        <Link to="/restaurants" className="mt-4 btn-primary inline-block">
          Back to Restaurants
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Restaurant Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="relative">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
              <p className="text-xl mb-2">{restaurant.cuisine.join(', ')}</p>
              <div className="flex items-center justify-center space-x-4 text-sm">
                <span>⭐ {restaurant.rating}</span>
                <span>•</span>
                <span>🕐 {restaurant.deliveryTime}</span>
                <span>•</span>
                <span>📍 {restaurant.address}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items */}
      <div className="grid gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                      {item.isVegetarian && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          🌿 Veg
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                    <p className="text-2xl font-bold text-primary-600">₹{item.price}</p>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="btn-primary flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No items found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantMenu;
