require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const fixRoles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai_store');
    console.log('Connected to MongoDB');
    
    // Update all 'admin' to 'Admin'
    const result = await User.updateMany({ role: 'admin' }, { role: 'Admin' });
    console.log(`Updated ${result.modifiedCount} users from 'admin' to 'Admin'`);
    
    // Also check for other lowercase roles
    const resultStaff = await User.updateMany({ role: 'sales staff' }, { role: 'Sales Staff' });
    console.log(`Updated ${resultStaff.modifiedCount} users to 'Sales Staff'`);

    const resultSupplier = await User.updateMany({ role: 'supplier' }, { role: 'Supplier' });
    console.log(`Updated ${resultSupplier.modifiedCount} users to 'Supplier'`);

    const resultCustomer = await User.updateMany({ role: 'customer' }, { role: 'Customer' });
    console.log(`Updated ${resultCustomer.modifiedCount} users to 'Customer'`);
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

fixRoles();
