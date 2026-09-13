const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');
const { requireAuth } = require('../middleware/auth.middleware');

router.post('/', requireAuth, (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File is too large. Maximum size allowed is 100MB.' });
      }
      return res.status(400).json({ message: err.message || 'File upload failed' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      url: fileUrl,
      filename: req.file.filename,
      size: req.file.size,
      message: 'File uploaded successfully',
    });
  });
});

module.exports = router;
