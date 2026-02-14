import mongoose from 'mongoose';
import dotenv from 'dotenv';
import readline from 'readline';
import User from '../models/User.js';

dotenv.config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const deleteAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const email = await question('Enter admin email to delete: ');

    if (!email) {
      console.log('\nError: Email is required');
      rl.close();
      process.exit(1);
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('\nError: User not found');
      rl.close();
      process.exit(1);
    }

    const confirm = await question(`\nAre you sure you want to delete ${email}? (yes/no): `);
    
    if (confirm.toLowerCase() !== 'yes') {
      console.log('\nDeletion cancelled');
      rl.close();
      process.exit(0);
    }

    await User.deleteOne({ email });
    console.log('\n✓ Admin user deleted successfully');
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\nError:', error.message);
    rl.close();
    process.exit(1);
  }
};

deleteAdmin();
