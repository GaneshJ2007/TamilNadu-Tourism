// ============================================================
// TRAVEL STORE DATA — Tamil Nadu Tourism
// 3 Sections: Travel Essentials | Authentic Local Products | Handicrafts & Cultural Items
// ============================================================

// ─── SECTION 1: TRAVEL ESSENTIALS ───────────────────────────
export const travelEssentials = [
    // Hill Station Gear
    { name: "Camping Tent (4-Person)", price: "₹3,499", image: "https://m.media-amazon.com/images/I/61hnIoEIQqL.jpg", filterTag: "Hill Station", description: "Waterproof double-layer tent perfect for Nilgiris & Kodaikanal" },
    { name: "Trekking Stick (Pair)", price: "₹1,299", image: "https://contents.mediadecathlon.com/p2675313/bb20e7322b0436a16f690cc01dfe82ec/p2675313.jpg", filterTag: "Hill Station", description: "Adjustable carbon-fiber trekking poles for hill trails" },
    { name: "Winter Sweater – Wool", price: "₹899", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcEz1DuKL6YW3TncACBUF1IGMbhxt6ieS1og&s", filterTag: "Hill Station", description: "Warm woollen pullover for Ooty & Kodaikanal winters" },
    { name: "Fleece Jacket", price: "₹1,499", image: "https://m.media-amazon.com/images/I/61naTitt1eL.jpg", filterTag: "Hill Station", description: "Lightweight fleece for chilly mountain mornings" },
    { name: "Binoculars 10x50", price: "₹2,199", image: "https://rukminim2.flixcart.com/image/480/480/xif0q/binocular/binoculars/4/j/l/binoculars-for-long-distance-10x50-binocular-for-adults-wide-eye-original-imagxrhx2wchcygz.jpeg?q=90", filterTag: "Hill Station", description: "Perfect for bird-watching in Valparai & Meghamalai" },
    { name: "Headlamp LED", price: "₹599", image: "https://m.media-amazon.com/images/I/71MbPDvGmML._AC_UF1000,1000_QL80_.jpg", filterTag: "Hill Station", description: "Rechargeable headlamp for night treks" },

    // Beach Gear
    { name: "Waterproof Dry Bag", price: "₹799", image: "https://m.media-amazon.com/images/I/71HwdPhMTOL._AC_UF894,1000_QL80_.jpg", filterTag: "Beach", description: "Keep belongings safe at Marina Beach & Rameshwaram" },
    { name: "Snorkeling Kit", price: "₹1,899", image: "https://m.media-amazon.com/images/I/41KzLRXQmhL._AC_SR290,290_.jpg", filterTag: "Beach", description: "Mask, snorkel & fins for Pamban island waters" },
    { name: "UV Protection Sunglasses", price: "₹499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ_-rdhQbj1V4xNipBLWGM86s924zysm64Hg&s", filterTag: "Beach", description: "Polarized sunglasses for coastal destinations" },
    { name: "Beach Towel – Microfiber", price: "₹599", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8yDAgTFXVxq98dLwfbNxA1Z_h1tvLoa4P4A&s", filterTag: "Beach", description: "Quick-dry travel towel, sand-free fabric" },
    { name: "Reef-safe Sunscreen SPF50", price: "₹449", image: "https://store.magwai.com.ph/cdn/shop/files/MS30_5_2048x.jpg?v=1757555199", filterTag: "Beach", description: "Coral-friendly sunblock for sea adventures" },
    { name: "Waterproof Phone Pouch", price: "₹349", image: "https://m.media-amazon.com/images/I/518llFtx8qS._AC_UF1000,1000_QL80_.jpg", filterTag: "Beach", description: "IPX8 pouch for underwater photos" },

    // Temple Visit Essentials
    { name: "Cotton Dhoti & Angavastram Set", price: "₹699", image: "https://5.imimg.com/data5/SELLER/Default/2024/4/408909577/BP/FU/EN/120579004/dhothi-and-angavastram-set.jpg", filterTag: "Temple Visit", description: "Traditional attire for temple visits in Tamil Nadu" },
    { name: "Saree – Cotton Handloom", price: "₹1,299", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr4fh5J0tM-o2tSbwvrQSTz_L4zeFc9hwRrQ&s", filterTag: "Temple Visit", description: "Elegant cotton saree for spiritual visits" },
    { name: "Pooja Kit Travel Set", price: "₹399", image: "https://www.haridarshan.com/cdn/shop/files/Gift_Box_03.jpg?v=1729163654&width=1445", filterTag: "Temple Visit", description: "Compact pooja essentials — camphor, kumkum, turmeric" },
    { name: "Foldable Umbrella", price: "₹349", image: "https://thegivingtree.in/wp-content/uploads/2025/06/Navy-Blue-19-Inch-Umbrella-01-scaled-1.jpg", filterTag: "Temple Visit", description: "Compact umbrella for temple queues under sun" },
    { name: "Copper Water Bottle", price: "₹549", image: "https://m.media-amazon.com/images/I/81+hcH049WL._AC_UF350,350_QL80_.jpg", filterTag: "Temple Visit", description: "Ayurvedic copper bottle for daily hydration" },
    { name: "Anti-slip Kolhapuri Chappals", price: "₹799", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiNt80J-lesWDX2AwmWgSDxkOZIh0RheHYLg&s", filterTag: "Temple Visit", description: "Easy slip-on footwear for temple visits" },

    // General Travel
    { name: "Travel Backpack 50L", price: "₹2,499", image: "https://m.media-amazon.com/images/I/71rdzjYj3UL._AC_UY1100_.jpg", filterTag: "Hill Station", description: "Ergonomic hiking backpack with rain cover" },
    { name: "Raincoat – Packable", price: "₹699", image: "https://cdn-images.farfetch-contents.com/29/08/03/17/29080317_58258000_600.jpg", filterTag: "Hill Station", description: "Lightweight poncho for monsoon treks" },
    { name: "First Aid Travel Kit", price: "₹499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzDZWC5k_zkchBQND5x6IMe8z2oMNcsSOhaA&s", filterTag: "Hill Station", description: "Compact 60-piece first aid kit for remote trails" },
    { name: "Insulated Water Bottle 1L", price: "₹599", image: "https://theoni.in/cdn/shop/files/Artboard1-4_964aac70-0070-4c16-bcf9-8f2eb62bb1e7.jpg?v=1744883804", filterTag: "Beach", description: "Keeps water cold for 24 hours" },
];

// ─── SECTION 2: AUTHENTIC LOCAL PRODUCTS ─────────────────────
export const authenticLocalProducts = [
    {
        place: "Ooty",
        icon: "🏔️",
        items: [
            { name: "Ooty Homemade Chocolates Assorted Box", price: "₹299", image: "https://static.wixstatic.com/media/cfc884_3d02701393b649ca87de648bee5933a9~mv2.jpeg/v1/fill/w_980,h_483,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/cfc884_3d02701393b649ca87de648bee5933a9~mv2.jpeg", description: "Hand-crafted chocolates from the Nilgiris" },
            { name: "Ooty Varkey Biscuits", price: "₹149", image: "https://nativespecial.com/wp-content/uploads/2019/11/Ooty-Varkey-DP.jpg", description: "Flaky traditional puff biscuits" },
            { name: "Nilgiri Tea – Premium Leaf", price: "₹349", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmQ-IsksZ_roiVQMYt41DIpAJG_6ZaeizAdA&s", description: "Handpicked high-altitude Nilgiri tea leaves" },
            { name: "Eucalyptus Oil – Pure", price: "₹499", image: "https://5.imimg.com/data5/SELLER/Default/2020/11/SN/JN/WI/112695777/eucalyptus-oil.jpg", description: "Therapeutic eucalyptus oil from Nilgiri estates" },
            { name: "Ooty Fruit Jam Set", price: "₹329", image: "https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/64e8744c1902bc0081060449/whatsapp-image-2023-08-25-at-2-48-34-pm.jpeg", description: "Strawberry, plum and mixed fruit jams" },
        ],
    },
    {
        place: "Madurai",
        icon: "🕌",
        items: [
            { name: "Jigarthanda Instant Mix", price: "₹299", image: "https://5.imimg.com/data5/ANDROID/Default/2020/11/WY/DL/MP/41969852/product-jpeg.jpeg", description: "Famous Madurai Jigarthanda — just add milk!" },
            { name: "Madurai Banana Chips", price: "₹199", image: "https://4.imimg.com/data4/YN/GR/ANDROID-69203322/product-500x500.jpeg", description: "Crispy hand-fried banana chips" },
            { name: "Malli Poo Perfume (Jasmine)", price: "₹349", image: "https://rukminim2.flixcart.com/image/300/300/xif0q/attar/b/1/f/madurai-malli-attar-oil-12ml-aqdoff-12-original-imagrypwfpxynsph.jpeg", description: "Pure Madurai jasmine attar perfume" },
            { name: "Srivilliputhur Palkova", price: "₹249", image: "https://www.sridairy.com/cdn/shop/files/SriDairy-Srivilliputhur-Palkova-order.png?v=1762338130&width=1024", description: "Authentic milk-based sweet from Srivilliputhur" },
        ],
    },
    {
        place: "Tirunelveli",
        icon: "🍬",
        items: [
            { name: "Tirunelveli Halwa (Wheat)", price: "₹349", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDbo5Po-8sJVsR8byxK5o-34PHTGZl8jGqtw&s", description: "Legendary Iruttu Kadai-style wheat halwa" },
            { name: "Seepu Seedai Pack", price: "₹199", image: "https://rukminim2.flixcart.com/image/480/640/l02r1jk0/snack-savourie/s/n/p/250-chettinadu-seepu-seedai-250gm-box-1-nativcrush-original-imagbxwxgqzvzysv.jpeg?q=90", description: "Traditional crispy rice snack" },
            { name: "Tirunelveli Mixture", price: "₹179", image: "https://sweetkadai.com/cdn/shop/files/tirunelveli-mixture-3.jpg?v=1754553837", description: "Spicy savory snack mix" },
        ],
    },
    {
        place: "Kumbakonam",
        icon: "☕",
        items: [
            { name: "Kumbakonam Degree Coffee Powder", price: "₹299", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_X-IJTmbL3UCMG9DZfg1AdpBHJiSO7NyEg&s", description: "Authentic filter coffee powder — 80:20 blend" },
            { name: "Kumbakonam Sweets Assortment", price: "₹449", image: "https://www.murarisweets.com/cdn/shop/files/AssortedBaklavanew.webp?crop=center&height=2048&v=1759486987&width=2048", description: "Temple town's finest traditional sweets" },
        ],
    },
    {
        place: "Thanjavur",
        icon: "🏛️",
        items: [
            { name: "Thanjavur Jhangiri Box", price: "₹249", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSehscTA4TJEYIemjbBUrkxEg0krv3ooWv3tQ&s", description: "Spiral jalebi-style sweet from Big Temple city" },
            { name: "Adai Lehiyam (Herbal Jam)", price: "₹199", image: "https://trihealthayurveda.com/cdn/shop/collections/Vidaryadi-Lehyam.jpg?v=1643931056", description: "Traditional Siddha herbal supplement" },
        ],
    },
    {
        place: "Kanyakumari",
        icon: "🌊",
        items: [
            { name: "Kanyakumari Spice Box", price: "₹799", image: "https://www.angroos.com/wp-content/uploads/2025/05/004-60.jpg", description: "Black pepper, cardamom, cloves — fresh from the coast" },
            { name: "Sea Shell Decorative Set", price: "₹299", image: "https://modernquests.com/cdn/shop/files/esq-living-decorative-sea-shells-brown-and-white-4.jpg?v=1716109938&width=860", description: "Hand-collected shells from Kanyakumari shore" },
            { name: "Coconut Oil – Cold Pressed", price: "₹249", image: "https://5.imimg.com/data5/SJ/NH/MY-9647778/cold-pressed-coconut-oil-500x500.jpg", description: "Pure virgin coconut oil" },
        ],
    },
    {
        place: "Chettinad",
        icon: "🌶️",
        items: [
            { name: "Chettinad Masala Powder", price: "₹299", image: "https://images.archanaskitchen.com/images/recipes/indian/homemade-masala-powder-chutney-powder-recipes/Chettinad_Spice_Mix_Recipe_Chettinad_Masala_Powder_7_ecabbf97db.jpg", description: "Authentic Chettinad spice blend for curries" },
            { name: "Chettinad Pickles Combo", price: "₹349", image: "https://m.media-amazon.com/images/I/61OLcyqKaRL.jpg", description: "Mango, lemon & chili pickles — traditional recipes" },
            { name: "Chettinad Appalam Pack", price: "₹149", image: "https://m.media-amazon.com/images/I/51Iqtm-Yx0L._AC_UF350,350_QL80_.jpg", description: "Hand-rolled pappadums from Karaikudi" },
        ],
    },
];

// ─── SECTION 3: HANDICRAFTS & CULTURAL ITEMS ────────────────
export const handicraftsAndCulturalItems = [
    {
        place: "Thanjavur",
        icon: "🎨",
        items: [
            { name: "Tanjore Painting – Krishna", price: "₹4,999", image: "https://www.balajitanjoreartgallery.com/images/PicsArt_10-15-09.45.04.jpg16-10-2020-1602870839.jpg", description: "22-carat gold foil Tanjore painting of Lord Krishna" },
            { name: "Tanjore Painting – Lakshmi", price: "₹5,499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSajg_c5AC2yLSy7DBhCH9J__EmpE3M_zVZQw&s", description: "Traditional 12x15 Tanjore painting of Goddess Lakshmi" },
            { name: "Thanjavur Dancing Doll (Pair)", price: "₹1,499", image: "https://www.ikyem.com/cdn/shop/files/KH13124-01.jpg?v=1756818406&width=1200", description: "Iconic bobble-head Raja-Rani dolls" },
            { name: "Thanjavur Art Plate", price: "₹5,499", image: "https://www.gitagged.com/wp-content/uploads/2018/09/GiTAGGED-Nataraja-Tri-Metal-Thanjavur-Art-Plate-Online-1.jpg", description: "Embossed brass plate with temple motifs" },
        ],
    },
    {
        place: "Mahabalipuram",
        icon: "🗿",
        items: [
            { name: "Stone Sculpture – elephant", price: "₹3,999", image: "https://5.imimg.com/data5/IJ/GM/MU/SELLER-90620053/handicraft-1-j-jpg.jpg", description: "Hand-carved granite Nataraja from Mamallapuram artisans" },
            // { name: "Stone Sculpture – Ganesha", price: "₹2,999", image: "https://m.media-amazon.com/images/I/81K8gU8o1gL._SL1500_.jpg", description: "Pallava-style Ganesha carved in soapstone" },
            // { name: "Stone Temple Miniature", price: "₹1,999", image: "https://m.media-amazon.com/images/I/81U8VrxQf8L._SL1500_.jpg", description: "Miniature Shore Temple replica" },
        ],
    },
    {
        place: "Kanchipuram",
        icon: "👘",
        items: [
            { name: "Kanchipuram Silk Saree – Traditional", price: "₹8,999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaVm-oGz_R1yvOO0iOpJLfbV7sKvsjI_jxMQ&s", description: "Pure mulberry silk with zari border — temple design" },
            // { name: "Kanchipuram Silk Saree – Wedding", price: "₹12,999", image: "https://m.media-amazon.com/images/I/81T8zqrHHDL._SL1500_.jpg", description: "Bridal collection — heavy zari & peacock motifs" },
            { name: "Silk Stole – Kanchipuram", price: "₹1,499", image: "https://dzukou.com/cdn/shop/files/dzukou-ecofriendly-silk-stole.jpg?v=1703592380", description: "Lightweight silk stole with traditional patterns" },
        ],
    },
    {
        place: "General Tamil Nadu",
        icon: "🪷",
        items: [
            { name: "Palm Leaf Manuscript Art", price: "₹899", image: "https://upload.wikimedia.org/wikipedia/commons/8/88/Vedas_palm_leaf_manuscript%2C_Tamil_Grantha_Script%2C_Sanskrit%2C_Tamil_Nadu.jpg", description: "Handwritten Tamil script on dried palm leaves" },
            { name: "Brass Kuthu Vilakku (Lamp)", price: "₹1,799", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1ZJtUuKlQ37x1jEOkmLCrHSyjgoeim8ROCA&s", description: "Traditional five-faced brass deepam lamp" },
            { name: "Kolam Stencil Kit", price: "₹349", image: "https://5.imimg.com/data5/ECOM/Default/2024/9/451654205/GX/ON/HY/222077284/whatsappimage2024-09-13at21-59-46.jpg", description: "12-piece kolam rangoli stencil set" },
            { name: "Kalamkari Print Wall Hanging", price: "₹1,299", image: "https://indianfolkart.org/wp-content/uploads/2021/11/Kalamkari-Ketaki-01.jpg", description: "Hand-painted Kalamkari fabric art — mythological scenes" },
            { name: "Temple Bell – Brass", price: "₹699", image: "https://cpimg.tistatic.com/4379395/b/4/brass-temple-bell.jpg", description: "Handcrafted brass pooja bell with chain" },
            { name: "Sandalwood Carved Elephant mini ", price: "₹1,999", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB2gWS24fThEgItDYw9kC5Xs6tKjirmMboQg&s", description: "Fragrant sandalwood elephant figurine" },
            { name: "Terracotta Horse – Aiyanar mini", price: "₹1,499", image: "https://purathanam.com/cdn/shop/articles/3E7E9B88-2EF4-4370-B924-91BE34C97BFB.jpg?v=1681567203", description: "Traditional guardian horse from rural Tamil Nadu" },
            { name: "Bronze Chola Statue", price: "₹3,499", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXoBy7Mmxhaf6UTzMZ8JUYrjQERYd8Sl136g&s", description: "Lost-wax bronze casting in Chola tradition" },
        ],
    },
];

// Helper: Flatten all handicraft items for the "Show All" view
export const allHandicraftItems = handicraftsAndCulturalItems.flatMap(group =>
    group.items.map(item => ({ ...item, place: group.place }))
);

// Helper: Flatten all local food items for search
export const allLocalProducts = authenticLocalProducts.flatMap(group =>
    group.items.map(item => ({ ...item, place: group.place }))
);

// Filter tag options for travel essentials
export const essentialFilterTags = ["All", "Hill Station", "Beach", "Temple Visit"];

// Vendor category options
export const vendorCategories = [
    { value: "travel-essentials", label: "Travel Essentials" },
    { value: "authentic-local-products", label: "Authentic Local Products" },
    { value: "handicrafts-cultural", label: "Handicrafts & Cultural Items" },
];

// Sub-category places for vendor upload
export const vendorPlaces = [
    "Ooty", "Madurai", "Tirunelveli", "Kumbakonam",
    "Thanjavur", "Kanyakumari", "Chettinad",
    "Mahabalipuram", "Kanchipuram", "General Tamil Nadu"
];

export const vendorFilterTags = ["Hill Station", "Beach", "Temple Visit"];