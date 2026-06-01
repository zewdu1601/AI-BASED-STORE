const SupportTicket = require('../models/SupportTicket');
const Notification = require('../models/Notification');

// --- CUSTOMER ACTIONS ---
exports.createTicket = async (req, res) => {
  try {
    const { subject, description, category, orderId } = req.body;
    const ticket = await SupportTicket.create({
      customer: req.user._id,
      subject,
      description,
      category,
      orderId
    });

    // Notify Staff
    await Notification.create({
      type: 'System',
      title: 'New Support Ticket',
      message: `Customer ${req.user.name} opened a new ticket: ${subject}`,
      priority: 'Medium',
      metadata: { ticketId: ticket._id }
    });

    res.status(201).json(ticket);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.getMyTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find({ customer: req.user._id }).sort({ updatedAt: -1 });
    res.json(tickets);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

// --- STAFF & ADMIN ACTIONS ---
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await SupportTicket.find()
      .populate('customer', 'name email')
      .populate('assignedTo', 'name')
      .sort({ updatedAt: -1 });
    res.json(tickets);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.respondToTicket = async (req, res) => {
  try {
    const { message } = req.body;
    const ticket = await SupportTicket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.messages.push({
      sender: req.user._id,
      message
    });
    ticket.status = 'In Progress';
    if (!ticket.assignedTo) ticket.assignedTo = req.user._id;
    
    await ticket.save();

    // Notify Customer
    await Notification.create({
      recipient: ticket.customer,
      type: 'System',
      title: 'Support Response',
      message: `Staff has responded to your ticket: ${ticket.subject}`,
      priority: 'Medium',
      metadata: { ticketId: ticket._id }
    });

    res.json(ticket);
  } catch (error) { res.status(500).json({ message: error.message }); }
};

exports.updateTicketStatus = async (req, res) => {
  try {
    const { status, priority } = req.body;
    const ticket = await SupportTicket.findByIdAndUpdate(
      req.params.id, 
      { status, priority }, 
      { new: true }
    );
    res.json(ticket);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
