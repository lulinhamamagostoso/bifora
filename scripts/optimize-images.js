import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const PUBLIC_DIR = '/vercel/share/v0-project/public';

async function main() {
  const files = await readdir(PUBLIC_DIR);
  const pngs = files.filter(f => f.endsWith('.png'));
  
  console.log(`Found ${pngs.length} PNG files to convert`);
  
  for (const file of pngs) {
    const inputPath = join(PUBLIC_DIR, file);
    const outputPath = join(PUBLIC_DIR, file.replace('.png', '.webp'));
    
    const info = await sharp(inputPath)
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    console.log(`${file} -> ${file.replace('.png', '.webp')} (${Math.round(info.size / 1024)}KB)`);
  }
  
  // Also optimize the cover-team which is the LCP element
  try {
    const coverInfo = await sharp(join(PUBLIC_DIR, 'cover-team.png'))
      .resize(800, undefined, { withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(join(PUBLIC_DIR, 'cover-team-optimized.webp'));
    console.log(`cover-team-optimized.webp (resized 800w): ${Math.round(coverInfo.size / 1024)}KB`);
  } catch (e) {
    console.log('cover-team.png not found, skipping optimized version');
  }
  
  console.log('Done!');
}

main().catch(console.error);
