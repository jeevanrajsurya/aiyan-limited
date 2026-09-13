const express = require('express');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', listProducts);
router.get('/:id', getProduct);

// Admin only
router.post('/', requireAuth, requireRole('ADMIN'), createProduct);
router.put('/:id', requireAuth, requireRole('ADMIN'), updateProduct);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteProduct);

module.exports = router;
