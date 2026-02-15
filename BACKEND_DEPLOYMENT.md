# Backend Deployment Guide for Render

## Step-by-Step Backend Setup

### 1. Create Web Service on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository

### 2. Configure Service Settings

**Basic Settings:**
- **Name**: `portfolio-backend` (or your choice)
- **Region**: Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select "Free" (for testing)
- Or "Starter" ($7/month for always-on)

### 3. Environment Variables

Click "Advanced" → "Add Environment Variable"

**Required Variables:**

1. **MONGODB_URI**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   ```
   - Get from MongoDB Atlas
   - Replace `username` and `password` with your credentials
   - Replace `cluster` with your cluster name

2. **JWT_SECRET**
   ```
   your_super_secret_random_string_here_make_it_long_and_random
   ```
   - Generate with: `openssl rand -base64 32`
   - Or use any random 32+ character string

3. **PORT**
   ```
   10000
   ```
   - Render uses port 10000 by default

4. **NODE_ENV**
   ```
   production
   ```

### 4. Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Watch the logs for any errors

### 5. Verify Deployment

Once deployed, test these endpoints:

**Health Check:**
```
https://your-backend.onrender.com/
```
Should return:
```json
{
  "status": "ok",
  "message": "Portfolio Backend API",
  "timestamp": "2024-..."
}
```

**API Endpoints:**
```
https://your-backend.onrender.com/api/profile
https://your-backend.onrender.com/api/skills
https://your-backend.onrender.com/api/experience
```
Should return: `[]` (empty arrays) or data

### 6. Create Admin User

1. Go to your backend service on Render
2. Click "Shell" tab (top right)
3. Run:
   ```bash
   npm run admin:create
   ```
4. Enter your email and password
5. Confirm password

**Alternative Method:**
```bash
npm run admin
# Then select option 1
```

### 7. Test Admin Login

1. Go to your frontend URL
2. Navigate to `/login`
3. Enter your admin credentials
4. Should redirect to admin dashboard

## Troubleshooting Backend

### Issue: "Application failed to respond"

**Check:**
1. Logs show "Server running on port 10000"
2. MongoDB connection successful
3. No errors in logs

**Solution:**
- Make sure `PORT` environment variable is set to `10000`
- Check if MongoDB URI is correct

### Issue: "MongoDB connection error"

**Symptoms:**
```
MongooseServerSelectionError: Could not connect to any servers
```

**Solutions:**

1. **Check MongoDB URI format:**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/portfolio
   ```

2. **Verify credentials:**
   - Username and password are correct
   - Password doesn't contain special characters (or URL encode them)

3. **Check IP Whitelist:**
   - Go to MongoDB Atlas
   - Network Access
   - Add IP: `0.0.0.0/0` (allow all)

4. **Check cluster status:**
   - Make sure cluster is running
   - Not paused or deleted

### Issue: "Cannot create admin user"

**Solution:**
1. Make sure MongoDB is connected (check logs)
2. Use the Shell tab on Render
3. Run commands from `server` directory

### Issue: CORS Errors

**Symptoms:**
```
Access to fetch at '...' from origin '...' has been blocked by CORS policy
```

**Solution:**
Backend already has CORS enabled for all origins:
```javascript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

If still having issues, check:
1. Backend URL is HTTPS (not HTTP)
2. Frontend is making requests to correct URL

### Issue: "Request timeout"

**Cause:** Free tier spins down after 15 minutes of inactivity

**Solution:**
- First request takes 30-60 seconds to wake up
- Just wait and retry
- Or upgrade to paid tier for always-on

### Issue: "502 Bad Gateway"

**Causes:**
1. Backend crashed
2. MongoDB connection failed
3. Port binding issue

**Solution:**
1. Check logs for errors
2. Verify all environment variables
3. Redeploy service

## Backend Logs

### View Logs:
1. Go to Render dashboard
2. Click your backend service
3. Click "Logs" tab

### What to Look For:

**Success:**
```
✅ MongoDB connected successfully
📊 Database: portfolio
🚀 Server running on port 10000
```

**Errors:**
```
❌ MongoDB connection error: ...
Error: Cannot find module ...
Port 10000 is already in use
```

## Environment Variable Checklist

- [ ] `MONGODB_URI` - MongoDB Atlas connection string
- [ ] `JWT_SECRET` - Random secret string (32+ chars)
- [ ] `PORT` - Set to `10000`
- [ ] `NODE_ENV` - Set to `production`

## MongoDB Atlas Setup

### 1. Create Cluster
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create free M0 cluster
4. Choose region closest to your Render region

### 2. Create Database User
1. Database Access → Add New Database User
2. Authentication: Password
3. Username: `admin` (or your choice)
4. Password: Generate secure password
5. Database User Privileges: "Read and write to any database"
6. Add User

### 3. Network Access
1. Network Access → Add IP Address
2. Click "Allow Access from Anywhere"
3. IP Address: `0.0.0.0/0`
4. Add Entry

### 4. Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Driver: Node.js
4. Copy connection string
5. Replace `<password>` with your actual password
6. Add `/portfolio` before `?retryWrites`

**Example:**
```
mongodb+srv://admin:MyPassword123@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Testing Backend

### Test with curl:
```bash
# Health check
curl https://your-backend.onrender.com/

# Get profile
curl https://your-backend.onrender.com/api/profile

# Login (should fail without credentials)
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'
```

### Test with browser:
Just visit the URLs directly:
- `https://your-backend.onrender.com/`
- `https://your-backend.onrender.com/api/profile`

## Updating Backend

After making code changes:

```bash
git add .
git commit -m "Update backend"
git push
```

Render will automatically redeploy!

## Performance Tips

### Free Tier:
- Spins down after 15 min inactivity
- First request takes 30-60 seconds
- 750 hours/month free

### Keep Alive (Optional):
Use a service like UptimeRobot to ping your backend every 5 minutes:
- URL to ping: `https://your-backend.onrender.com/`
- Interval: 5 minutes
- This keeps it awake (uses more free hours)

### Upgrade to Paid:
- $7/month for Starter plan
- Always-on (no spin down)
- Better performance
- More resources

## Security Checklist

- [ ] Strong JWT_SECRET (32+ random characters)
- [ ] MongoDB user has strong password
- [ ] MongoDB IP whitelist configured
- [ ] Environment variables not in code
- [ ] `.env` files in `.gitignore`
- [ ] HTTPS enabled (automatic on Render)

## Support

If issues persist:
1. Check Render logs
2. Check MongoDB Atlas logs
3. Test endpoints with curl/browser
4. Verify all environment variables
5. Check TROUBLESHOOTING_RENDER.md
