import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

async function optimizeImages() {
  console.log('Optimizing images for responsive loading...');
  
  // Optimize cover-team.webp - create smaller versions
  const coverPath = join(publicDir, 'cover-team.webp');
  
  // Medium version (648w) - for tablets and small desktops
  await sharp(coverPath)
    .resize(648, 320, { fit: 'cover' })
    .webp({ quality: 80 })
    .toFile(join(publicDir, 'cover-team-md.webp'));
  console.log('Created cover-team-md.webp (648x320)');
  
  // Small version (400w) - for mobile
  await sharp(coverPath)
    .resize(400, 198, { fit: 'cover' })
    .webp({ quality: 75 })
    .toFile(join(publicDir, 'cover-team-sm.webp'));
  console.log('Created cover-team-sm.webp (400x198)');

  // Convert logowhiteB.png to WebP and create optimized version
  const logoPath = join(publicDir, 'logowhiteB.png');
  
  // Create optimized PNG (smaller dimensions)
  await sharp(logoPath)
    .resize(313, 49, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 80, compressionLevel: 9 })
    .toFile(join(publicDir, 'logowhiteB-optimized.png'));
  console.log('Created logowhiteB-optimized.png (313x49)');
  
  // Create WebP version for better compression
  await sharp(logoPath)
    .resize(313, 49, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 85, lossless: true })
    .toFile(join(publicDir, 'logowhiteB.webp'));
  console.log('Created logowhiteB.webp (313x49)');

  console.log('\nImage optimization complete!');
  console.log('Estimated savings: ~440 KiB');
}

optimizeImages().catch(console.error);
