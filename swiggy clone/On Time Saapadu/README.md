# On Time Saapadu - Food Delivery Web Application

A modern, Swiggy-inspired food delivery web application built with the MERN stack.

## 🚀 Features

- **Landing Page**: Beautiful hero section with nearby restaurants
- **Restaurant Listing**: Searchable and filterable restaurant grid
- **Restaurant Menu**: Browse menu items with add-to-cart functionality
- **Shopping Cart**: Real-time cart management with quantity controls
- **User Authentication**: JWT-based login/signup system
- **Order Management**: Place orders and track delivery status
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Modern UI**: Clean, card-based interface with smooth animations

## 🛠️ Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management
- **Axios** for API communication

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (installed and running)
- npm or yarn

## 🌐 Deployment

### Quick Deploy (Recommended)

For the fastest deployment, use these platforms:

1. **Backend**: [Render](https://render.com) - Free tier available
2. **Frontend**: [Vercel](https://vercel.com) - Free tier available
3. **Database**: [MongoDB Atlas](https://cloud.mongodb.com) - Free tier available

📖 **Detailed deployment instructions**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

### One-Click Deployment Script

```bash
chmod +x deploy.sh
./deploy.sh
```

### Environment Variables

**Backend (Render)**:
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ontimesaapadu
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters
PORT=10000
```

**Frontend (Vercel)**:
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "On Time Saapadu"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables:
MONGODB_URI=mongodb://localhost:27017/ontimesaapadu
JWT_SECRET=your_jwt_secret_key_here
PORT=5000

# Start the backend server
npm run dev
```

### 3. Database Setup

```bash
# Seed the database with sample data (in a new terminal)
cd backend
node seed.js
```

### 4. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

### 5. Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 📁 Project Structure

```
On Time Saapadu/
├── backend/
│   ├── models/          # MongoDB schemas
│   │   ├── User.js
│   │   ├── Restaurant.js
│   │   ├── MenuItem.js
│   │   └── Order.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── restaurants.js
│   │   └── orders.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js
│   ├── server.js        # Express server
│   ├── seed.js          # Database seeder
│   ├── .env            # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/        # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── RestaurantListing.jsx
│   │   │   ├── RestaurantMenu.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── OrderConfirmation.jsx
│   │   ├── context/      # React Context
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── App.jsx       # Main App component
│   │   ├── main.jsx      # Entry point
│   │   └── index.css     # Global styles
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Login**: Users can log in with email and password
- **Signup**: New users can create an account
- **Protected Routes**: Cart and order pages require authentication
- **Token Storage**: JWT tokens are stored in localStorage

## 🍽️ Sample Data

The backend includes a seeder script that populates the database with:

- 6 sample restaurants with different cuisines
- Menu items for each restaurant
- Various categories (Main Course, Starters, Pizza, Burgers, etc.)

## 🎨 Design Features

- **OTS Logo**: Custom logo with circular design and food colors
- **Color Scheme**: Orange/Red primary colors (warm food colors)
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Hover effects and transitions
- **Card-based UI**: Modern, clean interface design

## 📱 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Restaurants
- `GET /api/restaurants` - Get all restaurants (with search/filter)
- `GET /api/restaurants/:id` - Get restaurant by ID
- `GET /api/restaurants/:id/menu` - Get restaurant menu items

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user's orders

## 🔧 Development Scripts

### Backend
```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## 🌟 Future Enhancements

- Real-time order tracking with WebSocket
- Payment gateway integration
- Restaurant dashboard for order management
- Advanced search and filtering
- User reviews and ratings
- Order history and reordering
- Push notifications for order updates

## 📝 License

This project is for educational purposes only.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**On Time Saapadu** - Hot Food. Right Time. 🍕🍔🥘
