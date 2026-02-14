# MongoDB Migration Guide

## Setup Instructions

### 1. Install MongoDB
- Download and install MongoDB from https://www.mongodb.com/try/download/community
- Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 2. Backend Setup

```bash
cd server
npm install
```

### 3. Configure Environment Variables

Create `server/.env`:
```
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_random_secret_key_here
PORT=5000
```

Create `.env` in root:
```
VITE_API_URL=http://localhost:5000/api
```

### 4. Create Admin User

```bash
cd server
node scripts/createAdmin.js
```

Default credentials:
- Email: admin@example.com
- Password: admin123

### 5. Start the Backend

```bash
cd server
npm run dev
```

### 6. Start the Frontend

```bash
npm run dev
```

## Login Credentials

After running the createAdmin script, use:
- Email: `admin@example.com`
- Password: `admin123`

Change these credentials after first login for security.

## API Endpoints

- POST `/api/auth/login` - Login
- POST `/api/auth/register` - Register new user
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout
- GET `/api/:collection` - Get all items from collection
- POST `/api/:collection` - Create item (requires auth)
- PUT `/api/:collection/:id` - Update item (requires auth)
- DELETE `/api/:collection/:id` - Delete item (requires auth)

## Collections Used

- users
- profiles
- skills
- experiences
- certificates
- leadership
- messages
