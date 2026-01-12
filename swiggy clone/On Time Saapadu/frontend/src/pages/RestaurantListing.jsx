import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const RestaurantListing = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedRating, setSelectedRating] = useState('');

  const cuisines = ['North Indian', 'Chinese', 'Italian', 'American', 'Japanese', 'Mexican', 'Thai', 'Fast Food'];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data);
        setFilteredRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    let filtered = restaurants;

    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCuisine) {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.includes(selectedCuisine)
      );
    }

    if (selectedRating) {
      filtered = filtered.filter(restaurant =>
        restaurant.rating >= parseFloat(selectedRating)
      );
    }

    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedCuisine, selectedRating, restaurants]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Restaurants</h1>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Restaurant
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field"
            />
          </div>

          {/* Cuisine Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="input-field"
            >
              <option value="">All Cuisines</option>
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="input-field"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+ ⭐</option>
              <option value="4.0">4.0+ ⭐</option>
              <option value="3.5">3.5+ ⭐</option>
              <option value="3.0">3.0+ ⭐</option>
            </select>
          </div>
        </div>

        {/* Clear Filters */}
        {(searchTerm || selectedCuisine || selectedRating) && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCuisine('');
              setSelectedRating('');
            }}
            className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {filteredRestaurants.length} {filteredRestaurants.length === 1 ? 'restaurant' : 'restaurants'} found
        </p>
      </div>

      {/* Restaurant Grid */}
      {filteredRestaurants.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link 
              key={restaurant._id} 
              to={`/restaurant/${restaurant._id}`}
              className="card overflow-hidden group"
            >
              <div className="relative">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-md shadow-md">
                  <span className="text-sm font-medium">⭐ {restaurant.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{restaurant.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{restaurant.cuisine.join(', ')}</p>
                <p className="text-gray-500 text-sm mb-2">{restaurant.address}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {restaurant.deliveryTime}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No restaurants found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCuisine('');
              setSelectedRating('');
            }}
            className="mt-4 btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default RestaurantListing;
