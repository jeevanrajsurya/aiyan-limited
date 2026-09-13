const path = require('path');
const fs = require('fs');

// Source: repository backend/uploads
const uploadsDir = path.resolve(__dirname, '../uploads');
// Destination: separate bundled-assets directory outside of any persistent volume mount
const bundledDir = path.resolve(__dirname, '../bundled-assets');

/**
 * Recursively copy missing files from source to destination without overwriting or deleting.
 */
function copyMissingFiles(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`[prepare-storage] Source uploads directory not found at: ${src}`);
    return 0;
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  let count = 0;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      count += copyMissingFiles(srcPath, destPath);
    } else if (entry.isFile()) {
      if (!fs.existsSync(destPath)) {
        try {
          fs.copyFileSync(srcPath, destPath, fs.constants.COPYFILE_EXCL);
          count++;
        } catch (err) {
          if (err.code !== 'EEXIST') {
            console.warn(`[prepare-storage] Notice copying ${entry.name}:`, err.message);
          }
        }
      }
    }
  }
  return count;
}

console.log(`[prepare-storage] Preparing separate bundled-assets directory: ${uploadsDir} -> ${bundledDir}`);
const copied = copyMissingFiles(uploadsDir, bundledDir);
console.log(`[prepare-storage] Bundled assets ready (${copied} new files copied).`);
