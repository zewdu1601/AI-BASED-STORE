require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai_store');
    console.log('Connected to MongoDB');
    
    const admin = await User.findOne({ username: 'Admin' });
    if (admin) {
      admin.password = 'admin123';
      await admin.save();
      console.log('Password for user "Admin" has been reset to "admin123"');
    } else {
      console.log('User "Admin" not found. Creating one...');
      await User.create({
        name: 'System Admin',
        username: 'Admin',
        email: 'admin@smartstore.ai',
        password: 'admin123',
        role: 'Admin',
        isActive: true
      });
      console.log('User "Admin" created with password "admin123"');
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

resetAdmin();
