const User = require('../models/User');
const Subscriber = require('../models/Subscriber');

// --- PROFILE ---
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate('wishlist');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    user.addresses = req.body.addresses || user.addresses;
    user.preferences = req.body.preferences || user.preferences;
    
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// --- WISHLIST ---
exports.addToWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    if (!user.wishlist.includes(req.body.productId)) {
      user.wishlist.push(req.body.productId);
      await user.save();
    }
    res.json(user.wishlist);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

exports.removeFromWishlist = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
    await user.save();
    res.json(user.wishlist);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// --- NEWSLETTER ---
exports.subscribeUser = async (req, res) => {
  const { email } = req.body;
  try {
    const exists = await Subscriber.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'Already subscribed' });
    }
    await Subscriber.create({ email });
    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
