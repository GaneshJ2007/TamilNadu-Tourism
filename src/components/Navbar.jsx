import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import nilgiriTrain from "../assets/nilgiri_train.png";

const Navbar = ({ onLogout }) => {
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);

        const googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
                const targetDiv = document.getElementById("google_translate_element");
                if (targetDiv && !targetDiv.hasChildNodes()) {
                    new window.google.translate.TranslateElement(
                        {
                            pageLanguage: "en",
                            autoDisplay: false
                        },
                        "google_translate_element"
                    );

                    // Custom hack to reorder the dropdown and bring Tamil to the top
                    let attempts = 0;
                    const checkInterval = setInterval(() => {
                        attempts++;
                        const select = document.querySelector('.goog-te-combo');
                        if (select && select.options.length > 0) {
                            // Explicitly force the placeholder to say "Select Language"
                            select.options[0].text = "Select Language";
                            
                            const tamilOption = Array.from(select.options).find(opt => opt.value === 'ta');
                            if (tamilOption) {
                                // Move Tamil to index 1 (right below the placeholder)
                                select.insertBefore(tamilOption, select.options[1]);
                            }
                            clearInterval(checkInterval);
                        }
                        // To hide google translate text
                        const gtText = document.querySelector('.goog-te-gadget');
                        if (gtText) {
                            gtText.style.fontSize = "0"; // hide text but keep select
                            gtText.style.color = "transparent";
                        }
                        
                        if (attempts > 20) clearInterval(checkInterval); // Stop after 10s
                    }, 500);
                }
            }
        };

        window.googleTranslateElementInit = googleTranslateElementInit;

        let script = document.getElementById("google-translate-script");
        if (!script) {
            script = document.createElement("script");
            script.id = "google-translate-script";
            script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
            script.async = true;
            document.body.appendChild(script);
        } else {
            if (window.google && window.google.translate) {
                googleTranslateElementInit();
            }
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled
                ? "py-3 bg-white/70 backdrop-blur-xl shadow-lg border-b border-white/20 text-slate-800"
                : "py-6 bg-primary text-white shadow-md"
                }`}
        >
            <div className="max-w-[1500px] mx-auto px-8 flex justify-between items-center">
                {/* Logo Area */}
                <Link to="/home" className="group flex flex-col justify-center">
                    <div className="relative inline-block">
                        <h1 className={`text-xl md:text-2xl font-heading font-extrabold tracking-widest transition-colors duration-300 leading-none mb-1 ${scrolled ? 'text-slate-900' : 'text-white drop-shadow-md'}`}>
                            TAMILNADU
                        </h1>
                        <span className={`absolute -bottom-0.5 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full`}></span>
                    </div>
                    <div className={`text-[10px] font-bold tracking-[0.2em] uppercase opacity-90 leading-none ${scrolled ? 'text-slate-500' : 'text-gray-300'}`}>
                        Tourism Dept.
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden lg:flex gap-6 xl:gap-8 items-center relative">
                    {/* Destinations Mega Menu Trigger */}
                    <div className="group h-full flex items-center cursor-pointer">
                        <div className={`font-medium text-sm tracking-wide py-2 flex items-center gap-1 transition-colors duration-300 ${isActive("/destinations") ? "text-accent" : "hover:text-accent"}`}>
                            Destinations
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>

                        {/* Animated Mega Menu */}
                        <div className="absolute top-full left-0 mt-4 w-[900px] bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 opacity-0 invisible translate-y-4 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 border border-white/20 overflow-hidden ring-1 ring-black/5">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 -z-10"></div>

                            <div className="grid grid-cols-[1fr_1fr_1.5fr_1.5fr] gap-8">
                                {/* Column 1: Top Picks */}
                                <div className="pl-6">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">Top Picks</h3>
                                    <ul className="space-y-3">
                                        {[
                                            { name: 'Ooty', path: 'Ooty' },
                                            { name: 'Kodaikanal', path: 'Kodaikanal' },
                                            { name: 'Yercaud', path: 'Yercaud' },
                                            { name: 'Chettinad', path: 'Chettinad' },
                                            { name: 'Rameswaram', path: 'Rameswaram' },
                                            { name: 'Kancheepuram', path: 'Kancheepuram' },
                                            { name: 'Hogenakkal', path: 'Hogenakkal Falls' },
                                            { name: 'Vellore Fort', path: 'Vellore Fort' },
                                            { name: 'Madurai', path: 'Meenakshi Amman Temple' }
                                        ].map((place) => (
                                            <li key={place.name}>
                                                <Link
                                                    to={`/destination/${encodeURIComponent(place.path)}`}
                                                    className="block text-slate-700 hover:text-accent hover:translate-x-2 transition-all duration-300 text-sm font-medium"
                                                >
                                                    {place.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Column 2: Categories */}
                                <div>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 border-b border-slate-100 pb-2">Categories</h3>
                                    <div className="grid grid-cols-1 gap-y-3">
                                        {[
                                            { name: 'Hills & Valleys', id: 'hills' },
                                            { name: 'Sunny Beaches', id: 'beach' },
                                            { name: 'Spiritual', id: 'spiritual' },
                                            { name: 'Wildlife', id: 'wildlife' },
                                            { name: 'Heritage', id: 'heritage' },
                                            { name: 'Waterfalls', id: 'falls' },
                                            { name: 'Trekking', id: 'trekking' },
                                            { name: 'Nature', id: 'nature' }
                                        ].map((category) => (
                                            <Link key={category.name} to={`/category/${category.id}`} className="flex items-center gap-2 group/item">
                                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/item:bg-accent transition-colors"></div>
                                                <span className="text-slate-600 group-hover/item:text-slate-900 transition-colors text-sm">{category.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Column 3: Districts */}
                                <div className="h-[300px] flex flex-col relative group/scroll">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 border-b border-slate-100 pb-2 shrink-0">Districts</h3>
                                    <ul className="space-y-3 overflow-y-auto pr-2 flex-grow scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent pb-6">
                                        {[
                                            'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore', 
                                            'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kanchipuram', 
                                            'Kanyakumari', 'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 
                                            'Nagapattinam', 'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 
                                            'Ramanathapuram', 'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 
                                            'Thanjavur', 'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 
                                            'Tirupathur', 'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 
                                            'Vellore', 'Viluppuram', 'Virudhunagar'
                                        ].sort().map((district, i) => (
                                            <li key={district} style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.03}s both` }}>
                                                <Link
                                                    to={`/district/${encodeURIComponent(district)}`}
                                                    className="block text-slate-700 hover:text-accent hover:translate-x-2 transition-all duration-300 text-sm font-medium"
                                                >
                                                    {district}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                    {/* Animated Scroll Down Indicator */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none flex justify-center items-end pb-1 opacity-100 group-hover/scroll:opacity-0 transition-opacity duration-500">
                                        <div className="flex flex-col items-center animate-bounce text-accent">
                                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">Scroll</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Column 3: Feature */}
                                <Link to="/destination/Ooty" className="relative group/card cursor-pointer block">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl z-10"></div>
                                    <img src={nilgiriTrain} alt="Nilgiri Mountain Railway" className="w-full h-full object-cover rounded-xl transition-transform duration-700 group-hover/card:scale-110" />
                                    <div className="absolute bottom-0 left-0 p-5 z-20 text-white">
                                        <div className="text-xs font-bold text-accent mb-1 uppercase tracking-wider">Heritage</div>
                                        <div className="text-lg font-heading font-bold leading-tight mb-2">Nilgiri Mountain Explorer</div>
                                        <div className="flex items-center gap-2 text-xs font-medium opacity-0 group-hover/card:opacity-100 transform translate-y-2 group-hover/card:translate-y-0 transition-all duration-300">
                                            View Details <span>→</span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {[
                        ...(isActive("/home") ? [] : [{ path: "/home", label: "Home" }]),
                        { path: "/plan-your-trip", label: "Trip Planner" },
                        { path: "/packages", label: "Packages & Hotels" },
                        { path: "/marketplace", label: "Travel Store" },
                        { path: "/gallery", label: "Gallery" },
                        { path: "/events", label: "Events" },
                        { path: "/feedback", label: "Feedback" },
                    ].map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`relative font-medium text-sm tracking-wide py-2 transition-colors duration-300 group ${isActive(item.path) ? "text-accent" : "hover:text-accent"
                                }`}
                        >
                            {item.label}
                            <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ease-out ${isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                                }`}></span>
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    {/* Translate */}
                    <div className="relative flex items-center group">
                        {/* Soft ambient glow effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-violet-500 rounded-full opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300"></div>
                        
                        {/* Premium Glassmorphic Capsule */}
                        <div className={`relative flex items-center gap-1 backdrop-blur-xl border rounded-full px-3 py-1 shadow-lg transition-all duration-300 ${scrolled 
                            ? 'bg-white border-slate-200 text-slate-800 shadow-slate-200/50 hover:border-accent/40' 
                            : 'bg-white/10 border-white/20 text-white shadow-black/20 hover:border-white/40 hover:bg-white/20'
                        }`}>
                            {/* Stylish Language Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            
                            <div id="google_translate_element" className={`translate-widget-container flex items-center ${scrolled ? 'text-slate-800' : 'text-white'}`}></div>
                        </div>
                    </div>

                    {/* Auth Button */}
                    <button onClick={onLogout} className="relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:shadow-indigo-500/40 hover:-translate-y-0.5">
                        <span className="relative z-10 flex items-center gap-2">
                            Logout
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-accent to-orange-500 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
