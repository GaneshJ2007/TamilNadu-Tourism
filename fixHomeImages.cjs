const fs = require('fs');
const file = 'd:/TN/latest/src/Home.jsx';
let content = fs.readFileSync(file, 'utf8');

const heroRegex = /const heroImages = \[\s*[\s\S]*?\s*\];/;
const newHeroImages = `const heroImages = [
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80",
  "https://images.unsplash.com/photo-1647425143339-ffcf25211b6d?w=1920&q=80",
  "https://images.unsplash.com/photo-1544603372-2bb43c6b2239?w=1920&q=80",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg/1280px-Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg"
];`;

content = content.replace(heroRegex, newHeroImages);

content = content.replace(/"\/images\/chettinad_chicken_premium\.png"/g, '"https://images.unsplash.com/photo-1626500057088-3ca17822d561?w=800&q=80"');
content = content.replace(/"\/images\/idli\.jpg"/g, '"https://images.unsplash.com/photo-1589301760014-d929f39ce9b0?w=800&q=80"');
content = content.replace(/"\/images\/masala_dosa_premium\.png"/g, '"https://images.unsplash.com/photo-1630405232675-d14fb5f4f839?w=800&q=80"');
content = content.replace(/"\/images\/filter_coffee\.png"/g, '"https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80"');

fs.writeFileSync(file, content);
console.log("Replaced cuisine and hero images in Home.jsx");
