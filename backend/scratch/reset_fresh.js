require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const resetFresh = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai_store');
    console.log('Connected to MongoDB');
    
    // Delete all users with Admin role or username Admin
    const delResult = await User.deleteMany({ $or: [{ role: 'Admin' }, { username: 'Admin' }] });
    console.log(`Deleted ${delResult.deletedCount} existing admin users`);
    
    // Create fresh Super Admin
    const admin = await User.create({
      name: 'Super Admin',
      username: 'Admin',
      email: 'admin@smartstore.ai',
      password: 'admin123',
      role: 'Admin',
      isActive: true,
      permissions: {
        products: true, orders: true, customers: true, inventory: true,
        reports: true, promotions: true, financials: true, analytics: true, settings: true
      }
    });
    
    console.log('Fresh Admin user created with password "admin123"');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetFresh();
