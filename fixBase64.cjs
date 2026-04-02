const fs = require('fs');
let lines = fs.readFileSync('src/data/destinations.js', 'utf8').split('\n');
let fixed = false;
for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('data:image')) {
        let prefix = lines[i].split('data:image')[0];
        lines[i] = prefix + 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Adichanallur_earthenware_burial_urns_8.jpg",';
        fixed = true;
    }
}
if (fixed) {
    fs.writeFileSync('src/data/destinations.js', lines.join('\n'));
    console.log('Fixed base64 images!');
} else {
    console.log('No base64 images found.');
}
