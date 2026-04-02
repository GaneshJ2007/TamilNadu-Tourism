export const districtPlaces = {
    'Ariyalur': [],
    'Chengalpattu': [
        "Covelong Beach",
        "Mahabalipuram",
        "India Seashell Museum",
        "Vedanthangal Bird Sanctuary"
    ],
    'Chennai': [
        "San Thome Basilica",
        "Thousand Lights Mosque",
        "St. Mary's Church",
        "Kapaleeshwarar Temple",
        "Marina Beach",
        "Elliot's Beach"
    ],
    'Coimbatore': [
        "Velliangiri Mountains",
        "Monkey Falls",
        "Siruvani Waterfalls",
        "Patteeswarar Temple",
        "Perur",
        "Isha Yoga Center",
        "Top Slip"
    ],
    'Cuddalore': [
        "Nataraja Temple, Chidambaram"
    ],
    'Dharmapuri': [
        "Hogenakkal Falls"
    ],
    'Dindigul': [
        "Kodaikanal",
        "Palani",
        "Sirumalai",
        "Vattakanal",
        "Silver Cascade Falls",
        "Kuthiraiyar Falls",
        "Bear Shola Falls",
        "Kookal",
        "Perumal Peak",
        "Thalaiyar Falls Trek"
    ],
    'Erode': [
        "Kodumanal"
    ],
    'Kallakurichi': [
        "Kalrayan Hills",
        "Kalvarayan Hills"
    ],
    'Kanchipuram': [
        "Kanchi Kailasanathar Temple",
        "Ekambareswarar Temple",
        "Kancheepuram"
    ],
    'Kanyakumari': [
        "Thirparappu Falls",
        "Kanyakumari",
        "Padmanabhapuram Palace"
    ],
    'Karur': [],
    'Krishnagiri': [],
    'Madurai': [
        "Kutladampatti Falls",
        "Meenakshi Amman Temple",
        "Goripalayam Dargah",
        "Gandhi Memorial Museum"
    ],
    'Mayiladuthurai': [],
    'Nagapattinam': [
        "Velankanni Basilica",
        "Nagore Dargah",
        "Point Calimere Bird Sanctuary"
    ],
    'Namakkal': [
        "Agaya Gangai"
    ],
    'Nilgiris': [
        "Ooty",
        "Nilgiris",
        "Catherine Falls",
        "Pykara Falls",
        "Mudumalai Tiger Reserve",
        "Ebbanad Trek"
    ],
    'Perambalur': [],
    'Pudukkottai': [],
    'Ramanathapuram': [
        "Rameswaram",
        "Ervadi Dargah",
        "Dhanushkodi Beach",
        "Gulf of Mannar Marine National Park"
    ],
    'Ranipet': [],
    'Salem': [
        "Yercaud",
        "Kiliyur Falls"
    ],
    'Sivaganga': [
        "Keeladi"
    ],
    'Tenkasi': [
        "Courtallam Falls",
        "Kumbhavurutty Falls"
    ],
    'Thanjavur': [
        "Brihadeeswarar Temple",
        "Thanjavur Maratha Palace"
    ],
    'Theni': [
        "Bodimettu",
        "Kolukkumalai Trek"
    ],
    'Thoothukudi': [
        "Thiruchendur Murugan Temple",
        "Adichanallu",
        "Sivagalai"
    ],
    'Tiruchirappalli': [
        "Pachamalai Hills",
        "Sri Ranganathaswamy Temple"
    ],
    'Tirunelveli': [
        "Papanasam Temple",
        "Kalakkad Mundanthurai Tiger Reserve",
        "Sengaltheri",
        "Canopy Saddle Trek"
    ],
    'Tirupathur': [],
    'Tiruppur': [
        "Thirumurthi Falls"
    ],
    'Tiruvallur': [],
    'Tiruvannamalai': [
        "Javadi Hills",
        "Parvathamalai",
        "Arunachalesvara Temple"
    ],
    'Tiruvarur': [],
    'Vellore': [
        "Vellore Fort"
    ],
    'Viluppuram': [
        "Gingee Fort"
    ],
    'Virudhunagar': []
};

// Generate an exact mapping for places to easily query their district
export const exactMapping = {};
for (const [district, places] of Object.entries(districtPlaces)) {
    places.forEach(place => {
        exactMapping[place] = district;
    });
}
