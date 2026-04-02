// Hotels Data — All 38 Districts of Tamil Nadu with Famous Places & Hotels
const districtsData = [
    {
        id: "ariyalur", name: "Ariyalur", famousPlaces: [
            {
                name: "Gangaikonda Cholapuram", hotels: [
                    { name: "Hotel Chola Inn", rating: 3.5, priceRange: "₹1,200 - ₹2,800", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4329-222-100", address: "Main Road, Ariyalur" }
                ]
            },
            {
                name: "Keelapalur Jain Temple", hotels: [
                    { name: "Sri Sai Lodge", rating: 3.2, priceRange: "₹800 - ₹1,800", amenities: ["AC Rooms", "Parking"], contact: "+91-4329-221-500", address: "Bus Stand Road, Ariyalur" }
                ]
            }
        ]
    },
    {
        id: "chengalpattu", name: "Chengalpattu", famousPlaces: [
            {
                name: "Mahabalipuram Shore Temple", hotels: [
                    { name: "Radisson Blu Resort Temple Bay", rating: 4.6, priceRange: "₹8,000 - ₹22,000", amenities: ["Pool", "Spa", "WiFi", "Beach Access", "Restaurant"], contact: "+91-44-2744-3636", address: "57 Kovalam Road, Mahabalipuram" },
                    { name: "Chariot Beach Resort", rating: 4.3, priceRange: "₹5,500 - ₹14,000", amenities: ["Pool", "WiFi", "Restaurant", "Beach View", "Gym"], contact: "+91-44-2744-2240", address: "No.33, East Raja Street" }
                ]
            },
            {
                name: "Vedanthangal Bird Sanctuary", hotels: [
                    { name: "TTDC Hotel Tamil Nadu", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["Restaurant", "Parking", "Garden"], contact: "+91-44-2742-0056", address: "Near Sanctuary Gate" }
                ]
            }
        ]
    },
    {
        id: "chennai", name: "Chennai", famousPlaces: [
            {
                name: "Marina Beach", hotels: [
                    { name: "Taj Coromandel", rating: 4.8, priceRange: "₹8,000 - ₹25,000", amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Gym"], contact: "+91-44-6600-2827", address: "37 Mahatma Gandhi Rd, Nungambakkam" },
                    { name: "ITC Grand Chola", rating: 4.9, priceRange: "₹10,000 - ₹35,000", amenities: ["Pool", "Spa", "WiFi", "5 Restaurants", "Gym", "Business Center"], contact: "+91-44-2220-0000", address: "63, Mount Road, Guindy" },
                    { name: "Raintree Hotel", rating: 4.3, priceRange: "₹4,500 - ₹9,000", amenities: ["WiFi", "Restaurant", "Gym", "Parking"], contact: "+91-44-4225-2525", address: "120, St. Mary's Road, Alwarpet" }
                ]
            },
            {
                name: "Kapaleeshwarar Temple", hotels: [
                    { name: "GRT Grand", rating: 4.4, priceRange: "₹5,000 - ₹12,000", amenities: ["WiFi", "Restaurant", "Pool", "Parking"], contact: "+91-44-2815-0500", address: "120, Sir Thyagaraya Road, T. Nagar" },
                    { name: "Ambassador Pallava", rating: 4.1, priceRange: "₹3,500 - ₹8,000", amenities: ["WiFi", "Restaurant", "Gym"], contact: "+91-44-2855-4476", address: "53, Montieth Road, Egmore" }
                ]
            },
            {
                name: "Fort St. George", hotels: [
                    { name: "Hyatt Regency Chennai", rating: 4.7, priceRange: "₹7,000 - ₹20,000", amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Bar"], contact: "+91-44-6100-1234", address: "365, Anna Salai, Teynampet" }
                ]
            }
        ]
    },
    {
        id: "coimbatore", name: "Coimbatore", famousPlaces: [
            {
                name: "Marudhamalai Temple", hotels: [
                    { name: "Le Meridien", rating: 4.7, priceRange: "₹7,000 - ₹18,000", amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Gym"], contact: "+91-422-225-5555", address: "Neelambur, Sanganoor" },
                    { name: "Vivanta Coimbatore", rating: 4.5, priceRange: "₹6,000 - ₹14,000", amenities: ["Pool", "WiFi", "Restaurant", "Gym", "Bar"], contact: "+91-422-669-9999", address: "Race Course Road" }
                ]
            },
            {
                name: "VOC Park & Zoo", hotels: [
                    { name: "Hotel Sri Lakshmi", rating: 3.8, priceRange: "₹1,500 - ₹3,500", amenities: ["WiFi", "Restaurant", "Parking"], contact: "+91-422-239-0736", address: "Town Hall Road" }
                ]
            }
        ]
    },
    {
        id: "cuddalore", name: "Cuddalore", famousPlaces: [
            {
                name: "Pichavaram Mangroves", hotels: [
                    { name: "Hotel Atithi", rating: 3.9, priceRange: "₹2,000 - ₹5,000", amenities: ["WiFi", "Restaurant", "Parking", "AC Rooms"], contact: "+91-4142-238-668", address: "South Archway Road" },
                    { name: "TTDC Resort Pichavaram", rating: 3.6, priceRange: "₹1,500 - ₹3,500", amenities: ["Restaurant", "Boat Access", "Garden"], contact: "+91-4142-237-200", address: "Pichavaram Campus" }
                ]
            },
            {
                name: "Silver Beach", hotels: [
                    { name: "Hotel Mahaal", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4142-238-123", address: "Bazar Street, Cuddalore" }
                ]
            }
        ]
    },
    {
        id: "dharmapuri", name: "Dharmapuri", famousPlaces: [
            {
                name: "Hogenakkal Falls", hotels: [
                    { name: "TTDC Hotel Tamil Nadu", rating: 3.6, priceRange: "₹1,500 - ₹3,500", amenities: ["Restaurant", "Parking", "River View"], contact: "+91-4346-260-023", address: "Near Falls, Hogenakkal" },
                    { name: "Cauvery Guest House", rating: 3.3, priceRange: "₹1,000 - ₹2,500", amenities: ["BB", "Parking", "AC Rooms"], contact: "+91-4346-260-100", address: "Hogenakkal Road" }
                ]
            }
        ]
    },
    {
        id: "dindigul", name: "Dindigul", famousPlaces: [
            {
                name: "Kodaikanal", hotels: [
                    { name: "Carlton Hotel", rating: 4.6, priceRange: "₹7,000 - ₹18,000", amenities: ["Lake View", "Spa", "WiFi", "Restaurant", "Garden"], contact: "+91-4542-240-056", address: "Lake Road, Kodaikanal" },
                    { name: "Hotel Kodai International", rating: 4.0, priceRange: "₹2,500 - ₹6,000", amenities: ["WiFi", "Restaurant", "Parking", "Room Service"], contact: "+91-4542-241-745", address: "Laws Ghat Road" }
                ]
            },
            {
                name: "Dindigul Rock Fort", hotels: [
                    { name: "Hotel Sree Lakshmi", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-451-243-0055", address: "Railway Station Road" }
                ]
            }
        ]
    },
    {
        id: "erode", name: "Erode", famousPlaces: [
            {
                name: "Bhavani Sangameshwarar Temple", hotels: [
                    { name: "Hotel SKR", rating: 3.9, priceRange: "₹2,000 - ₹4,500", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-424-225-6789", address: "EVN Road, Erode" }
                ]
            },
            {
                name: "Bhavanisagar Dam", hotels: [
                    { name: "Hotel JPM Grand", rating: 3.7, priceRange: "₹1,800 - ₹4,000", amenities: ["WiFi", "Restaurant", "Parking"], contact: "+91-424-225-3333", address: "Perundurai Road" }
                ]
            }
        ]
    },
    {
        id: "kallakurichi", name: "Kallakurichi", famousPlaces: [
            {
                name: "Gomukhi Dam", hotels: [
                    { name: "Hotel Indira Inn", rating: 3.3, priceRange: "₹900 - ₹2,200", amenities: ["AC Rooms", "Restaurant"], contact: "+91-4151-220-100", address: "Main Road, Kallakurichi" }
                ]
            }
        ]
    },
    {
        id: "kancheepuram", name: "Kancheepuram", famousPlaces: [
            {
                name: "Ekambareswarar Temple", hotels: [
                    { name: "GRT Regency Kanchipuram", rating: 4.2, priceRange: "₹3,500 - ₹8,000", amenities: ["WiFi", "Restaurant", "Pool", "Parking"], contact: "+91-44-2722-0001", address: "478, Gandhi Road" },
                    { name: "Hotel Baboo Soorya", rating: 3.8, priceRange: "₹1,800 - ₹4,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-44-2722-5556", address: "85, East Raja Street" }
                ]
            },
            {
                name: "Kanchi Kamakshi Temple", hotels: [
                    { name: "Hotel Saravana Bhavan", rating: 3.6, priceRange: "₹1,500 - ₹3,500", amenities: ["WiFi", "Restaurant", "Parking"], contact: "+91-44-2722-4040", address: "Gandhi Road" }
                ]
            }
        ]
    },
    {
        id: "kanyakumari", name: "Kanyakumari", famousPlaces: [
            {
                name: "Vivekananda Rock Memorial", hotels: [
                    { name: "Sparsa Resort", rating: 4.4, priceRange: "₹5,000 - ₹12,000", amenities: ["Pool", "WiFi", "Restaurant", "Sea View", "Garden"], contact: "+91-4652-246-800", address: "East Car Street" },
                    { name: "Hotel Tri Sea", rating: 4.1, priceRange: "₹2,500 - ₹6,000", amenities: ["WiFi", "Restaurant", "Sea View", "Roof Deck"], contact: "+91-4652-246-257", address: "Beach Road" }
                ]
            },
            {
                name: "Thiruvalluvar Statue", hotels: [
                    { name: "Hotel Singaar International", rating: 3.8, priceRange: "₹1,800 - ₹4,500", amenities: ["WiFi", "Restaurant", "Sea View"], contact: "+91-4652-246-351", address: "Main Road" }
                ]
            }
        ]
    },
    {
        id: "karur", name: "Karur", famousPlaces: [
            {
                name: "Pasupathikovil Temple", hotels: [
                    { name: "Hotel Chellam", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4324-241-555", address: "Jawahar Bazaar" }
                ]
            }
        ]
    },
    {
        id: "krishnagiri", name: "Krishnagiri", famousPlaces: [
            {
                name: "Krishnagiri Dam", hotels: [
                    { name: "Hotel Park Residency", rating: 3.6, priceRange: "₹1,500 - ₹3,500", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-4343-233-123", address: "Bangalore Road" }
                ]
            },
            {
                name: "KRP Dam", hotels: [
                    { name: "Hotel GG International", rating: 3.4, priceRange: "₹1,200 - ₹2,800", amenities: ["WiFi", "Restaurant", "Parking"], contact: "+91-4343-232-200", address: "Salem Road" }
                ]
            }
        ]
    },
    {
        id: "madurai", name: "Madurai", famousPlaces: [
            {
                name: "Meenakshi Amman Temple", hotels: [
                    { name: "Heritage Madurai", rating: 4.6, priceRange: "₹6,000 - ₹15,000", amenities: ["Pool", "Spa", "WiFi", "Restaurant", "Garden"], contact: "+91-452-238-5455", address: "11, Melakkal Main Road" },
                    { name: "GRT Regency", rating: 4.2, priceRange: "₹3,000 - ₹7,000", amenities: ["WiFi", "Restaurant", "Gym", "Parking"], contact: "+91-452-237-1551", address: "38 Bypass Road, Pasumalai" }
                ]
            },
            {
                name: "Thirumalai Nayakkar Mahal", hotels: [
                    { name: "Hotel Sangam", rating: 4.0, priceRange: "₹2,500 - ₹6,000", amenities: ["WiFi", "Restaurant", "Room Service", "Parking"], contact: "+91-452-253-7531", address: "Alagarkovil Main Road" }
                ]
            }
        ]
    },
    {
        id: "mayiladuthurai", name: "Mayiladuthurai", famousPlaces: [
            {
                name: "Mayuranathaswamy Temple", hotels: [
                    { name: "Hotel Thirumal", rating: 3.4, priceRange: "₹1,000 - ₹2,500", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4364-222-123", address: "Main Bazaar, Mayiladuthurai" }
                ]
            }
        ]
    },
    {
        id: "nagapattinam", name: "Nagapattinam", famousPlaces: [
            {
                name: "Velankanni Church", hotels: [
                    { name: "Hotel Sea Shore", rating: 3.8, priceRange: "₹1,800 - ₹4,000", amenities: ["WiFi", "Restaurant", "Sea View", "Parking"], contact: "+91-4365-263-444", address: "Beach Road, Velankanni" },
                    { name: "Hotel Land Mark", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4365-262-300", address: "Nagore Road" }
                ]
            }
        ]
    },
    {
        id: "namakkal", name: "Namakkal", famousPlaces: [
            {
                name: "Namakkal Rock Fort", hotels: [
                    { name: "Hotel Aryaa Inn", rating: 3.6, priceRange: "₹1,500 - ₹3,500", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-4286-233-777", address: "Salem Road, Namakkal" }
                ]
            }
        ]
    },
    {
        id: "nilgiris", name: "Nilgiris (Ooty)", famousPlaces: [
            {
                name: "Ooty Lake", hotels: [
                    { name: "Savoy - IHCL", rating: 4.7, priceRange: "₹9,000 - ₹25,000", amenities: ["Heritage Property", "Garden", "WiFi", "Restaurant", "Fireplace"], contact: "+91-423-225-5500", address: "77 Sylks Road" },
                    { name: "Sterling Ooty Elk Hill", rating: 4.3, priceRange: "₹4,000 - ₹10,000", amenities: ["Pool", "WiFi", "Restaurant", "Kids Play"], contact: "+91-423-244-4555", address: "Elk Hill, Ooty" }
                ]
            },
            {
                name: "Botanical Garden", hotels: [
                    { name: "Sinclairs Retreat Ooty", rating: 4.0, priceRange: "₹3,500 - ₹8,000", amenities: ["WiFi", "Restaurant", "Garden View", "Parking"], contact: "+91-423-244-3899", address: "73, Havelock Road" }
                ]
            },
            {
                name: "Doddabetta Peak", hotels: [
                    { name: "Club Mahindra", rating: 4.2, priceRange: "₹5,000 - ₹12,000", amenities: ["Pool", "WiFi", "Restaurant", "Spa", "Trek Assist"], contact: "+91-423-244-6100", address: "Doddabetta Road" }
                ]
            }
        ]
    },
    {
        id: "perambalur", name: "Perambalur", famousPlaces: [
            {
                name: "Ranjankudi Fort", hotels: [
                    { name: "Hotel Sree Kumaran", rating: 3.2, priceRange: "₹800 - ₹2,000", amenities: ["AC Rooms", "Parking"], contact: "+91-4328-222-300", address: "Main Road, Perambalur" }
                ]
            }
        ]
    },
    {
        id: "pudukkottai", name: "Pudukkottai", famousPlaces: [
            {
                name: "Sittanavasal Cave Paintings", hotels: [
                    { name: "Hotel Sathyam", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4322-222-700", address: "East Main Street" }
                ]
            }
        ]
    },
    {
        id: "ramanathapuram", name: "Ramanathapuram", famousPlaces: [
            {
                name: "Ramanathaswamy Temple", hotels: [
                    { name: "Hyatt Place Rameswaram", rating: 4.5, priceRange: "₹5,000 - ₹12,000", amenities: ["Pool", "WiFi", "Restaurant", "Sea View", "Gym"], contact: "+91-4573-223-333", address: "1-B, Pamban Road" },
                    { name: "Daiwik Hotels", rating: 4.3, priceRange: "₹3,500 - ₹8,000", amenities: ["WiFi", "Restaurant", "Temple View", "Parking"], contact: "+91-4573-221-777", address: "7/2A, Rameshwaram" }
                ]
            },
            {
                name: "Pamban Bridge", hotels: [
                    { name: "Hotel Royal Guest House", rating: 3.6, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "Parking"], contact: "+91-4573-221-271", address: "West Car Street" }
                ]
            },
            {
                name: "Dhanushkodi", hotels: [
                    { name: "Hotel Vinayaga", rating: 3.4, priceRange: "₹1,000 - ₹2,500", amenities: ["WiFi", "AC Rooms", "Parking"], contact: "+91-4573-221-500", address: "East Car Street, Rameswaram" }
                ]
            }
        ]
    },
    {
        id: "ranipet", name: "Ranipet", famousPlaces: [
            {
                name: "Arcot Fort", hotels: [
                    { name: "Hotel GRG", rating: 3.4, priceRange: "₹1,200 - ₹2,800", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4172-220-200", address: "Walajah Road, Ranipet" }
                ]
            }
        ]
    },
    {
        id: "salem", name: "Salem", famousPlaces: [
            {
                name: "Yercaud", hotels: [
                    { name: "Sterling Yercaud", rating: 4.3, priceRange: "₹4,500 - ₹10,000", amenities: ["Pool", "WiFi", "Restaurant", "Trek Assistance", "Garden"], contact: "+91-4281-222-257", address: "Forest Hill, Yercaud" },
                    { name: "Hotel GRT Nature Trails", rating: 4.1, priceRange: "₹3,500 - ₹8,000", amenities: ["WiFi", "Restaurant", "Nature Walks", "Parking"], contact: "+91-4281-222-445", address: "Main Road, Yercaud" }
                ]
            },
            {
                name: "Mettur Dam", hotels: [
                    { name: "TTDC Hotel", rating: 3.4, priceRange: "₹1,200 - ₹3,000", amenities: ["Restaurant", "Parking", "Dam View"], contact: "+91-4298-222-120", address: "Dam Site, Mettur" }
                ]
            }
        ]
    },
    {
        id: "sivagangai", name: "Sivagangai", famousPlaces: [
            {
                name: "Chettinad Heritage", hotels: [
                    { name: "The Bangala", rating: 4.7, priceRange: "₹8,000 - ₹15,000", amenities: ["Heritage Stay", "Pool", "WiFi", "Chettinad Cuisine", "Cultural Tours"], contact: "+91-4565-220-221", address: "Devakottai Road, Karaikudi" },
                    { name: "Visalam", rating: 4.5, priceRange: "₹6,000 - ₹12,000", amenities: ["Heritage Property", "Pool", "WiFi", "Restaurant", "Garden"], contact: "+91-4565-273-301", address: "Canadiyan, Karaikudi" }
                ]
            }
        ]
    },
    {
        id: "tenkasi", name: "Tenkasi", famousPlaces: [
            {
                name: "Courtallam Falls", hotels: [
                    { name: "TTDC Hotel Tamil Nadu", rating: 3.6, priceRange: "₹1,200 - ₹3,000", amenities: ["Restaurant", "Parking", "Garden"], contact: "+91-4633-222-843", address: "Near Main Falls" },
                    { name: "Hotel Green Palace", rating: 3.8, priceRange: "₹1,800 - ₹4,000", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-4633-222-555", address: "Falls Road, Courtallam" }
                ]
            }
        ]
    },
    {
        id: "thanjavur", name: "Thanjavur", famousPlaces: [
            {
                name: "Brihadeeswarar Temple", hotels: [
                    { name: "Svatma", rating: 4.8, priceRange: "₹8,000 - ₹20,000", amenities: ["Pool", "Spa", "WiFi", "Heritage Dining", "Cultural Programs"], contact: "+91-4362-273-222", address: "No.4/1422, Trichy Road" },
                    { name: "Hotel Parisutham", rating: 4.1, priceRange: "₹2,500 - ₹6,000", amenities: ["WiFi", "Restaurant", "Parking", "Room Service"], contact: "+91-4362-231-801", address: "55 Grand Anicut Canal Road" }
                ]
            },
            {
                name: "Thanjavur Royal Palace", hotels: [
                    { name: "Hotel Gnanam", rating: 3.9, priceRange: "₹2,000 - ₹5,000", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-4362-278-501", address: "Anna Nagar, Thanjavur" }
                ]
            }
        ]
    },
    {
        id: "theni", name: "Theni", famousPlaces: [
            {
                name: "Meghamalai", hotels: [
                    { name: "Meghamalai Eco Resort", rating: 4.0, priceRange: "₹3,000 - ₹7,000", amenities: ["WiFi", "Restaurant", "Nature Walk", "Mountain View"], contact: "+91-4546-252-300", address: "Meghamalai Hills" }
                ]
            },
            {
                name: "Suruli Falls", hotels: [
                    { name: "Hotel Theni Grand", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4546-252-100", address: "Madurai Road, Theni" }
                ]
            }
        ]
    },
    {
        id: "thoothukudi", name: "Thoothukudi", famousPlaces: [
            {
                name: "Our Lady of Snows Basilica", hotels: [
                    { name: "Hotel Heritage Inn", rating: 4.0, priceRange: "₹2,500 - ₹6,000", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-461-232-3737", address: "Ottapidaram Road" }
                ]
            },
            {
                name: "Tiruchendur Murugan Temple", hotels: [
                    { name: "Hotel Sri Subramanya", rating: 3.6, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "Temple View"], contact: "+91-461-242-3500", address: "Temple Road, Tiruchendur" }
                ]
            }
        ]
    },
    {
        id: "tiruchirappalli", name: "Tiruchirappalli", famousPlaces: [
            {
                name: "Rockfort Temple", hotels: [
                    { name: "Breeze Residency", rating: 4.3, priceRange: "₹4,000 - ₹9,000", amenities: ["Pool", "WiFi", "Restaurant", "Gym", "Bar"], contact: "+91-431-414-1414", address: "14/14, McDonald's Road" },
                    { name: "Sangam Hotel", rating: 4.1, priceRange: "₹3,000 - ₹7,000", amenities: ["Pool", "WiFi", "Restaurant", "Parking"], contact: "+91-431-241-4700", address: "Collector Office Road" }
                ]
            },
            {
                name: "Srirangam Temple", hotels: [
                    { name: "Hotel Mathura", rating: 3.7, priceRange: "₹1,500 - ₹3,500", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-431-246-1737", address: "1 Rockins Road" }
                ]
            }
        ]
    },
    {
        id: "tirunelveli", name: "Tirunelveli", famousPlaces: [
            {
                name: "Nellaiappar Temple", hotels: [
                    { name: "Hotel Aryaas", rating: 4.0, priceRange: "₹2,000 - ₹5,000", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-462-233-9999", address: "Madurai Road" }
                ]
            },
            {
                name: "Manimuthar Dam", hotels: [
                    { name: "Hotel Janakiram", rating: 3.8, priceRange: "₹1,800 - ₹4,000", amenities: ["WiFi", "Restaurant", "Parking"], contact: "+91-462-233-8888", address: "South Bypass Road" }
                ]
            }
        ]
    },
    {
        id: "tirupattur", name: "Tirupattur", famousPlaces: [
            {
                name: "Yelagiri Hills", hotels: [
                    { name: "Sterling Yelagiri", rating: 4.2, priceRange: "₹4,000 - ₹10,000", amenities: ["Pool", "WiFi", "Restaurant", "Trek Assist", "Garden"], contact: "+91-4179-222-600", address: "Nilavoor Road, Yelagiri" },
                    { name: "Hotel Green Valley", rating: 3.7, priceRange: "₹1,800 - ₹4,500", amenities: ["WiFi", "Restaurant", "Hill View", "Parking"], contact: "+91-4179-222-300", address: "Main Road, Yelagiri" }
                ]
            }
        ]
    },
    {
        id: "tirupur", name: "Tirupur", famousPlaces: [
            {
                name: "Amaravathi Dam", hotels: [
                    { name: "Hotel Velan", rating: 3.8, priceRange: "₹2,000 - ₹5,000", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-421-223-3500", address: "Avinashi Road, Tirupur" }
                ]
            }
        ]
    },
    {
        id: "tiruvallur", name: "Tiruvallur", famousPlaces: [
            {
                name: "Pulicat Lake", hotels: [
                    { name: "Hotel Kanchi", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "Parking"], contact: "+91-44-2766-2100", address: "High Road, Tiruvallur" }
                ]
            }
        ]
    },
    {
        id: "tiruvannamalai", name: "Tiruvannamalai", famousPlaces: [
            {
                name: "Arunachaleswarar Temple", hotels: [
                    { name: "Sparsa Tiruvannamalai", rating: 4.3, priceRange: "₹4,000 - ₹10,000", amenities: ["Pool", "WiFi", "Restaurant", "Temple View", "Spa"], contact: "+91-4175-236-999", address: "Chengam Road" },
                    { name: "Hotel Arunachala", rating: 3.8, priceRange: "₹1,800 - ₹4,500", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-4175-222-222", address: "Car Street" }
                ]
            },
            {
                name: "Girivalam Path", hotels: [
                    { name: "Hotel Ramakrishna", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "Temple View"], contact: "+91-4175-222-500", address: "Near Temple, Tiruvannamalai" }
                ]
            }
        ]
    },
    {
        id: "tiruvarur", name: "Tiruvarur", famousPlaces: [
            {
                name: "Thyagaraja Temple", hotels: [
                    { name: "Hotel Vinayaga", rating: 3.4, priceRange: "₹1,000 - ₹2,500", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4366-222-100", address: "South Main Street, Tiruvarur" }
                ]
            }
        ]
    },
    {
        id: "vellore", name: "Vellore", famousPlaces: [
            {
                name: "Vellore Fort", hotels: [
                    { name: "Hotel Darling Residency", rating: 4.0, priceRange: "₹2,500 - ₹6,000", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-416-224-5555", address: "Katpadi Road" },
                    { name: "GRT Regency Vellore", rating: 4.2, priceRange: "₹3,500 - ₹8,000", amenities: ["WiFi", "Restaurant", "Gym", "Pool"], contact: "+91-416-220-0011", address: "Thorapadi" }
                ]
            },
            {
                name: "Golden Temple Sripuram", hotels: [
                    { name: "Hotel Anthea", rating: 3.8, priceRange: "₹1,800 - ₹4,500", amenities: ["WiFi", "Restaurant", "Parking", "Temple Shuttle"], contact: "+91-416-220-5000", address: "Thirupathur Road" }
                ]
            }
        ]
    },
    {
        id: "viluppuram", name: "Viluppuram", famousPlaces: [
            {
                name: "Gingee Fort", hotels: [
                    { name: "Hotel Pondicherry Gate", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms"], contact: "+91-4146-222-300", address: "Tindivanam Road" }
                ]
            }
        ]
    },
    {
        id: "virudhunagar", name: "Virudhunagar", famousPlaces: [
            {
                name: "Srivilliputhur Andal Temple", hotels: [
                    { name: "Hotel Mani Iyer", rating: 3.5, priceRange: "₹1,200 - ₹3,000", amenities: ["WiFi", "Restaurant", "AC Rooms", "Parking"], contact: "+91-4562-260-123", address: "Tower Road, Srivilliputhur" }
                ]
            }
        ]
    }
];

export default districtsData;
