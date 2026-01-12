import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import RestaurantListing from './pages/RestaurantListing';
import RestaurantMenu from './pages/RestaurantMenu';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import OrderConfirmation from './pages/OrderConfirmation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/restaurants" element={<RestaurantListing />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/order-confirmation" 
              element={
                <ProtectedRoute>
                  <OrderConfirmation />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
