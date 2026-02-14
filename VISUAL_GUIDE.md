# Visual Setup Guide - Admin Login Creation

## 🎬 Step-by-Step Visual Walkthrough

### Step 1: Open Terminal in Project Root

```
📁 your-portfolio/
   ├── 📁 server/
   ├── 📁 src/
   ├── 📄 package.json
   └── 📄 README.md
```

### Step 2: Navigate to Server Folder

```bash
cd server
```

Your terminal should show:
```
C:\Users\YourName\portfolio\server>
```

### Step 3: Run Admin CLI

```bash
npm run admin
```

### Step 4: You'll See This Menu

```
╔════════════════════════════════════════╗
║     Portfolio Admin Management CLI     ║
╚════════════════════════════════════════╝

1. Create new admin user
2. List all admin users
3. Change admin password
4. Delete admin user
5. Exit

Select option (1-5): _
```

### Step 5: Type `1` and Press Enter

```
Select option (1-5): 1

=== Create New Admin User ===

Email: _
```

### Step 6: Enter Your Email

```
Email: admin@myportfolio.com
Password: _
```

### Step 7: Enter Your Password

```
Email: admin@myportfolio.com
Password: ********
Confirm password: _
```

**Note:** Password must be at least 6 characters

### Step 8: Confirm Password

```
Email: admin@myportfolio.com
Password: ********
Confirm password: ********

✅ Admin user created successfully!
📧 Email: admin@myportfolio.com

Press Enter to continue...
```

### Step 9: Press Enter to Return to Menu

You're back at the main menu. You can:
- Create more users (option 1)
- List all users (option 2)
- Exit (option 5)

### Step 10: Exit the CLI

```
Select option (1-5): 5

👋 Goodbye!
```

## 🎯 What You Just Created

```
┌─────────────────────────────────────┐
│         MongoDB Database            │
│                                     │
│  Collection: users                  │
│  ┌───────────────────────────────┐ │
│  │ Email: admin@myportfolio.com  │ │
│  │ Password: [encrypted]         │ │
│  │ Role: admin                   │ │
│  │ Created: 2/14/2026 10:30 AM   │ │
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 🚀 Now Start Your Application

### Terminal 1 - Backend

```bash
cd server
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB connected
```

### Terminal 2 - Frontend

Open a NEW terminal window:

```bash
npm run dev
```

You should see:
```
VITE v5.1.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## 🌐 Access Admin Panel

### Step 1: Open Browser

Navigate to: `http://localhost:5173/admin`

### Step 2: You'll See Login Page

```
┌─────────────────────────────────────┐
│                                     │
│         Admin Login                 │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Email                         │ │
│  │ [                           ] │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │ Password                      │ │
│  │ [                           ] │ │
│  └───────────────────────────────┘ │
│                                     │
│  ┌───────────────────────────────┐ │
│  │         Login                 │ │
│  └───────────────────────────────┘ │
│                                     │
└─────────────────────────────────────┘
```

### Step 3: Enter Your Credentials

- Email: `admin@myportfolio.com`
- Password: (the password you created)

### Step 4: Click Login

You'll be redirected to the admin dashboard!

## 🎨 Admin Dashboard Overview

```
┌─────────────────────────────────────────────────────┐
│  Portfolio Admin Dashboard                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📝 Manage Profile                                  │
│  ├─ Edit bio and about section                     │
│  └─ Update personal information                    │
│                                                     │
│  💼 Manage Experience                               │
│  ├─ Add work experience                            │
│  ├─ Edit existing entries                          │
│  └─ Delete entries                                 │
│                                                     │
│  🎯 Manage Skills                                   │
│  ├─ Add new skills                                 │
│  └─ Remove skills                                  │
│                                                     │
│  👔 Manage Leadership                               │
│  ├─ Add leadership roles                           │
│  ├─ Edit existing roles                            │
│  └─ Delete roles                                   │
│                                                     │
│  🏆 Manage Certificates                             │
│  ├─ Add certificates                               │
│  ├─ Update certificate info                        │
│  └─ Delete certificates                            │
│                                                     │
│  📧 View Messages                                   │
│  ├─ View contact form submissions                  │
│  ├─ Mark messages as read                          │
│  └─ Delete messages                                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## 🔄 Creating Multiple Admin Users

Want to add more admins? Easy!

```bash
cd server
npm run admin
```

Then:
1. Select option 1 (Create new admin user)
2. Enter different email: `manager@myportfolio.com`
3. Enter password
4. Confirm password
5. Done! ✅

Repeat for as many admins as you need.

## 📊 Viewing All Admin Users

```bash
cd server
npm run admin:list
```

Output:
```
=== Admin Users ===

1. 📧 admin@myportfolio.com
   👤 Role: admin
   📅 Created: 2/14/2026, 10:30:00 AM

2. 📧 manager@myportfolio.com
   👤 Role: admin
   📅 Created: 2/14/2026, 11:45:00 AM
```

## 🔐 Changing Password

```bash
cd server
npm run admin:password
```

Follow prompts:
```
=== Change Admin Password ===

Email: admin@myportfolio.com
New password: ********
Confirm password: ********

✅ Password changed successfully!
```

## 🗑️ Deleting Admin User

```bash
cd server
npm run admin:delete
```

Follow prompts:
```
=== Delete Admin User ===

Email to delete: old-admin@example.com

⚠️  Delete old-admin@example.com? (yes/no): yes

✅ Admin user deleted successfully
```

## 🎉 You're Done!

You now have:
- ✅ Admin user(s) created
- ✅ Backend running
- ✅ Frontend running
- ✅ Admin panel accessible
- ✅ Full control over your portfolio

## 🆘 Quick Troubleshooting

### Problem: "MongoDB connection error"

**Solution:**
```bash
# Check if MongoDB is running
mongod --version

# If not installed, install MongoDB
# Windows: Download from mongodb.com
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb
```

### Problem: "User already exists"

**Solution:**
```bash
# List existing users
npm run admin:list

# Either use different email or delete existing user
npm run admin:delete
```

### Problem: "Can't login"

**Solutions:**
1. Check backend is running (Terminal 1)
2. Verify email: `npm run admin:list`
3. Reset password: `npm run admin:password`
4. Clear browser cache

### Problem: "Port already in use"

**Solution:**
Edit `server/.env`:
```env
PORT=5001  # Change to different port
```

Then update `.env` in root:
```env
VITE_API_URL=http://localhost:5001/api
```

## 📚 More Resources

- Quick Start: `QUICK_START.md`
- Detailed Setup: `SETUP_GUIDE.md`
- Command Reference: `ADMIN_COMMANDS.md`
- Complete Summary: `ADMIN_SETUP_SUMMARY.md`

---

**Need help?** Check the documentation files or review the setup steps above.
