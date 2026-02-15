# Render Deployment Checklist

## ✅ Pre-Deployment

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] IP whitelist set to 0.0.0.0/0
- [ ] Connection string copied
- [ ] Code pushed to GitHub

## ✅ Backend Deployment

1. Create Web Service on Render
2. Settings:
   - [ ] Root Directory: `server`
   - [ ] Build Command: `npm install`
   - [ ] Start Command: `npm start`
   
3. Environment Variables:
   - [ ] `MONGODB_URI` = `mongodb+srv://...`
   - [ ] `JWT_SECRET` = (random 32+ character string)
   - [ ] `PORT` = `10000`
   - [ ] `NODE_ENV` = `production`

4. [ ] Deploy and wait for success
5. [ ] Copy backend URL: `https://your-backend.onrender.com`

## ✅ Frontend Deployment

1. Create Static Site on Render
2. Settings:
   - [ ] Root Directory: (leave empty - do not set to server!)
   - [ ] Build Command: `npm install && npm run build`
   - [ ] Publish Directory: `dist`
   
3. Environment Variables:
   - [ ] `VITE_API_URL` = `https://your-backend.onrender.com/api`

4. [ ] Deploy and wait for success
5. [ ] Copy frontend URL: `https://your-frontend.onrender.com`

## ⚠️ IMPORTANT: Frontend Build Command

**The build command MUST be exactly:**
```
npm install && npm run build
```

**NOT just:** `npm install`

This creates the `dist` folder that Render needs to publish.

## ✅ Post-Deployment

1. Create Admin User:
   - [ ] Go to backend service → Shell tab
   - [ ] Run: `npm run admin:create`
   - [ ] Enter email and password

2. Test Website:
   - [ ] Visit frontend URL
   - [ ] Check homepage loads
   - [ ] Go to `/login`
   - [ ] Login with admin credentials
   - [ ] Add test content in admin panel
   - [ ] Verify content appears on homepage

## 🔧 If Frontend Not Displaying

### Check 1: Environment Variable
```
VITE_API_URL must include /api at the end
Example: https://portfolio-backend-abc.onrender.com/api
```

### Check 2: Backend Running
- Visit backend URL directly
- Should see: Cannot GET /
- This means backend is running

### Check 3: Browser Console
- Press F12
- Check Console tab for errors
- Look for CORS or network errors

### Check 4: Network Tab
- Press F12 → Network tab
- Reload page
- Check if API calls are failing
- Verify API URL is correct

### Check 5: Build Logs
- Go to Render dashboard
- Check frontend build logs
- Look for build errors

## 🚨 Common Issues

### Issue: "Failed to fetch"
**Solution**: Backend is sleeping (free tier). Wait 30-60 seconds and refresh.

### Issue: CORS Error
**Solution**: Verify backend CORS is configured (already done in code).

### Issue: 404 on routes
**Solution**: `_redirects` file should be in `public/` folder (already created).

### Issue: Blank page
**Solution**: 
1. Check browser console for errors
2. Verify VITE_API_URL is correct
3. Check if backend is running

### Issue: Images not loading
**Solution**: 
1. Images might be too large
2. Use smaller images (< 2MB)
3. Or use external image hosting

## 📝 Quick Commands

### View Backend Logs
```bash
# On Render dashboard
Go to backend service → Logs tab
```

### Create Admin User
```bash
# On Render backend Shell
npm run admin:create
```

### List Admin Users
```bash
# On Render backend Shell
npm run admin:list
```

### Redeploy
```bash
# Local machine
git add .
git commit -m "Update"
git push
# Render auto-deploys
```

## 🎯 Success Criteria

- [ ] Frontend loads without errors
- [ ] Can navigate between pages
- [ ] Can login to admin panel
- [ ] Can add/edit content
- [ ] Content appears on homepage
- [ ] Contact form works
- [ ] CV download works (if uploaded)

## 📞 Need Help?

1. Check Render logs (both services)
2. Check browser console (F12)
3. Verify all environment variables
4. Ensure MongoDB is accessible
5. Check DEPLOYMENT_GUIDE.md for detailed steps
