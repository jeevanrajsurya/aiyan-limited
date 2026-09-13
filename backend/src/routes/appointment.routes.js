const express = require('express');
const {
  createAppointment,
  myAppointments,
  allAppointments,
  updateAppointmentStatus,
} = require('../controllers/appointment.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', requireAuth, createAppointment);
router.get('/mine', requireAuth, myAppointments);
router.get('/', requireAuth, requireRole('ADMIN'), allAppointments);
router.patch('/:id/status', requireAuth, requireRole('ADMIN'), updateAppointmentStatus);

module.exports = router;
