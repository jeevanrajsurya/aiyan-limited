const express = require('express');
const { sendMessage, listMessages } = require('../controllers/contact.controller');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/', sendMessage);
router.get('/', requireAuth, requireRole('ADMIN'), listMessages);

module.exports = router;
