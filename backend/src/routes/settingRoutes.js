const express = require('express');
const router = express.Router();
const { getAllSettings, getSettingByKey, updateSetting } = require('../controllers/settingController');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

router.get('/', getAllSettings);
router.get('/:key', getSettingByKey);
router.put('/:key', requireAuth, requireRole('ADMIN'), updateSetting);

module.exports = router;
