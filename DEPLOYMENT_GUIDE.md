# Deployment Guide for Render

## Prerequisites
- GitHub account
- Render account (https://render.com)
- MongoDB Atlas account (for database)

## Step 1: Prepare MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with password
4. Whitelist all IPs (0.0.0.0/0) for Render access
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/portfolio`)

## Step 2: Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Step 3: Deploy Backend on Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: portfolio-backend
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Root Directory**: server
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A random secure string (generate with: `openssl rand -base64 32`)
   - `PORT`: 10000
   - `NODE_ENV`: production

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Copy your backend URL (e.g., `https://portfolio-backend-xxxx.onrender.com`)

## Step 4: Deploy Frontend on Render

1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: portfolio-frontend
   - **Branch**: main
   - **Root Directory**: (leave empty)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist

4. Add Environment Variable:
   - `VITE_API_URL`: Your backend URL + `/api` (e.g., `https://portfolio-backend-xxxx.onrender.com/api`)

5. Click "Create Static Site"
6. Wait for deployment (5-10 minutes)

## Step 5: Create Admin User

After backend is deployed:

1. Go to your backend service on Render
2. Click "Shell" tab
3. Run:
   ```bash
   cd server
   npm run admin:create
   ```
4. Enter your admin email and password

## Step 6: Test Your Site

1. Visit your frontend URL (e.g., `https://portfolio-frontend-xxxx.onrender.com`)
2. Navigate to `/login`
3. Login with your admin credentials
4. Start adding content!

## Important Notes

### Free Tier Limitations
- Backend spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free (enough for one service)

### Environment Variables

**Backend (.env)**:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your_random_secret_here
PORT=10000
NODE_ENV=production
```

**Frontend (.env)**:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

### Troubleshooting

**Frontend not loading?**
- Check browser console for errors
- Verify VITE_API_URL is correct
- Make sure backend is running

**Backend errors?**
- Check Render logs
- Verify MongoDB connection string
- Ensure all environment variables are set

**CORS errors?**
- Backend CORS is already configured for all origins
- If issues persist, check backend logs

**Images not loading?**
- Large base64 images may cause issues
- Consider using smaller images (< 2MB)
- Or use external image hosting (Cloudinary, ImgBB)

## Alternative: Deploy Both Together

If you want to serve frontend from backend:

1. Update `server/server.js`:
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});
```

2. Deploy as single web service with:
   - **Build Command**: `npm install && cd server && npm install && cd .. && npm run build`
   - **Start Command**: `cd server && npm start`

## Updating Your Site

After making changes:

```bash
git add .
git commit -m "Update content"
git push
```

Render will automatically redeploy!

## Custom Domain (Optional)

1. Go to your Render service
2. Click "Settings" → "Custom Domain"
3. Add your domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)

## Support

If you encounter issues:
1. Check Render logs
2. Check browser console
3. Verify all environment variables
4. Ensure MongoDB is accessible
