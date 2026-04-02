const fs = require('fs');
const path = 'd:/TN/latest/src/data/destinations.js';

const imageMap = {
    "Nilgiris": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Nilgiris_Range_Bokkapuram_Sep22_R16_06380.jpg/1280px-Nilgiris_Range_Bokkapuram_Sep22_R16_06380.jpg",
    "Ooty": "https://images.unsplash.com/photo-1544603372-2bb43c6b2239?q=80&w=2070&auto=format&fit=crop",
    "Mudumalai Tiger Reserve": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Tiger_Drinking_Pond_Mudumalai_Mar21_DSC01310.jpg/1280px-Tiger_Drinking_Pond_Mudumalai_Mar21_DSC01310.jpg",
    "Top Slip": "https://www.easeindiatrip.com/blog/wp-content/uploads/2025/05/Tamil-Nadu-Hill-Stations-02.jpg",
    "Kodaikanal": "https://images.unsplash.com/photo-1590412200988-a43b27b91953?q=80&w=2070&auto=format&fit=crop",
    "Pichavaram Mangroves": "https://upload.wikimedia.org/wikipedia/commons/d/d1/Pichavaram-Pno.png",
    "Vedanthangal Bird Sanctuary": "https://images.unsplash.com/photo-1444464666168-49b6288ee11c?q=80&w=2069&auto=format&fit=crop",
    "Yercaud": "https://images.unsplash.com/photo-1549643425-4b2a4c8449c2?q=80&w=2070&auto=format&fit=crop",
    "Hogenakkal Falls": "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?q=80&w=2070&auto=format&fit=crop",
    "Meenakshi Amman Temple": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80",
    "Velankanni Basilica": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Velankanni_Church_1.jpg/1280px-Velankanni_Church_1.jpg",
    "Palani": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Palani_temple.png/800px-Palani_temple.png",
    "Brihadeeswarar Temple": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Brihadeeswarar_Temple_Thanjavur_1.jpg/1280px-Brihadeeswarar_Temple_Thanjavur_1.jpg",
    "Mahabalipuram": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg/1280px-Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg",
    "Rameswaram": "https://images.unsplash.com/photo-1629858688484-81781498b0f4?q=80&w=1951&auto=format&fit=crop",
    "Kanyakumari": "https://images.unsplash.com/photo-1647425143339-ffcf25211b6d?q=80&w=2070&auto=format&fit=crop",
    "Chettinad": "https://images.unsplash.com/photo-1629217604603-7cb733777596?q=80&w=2070&auto=format&fit=crop",
    "Kancheepuram": "https://images.unsplash.com/photo-1624460594895-3ca321526685?q=80&w=1951&auto=format&fit=crop",
    "Vellore Fort": "https://images.unsplash.com/photo-1605353165275-c93540be6645?q=80&w=2070&auto=format&fit=crop"
};

let content = fs.readFileSync(path, 'utf8');

// replace the image fields for each matching name
for (const [name, url] of Object.entries(imageMap)) {
    // regex to match name: "Name", followed eventually by image: "..."
    // Since objects have name: "Name", image: "..."
    const regex = new RegExp(`(name:\\s*"${name}"\\s*,\\s*image:\\s*")[^"]+(")`, 'g');
    content = content.replace(regex, `$1${url}$2`);
}

fs.writeFileSync(path, content);
console.log("Images updated successfully!");
