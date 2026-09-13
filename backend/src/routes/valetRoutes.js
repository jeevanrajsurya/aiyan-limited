const express = require('express');
const router = express.Router();
const {
  createValetBooking,
  getValetBookingsAdmin,
  updateValetBookingStatus,
  deleteValetBooking,
} = require('../controllers/valetController');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.post('/', createValetBooking);
router.get('/admin', requireAuth, requireRole('ADMIN', 'STAFF'), getValetBookingsAdmin);
router.put('/:id/status', requireAuth, requireRole('ADMIN', 'STAFF'), updateValetBookingStatus);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteValetBooking);

module.exports = router;
