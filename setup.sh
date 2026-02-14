#!/bin/bash

echo "========================================"
echo "Portfolio Setup Script"
echo "========================================"
echo ""

echo "[1/4] Installing backend dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "Error: Backend installation failed"
    exit 1
fi
echo "Backend dependencies installed!"
echo ""

echo "[2/4] Installing frontend dependencies..."
cd ..
npm install
if [ $? -ne 0 ]; then
    echo "Error: Frontend installation failed"
    exit 1
fi
echo "Frontend dependencies installed!"
echo ""

echo "[3/4] Checking environment files..."
if [ ! -f "server/.env" ]; then
    echo "Creating server/.env from example..."
    cp server/.env.example server/.env
    echo ""
    echo "IMPORTANT: Edit server/.env and set:"
    echo "  - MONGODB_URI"
    echo "  - JWT_SECRET"
    echo ""
fi

if [ ! -f ".env" ]; then
    echo "Creating .env from example..."
    cp .env.example .env
    echo ""
fi

echo "[4/4] Setup complete!"
echo ""
echo "========================================"
echo "Next Steps:"
echo "========================================"
echo ""
echo "1. Edit server/.env with your MongoDB URI and JWT secret"
echo "2. Make sure MongoDB is running"
echo "3. Create admin user:"
echo "   cd server"
echo "   npm run admin:create"
echo ""
echo "4. Start backend (Terminal 1):"
echo "   cd server"
echo "   npm run dev"
echo ""
echo "5. Start frontend (Terminal 2):"
echo "   npm run dev"
echo ""
echo "6. Open http://localhost:5173/admin"
echo ""
echo "See SETUP_GUIDE.md for detailed instructions"
echo "========================================"
