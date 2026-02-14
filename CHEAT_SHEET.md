# Portfolio Admin - Cheat Sheet

Quick reference for common tasks.

## 🚀 First Time Setup

```bash
# 1. Run setup script
setup.bat          # Windows
./setup.sh         # Mac/Linux

# 2. Configure environment
# Edit server/.env with MongoDB URI and JWT secret

# 3. Create admin user
cd server
npm run admin

# 4. Start backend (Terminal 1)
cd server
npm run dev

# 5. Start frontend (Terminal 2)
npm run dev

# 6. Access admin panel
# http://localhost:5173/admin
```

## 👤 Admin User Management

```bash
cd server

# Interactive menu (easiest)
npm run admin

# Individual commands
npm run admin:create    # Create new admin
npm run admin:list      # List all admins
npm run admin:password  # Change password
npm run admin:delete    # Delete admin
```

## 🔧 Common Commands

```bash
# Backend
cd server
npm install           # Install dependencies
npm run dev          # Start development server
npm start            # Start production server

# Frontend
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🌐 URLs

```
Frontend:     http://localhost:5173
Admin Panel:  http://localhost:5173/admin
Backend API:  http://localhost:5000/api
```

## 📁 Important Files

```
.env                    # Frontend environment variables
server/.env             # Backend environment variables
server/package.json     # Backend dependencies & scripts
package.json            # Frontend dependencies & scripts
```

## 🔐 Environment Variables

### server/.env
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_random_secret_here
PORT=5000
```

### .env (root)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🗄️ MongoDB

```bash
# Start MongoDB
mongod

# Check if running
mongod --version

# Connect to database
mongosh
use portfolio
db.users.find()
```

## 🐛 Troubleshooting

```bash
# MongoDB not running?
mongod

# Port already in use?
# Change PORT in server/.env

# Can't login?
cd server
npm run admin:list      # Check email
npm run admin:password  # Reset password

# Backend not connecting?
# Check server/.env has correct MONGODB_URI

# Frontend can't reach backend?
# Check .env has correct VITE_API_URL
```

## 📊 API Endpoints

```
POST   /api/auth/login              # Login
POST   /api/auth/register           # Register
GET    /api/auth/me                 # Get current user
POST   /api/auth/logout             # Logout

GET    /api/:collection             # Get all items
POST   /api/:collection             # Create item (auth)
PUT    /api/:collection/:id         # Update item (auth)
DELETE /api/:collection/:id         # Delete item (auth)
```

## 📦 Collections

- users
- profile
- skills
- experience
- leadership
- certificates
- messages

## 🔑 Default Ports

- Frontend: 5173
- Backend: 5000
- MongoDB: 27017

## 📝 Quick Fixes

### "MongoDB connection error"
```bash
mongod
```

### "User already exists"
```bash
cd server
npm run admin:delete
```

### "Can't login"
```bash
cd server
npm run admin:password
```

### "Port in use"
Edit `server/.env`:
```env
PORT=5001
```

### "CORS error"
Check backend is running and VITE_API_URL is correct

## 🎯 Admin Panel Features

- ✅ Profile management
- ✅ Skills management
- ✅ Experience management
- ✅ Leadership management
- ✅ Certificate management
- ✅ Message viewing

## 📚 Documentation

- [QUICK_START.md](QUICK_START.md) - 5-minute setup
- [VISUAL_GUIDE.md](VISUAL_GUIDE.md) - Visual walkthrough
- [ADMIN_COMMANDS.md](ADMIN_COMMANDS.md) - Admin commands
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Detailed guide
- [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) - All docs

## 💡 Pro Tips

- Use `npm run admin` for easiest admin management
- Keep backend running in separate terminal
- Check `npm run admin:list` to see all users
- Use strong passwords (12+ characters)
- Generate JWT_SECRET: `openssl rand -base64 32`
- Clear browser cache if login issues persist

---

**Print this page for quick reference!**
