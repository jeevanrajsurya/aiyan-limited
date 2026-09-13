const express = require('express');
const router = express.Router();
const {
  getFuelPrices,
  getAllFuelPricesAdmin,
  updateFuelPrice,
  createFuelPrice,
  deleteFuelPrice,
} = require('../controllers/fuelController');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.get('/', getFuelPrices);
router.get('/admin', requireAuth, requireRole('ADMIN', 'STAFF'), getAllFuelPricesAdmin);
router.post('/', requireAuth, requireRole('ADMIN'), createFuelPrice);
router.put('/:id', requireAuth, requireRole('ADMIN', 'STAFF'), updateFuelPrice);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteFuelPrice);

module.exports = router;
