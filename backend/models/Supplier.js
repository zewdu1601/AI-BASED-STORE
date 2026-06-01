const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  contactPerson: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  supplierId: { type: String, unique: true }, // e.g. SUP-1001
  companyName: { type: String },
  companyLogo: { type: String }, // URL or Base64
  companyAddress: { type: String },
  website: { type: String },
  isActive: { type: Boolean, default: true },
  
  // Business Information
  businessLicense: { type: String },
  taxId: { type: String },
  productCategory: { type: String }, // e.g. Electronics, Grocery
  supplyCapacity: { type: String }, // e.g. 5000 units/week
  deliveryRegions: [{ type: String }],

  // Banking Information
  banking: {
    bankName: { type: String },
    accountNumber: { type: String },
    accountHolder: { type: String },
    paymentMethod: { type: String, enum: ['Bank Transfer', 'Credit Card', 'PayPal', 'Wire'], default: 'Bank Transfer' }
  },

  // Documents
  documents: [{
    name: String,
    url: String,
    type: String
  }],

  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  categories: [{ type: String }],
  wholesalePricing: { type: Map, of: Number },
  availableStock: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 0 }
  }],
  contractTerms: { type: String },
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
