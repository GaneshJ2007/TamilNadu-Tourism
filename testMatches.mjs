import { categories } from './src/data/destinations.js';
const allPlaces = categories.flatMap(cat => cat.data);

const districts = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 
    'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 
    'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 
    'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 
    'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 
    'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 
    'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 
    'Vellore', 'Viluppuram', 'Virudhunagar'
];

let unmapped = [...allPlaces];

districts.forEach(district => {
    const term = district.toLowerCase();
    const matched = allPlaces.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.readmore.toLowerCase().includes(term)
    );
    unmapped = unmapped.filter(p => !matched.includes(p));
    if (matched.length > 0) {
        console.log(`[${district}]: ${matched.map(m => m.name).join(', ')}`);
    } else {
        console.log(`[${district}]: NONE`);
    }
});

console.log("\nUNMAPPED PLACES:");
console.log(unmapped.map(u => u.name).join(', '));
