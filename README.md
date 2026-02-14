# Modern Portfolio Website

A professional, animated portfolio website built with React, Tailwind CSS, Framer Motion, and MongoDB.

## 📚 Documentation

**New to this project?** Start here:
- 🗄️ [MONGODB_SETUP.md](MONGODB_SETUP.md) - **START HERE: Set up MongoDB first!**
- 🚀 [QUICK_START.md](QUICK_START.md) - Get running in 5 minutes
- 👀 [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - Step-by-step visual walkthrough
- 📝 [CHEAT_SHEET.md](CHEAT_SHEET.md) - Quick reference for common tasks
- 📖 [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - Complete documentation index

**Admin Management:**
- 🔐 [ADMIN_COMMANDS.md](ADMIN_COMMANDS.md) - Create and manage admin users
- 📋 [ADMIN_SETUP_SUMMARY.md](ADMIN_SETUP_SUMMARY.md) - Complete admin system overview

**Detailed Guides:**
- 📘 [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed setup and troubleshooting
- 🗄️ [README_MONGODB.md](README_MONGODB.md) - MongoDB migration details
- ⚙️ [server/README.md](server/README.md) - Backend API documentation

## Features

- Modern dark theme with glassmorphism effects
- Smooth animations with Framer Motion
- Fully responsive design
- MongoDB database with Express backend
- JWT Authentication
- Admin dashboard for content management
- Contact form with message storage
- Certificate gallery
- Social media integration

## Setup Instructions

### 1. Install MongoDB

Download and install MongoDB from https://www.mongodb.com/try/download/community
Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 2. Backend Setup

```bash
cd server
npm install
```

Create `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_random_secret_key_here
PORT=5000
```

### 3. Frontend Setup

```bash
npm install
```

Create `.env` in root:
```env
VITE_API_URL=http://localhost:5000/api
```

### 4. Create Admin User

**Option A: Interactive CLI (Recommended)**
```bash
cd server
npm run admin
```

This opens an interactive menu where you can:
- Create new admin users
- List all admin users
- Change passwords
- Delete admin users

**Option B: Quick Create**
```bash
cd server
npm run admin:create
```

You'll be prompted to enter:
- Email address
- Password (minimum 6 characters)
- Password confirmation

**Other Admin Commands:**
```bash
npm run admin:list      # List all admin users
npm run admin:password  # Change password
npm run admin:delete    # Delete admin user
```

### 5. Start the Application

Terminal 1 (Backend):
```bash
cd server
npm run dev
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:5173
- Admin Dashboard: http://localhost:5173/admin
- Backend API: http://localhost:5000/api

## Admin Dashboard

Access at `/admin` with your credentials.

Features:
- Manage profile bio
- Add/Edit/Delete experience
- Add/Edit/Delete leadership roles
- Manage certificates
- Manage skills
- View contact messages

## API Endpoints

- POST `/api/auth/login` - Login
- POST `/api/auth/register` - Register new user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout
- GET `/api/:collection` - Get all items
- POST `/api/:collection` - Create item (auth required)
- PUT `/api/:collection/:id` - Update item (auth required)
- DELETE `/api/:collection/:id` - Delete item (auth required)

## MongoDB Collections

- users - Admin users
- profile - Bio information
- experience - Work experience
- leadership - Leadership roles
- certificates - Certificates & achievements
- skills - Technical skills
- messages - Contact form messages

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- React Router
- React Icons
- React Hot Toast

## Production Build

```bash
npm run build
```

## Customization

- Update colors in `tailwind.config.js`
- Modify animations in `src/utils/animations.js`
- Update personal information in Hero section
