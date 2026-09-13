const express = require('express');
const router = express.Router();
const {
  getServices,
  getAllServicesAdmin,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require('../controllers/serviceController');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.get('/', getServices);
router.get('/admin', requireAuth, requireRole('ADMIN', 'STAFF'), getAllServicesAdmin);
router.get('/:slug', getServiceBySlug);
router.post('/', requireAuth, requireRole('ADMIN'), createService);
router.put('/:id', requireAuth, requireRole('ADMIN'), updateService);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteService);

module.exports = router;
