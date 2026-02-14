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

const changePassword = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    console.log('=== Change Admin Password ===\n');

    const email = await question('Enter admin email: ');
    const newPassword = await question('Enter new password: ');
    const confirmPassword = await question('Confirm new password: ');

    if (!email || !newPassword) {
      console.log('\nError: Email and password are required');
      rl.close();
      process.exit(1);
    }

    if (newPassword !== confirmPassword) {
      console.log('\nError: Passwords do not match');
      rl.close();
      process.exit(1);
    }

    if (newPassword.length < 6) {
      console.log('\nError: Password must be at least 6 characters');
      rl.close();
      process.exit(1);
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('\nError: User not found');
      rl.close();
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    console.log('\n✓ Password changed successfully!');
    console.log('Email:', email);
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\nError:', error.message);
    rl.close();
    process.exit(1);
  }
};

changePassword();
