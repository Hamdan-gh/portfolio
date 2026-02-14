import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import readline from 'readline';
import User from '../models/User.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    console.log('=== Create Admin User ===\n');

    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');
    const confirmPassword = await question('Confirm password: ');

    if (!email || !password) {
      console.log('\nError: Email and password are required');
      rl.close();
      process.exit(1);
    }

    if (password !== confirmPassword) {
      console.log('\nError: Passwords do not match');
      rl.close();
      process.exit(1);
    }

    if (password.length < 6) {
      console.log('\nError: Password must be at least 6 characters');
      rl.close();
      process.exit(1);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('\nError: User with this email already exists');
      rl.close();
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({ email, password: hashedPassword, role: 'admin' });
    await admin.save();

    console.log('\n✓ Admin user created successfully!');
    console.log('Email:', email);
    console.log('\nYou can now login with these credentials.');
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\nError:', error.message);
    rl.close();
    process.exit(1);
  }
};

createAdmin();
