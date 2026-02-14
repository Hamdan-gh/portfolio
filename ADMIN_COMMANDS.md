# Admin User Management - Command Reference

## Quick Command Reference

| Command | Description | Interactive |
|---------|-------------|-------------|
| `npm run admin` | Interactive CLI menu (recommended) | ✅ Yes |
| `npm run admin:create` | Create new admin user | ✅ Yes |
| `npm run admin:list` | List all admin users | ❌ No |
| `npm run admin:password` | Change admin password | ✅ Yes |
| `npm run admin:delete` | Delete admin user | ✅ Yes |

## Interactive CLI Menu

```bash
cd server
npm run admin
```

### Menu Options:
```
╔════════════════════════════════════════╗
║     Portfolio Admin Management CLI     ║
╚════════════════════════════════════════╝

1. Create new admin user
2. List all admin users
3. Change admin password
4. Delete admin user
5. Exit
```

## Command Examples

### Create Admin User

```bash
cd server
npm run admin:create

# You'll be prompted:
Enter admin email: john@example.com
Enter admin password: ********
Confirm password: ********

# Output:
✓ Admin user created successfully!
Email: john@example.com
```

### List All Admins

```bash
cd server
npm run admin:list

# Output:
=== Admin Users ===

1. Email: john@example.com
   Role: admin
   Created: 2/14/2026, 10:30:00 AM

2. Email: jane@example.com
   Role: admin
   Created: 2/14/2026, 11:45:00 AM
```

### Change Password

```bash
cd server
npm run admin:password

# You'll be prompted:
Enter admin email: john@example.com
Enter new password: ********
Confirm new password: ********

# Output:
✓ Password changed successfully!
Email: john@example.com
```

### Delete Admin User

```bash
cd server
npm run admin:delete

# You'll be prompted:
Enter admin email to delete: john@example.com
Are you sure you want to delete john@example.com? (yes/no): yes

# Output:
✓ Admin user deleted successfully
```

## Password Requirements

- Minimum length: 6 characters
- Recommended: 12+ characters
- Use mix of uppercase, lowercase, numbers, and symbols
- Don't use common passwords

## Security Best Practices

### ✅ DO:
- Use strong, unique passwords
- Change default credentials immediately
- Keep JWT_SECRET secure and random
- Use different credentials for production
- Regularly update passwords
- Use HTTPS in production

### ❌ DON'T:
- Use simple passwords like "123456" or "password"
- Share admin credentials
- Commit .env files to git
- Use same password across multiple accounts
- Leave default credentials unchanged

## Troubleshooting

### "MongoDB connection error"
**Solution:** Make sure MongoDB is running
```bash
# Check MongoDB status
mongod --version

# Start MongoDB
mongod
```

### "User already exists"
**Solution:** Use a different email or delete existing user
```bash
npm run admin:list    # Check existing users
npm run admin:delete  # Delete if needed
```

### "Invalid credentials" when logging in
**Solutions:**
1. Verify email is correct: `npm run admin:list`
2. Reset password: `npm run admin:password`
3. Check backend is running
4. Clear browser cache/localStorage

### "JWT_SECRET not set"
**Solution:** Add JWT_SECRET to `server/.env`
```env
JWT_SECRET=your_random_secret_string_here
```

Generate a secure secret:
```bash
# Mac/Linux
openssl rand -base64 32

# Or use any random string (32+ characters recommended)
```

## Multiple Admin Users

You can create multiple admin users for team collaboration:

```bash
# Create first admin
npm run admin:create
# Email: admin1@company.com

# Create second admin
npm run admin:create
# Email: admin2@company.com

# Create third admin
npm run admin:create
# Email: admin3@company.com

# List all admins
npm run admin:list
```

Each admin has full access to:
- Profile management
- Skills management
- Experience management
- Leadership management
- Certificate management
- Message viewing

## Production Deployment

When deploying to production:

1. **Create production admin user:**
   ```bash
   # On production server
   cd server
   npm run admin:create
   ```

2. **Use strong credentials:**
   - Email: Use company email
   - Password: 16+ characters, complex

3. **Secure environment:**
   - Set strong JWT_SECRET
   - Use MongoDB Atlas with IP whitelist
   - Enable HTTPS
   - Set up firewall rules

4. **Delete development users:**
   ```bash
   npm run admin:delete
   # Delete any test/dev accounts
   ```

## API Authentication Flow

```
1. User enters email/password in login form
   ↓
2. Frontend sends POST to /api/auth/login
   ↓
3. Backend verifies credentials against MongoDB
   ↓
4. Backend generates JWT token (expires in 7 days)
   ↓
5. Frontend stores token in localStorage
   ↓
6. Frontend includes token in Authorization header
   ↓
7. Backend validates token for protected routes
```

## Need Help?

- Setup guide: `SETUP_GUIDE.md`
- Quick start: `QUICK_START.md`
- Backend docs: `server/README.md`
- Main docs: `README.md`
