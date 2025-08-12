import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix for __dirname and __filename in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.REACT_APP_ENV;

const sourceFile = env === 'production' ? 'robots.prod.txt' : 'robots.dev.txt';
const sourcePath = path.join(__dirname, '..', 'public', sourceFile);
const destinationPath = path.join(__dirname, '..', 'public', 'robots.txt');

try {
  fs.copyFileSync(sourcePath, destinationPath);
  console.log(`✅ Copied ${sourceFile} to robots.txt`);
} catch (err) {
  console.error("❌ Error copying robots.txt:", err);
}
