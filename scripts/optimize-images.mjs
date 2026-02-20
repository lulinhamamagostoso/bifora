import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const PUBLIC = './public';

async function convertToWebp(inputPath, outputPath, options = {}) {
  const { width, quality = 80 } = options;
  let pipeline = sharp(inputPath);
  
  if (width) {
    pipeline = pipeline.resize(width);
  }
  
  await pipeline
    .webp({ quality, effort: 6 })
    .toFile(outputPath);
  
  const inputStat = await stat(inputPath);
  const outputStat = await stat(outputPath);
  const savings = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);
  
  console.log(`${inputPath} (${(inputStat.size / 1024).toFixed(1)}KB) -> ${outputPath} (${(outputStat.size / 1024).toFixed(1)}KB) [${savings}% smaller]`);
}

async function main() {
  // Convert cover-team.png - resize to max 800px wide for mobile LCP
  await convertToWebp(
    join(PUBLIC, 'cover-team.png'),
    join(PUBLIC, 'cover-team.webp'),
    { width: 800, quality: 82 }
  );

  // Convert logo
  await convertToWebp(
    join(PUBLIC, 'logowhiteB.png'),
    join(PUBLIC, 'logowhiteB.webp'),
    { quality: 90 }
  );

  // Convert eagle icon
  await convertToWebp(
    join(PUBLIC, 'eagle-icon.png'),
    join(PUBLIC, 'eagle-icon.webp'),
    { width: 40, quality: 90 }
  );

  // Convert favicon 
  await convertToWebp(
    join(PUBLIC, 'favicon.png'),
    join(PUBLIC, 'favicon.webp'),
    { width: 64, quality: 90 }
  );

  console.log('\nAll images converted to WebP!');
}

main().catch(console.error);
