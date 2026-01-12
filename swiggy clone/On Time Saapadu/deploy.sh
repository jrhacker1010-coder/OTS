#!/bin/bash

echo "🚀 Deploying On Time Saapadu Application..."

# Backend Deployment (Render)
echo "📦 Deploying Backend to Render..."
echo "1. Go to https://render.com"
echo "2. Connect your GitHub repository"
echo "3. Create a new Web Service"
echo "4. Select the 'backend' folder as root directory"
echo "5. Use the following environment variables:"
echo "   - MONGODB_URI: your MongoDB Atlas connection string"
echo "   - JWT_SECRET: generate a secure random string"
echo "   - PORT: 10000"
echo "   - NODE_ENV: production"
echo ""

# Frontend Deployment (Vercel)
echo "🎨 Deploying Frontend to Vercel..."
echo "1. Go to https://vercel.com"
echo "2. Connect your GitHub repository"
echo "3. Select the 'frontend' folder as root directory"
echo "4. Add environment variable:"
echo "   - VITE_API_URL: your Render backend URL"
echo ""

# Database Setup
echo "🗄️ Setting up MongoDB Atlas..."
echo "1. Go to https://cloud.mongodb.com"
echo "2. Create a new cluster (free tier)"
echo "3. Create a database user"
echo "4. Whitelist your IP address (or 0.0.0.0/0 for all access)"
echo "5. Get your connection string"
echo ""

echo "✅ Deployment instructions completed!"
echo "📖 Check README.md for detailed setup instructions"
