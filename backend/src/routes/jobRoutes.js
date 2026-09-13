const express = require('express');
const router = express.Router();
const {
  submitApplication,
  getApplicationsAdmin,
  updateApplicationStatus,
  deleteApplication,
} = require('../controllers/jobController');
const upload = require('../middleware/upload.middleware');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.post('/apply', upload.single('resume'), submitApplication);
router.get('/admin', requireAuth, requireRole('ADMIN', 'STAFF'), getApplicationsAdmin);
router.put('/:id/status', requireAuth, requireRole('ADMIN', 'STAFF'), updateApplicationStatus);
router.delete('/:id', requireAuth, requireRole('ADMIN'), deleteApplication);

module.exports = router;
