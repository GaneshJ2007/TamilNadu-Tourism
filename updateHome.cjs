const fs = require('fs');
const file = 'd:/TN/latest/src/Home.jsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace('import CuisineCard from "./components/CuisineCard";', 'import CuisineCard from "./components/CuisineCard";\nimport { categories } from "./data/destinations";');
const regex = /\/\/ Curated Categories Data[\s\S]*?const categories = \[[\s\S]*?\];/;
content = content.replace(regex, '// Categories imported from data/destinations.js');
fs.writeFileSync(file, content);
console.log("Updated Home.jsx successfully.");
