# 🚀 Deployment Guide - On Time Saapadu

This guide will help you deploy your food delivery application to production.

## 📋 Prerequisites

- GitHub account with your code pushed to a repository
- MongoDB Atlas account (free tier available)
- Render account (for backend deployment)
- Vercel account (for frontend deployment)

## 🗄️ Step 1: Set up MongoDB Atlas

1. **Create Account**: Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a free account

2. **Create Cluster**:
   - Click "Build a Database"
   - Select "M0 Sandbox" (free tier)
   - Choose a cloud provider and region closest to your users
   - Name your cluster (e.g., "ontimesaapadu")

3. **Create Database User**:
   - Go to "Database Access" → "Add New Database User"
   - Enter username and password
   - Grant "Read and write to any database" permissions

4. **Whitelist IP Address**:
   - Go to "Network Access" → "Add IP Address"
   - For development: Add your current IP
   - For production: Add "0.0.0.0/0" (allows all access)

5. **Get Connection String**:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## 🔧 Step 2: Deploy Backend to Render

1. **Create Render Account**: Go to [Render](https://render.com) and sign up

2. **Connect GitHub**:
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select your repository

3. **Configure Service**:
   - **Name**: `on-time-saapadu-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Add Environment Variables**:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ontimesaapadu
   JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters
   PORT=10000
   ```

5. **Deploy**: Click "Create Web Service"

6. **Seed Database**:
   - Once deployed, go to your service URL + `/seed`
   - Or run locally: `cd backend && node seed.js`

## 🎨 Step 3: Deploy Frontend to Vercel

1. **Create Vercel Account**: Go to [Vercel](https://vercel.com) and sign up

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Settings**:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your actual Render backend URL)

5. **Deploy**: Click "Deploy"

## 🌐 Alternative Deployment Options

### Netlify (Frontend Alternative)

1. Go to [Netlify](https://netlify.com)
2. Drag and drop the `frontend/dist` folder after building locally
3. Or connect GitHub for automatic deployments

### Heroku (Backend Alternative)

1. Install Heroku CLI
2. Run: `heroku create your-app-name`
3. Set environment variables: `heroku config:set VAR=value`
4. Deploy: `git push heroku main`

## 🔍 Post-Deployment Checklist

- [ ] Backend API is accessible at your Render URL
- [ ] Frontend loads correctly at your Vercel URL
- [ ] Authentication works (signup/login)
- [ ] Restaurant data loads correctly
- [ ] Cart functionality works
- [ ] Order placement works
- [ ] All API calls are going to the correct backend URL

## 🛠️ Environment Variables Summary

### Backend (Render)
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ontimesaapadu
JWT_SECRET=your_super_secure_jwt_secret_key_here_minimum_32_characters
PORT=10000
```

### Frontend (Vercel)
```
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🐛 Common Issues & Solutions

### CORS Issues
- Make sure your backend allows requests from your frontend domain
- Check that the CORS middleware is properly configured

### Database Connection
- Verify your MongoDB connection string is correct
- Ensure your IP is whitelisted in MongoDB Atlas
- Check that database user has correct permissions

### Environment Variables
- Double-check all environment variables are set correctly
- Ensure no typos in variable names
- Restart services after updating variables

### Build Failures
- Check build logs for specific error messages
- Ensure all dependencies are listed in package.json
- Verify Node.js version compatibility

## 📞 Support

If you encounter issues:
1. Check the logs in your deployment platform
2. Verify all environment variables are correct
3. Ensure your database is accessible
4. Test API endpoints individually

## 🎉 Success!

Once deployed, your application will be live at:
- **Frontend**: Your Vercel URL
- **Backend API**: Your Render URL

Users can now access your food delivery application from anywhere!
