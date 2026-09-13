const express = require('express');
const { listCategories, createCategory, deleteCategory } = require('../controllers/category.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', listCategories);
router.post('/', requireAuth, requireRole('ADMIN'), createCategory);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteCategory);

module.exports = router;
