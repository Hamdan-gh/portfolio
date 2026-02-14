# Quick Setup Guide - Portfolio with MongoDB

## Prerequisites

- Node.js (v16 or higher)
- MongoDB installed locally OR MongoDB Atlas account

## Step-by-Step Setup

### 1. Install MongoDB

**Option A: Local Installation**
- Windows: Download from https://www.mongodb.com/try/download/community
- Mac: `brew install mongodb-community`
- Linux: Follow official MongoDB docs

**Option B: MongoDB Atlas (Cloud)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get your connection string

### 2. Backend Setup

```bash
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file
# Copy the content below and update values
```

Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

JWT_SECRET=your_super_secret_random_string_here_make_it_long
PORT=5000
```

**Generate a secure JWT_SECRET:**
```bash
# On Mac/Linux:
openssl rand -base64 32

# Or use any random string generator
```

### 3. Create Your First Admin User

```bash
# Still in server folder
npm run admin:create
```

You'll be prompted:
```
Enter admin email: your-email@example.com
Enter admin password: ********
Confirm password: ********
```

**Example:**
- Email: `admin@myportfolio.com`
- Password: `SecurePass123!`

### 4. Frontend Setup

```bash
# Go back to root folder
cd ..

# Install dependencies
npm install

# Create .env file
```

Create `.env` in root:
```env
VITE_API_URL=http://localhost:5000/api
```

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
Local: http://localhost:5173
```

### 6. Login to Admin Panel

1. Open browser: http://localhost:5173
2. Navigate to: http://localhost:5173/admin
3. Login with your credentials:
   - Email: (the one you created)
   - Password: (the one you created)

## Admin User Management Commands

```bash
# Create new admin user
cd server
npm run admin:create

# List all admin users
npm run admin:list

# Change admin password
npm run admin:password

# Delete admin user
npm run admin:delete
```

## Common Issues & Solutions

### MongoDB Connection Failed

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
- Make sure MongoDB is running: `mongod`
- Check if MongoDB service is active
- Verify MONGODB_URI in `.env`

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
- Change PORT in `server/.env` to different number (e.g., 5001)
- Update VITE_API_URL in root `.env` accordingly
- Or kill the process using port 5000

### Admin User Already Exists

**Problem:** `Error: User with this email already exists`

**Solution:**
```bash
# List existing users
npm run admin:list

# Change password of existing user
npm run admin:password

# Or delete and recreate
npm run admin:delete
npm run admin:create
```

### Cannot Login

**Problem:** Login fails with "Invalid credentials"

**Solutions:**
1. Verify email and password are correct
2. Check backend is running (Terminal 1)
3. Check browser console for errors
4. Verify JWT_SECRET is set in `server/.env`
5. Try changing password: `npm run admin:password`

### CORS Errors

**Problem:** `Access to fetch blocked by CORS policy`

**Solution:**
- Make sure backend is running on port 5000
- Verify VITE_API_URL in `.env` matches backend URL
- Restart both frontend and backend

## Production Deployment

### Backend (Node.js + MongoDB)

1. Set environment variables on your hosting platform
2. Use MongoDB Atlas for production database
3. Update MONGODB_URI to production database
4. Generate new JWT_SECRET for production
5. Deploy to platforms like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean
   - AWS

### Frontend (React)

1. Update `.env` with production API URL:
   ```env
   VITE_API_URL=https://your-backend-url.com/api
   ```

2. Build the frontend:
   ```bash
   npm run build
   ```

3. Deploy `dist` folder to:
   - Vercel
   - Netlify
   - GitHub Pages
   - AWS S3 + CloudFront

## Security Checklist

- [ ] Use strong, unique JWT_SECRET
- [ ] Use strong admin passwords (12+ characters)
- [ ] Never commit `.env` files
- [ ] Use HTTPS in production
- [ ] Keep dependencies updated
- [ ] Use MongoDB Atlas with IP whitelist
- [ ] Enable MongoDB authentication
- [ ] Consider adding rate limiting
- [ ] Set up proper CORS in production

## Need Help?

Check the detailed documentation:
- Backend: `server/README.md`
- Main: `README.md`
- MongoDB Migration: `README_MONGODB.md`
