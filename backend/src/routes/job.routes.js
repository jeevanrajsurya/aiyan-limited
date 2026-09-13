const express = require('express');
const { applyForJob, listApplications, updateApplicationStatus } = require('../controllers/job.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');

const router = express.Router();

router.post('/apply', upload.single('resume'), applyForJob);
router.get('/', requireAuth, requireRole('ADMIN'), listApplications);
router.patch('/:id/status', requireAuth, requireRole('ADMIN'), updateApplicationStatus);

module.exports = router;
