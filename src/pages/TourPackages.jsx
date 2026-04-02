import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import tourPackages from "../data/tourPackagesData";

const filterTabs = [
    { label: "All Packages", filter: () => true },
    { label: "Short (1–3 Days)", filter: (p) => p.days <= 3 },
    { label: "Medium (4–6 Days)", filter: (p) => p.days >= 4 && p.days <= 6 },
    { label: "Long (7–10 Days)", filter: (p) => p.days >= 7 },
];

const budgetRanges = [
    { label: "All Budgets", min: 0, max: Infinity },
    { label: "Under ₹5,000", min: 0, max: 5000 },
    { label: "₹5,000 – ₹15,000", min: 5000, max: 15000 },
    { label: "₹15,000 – ₹25,000", min: 15000, max: 25000 },
    { label: "₹25,000+", min: 25000, max: Infinity },
];

const TourPackages = () => {
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState(null);
    const [activeFilter, setActiveFilter] = useState(0);
    const [activeBudget, setActiveBudget] = useState(0);
    const [members, setMembers] = useState(1);
    const scrollRef = useRef([]);

    useEffect(() => { window.scrollTo(0, 0); }, [activeView]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("animate-fade-in-up");
                        entry.target.classList.remove("opacity-0", "translate-y-8");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        scrollRef.current.forEach((el) => el && observer.observe(el));
        return () => scrollRef.current.forEach((el) => el && observer.unobserve(el));
    }, [activeView, activeFilter, activeBudget]);

    const addToRefs = (el) => {
        if (el && !scrollRef.current.includes(el)) scrollRef.current.push(el);
    };

    // Calculate dynamic price based on members
    const getGroupPrice = (basePricePerPerson) => {
        // Discount for groups: 1 member = full price, 2-3 = 5% off each, 4-6 = 10% off each, 7+ = 15% off each
        let discount = 0;
        if (members >= 7) discount = 0.15;
        else if (members >= 4) discount = 0.10;
        else if (members >= 2) discount = 0.05;
        const perPerson = Math.round(basePricePerPerson * (1 - discount));
        return { perPerson, total: perPerson * members, discount: Math.round(discount * 100) };
    };

    const filtered = tourPackages
        .filter(filterTabs[activeFilter].filter)
        .filter((p) => {
            const b = budgetRanges[activeBudget];
            return p.price >= b.min && p.price < b.max;
        });

    // Total places and days across filtered packages
    const totalPlaces = [...new Set(filtered.flatMap((p) => p.places))].length;
    const totalDays = filtered.reduce((s, p) => s + p.days, 0);

    // ——————————————— LANDING VIEW ———————————————
    if (activeView === null) {
        return (
            <div className="min-h-screen bg-slate-50">
                {/* Hero */}
                <div className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://commons.wikimedia.org/wiki/Special:FilePath/Pamban-bridge.JPG?width=2048"
                            alt="Tamil Nadu Tourism"
                            className="w-full h-full object-cover animate-zoom-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-50"></div>
                    </div>
                    <div className="relative z-10 text-center px-6 max-w-4xl">
                        <span className="inline-block px-4 py-1.5 bg-accent/20 backdrop-blur-md text-accent font-bold text-xs tracking-[0.2em] uppercase rounded-full mb-6 border border-accent/30">
                            Explore Tamil Nadu
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white drop-shadow-xl leading-tight mb-4">
                            Packages & Hotels
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
                            Choose your perfect Tamil Nadu experience — curated tour packages or find the ideal hotel across all districts.
                        </p>
                    </div>
                </div>

                {/* Two Option Cards */}
                <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20 pb-24">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Tour Packages Card */}
                        <button
                            onClick={() => { scrollRef.current = []; setActiveView("packages"); }}
                            className="group relative rounded-3xl overflow-hidden h-[400px] cursor-pointer text-left shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2"
                        >
                            <img
                                src="https://commons.wikimedia.org/wiki/Special:FilePath/Ooty_Lake_view.jpg?width=1024"
                                alt="Tour Packages"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm bg-white/5 border-t border-white/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">🗺️</span>
                                    <h2 className="text-3xl font-heading font-extrabold text-white">Tour Packages</h2>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    Explore 1 to 10-day curated packages with places, activities, stays, and transparent pricing.
                                </p>
                                <div className="flex items-center gap-2 text-accent font-bold text-sm tracking-wide">
                                    Explore Packages
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </button>

                        {/* Hotels Card */}
                        <button
                            onClick={() => navigate("/hotels")}
                            className="group relative rounded-3xl overflow-hidden h-[400px] cursor-pointer text-left shadow-2xl hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-2"
                        >
                            <img
                                src="https://commons.wikimedia.org/wiki/Special:FilePath/ITC_GRAND_CHOLA_HOTEL_in_Chennai_-_panoramio_(8).jpg?width=1024"
                                alt="Hotels"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-8 backdrop-blur-sm bg-white/5 border-t border-white/10">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-3xl">🏨</span>
                                    <h2 className="text-3xl font-heading font-extrabold text-white">Hotels</h2>
                                </div>
                                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                    Browse hotels across all Tamil Nadu districts — search by district, famous places, and find the perfect stay.
                                </p>
                                <div className="flex items-center gap-2 text-accent font-bold text-sm tracking-wide">
                                    Find Hotels
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ——————————————— PACKAGES VIEW ———————————————
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-slate-800 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <button
                        onClick={() => { scrollRef.current = []; setActiveView(null); }}
                        className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6 text-sm font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back to Packages & Hotels
                    </button>
                    <span className="text-accent font-bold text-xs tracking-[0.2em] uppercase">Curated Experiences</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mt-2 mb-4">Tour Packages</h1>
                    <p className="text-gray-300 text-lg max-w-2xl">From single-day temple trails to grand 10-day odysseys — choose a package that matches your time and spirit.</p>
                </div>
            </div>

            {/* Sticky Toolbar */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    {/* Members Selector */}
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-4">
                        <div className="flex items-center gap-3 bg-gradient-to-r from-primary-dark to-primary rounded-xl px-5 py-3 shadow-md">
                            <span className="text-white text-sm font-bold whitespace-nowrap">👥 Members:</span>
                            <button
                                onClick={() => setMembers(Math.max(1, members - 1))}
                                className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white font-bold text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                            >−</button>
                            <span className="text-white font-extrabold text-xl min-w-[2rem] text-center">{members}</span>
                            <button
                                onClick={() => setMembers(Math.min(20, members + 1))}
                                className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 text-white font-bold text-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                            >+</button>
                            {members >= 2 && (
                                <span className="ml-2 px-2.5 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full border border-green-400/30">
                                    {getGroupPrice(10000).discount}% Group Discount
                                </span>
                            )}
                        </div>
                        {/* Quick stats */}
                        <div className="flex flex-wrap gap-3 ml-auto">
                            <div className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                📦 <span className="text-primary-dark">{filtered.length}</span> Packages
                            </div>
                            <div className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                📍 <span className="text-secondary">{totalPlaces}</span> Places
                            </div>
                            <div className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-bold text-slate-700 flex items-center gap-1.5">
                                📅 <span className="text-accent">{totalDays}</span> Total Days
                            </div>
                        </div>
                    </div>

                    {/* Duration Filters */}
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-2">Duration:</span>
                        {filterTabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => { scrollRef.current = []; setActiveFilter(i); }}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${activeFilter === i
                                    ? "bg-gradient-to-r from-accent to-amber-500 text-white shadow-md shadow-accent/30"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Budget Filters */}
                    <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider self-center mr-2">Budget:</span>
                        {budgetRanges.map((range, i) => (
                            <button
                                key={i}
                                onClick={() => { scrollRef.current = []; setActiveBudget(i); }}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${activeBudget === i
                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-500/30"
                                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
                                    }`}
                            >
                                {range.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Package Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 py-10 pb-24">
                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <span className="text-5xl mb-4 block">🔍</span>
                        <h3 className="text-xl font-heading font-bold text-slate-800 mb-2">No packages match your filters</h3>
                        <p className="text-slate-500">Try adjusting the duration or budget filter.</p>
                    </div>
                )}

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((pkg, i) => {
                        const gp = getGroupPrice(pkg.price);
                        return (
                            <div
                                key={pkg.id}
                                ref={addToRefs}
                                className="opacity-0 translate-y-8 transition-all duration-700"
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                <div
                                    onClick={() => navigate(`/packages/${pkg.id}`)}
                                    className="group relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 cursor-pointer hover:-translate-y-2 border border-slate-100"
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        {/* Day badge */}
                                        <div className="absolute top-4 left-4 bg-accent text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            {pkg.days} {pkg.days === 1 ? "Day" : "Days"}
                                        </div>
                                        {/* Places count badge */}
                                        <div className="absolute top-4 right-4 bg-secondary/90 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                                            📍 {pkg.places.length} Places
                                        </div>
                                        {/* Group discount badge */}
                                        {gp.discount > 0 && (
                                            <div className="absolute bottom-14 left-4 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                                                {gp.discount}% Group Save
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="text-lg font-heading font-bold text-slate-900 mb-3 group-hover:text-accent transition-colors">
                                            {pkg.title}
                                        </h3>

                                        {/* Places preview */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            {pkg.places.slice(0, 3).map((place, j) => (
                                                <span key={j} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md font-medium">
                                                    📍 {place}
                                                </span>
                                            ))}
                                            {pkg.places.length > 3 && (
                                                <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-md font-bold">
                                                    +{pkg.places.length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        {/* Info Tags */}
                                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
                                            <span className="flex items-center gap-1">🎯 {pkg.activities.length} Activities</span>
                                            <span className="flex items-center gap-1">🏨 {pkg.days > 1 ? `${pkg.days - 1}N Stay` : "Day Trip"}</span>
                                            <span className="flex items-center gap-1">👥 {members} {members === 1 ? "person" : "people"}</span>
                                        </div>

                                        {/* Pricing section */}
                                        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <span className="text-xs text-slate-400 block">Per person</span>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-heading font-extrabold text-primary-dark">₹{gp.perPerson.toLocaleString()}</span>
                                                        {gp.discount > 0 && (
                                                            <span className="text-xs text-slate-400 line-through">₹{pkg.price.toLocaleString()}</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs text-slate-400 block">Total ({members} {members === 1 ? "person" : "people"})</span>
                                                    <span className="text-lg font-heading font-extrabold text-green-600">₹{gp.total.toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* View Details */}
                                        <div className="flex items-center gap-2 text-accent font-bold text-sm mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            View Full Itinerary
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default TourPackages;
