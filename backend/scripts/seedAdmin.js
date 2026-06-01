const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const adminData = {
      name: 'Super Admin',
      username: 'Admin',
      email: 'admin@smartstore.ai',
      password: 'admin123',
      role: 'Admin'
    };

    const userExists = await User.findOne({ username: 'Admin' });

    if (userExists) {
      userExists.password = adminData.password;
      await userExists.save();
      console.log('Admin user updated successfully');
    } else {
      await User.create(adminData);
      console.log('Admin user created successfully');
    }

    process.exit();
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
