const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

// Load env vars
dotenv.config({ path: '../.env' });

const mockProducts = [
  {
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    brand: 'AudioTech',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.8,
    numReviews: 124,
    tags: ['headphones', 'audio', 'wireless']
  },
  {
    name: 'Smart Fitness Watch',
    description: 'Track your health, workouts, and receive notifications right on your wrist.',
    price: 149.99,
    category: 'Wearables',
    brand: 'FitGear',
    stock: 120,
    images: ['https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.5,
    numReviews: 89,
    tags: ['watch', 'fitness', 'smartwatch']
  },
  {
    name: 'Ultra HD 4K Monitor',
    description: '27-inch 4K UHD monitor with stunning color accuracy for creators and gamers.',
    price: 399.99,
    category: 'Computers',
    brand: 'VisionTech',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.9,
    numReviews: 45,
    tags: ['monitor', '4k', 'display']
  },
  {
    name: 'Mechanical Gaming Keyboard',
    description: 'RGB backlit mechanical keyboard with tactile switches for fast response.',
    price: 89.99,
    category: 'Gaming',
    brand: 'KeyPro',
    stock: 75,
    images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.7,
    numReviews: 210,
    tags: ['keyboard', 'gaming', 'rgb']
  },
  {
    name: 'Wireless Charging Pad',
    description: 'Fast 15W wireless charger compatible with all Qi-enabled devices.',
    price: 29.99,
    category: 'Accessories',
    brand: 'ChargeFast',
    stock: 200,
    images: ['https://images.unsplash.com/photo-1586953208448-b95a792e3167?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.3,
    numReviews: 67,
    tags: ['charger', 'wireless', 'accessory']
  },
  {
    name: 'Ergonomic Office Chair',
    description: 'Adjustable mesh office chair with lumbar support for all-day comfort.',
    price: 199.99,
    category: 'Furniture',
    brand: 'ComfortPlus',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.6,
    numReviews: 112,
    tags: ['chair', 'office', 'ergonomic']
  },
  {
    name: 'Portable SSD 1TB',
    description: 'Ultra-fast NVMe portable solid state drive with USB-C connection.',
    price: 129.99,
    category: 'Storage',
    brand: 'DataDrive',
    stock: 85,
    images: ['https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.8,
    numReviews: 340,
    tags: ['ssd', 'storage', 'usb-c']
  },
  {
    name: 'Smart Home Security Camera',
    description: '1080p indoor Wi-Fi camera with night vision and two-way audio.',
    price: 59.99,
    category: 'Smart Home',
    brand: 'SecureCam',
    stock: 150,
    images: ['https://images.unsplash.com/photo-1557438159-51eec7a6c9e8?auto=format&fit=crop&q=80&w=400'],
    ratings: 4.4,
    numReviews: 95,
    tags: ['camera', 'security', 'smart home']
  }
];

const seedProducts = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/ai_store', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected');

    // Optionally clear existing products
    // await Product.deleteMany({});
    // console.log('Products cleared');

    await Product.insertMany(mockProducts);
    console.log(`${mockProducts.length} Products added successfully!`);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedProducts();
