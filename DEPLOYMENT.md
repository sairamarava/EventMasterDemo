# EventMaster - Vercel Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit"
```

### 2. Push to GitHub
```bash
# Create a new repository on GitHub first, then:
git remote add origin https://github.com/yourusername/eventmaster.git
git push -u origin main
```

### 3. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the following:

**Project Settings:**
- Framework Preset: `Other`
- Root Directory: `./` (leave empty)
- Build Command: `npm run build`
- Install Command: `npm install`

**Environment Variables:**
Add these in Vercel dashboard:
- `MONGO_URI` = Your MongoDB connection string (e.g., MongoDB Atlas)
- `PORT` = `3000`
- `NODE_ENV` = `production`

### 4. Update API Configuration
After deployment, update the API URL in `frontend/src/config/api.js`:
```javascript
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-vercel-app-name.vercel.app/api'
  : 'http://localhost:5000/api';
```

### 5. Database Setup
- Use MongoDB Atlas (recommended for production)
- Create a cluster and get connection string
- Add your Vercel domain to IP whitelist (or use 0.0.0.0/0)

## 📁 Project Structure
```
eventmaster/
├── backend/           # Node.js Express API
├── frontend/          # React Vite application
├── vercel.json        # Vercel configuration
├── package.json       # Root package.json
└── .env              # Environment variables (local only)
```

## 🔧 Scripts
- `npm run build` - Build frontend for production
- `npm run dev` - Run both frontend and backend in development
- `npm run start` - Start production server
- `npm run install-all` - Install all dependencies

## 🌐 Features
- React frontend with Vite
- Node.js/Express backend
- MongoDB database
- File upload with Cloudinary
- Responsive design with Tailwind CSS
- Event management system

## 🔐 Environment Variables
Create these in Vercel dashboard:
- `MONGO_URI` - MongoDB connection string
- `PORT` - Server port (3000 for Vercel)
- `NODE_ENV` - Environment (production)
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## 🚀 Deployment Complete!
Your EventMaster application will be live at: `https://your-app-name.vercel.app`
