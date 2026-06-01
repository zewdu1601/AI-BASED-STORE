const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const AuditLog = require('../models/AuditLog');
const Branch = require('../models/Branch');
const Promotion = require('../models/Promotion');
const PurchaseOrder = require('../models/PurchaseOrder');
const Supplier = require('../models/Supplier');

// Log Audit Action
const logAudit = async (userId, action, resource, details) => {
  await AuditLog.create({ user: userId, action, resource, details });
};

// --- PRODUCT MANAGEMENT ---
exports.approveProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true });
    await logAudit(req.user._id, 'APPROVE_PRODUCT', 'Product', `Approved product: ${product.name}`);
    res.json(product);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.rejectProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true });
    await logAudit(req.user._id, 'REJECT_PRODUCT', 'Product', `Rejected product: ${product.name}`);
    res.json(product);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- USER MANAGEMENT ---
exports.createUser = async (req, res) => {
  try {
    const { 
      name, username, email, password, role, permissions,
      gender, dateOfBirth, homeAddress, nationalId, employeeId,
      department, salary, joiningDate, workShift,
      jobTitle, phone, image, security,
      shippingAddress, billingAddress, preferredDeliveryMethod, deliveryInstructions,
      preferences, adminResponsibilities,
      customerId
    } = req.body;
    
    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      console.log(`Creation failed: User already exists (${email} / ${username})`);
      return res.status(400).json({ message: `User already exists with this ${userExists.email === email ? 'email' : 'username'}` });
    }

    try {
      const user = await User.create({
        name, username, email, password, role, permissions,
        gender, dateOfBirth, homeAddress, nationalId, employeeId,
        department, salary, joiningDate, workShift,
        jobTitle, phone, image, security,
        shippingAddress, billingAddress, preferredDeliveryMethod, deliveryInstructions,
        preferences, adminResponsibilities,
        customerId
      });

      // If role is Supplier, create Supplier Profile
      if (role === 'Supplier') {
        const Supplier = require('../models/Supplier');
        await Supplier.create({
          user: user._id,
          name,
          email,
          phone,
          address: req.body.address || homeAddress,
          supplierId: req.body.supplierId,
          companyName: req.body.companyName,
          companyLogo: image || req.body.companyLogo,
          website: req.body.website,
          businessLicense: req.body.businessLicense,
          taxId: req.body.taxId,
          productCategory: req.body.productCategory,
          supplyCapacity: req.body.supplyCapacity,
          deliveryRegions: req.body.deliveryRegions,
          banking: req.body.banking,
          isActive: true
        });
      }

      await logAudit(req.user._id, 'CREATE_USER', 'User', `Created user: ${email} (Role: ${role})`);
      res.status(201).json(user);
    } catch (createError) {
      console.error('Mongoose Creation Error:', createError);
      res.status(400).json({ message: createError.message });
    }
  } catch (error) { 
    console.error('General CreateUser Error:', error);
    res.status(500).json({ message: error.message }); 
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, username, email, role, permissions } = req.body;
    const user = await User.findById(req.params.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;
    user.permissions = permissions || user.permissions;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    await logAudit(req.user._id, 'UPDATE_USER', 'User', `Updated user: ${updatedUser.email}`);
    res.json(updatedUser);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.isActive = !user.isActive;
    await user.save();
    await logAudit(req.user._id, 'TOGGLE_USER_STATUS', 'User', `Toggled status for: ${user.email} (Active: ${user.isActive})`);
    res.json(user);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.suspendUser = async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    user.isActive = false;
    user.adminResponsibilities = `[SUSPENDED] ${reason || 'No reason provided'}`; // Store suspension reason
    await user.save();
    
    await logAudit(req.user._id, 'SUSPEND_USER', 'User', `Suspended user: ${user.email}. Reason: ${reason}`);
    res.json({ message: 'User account suspended successfully', user });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.sendUserNotification = async (req, res) => {
  try {
    const { userId, title, message, type, priority } = req.body;
    const Notification = require('../models/Notification');
    
    const notification = await Notification.create({
      recipient: userId,
      title,
      message,
      type: type || 'System',
      priority: priority || 'Normal'
    });
    
    await logAudit(req.user._id, 'SEND_NOTIFICATION', 'Notification', `Sent ${type} notification to ${userId}`);
    res.status(201).json(notification);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.resetPassword = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const newPassword = Math.random().toString(36).slice(-8); // Generate random temp password
    user.password = newPassword;
    await user.save();
    
    await logAudit(req.user._id, 'RESET_PASSWORD', 'User', `Reset password for: ${user.email}`);
    res.json({ message: `Password reset successfully. Temporary password: ${newPassword}`, tempPass: newPassword });
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.deleteUser = async (req, res) => {
  try {
    const userToDelete = await User.findById(req.params.id);
    
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Security Rule: Protect the seeded Super Admin account
    if (userToDelete.username === 'Admin' || userToDelete.name === 'Super Admin') {
      return res.status(403).json({ message: 'Security Restriction: The Super Admin account cannot be deleted.' });
    }

    // Security Rule: Admin cannot delete another Admin account
    if (userToDelete.role === 'Admin') {
      return res.status(403).json({ message: 'Security Restriction: Administrators cannot delete other administrator accounts.' });
    }

    await User.findByIdAndDelete(req.params.id);
    await logAudit(req.user._id, 'DELETE_USER', 'User', `Deleted user: ${userToDelete.email} (Role: ${userToDelete.role})`);
    
    res.json({ message: 'User account permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- PROMOTIONS ---
exports.createPromotion = async (req, res) => {
  try {
    const promotion = await Promotion.create(req.body);
    await logAudit(req.user._id, 'CREATE_PROMOTION', 'Promotion', `Created code: ${promotion.code}`);
    res.status(201).json(promotion);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- BRANCHES ---
exports.createBranch = async (req, res) => {
  try {
    const branch = await Branch.create(req.body);
    await logAudit(req.user._id, 'CREATE_BRANCH', 'Branch', `Created branch: ${branch.name}`);
    res.status(201).json(branch);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- PURCHASE ORDERS ---
exports.getPurchaseOrders = async (req, res) => {
  try {
    const pos = await PurchaseOrder.find()
      .populate('supplier', 'name email')
      .populate('items.product', 'name sku')
      .sort({ createdAt: -1 });
    res.json(pos);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.createPurchaseOrder = async (req, res) => {
  try {
    const { supplier, items, totalCost } = req.body;
    const po = await PurchaseOrder.create({
      supplier,
      items,
      totalCost
    });
    
    await logAudit(req.user._id, 'CREATE_PURCHASE_ORDER', 'PurchaseOrder', `Created PO ${po._id} for supplier ${supplier}`);

    // Notify Supplier
    const Notification = require('../models/Notification');
    const SupplierModel = require('../models/Supplier');
    const targetSupplier = await SupplierModel.findById(supplier);
    if (targetSupplier && targetSupplier.user) {
      await Notification.create({
        recipient: targetSupplier.user,
        type: 'Order',
        title: 'New Purchase Request',
        message: `You have received a new purchase order for stock replenishment.`,
        priority: 'Critical',
        metadata: { poId: po._id }
      });
    }

    res.status(201).json(po);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updatePOStatusAdmin = async (req, res) => {
  try {
    const po = await PurchaseOrder.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    await logAudit(req.user._id, 'UPDATE_PO_STATUS', 'PurchaseOrder', `Updated PO ${po._id} to ${po.status}`);
    res.json(po);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- AUDIT LOGS ---
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(logs);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
