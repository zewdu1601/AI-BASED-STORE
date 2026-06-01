const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { protect, authorize } = require('../middleware/auth');

// Customer Routes
router.post('/', protect, ticketController.createTicket);
router.get('/my-tickets', protect, ticketController.getMyTickets);

// Staff & Admin Routes
router.get('/all', protect, authorize('Sales Staff', 'Admin'), ticketController.getAllTickets);
router.post('/:id/respond', protect, authorize('Sales Staff', 'Admin'), ticketController.respondToTicket);
router.put('/:id/status', protect, authorize('Admin'), ticketController.updateTicketStatus);

module.exports = router;
