import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('http://localhost:5000')) {
    console.log(`🔍 Found localhost in: ${filePath}`);
    
    // We replace the strings with dynamic environment variables
    // This allows the code to work both locally and on Vercel
    
    // 1. Handle double quotes: "http://localhost:5000/api..." -> `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api...`
    content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}$1`');
    
    // 2. Handle single quotes: 'http://localhost:5000/api...' -> `${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api...`
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}$1`');
    
    // 3. Handle existing backticks or general replacements
    content = content.replace(/http:\/\/localhost:5000/g, '${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated paths in: ${filePath}`);
  }
}

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      replaceInFile(fullPath);
    }
  }
}

processDirectory(srcDir);
console.log('\n✨ ALL DONE! Every file has been updated to use the Cloud API automatically.');
