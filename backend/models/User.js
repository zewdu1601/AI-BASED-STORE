const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Customer', 'Sales Staff', 'Supplier'], default: 'Customer' },
  jobTitle: { type: String }, 
  phone: { type: String },
  image: { type: String }, // Profile picture
  
  // Personal Info
  gender: { type: String },
  dateOfBirth: { type: Date },
  homeAddress: { type: String },
  nationalId: { type: String },
  employeeId: { type: String },

  // Employment Info
  department: { type: String },
  salary: { type: Number },
  joiningDate: { type: Date },
  workShift: { type: String },
  
  // Documents
  documents: [{
    name: String,
    url: String,
    type: String
  }],

  // Customer Specific
  shippingAddress: { type: String },
  billingAddress: { type: String },
  preferredDeliveryMethod: { type: String, enum: ['Standard', 'Express', 'Pick-up'], default: 'Standard' },
  deliveryInstructions: { type: String },
  
  preferences: {
    favoriteCategories: [{ type: String }],
    preferredPaymentMethod: { type: String },
    notificationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: true },
      newsletter: { type: Boolean, default: false }
    }
  },

  // Admin Specific
  adminResponsibilities: { type: String },

  // Security
  security: {
    twoFactorEnabled: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
    phoneVerified: { type: Boolean, default: false },
    securityQuestions: [{
      question: String,
      answer: String
    }],
    loginRestrictions: {
      startTime: String,
      endTime: String,
      allowedIPs: [String]
    }
  },

  permissions: {
    products: { type: Boolean, default: false },
    orders: { type: Boolean, default: false },
    customers: { type: Boolean, default: false },
    inventory: { type: Boolean, default: false },
    reports: { type: Boolean, default: false },
    promotions: { type: Boolean, default: false },
    financials: { type: Boolean, default: false },
    analytics: { type: Boolean, default: false },
    settings: { type: Boolean, default: false }
  },
  loyaltyPoints: { type: Number, default: 0 },
  customerId: { type: String, unique: true, sparse: true }, // e.g. CUST-5001
  addresses: [{
    street: String,
    city: String,
    state: String,
    zipCode: String,
    isDefault: { type: Boolean, default: false }
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
