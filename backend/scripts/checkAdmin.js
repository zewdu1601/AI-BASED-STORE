const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ username: 'Admin' });
    if (user) {
      console.log('User found:', user.username, 'Role:', user.role);
    } else {
      console.log('User NOT found');
    }
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkAdmin();
