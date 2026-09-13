const express = require('express');
const router = express.Router();
const {
  subscribeNewsletter,
  getSubmissionsAdmin,
  updateSubmissionStatus,
  deleteSubmission,
} = require('../controllers/newsletterController');
const upload = require('../middleware/upload.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

// Public Subscription Endpoint with optional Resume upload
router.post('/subscribe', upload.single('resume'), subscribeNewsletter);

// Admin Protected Endpoints
router.get('/admin', requireAuth, requireRole('ADMIN', 'STAFF'), getSubmissionsAdmin);
router.put('/:id/status', requireAuth, requireRole('ADMIN', 'STAFF'), updateSubmissionStatus);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteSubmission);

module.exports = router;
