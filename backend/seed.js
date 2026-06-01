const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');
const Category = require('./models/Category');
require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ai_store');

    // Clear existing data
    await User.deleteMany();
    await Product.deleteMany();
    await Category.deleteMany();

    // 1. Create Admin
    const admin = await User.create({
      name: 'System Admin',
      email: 'admin@aistore.com',
      password: 'adminpassword123',
      role: 'admin'
    });
    console.log('Admin user created');

    // 2. Create Categories
    const categories = await Category.insertMany([
      { name: 'Electronics', description: 'Gadgets and hardware' },
      { name: 'Fashion', description: 'Trendy apparel' },
      { name: 'Home', description: 'Smart home essentials' }
    ]);

    // 3. Create Products
    const products = await Product.insertMany([
      {
        name: 'AI Smart Watch',
        price: 299,
        category: 'Electronics',
        brand: 'NeuralTech',
        stock: 15,
        rating: 4.8,
        images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500']
      },
      {
        name: 'Quantum Headphones',
        price: 199,
        category: 'Electronics',
        brand: 'SonicAI',
        stock: 20,
        rating: 4.9,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500']
      },
      {
        name: 'Modern Silk Blazer',
        price: 150,
        category: 'Fashion',
        brand: 'LuxeAI',
        stock: 8,
        rating: 4.5,
        images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500']
      },
      {
        name: 'Smart Ambient Lamp',
        price: 89,
        category: 'Home',
        brand: 'GlowLogic',
        stock: 30,
        rating: 4.7,
        images: ['https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500']
      }
    ]);
    console.log('Products seeded');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();
