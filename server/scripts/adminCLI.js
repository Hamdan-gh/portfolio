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

const showMenu = () => {
  console.clear();
  console.log('╔════════════════════════════════════════╗');
  console.log('║     Portfolio Admin Management CLI     ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log('1. Create new admin user');
  console.log('2. List all admin users');
  console.log('3. Change admin password');
  console.log('4. Delete admin user');
  console.log('5. Exit');
  console.log('');
};

const createAdmin = async () => {
  console.log('\n=== Create New Admin User ===\n');

  const email = await question('Email: ');
  const password = await question('Password: ');
  const confirmPassword = await question('Confirm password: ');

  if (!email || !password) {
    console.log('\n❌ Email and password are required');
    return false;
  }

  if (password !== confirmPassword) {
    console.log('\n❌ Passwords do not match');
    return false;
  }

  if (password.length < 6) {
    console.log('\n❌ Password must be at least 6 characters');
    return false;
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log('\n❌ User with this email already exists');
    return false;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = new User({ email, password: hashedPassword, role: 'admin' });
  await admin.save();

  console.log('\n✅ Admin user created successfully!');
  console.log('📧 Email:', email);
  return true;
};

const listAdmins = async () => {
  console.log('\n=== Admin Users ===\n');

  const users = await User.find().select('-password');
  
  if (users.length === 0) {
    console.log('No admin users found.');
  } else {
    users.forEach((user, index) => {
      console.log(`${index + 1}. 📧 ${user.email}`);
      console.log(`   👤 Role: ${user.role}`);
      console.log(`   📅 Created: ${user.createdAt.toLocaleString()}`);
      console.log('');
    });
  }
  return true;
};

const changePassword = async () => {
  console.log('\n=== Change Admin Password ===\n');

  const email = await question('Email: ');
  const newPassword = await question('New password: ');
  const confirmPassword = await question('Confirm password: ');

  if (!email || !newPassword) {
    console.log('\n❌ Email and password are required');
    return false;
  }

  if (newPassword !== confirmPassword) {
    console.log('\n❌ Passwords do not match');
    return false;
  }

  if (newPassword.length < 6) {
    console.log('\n❌ Password must be at least 6 characters');
    return false;
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log('\n❌ User not found');
    return false;
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();

  console.log('\n✅ Password changed successfully!');
  console.log('📧 Email:', email);
  return true;
};

const deleteAdmin = async () => {
  console.log('\n=== Delete Admin User ===\n');

  const email = await question('Email to delete: ');

  if (!email) {
    console.log('\n❌ Email is required');
    return false;
  }

  const user = await User.findOne({ email });
  if (!user) {
    console.log('\n❌ User not found');
    return false;
  }

  const confirm = await question(`\n⚠️  Delete ${email}? (yes/no): `);
  
  if (confirm.toLowerCase() !== 'yes') {
    console.log('\n❌ Deletion cancelled');
    return false;
  }

  await User.deleteOne({ email });
  console.log('\n✅ Admin user deleted successfully');
  return true;
};

const main = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    let running = true;
    
    while (running) {
      showMenu();
      const choice = await question('Select option (1-5): ');
      
      switch (choice) {
        case '1':
          await createAdmin();
          break;
        case '2':
          await listAdmins();
          break;
        case '3':
          await changePassword();
          break;
        case '4':
          await deleteAdmin();
          break;
        case '5':
          console.log('\n👋 Goodbye!\n');
          running = false;
          break;
        default:
          console.log('\n❌ Invalid option');
      }
      
      if (running && choice !== '5') {
        await question('\nPress Enter to continue...');
      }
    }
    
    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
};

main();
