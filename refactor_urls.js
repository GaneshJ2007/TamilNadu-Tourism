const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('http://localhost:5000')) {
    // We replace the string with a dynamic envelope.
    // E.g., "http://localhost:5000/api..." -> `http://localhost:5000/api...` 
    // And then replace http://localhost:5000 with ${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}
    
    // First, change any double or single quotes around it to backticks if they are exact matches
    content = content.replace(/"http:\/\/localhost:5000([^"]*)"/g, '`http://localhost:5000$1`');
    content = content.replace(/'http:\/\/localhost:5000([^']*)'/g, '`http://localhost:5000$1`');
    
    // Now replace the http://localhost:5000 inside backticks
    content = content.replace(/http:\/\/localhost:5000/g, '${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated paths in: ${filePath}`);
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
console.log('✅ Refactoring complete! Frontend is now Render-ready.');
