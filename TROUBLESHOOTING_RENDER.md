# Troubleshooting Render Deployment

## Issue: Frontend Not Fetching Backend

### Step 1: Verify Backend is Running

1. Go to your backend URL directly (e.g., `https://portfolio-backend-xxxx.onrender.com`)
2. You should see: `Cannot GET /`
3. This means backend is running

Try: `https://portfolio-backend-xxxx.onrender.com/api/profile`
- Should return: `[]` (empty array) or profile data

### Step 2: Check Environment Variables

**Frontend Environment Variable:**
```
VITE_API_URL = https://your-backend-url.onrender.com/api
```

**IMPORTANT:** 
- Must include `/api` at the end
- Must be HTTPS (not HTTP)
- Must NOT have trailing slash after `/api`

**Example:**
```
✅ CORRECT: https://portfolio-backend-abc.onrender.com/api
❌ WRONG: https://portfolio-backend-abc.onrender.com/api/
❌ WRONG: https://portfolio-backend-abc.onrender.com
❌ WRONG: http://portfolio-backend-abc.onrender.com/api
```

### Step 3: Rebuild Frontend

After setting environment variable:
1. Go to Render dashboard
2. Click your frontend service
3. Click "Manual Deploy"
4. Select "Clear build cache & deploy"
5. Wait for build to complete

### Step 4: Check Browser Console

1. Open your frontend URL
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Look for errors

**Common Errors:**

**Error: "Failed to fetch"**
- Backend is sleeping (free tier)
- Wait 30-60 seconds and refresh
- Or backend URL is wrong

**Error: "CORS policy"**
- Backend CORS not configured (already fixed in code)
- Or wrong backend URL

**Error: "404 Not Found"**
- API endpoint doesn't exist
- Or VITE_API_URL is wrong

### Step 5: Check Network Tab

1. Press F12 → Network tab
2. Reload page
3. Look for API calls
4. Check if they're going to correct URL

**What to look for:**
- Request URL should be: `https://your-backend.onrender.com/api/profile`
- Status should be: 200 (or 401 for protected routes)
- If status is 0 or failed: Backend is down or URL is wrong

### Step 6: Test Backend Directly

Open these URLs in browser:

```
https://your-backend.onrender.com/api/profile
https://your-backend.onrender.com/api/skills
https://your-backend.onrender.com/api/experience
```

Should return JSON data (or empty arrays).

### Step 7: Check Backend Logs

1. Go to Render dashboard
2. Click backend service
3. Click "Logs" tab
4. Look for errors

**Common Issues:**
- MongoDB connection failed
- Missing environment variables
- Port binding errors

## Quick Fix Checklist

- [ ] Backend URL is correct and includes `/api`
- [ ] Backend is running (visit URL directly)
- [ ] Frontend environment variable is set
- [ ] Frontend was rebuilt after setting env var
- [ ] No CORS errors in console
- [ ] MongoDB is connected (check backend logs)

## Manual Test

### Test Backend:
```bash
# In terminal or browser
curl https://your-backend.onrender.com/api/profile
```

Should return: `[]` or profile data

### Test Frontend API Config:
1. Open frontend in browser
2. Open Console (F12)
3. Type:
```javascript
console.log(import.meta.env.VITE_API_URL)
```
4. Should show: `https://your-backend.onrender.com/api`

## Common Solutions

### Solution 1: Environment Variable Not Set
1. Go to Render → Frontend service → Environment
2. Add: `VITE_API_URL` = `https://your-backend.onrender.com/api`
3. Redeploy

### Solution 2: Backend Sleeping
- Free tier spins down after 15 min
- First request takes 30-60 seconds
- Just wait and refresh

### Solution 3: Wrong URL Format
Make sure:
- HTTPS (not HTTP)
- Includes `/api`
- No trailing slash
- Correct domain

### Solution 4: CORS Issue
Backend should have:
```javascript
app.use(cors());
```
(Already in code)

### Solution 5: MongoDB Not Connected
1. Check backend logs
2. Verify MONGODB_URI is correct
3. Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)

## Still Not Working?

### Debug Mode

Add this to `src/config/api.js` temporarily:

```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('API_URL:', API_URL); // Add this line

export const api = {
  get: async (endpoint) => {
    console.log('Fetching:', `${API_URL}${endpoint}`); // Add this line
    // ... rest of code
  }
}
```

This will show in console what URL it's trying to fetch.

### Check Build Output

In Render build logs, look for:
```
VITE_API_URL: https://your-backend.onrender.com/api
```

If not shown, environment variable wasn't set during build.

## Contact Support

If still not working, provide:
1. Frontend URL
2. Backend URL
3. Browser console errors (screenshot)
4. Network tab screenshot
5. Backend logs

## Working Example

**Backend URL:** `https://portfolio-backend-abc.onrender.com`
**Frontend Env:** `VITE_API_URL=https://portfolio-backend-abc.onrender.com/api`
**Test:** Visit `https://portfolio-backend-abc.onrender.com/api/profile`
**Result:** Should see `[]` or data

If this works, frontend should work too!
