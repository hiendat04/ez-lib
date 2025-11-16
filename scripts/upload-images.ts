import { put } from '@vercel/blob';
import fs from 'fs/promises';
import path from 'path';
import 'dotenv/config'; 

// This script will upload all files from a local directory to Vercel Blob.

async function main() {
  const imageDir = path.join(process.cwd(), 'seed-images');
  console.log(`Looking for images in: ${imageDir}`);

  try {
    const filenames = await fs.readdir(imageDir);
    if (filenames.length === 0) {
      console.log('No images found in the directory.');
      return;
    }

    console.log(`Found ${filenames.length} images. Starting upload...`);
    const results: { filename: string; url: string }[] = [];

    for (const filename of filenames) {
      const filePath = path.join(imageDir, filename);
      const fileBuffer = await fs.readFile(filePath);

      console.log(`  Uploading ${filename}...`);

      const blob = await put(
        `book-covers/${filename}`, // A "folder" in the blob store
        fileBuffer,
        {
          access: 'public', // Make them publicly accessible
          addRandomSuffix: false, // Keep the original filename
        }
      );

      results.push({ filename, url: blob.url });
      console.log(`  ... Done. URL: ${blob.url}`);
    }

    console.log('\n--- Upload Complete! ---');
    console.log('You can now use these URLs in your seed.ts file:');

    // Log the results as a JSON object for easy copy-pasting
    const urlMap: Record<string, string> = {};
    results.forEach(r => {
      urlMap[r.filename] = r.url;
    });

    console.log('\n// Copy this map into your seed script:');
    console.log(JSON.stringify(urlMap, null, 2));
    console.log('---');

  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.error(`Error: Directory not found at ${imageDir}. Please create it and add your images.`);
    } else {
      console.error('An error occurred:', error);
    }
    process.exit(1);
  }
}

main();