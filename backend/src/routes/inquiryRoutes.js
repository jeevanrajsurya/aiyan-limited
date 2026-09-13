const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiriesAdmin,
  updateInquiryStatus,
  deleteInquiry,
} = require('../controllers/inquiryController');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.post('/', createInquiry);
router.get('/admin', requireAuth, requireRole('ADMIN', 'STAFF'), getInquiriesAdmin);
router.put('/:id/status', requireAuth, requireRole('ADMIN', 'STAFF'), updateInquiryStatus);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteInquiry);

module.exports = router;
