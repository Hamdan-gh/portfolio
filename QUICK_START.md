# Quick Start - 5 Minutes to Running

## Prerequisites
- Node.js installed
- MongoDB installed (or MongoDB Atlas account)

## Setup (First Time Only)

### 1. Run Setup Script

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### 2. Configure Environment

Edit `server/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=put_a_long_random_string_here
PORT=5000
```

### 3. Create Admin User

```bash
cd server
npm run admin
```

Choose option 1, then enter:
- Your email
- Your password (min 6 chars)

## Running the App

### Start Backend (Terminal 1)
```bash
cd server
npm run dev
```

### Start Frontend (Terminal 2)
```bash
npm run dev
```

### Access Admin Panel
Open: http://localhost:5173/admin

Login with the credentials you created.

## Admin Management

```bash
cd server
npm run admin          # Interactive menu (easiest)
npm run admin:create   # Create new admin
npm run admin:list     # List all admins
npm run admin:password # Change password
npm run admin:delete   # Delete admin
```

## Troubleshooting

### MongoDB not running?
```bash
# Start MongoDB
mongod

# Or check if service is running
# Windows: services.msc (look for MongoDB)
# Mac: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

### Port already in use?
Change PORT in `server/.env` to 5001 (or any free port)
Update `VITE_API_URL` in root `.env` accordingly

### Can't login?
1. Check backend is running (Terminal 1)
2. Verify credentials: `cd server && npm run admin:list`
3. Reset password: `npm run admin:password`

## What's Next?

1. Login to admin panel: http://localhost:5173/admin
2. Add your profile information
3. Add your skills
4. Add your experience
5. Add certificates
6. Customize the frontend in `src/` folder

## File Structure

```
portfolio/
├── server/              # Backend (Node.js + Express + MongoDB)
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   ├── scripts/        # Admin management scripts
│   └── server.js       # Main server file
├── src/                # Frontend (React)
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── config/         # API configuration
│   └── hooks/          # Custom hooks
└── public/             # Static assets
```

## Need More Help?

- Detailed setup: `SETUP_GUIDE.md`
- Backend docs: `server/README.md`
- Main docs: `README.md`
