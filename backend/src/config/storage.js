const path = require('path');
const fs = require('fs');

// Determine resolved upload directory (supports absolute path e.g. /app/uploads or relative e.g. uploads)
const rawUploadDir = process.env.UPLOAD_DIR || 'uploads';
const uploadDir = path.isAbsolute(rawUploadDir)
  ? path.normalize(rawUploadDir)
  : path.resolve(__dirname, '../../', rawUploadDir);

// Bundled media source directory (remains outside any persistent volume mount):
// 1. Explicit env override: process.env.BUNDLED_UPLOADS_DIR
// 2. Separate bundled directory created during build: backend/bundled-assets
// 3. Fallback to repo uploads directory: backend/uploads (for local dev)
const candidateBundledDir = process.env.BUNDLED_UPLOADS_DIR
  ? (path.isAbsolute(process.env.BUNDLED_UPLOADS_DIR)
      ? path.normalize(process.env.BUNDLED_UPLOADS_DIR)
      : path.resolve(__dirname, '../../', process.env.BUNDLED_UPLOADS_DIR))
  : path.resolve(__dirname, '../../bundled-assets');

const repoUploadsDir = path.resolve(__dirname, '../../uploads');

const bundledUploadsDir = fs.existsSync(candidateBundledDir)
  ? candidateBundledDir
  : repoUploadsDir;

/**
 * Safely copy missing files from source to destination without overwriting or deleting.
 */
function copyMissingFilesRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyMissingFilesRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      if (!fs.existsSync(destPath)) {
        try {
          fs.copyFileSync(srcPath, destPath, fs.constants.COPYFILE_EXCL);
        } catch (err) {
          if (err.code !== 'EEXIST') {
            console.warn(`[Storage] Notice copying ${entry.name}:`, err.message);
          }
        }
      }
    }
  }
}

/**
 * Initializes storage: ensures uploadDir exists and syncs bundled assets if mounted externally.
 */
function initStorage() {
  try {
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // If uploadDir is a different location than bundledUploadsDir (e.g. Railway Volume mounted at /app/uploads),
    // safely copy bundled seed media so it remains accessible in production
    const normalizedUpload = path.resolve(uploadDir);
    const normalizedBundled = path.resolve(bundledUploadsDir);

    if (normalizedUpload !== normalizedBundled && fs.existsSync(bundledUploadsDir)) {
      console.log(`[Storage] Initializing volume storage from bundled media: ${normalizedBundled} -> ${normalizedUpload}`);
      copyMissingFilesRecursive(bundledUploadsDir, uploadDir);
      console.log(`[Storage] Volume media initialization complete.`);
    } else {
      console.log(`[Storage] Using local upload directory: ${normalizedUpload}`);
    }
  } catch (err) {
    console.error('[Storage] Error initializing storage:', err.message);
  }
}

// Run initialization once on startup
initStorage();

module.exports = {
  uploadDir,
  bundledUploadsDir,
  initStorage,
};
