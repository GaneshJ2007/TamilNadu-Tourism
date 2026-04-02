const tourPackages = [
    {
        id: 1, days: 1, title: "Madurai Temple Trail", price: 2499,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi_Amman_Temple%2C_Madurai.jpg?width=1024",
        places: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal", "Gandhi Memorial Museum"],
        activities: ["Temple Darshan", "Heritage Walk", "Local Street Food Tour"],
        stay: "No overnight stay (day trip)",
        highlights: "Explore the iconic Meenakshi Amman Temple and indulge in authentic Madurai cuisine."
    },
    {
        id: 2, days: 2, title: "Mahabalipuram & Pondicherry Escape", price: 5999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Shore_Temple,_Mahabalipuram_(Front_View).jpg?width=1024",
        places: ["Shore Temple", "Pancha Rathas", "Auroville", "Promenade Beach", "French Quarter"],
        activities: ["Rock-Cut Temple Tour", "Beach Cycling", "French Quarter Walk", "Auroville Meditation"],
        stay: "1 Night in beachfront boutique hotel, Pondicherry",
        highlights: "Discover Pallava monuments at Mahabalipuram and the French charm of Pondicherry."
    },
    {
        id: 3, days: 3, title: "Ooty & Coonoor Hill Retreat", price: 8999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Ooty_Lake_view.jpg?width=1024",
        places: ["Ooty Lake", "Botanical Garden", "Doddabetta Peak", "Sim's Park Coonoor", "Tea Museum"],
        activities: ["Nilgiri Mountain Railway Ride", "Boating", "Tea Plantation Walk", "Nature Photography"],
        stay: "2 Nights in colonial heritage cottage near Ooty Lake",
        highlights: "Ride the UNESCO Nilgiri Mountain Railway, visit tea estates, and enjoy cool mountain air."
    },
    {
        id: 4, days: 4, title: "Thanjavur & Trichy Heritage Circuit", price: 11499,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Brihadeeswarar_Temple_Picture_1.jpg?width=1024",
        places: ["Brihadeeswarar Temple", "Thanjavur Palace", "Rockfort Temple", "Srirangam Temple"],
        activities: ["Chola Architecture Tour", "Bronze Casting Workshop", "Classical Music Evening"],
        stay: "3 Nights in heritage hotels (Thanjavur & Trichy)",
        highlights: "Walk through 1000-year-old Chola temples and experience traditional bronze casting."
    },
    {
        id: 5, days: 5, title: "Kodaikanal Green Trail", price: 14999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Kodaikanal_Lake_Panorama_(Princess_of_Hill_stations),_Tamil_Nadu,_India.jpg?width=1024",
        places: ["Kodai Lake", "Pillar Rocks", "Coaker's Walk", "Silver Cascade Falls", "Berijam Lake"],
        activities: ["Trekking to Dolphin's Nose", "Star Gazing", "Cycling", "Campfire Night"],
        stay: "4 Nights in lakeside resort with mountain views",
        highlights: "Trek pine forests, star-gaze from 7000ft, and cycle around the star-shaped lake."
    },
    {
        id: 6, days: 6, title: "Rameswaram & Kanyakumari Pilgrimage", price: 16999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Pamban-bridge.JPG?width=1024",
        places: ["Ramanathaswamy Temple", "Pamban Bridge", "Dhanushkodi", "Vivekananda Rock Memorial", "Thiruvalluvar Statue"],
        activities: ["Holy Dip in 22 Theerthams", "Sunrise at Kanyakumari", "Pamban Bridge Crossing", "Glass-Bottom Boat"],
        stay: "5 Nights — Rameswaram (3N) & Kanyakumari (2N) seaside hotels",
        highlights: "Cross the iconic Pamban Bridge and witness the three-ocean confluence at Kanyakumari."
    },
    {
        id: 7, days: 7, title: "Wildlife & Waterfalls Adventure", price: 21999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hogenakkal_Falls_KA.jpg?width=1024",
        places: ["Mudumalai Tiger Reserve", "Hogenakkal Falls", "Top Slip", "Valparai", "Anamalai Tiger Reserve"],
        activities: ["Jeep Safari", "Coracle Ride at Hogenakkal", "Elephant Interaction", "Bird Watching", "Night Safari"],
        stay: "6 Nights in jungle lodges & eco-resorts",
        highlights: "Spot Bengal tigers on safari, ride coracles under waterfalls, and sleep in jungle lodges."
    },
    {
        id: 8, days: 8, title: "Chennai to Kumbakonam Temple Run", price: 24999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Hindu_temple_kumbakonam.jpg?width=1024",
        places: ["Kapaleeshwarar Temple", "Marina Beach", "Chidambaram Nataraja Temple", "Kumbakonam Temples", "Pichavaram Mangroves"],
        activities: ["Marina Sunrise Walk", "Bharatanatyam Show", "Mangrove Kayaking", "Cooking Class"],
        stay: "7 Nights — Chennai (2N), Chidambaram (2N), Kumbakonam (3N)",
        highlights: "Journey from the capital through ancient temple towns and kayak through mangrove forests."
    },
    {
        id: 9, days: 9, title: "Chettinad & Southern Explorer", price: 28999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Chettinad_Mansion_Kanadukathan.jpg?width=1024",
        places: ["Chettinad Mansions", "Athangudi", "Madurai", "Courtallam Falls", "Thoothukudi"],
        activities: ["Chettinad Cooking Masterclass", "Mansion Heritage Tour", "Tile-Making Workshop", "Seafood Trail"],
        stay: "8 Nights — Chettinad (3N), Madurai (2N), Courtallam (2N), Thoothukudi (1N)",
        highlights: "Stay in palatial Chettinad mansions, learn secret spice recipes, and bathe under waterfalls."
    },
    {
        id: 10, days: 10, title: "Grand Tamil Nadu Odyssey", price: 34999,
        image: "https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi_Amman_West_Tower.jpg?width=1024",
        places: ["Chennai", "Mahabalipuram", "Pondicherry", "Thanjavur", "Madurai", "Rameswaram", "Kanyakumari", "Kodaikanal", "Ooty"],
        activities: ["Marina Sunrise", "Pallava Temple Tour", "French Quarter Cycling", "Chola Heritage Walk", "Nilgiri Train Ride", "Tea Plantation Walk"],
        stay: "9 Nights in premium hotels across 10 cities — heritage stays, beachfront resorts, hill cottages",
        highlights: "The ultimate Tamil Nadu experience — temples to mountains, golden beaches to lush forests."
    }
];

export default tourPackages;
