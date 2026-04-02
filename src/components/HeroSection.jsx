import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories as destinationCategories } from '../data/destinations';

// Build a flat searchable index from destinations + known pages
const buildSearchIndex = () => {
    const items = [];

    // All destinations from destinations.js
    destinationCategories.forEach((cat) => {
        cat.data.forEach((place) => {
            items.push({
                name: place.name,
                type: 'Destination',
                category: cat.title.replace(/^[^\s]+\s/, ''), // Remove emoji prefix
                description: place.description,
                image: place.image,
                route: `/destination/${encodeURIComponent(place.name)}`,
            });
        });
    });

    // Static pages
    const pages = [
        { name: 'Trip Planner', type: 'Page', description: 'Plan your Tamil Nadu trip itinerary', route: '/plan-your-trip', icon: '🗺️' },
        { name: 'Tour Packages', type: 'Page', description: 'Browse curated tour packages', route: '/packages', icon: '📦' },
        { name: 'Travel Store', type: 'Page', description: 'Shop travel essentials, local products & handicrafts', route: '/marketplace', icon: '🛍️' },
        { name: 'Hotels & Stays', type: 'Page', description: 'Find the best hotels and accommodations', route: '/hotels', icon: '🏨' },
        { name: 'Gallery', type: 'Page', description: 'Photo & video gallery of Tamil Nadu', route: '/gallery', icon: '📸' },
        { name: 'Feedback', type: 'Page', description: 'Share your travel experience', route: '/feedback', icon: '💬' },
    ];
    items.push(...pages);

    return items;
};

const searchIndex = buildSearchIndex();

const HeroSection = ({ images }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState(-1);
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setIsLoaded(true);
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClick = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target) &&
                inputRef.current && !inputRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    const handleSearch = (value) => {
        setQuery(value);
        setSelectedIdx(-1);
        if (value.trim().length < 2) {
            setResults([]);
            setShowResults(false);
            return;
        }

        const q = value.toLowerCase();
        const filtered = searchIndex.filter((item) => {
            return (
                item.name.toLowerCase().includes(q) ||
                (item.description && item.description.toLowerCase().includes(q)) ||
                (item.category && item.category.toLowerCase().includes(q)) ||
                (item.type && item.type.toLowerCase().includes(q))
            );
        }).slice(0, 8); // Max 8 results

        setResults(filtered);
        setShowResults(filtered.length > 0);
    };

    const handleSelect = (item) => {
        setQuery('');
        setShowResults(false);
        navigate(item.route);
    };

    const handleKeyDown = (e) => {
        if (!showResults) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIdx((prev) => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (selectedIdx >= 0 && selectedIdx < results.length) {
                handleSelect(results[selectedIdx]);
            } else if (results.length > 0) {
                handleSelect(results[0]);
            }
        } else if (e.key === 'Escape') {
            setShowResults(false);
        }
    };

    const handleExplore = () => {
        if (results.length > 0) {
            handleSelect(results[0]);
        } else if (query.trim()) {
            // Just navigate to the destinations page as fallback
            navigate('/plan-your-trip');
        }
    };

    const typeIcons = {
        Destination: '📍',
        Page: '📄',
    };

    return (
        <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-primary-dark font-sans">
            {/* Immersive Image Slider */}
            {images.map((src, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    <img
                        src={src}
                        alt={`Destination ${i}`}
                        className={`w-full h-full object-cover transition-transform duration-[20s] ease-linear ${i === activeIndex ? 'scale-110' : 'scale-100'
                            }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>
            ))}

            {/* Content Container */}
            <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto flex flex-col items-center">

                {/* Animated Badge */}
                <div className={`mb-6 inline-block opacity-0 ${isLoaded ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.1s' }}>
                    <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-accent-light shadow-glow">
                        Welcome to Paradise
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className={`font-heading text-6xl md:text-8xl lg:text-9xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/80 drop-shadow-2xl leading-tight opacity-0 ${isLoaded ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.3s' }}>
                    VANAKKAM <br />
                    <span className="text-stroke-white text-white">TAMILNADU</span>
                </h1>

                {/* Subheading */}
                <p className={`text-lg md:text-2xl mb-12 font-light text-gray-200 tracking-wide max-w-2xl mx-auto leading-relaxed opacity-0 ${isLoaded ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.5s' }}>
                    Journey through the land of timeless temples, misty hills, and untold stories.
                </p>

                {/* Premium Search Bar */}
                <div className={`w-full max-w-2xl opacity-0 ${isLoaded ? 'animate-fade-in-up' : ''}`} style={{ animationDelay: '0.7s' }}>
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-fuchsia-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full p-2 shadow-2xl transition-all duration-300 hover:bg-white/15">
                            <span className="pl-6 text-2xl">🔍</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => results.length > 0 && setShowResults(true)}
                                placeholder="Search destinations, temples, hill stations..."
                                className="flex-grow bg-transparent border-none px-4 py-4 text-lg text-white outline-none placeholder-gray-300 font-medium"
                            />
                            <button
                                onClick={handleExplore}
                                className="hidden md:block py-3 px-8 rounded-full bg-gradient-to-r from-accent to-accent-hover text-white font-bold tracking-wide shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-accent/50"
                            >
                                EXPLORE
                            </button>
                            <button
                                onClick={handleExplore}
                                className="md:hidden p-4 rounded-full bg-accent text-white shadow-lg"
                            >
                                ➜
                            </button>
                        </div>

                        {/* Search Results Dropdown */}
                        {showResults && (
                            <div
                                ref={dropdownRef}
                                className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-gray-200/80 overflow-hidden z-50 animate-fade-in"
                            >
                                <div className="py-2">
                                    {results.map((item, i) => (
                                        <button
                                            key={`${item.name}-${i}`}
                                            onClick={() => handleSelect(item)}
                                            className={`w-full flex items-center gap-4 px-5 py-3.5 text-left transition-all duration-150 ${selectedIdx === i
                                                    ? 'bg-amber-50 border-l-4 border-amber-500'
                                                    : 'hover:bg-gray-50 border-l-4 border-transparent'
                                                }`}
                                        >
                                            {/* Icon / Image */}
                                            {item.image && item.type === 'Destination' ? (
                                                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow-sm ring-1 ring-gray-200">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => { e.target.src = 'https://placehold.co/48x48/f1f5f9/94a3b8?text=📍'; }}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center text-xl flex-shrink-0 shadow-sm">
                                                    {item.icon || typeIcons[item.type] || '📍'}
                                                </div>
                                            )}

                                            {/* Text */}
                                            <div className="flex-grow min-w-0">
                                                <div className="font-bold text-gray-900 text-sm truncate">
                                                    {item.name}
                                                </div>
                                                <div className="text-xs text-gray-500 truncate mt-0.5">
                                                    {item.description}
                                                </div>
                                            </div>

                                            {/* Badge */}
                                            <span className={`flex-shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${item.type === 'Destination'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                }`}>
                                                {item.type === 'Destination' ? item.category : item.type}
                                            </span>

                                            {/* Arrow */}
                                            <span className="text-gray-300 text-lg flex-shrink-0">→</span>
                                        </button>
                                    ))}
                                </div>
                                <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex items-center justify-between">
                                    <span>↑↓ Navigate · Enter to select · Esc to close</span>
                                    <span className="font-medium text-gray-500">{results.length} result{results.length !== 1 ? 's' : ''}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Slider Indicators */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-500 ease-out ${i === activeIndex ? 'w-12 bg-accent' : 'w-2 bg-white/40 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 right-10 z-20 hidden md:flex flex-col items-center gap-2 opacity-70 animate-bounce">
                <span className="text-xs uppercase tracking-widest text-white/80 writing-mode-vertical">Scroll</span>
                <div className="w-[1px] h-10 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </div>
    );
};

export default HeroSection;
