# Portfolio Backend - Admin Management

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_random_secret_key_here
PORT=5000
```

3. Make sure MongoDB is running

## Admin User Management

### Interactive CLI (Recommended)

The easiest way to manage admin users:

```bash
npm run admin
```

This opens an interactive menu with all admin management options.

### Individual Commands

```bash
npm run admin:create   # Create new admin user
npm run admin:list     # List all admin users
npm run admin:password # Change admin password
npm run admin:delete   # Delete admin user
```

See `ADMIN_COMMANDS.md` for detailed command reference and examples.

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout (requires auth)

### Data Management (requires authentication)
- `GET /api/:collection` - Get all items from collection
- `POST /api/:collection` - Create new item
- `PUT /api/:collection/:id` - Update item
- `DELETE /api/:collection/:id` - Delete item

### Collections
- profile
- skills
- experience
- leadership
- certificates
- messages

## Security Notes

1. Always use strong passwords (minimum 6 characters, recommended 12+)
2. Keep your `.env` file secure and never commit it
3. Use a strong, random JWT_SECRET
4. Change default credentials immediately after first setup
5. Use HTTPS in production
6. Consider adding rate limiting for production use

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod` or check MongoDB service
- Verify MONGODB_URI in `.env` is correct
- For MongoDB Atlas, ensure IP whitelist is configured

### Admin User Already Exists
- Use `npm run admin:list` to see existing users
- Use `npm run admin:password` to change password
- Use `npm run admin:delete` to remove user before creating new one

### JWT Token Issues
- Make sure JWT_SECRET is set in `.env`
- Token expires after 7 days by default
- Clear browser localStorage and login again
