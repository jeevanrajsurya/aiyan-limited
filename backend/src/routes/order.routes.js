const express = require('express');
const { createOrder, myOrders, allOrders, updateOrderStatus } = require('../controllers/order.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', requireAuth, createOrder);
router.get('/mine', requireAuth, myOrders);
router.get('/', requireAuth, requireRole('ADMIN'), allOrders);
router.patch('/:id/status', requireAuth, requireRole('ADMIN'), updateOrderStatus);

module.exports = router;
