# MongoDB Setup Guide

You need MongoDB to run the backend. Choose one option:

## Option 1: MongoDB Atlas (Cloud - Easiest)

### Step 1: Create Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free account
3. Verify your email

### Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" (M0 Sandbox)
3. Select a cloud provider and region (closest to you)
4. Click "Create Cluster"
5. Wait 3-5 minutes for cluster to be created

### Step 3: Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin`
5. Password: Create a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### Step 4: Allow Network Access
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### Step 5: Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" button on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password

### Step 6: Update .env File
Edit `server/.env`:
```env
MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_to_something_random_and_long
PORT=5000
```

**Important:** Replace `YOUR_PASSWORD` with your actual database user password!

### Step 7: Test Connection
```bash
cd server
npm start
```

You should see: "MongoDB connected"

---

## Option 2: Local MongoDB Installation

### Windows Installation

1. **Download MongoDB:**
   - Go to https://www.mongodb.com/try/download/community
   - Select "Windows" platform
   - Download the MSI installer

2. **Install MongoDB:**
   - Run the installer
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool)

3. **Verify Installation:**
   ```powershell
   mongod --version
   ```

4. **Start MongoDB Service:**
   - MongoDB should start automatically as a service
   - Or manually: Open Services (services.msc)
   - Find "MongoDB Server" and start it

5. **Your .env is already configured:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   ```

### Mac Installation

```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify
mongod --version
```

### Linux Installation

```bash
# Ubuntu/Debian
sudo apt-get install -y mongodb

# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Verify
mongod --version
```

---

## Verify MongoDB is Running

### For MongoDB Atlas:
Just try starting your server - if connection string is correct, it will work!

### For Local MongoDB:

**Windows:**
```powershell
# Check if service is running
Get-Service MongoDB

# Or check if port 27017 is listening
netstat -an | findstr "27017"
```

**Mac/Linux:**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Or check port
lsof -i :27017
```

---

## Next Steps

Once MongoDB is set up:

1. **Start the backend:**
   ```bash
   cd server
   npm start
   ```

2. **Create admin user:**
   ```bash
   cd server
   npm run admin
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

4. **Access admin panel:**
   http://localhost:5173/admin

---

## Troubleshooting

### "MongooseServerSelectionError"
- **Atlas:** Check connection string, password, and network access
- **Local:** Make sure MongoDB service is running

### "Authentication failed"
- **Atlas:** Verify password in connection string
- **Local:** Usually no authentication needed for local dev

### "Network timeout"
- **Atlas:** Check IP whitelist in Network Access
- **Local:** Check if port 27017 is blocked by firewall

### "Connection refused"
- **Local:** MongoDB service is not running
- Start the service or run `mongod` manually

---

## Recommended: Use MongoDB Atlas

For beginners, MongoDB Atlas is easier because:
- ✅ No local installation needed
- ✅ Free tier available
- ✅ Automatic backups
- ✅ Works from anywhere
- ✅ Production-ready

Just follow Option 1 above!
