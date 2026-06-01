require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai_store');
    console.log('Connected to MongoDB');
    
    const users = await User.find({}, 'username email role');
    console.log('Users in Database:');
    console.table(users.map(u => ({ username: u.username, email: u.email, role: u.role })));
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkUsers();
