const express = require('express');
const router = express.Router();
const {
  getPromotions,
  getAllPromotionsAdmin,
  createPromotion,
  updatePromotion,
  deletePromotion,
} = require('../controllers/promotionController');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.get('/', getPromotions);
router.get('/admin', requireAuth, requireRole('ADMIN', 'STAFF'), getAllPromotionsAdmin);
router.post('/', requireAuth, requireRole('ADMIN'), createPromotion);
router.put('/:id', requireAuth, requireRole('ADMIN'), updatePromotion);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deletePromotion);

module.exports = router;
