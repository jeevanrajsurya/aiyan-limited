const multer = require('multer');
const path = require('path');
const { uploadDir } = require('../config/storage');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const allowedExtensions = /^\.(jpeg|jpg|png|webp|gif|svg|pdf|doc|docx|mp4|webm|mov|m4v|ogg)$/i;

function fileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.test(ext)) {
    return cb(null, true);
  }
  cb(new Error(`Unsupported file type (${ext || 'unknown'}). Allowed formats: JPG, PNG, WEBP, SVG, MP4, WEBM, MOV, PDF, DOCX`));
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit for high-quality hero videos and images
});

module.exports = upload;
