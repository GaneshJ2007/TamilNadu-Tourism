import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import districtsData from "../data/hotelsData";

const HotelsExplorer = () => {
    const navigate = useNavigate();
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedPlaceName, setSelectedPlaceName] = useState("");

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const selectedDistrict = districtsData.find((d) => d.id === selectedDistrictId);
    const selectedPlace = selectedDistrict?.famousPlaces.find((p) => p.name === selectedPlaceName);

    // When district changes, reset place
    const handleDistrictChange = (e) => {
        setSelectedDistrictId(e.target.value);
        setSelectedPlaceName("");
    };

    // Star rendering
    const renderStars = (rating) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < full ? "text-amber-400" : i === full && half ? "text-amber-300" : "text-slate-200"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="text-xs text-slate-500 ml-1.5 font-semibold">{rating}</span>
            </div>
        );
    };

    // Get all hotels for a district (across all places)
    const getAllHotelsForDistrict = () => {
        if (!selectedDistrict) return [];
        if (selectedPlaceName) {
            return selectedPlace ? selectedPlace.hotels.map((h) => ({ ...h, placeName: selectedPlace.name })) : [];
        }
        // Show all hotels from all places
        return selectedDistrict.famousPlaces.flatMap((p) =>
            p.hotels.map((h) => ({ ...h, placeName: p.name }))
        );
    };

    const hotelsToShow = getAllHotelsForDistrict();

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <div className="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-slate-800 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <button onClick={() => navigate("/packages")} className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        Back to Packages & Hotels
                    </button>
                    <span className="text-accent font-bold text-xs tracking-[0.2em] uppercase">Find Your Stay</span>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mt-2 mb-4">Hotels Explorer</h1>
                    <p className="text-gray-300 text-lg max-w-2xl">
                        Select a district and famous place to discover top-rated hotels across Tamil Nadu.
                    </p>
                </div>
            </div>

            {/* Sticky Selector Bar */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-5">
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                        {/* District Select */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                <span className="inline-flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    Select District
                                </span>
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedDistrictId}
                                    onChange={handleDistrictChange}
                                    className="w-full appearance-none px-5 py-3.5 pr-12 rounded-xl border-2 border-slate-200 bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm font-semibold text-slate-800 cursor-pointer hover:border-slate-300 shadow-sm"
                                >
                                    <option value="">-- Choose a District --</option>
                                    {districtsData.map((d) => (
                                        <option key={d.id} value={d.id}>{d.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Place Select */}
                        <div className="flex-1 min-w-0">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                                <span className="inline-flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    Select Famous Place
                                </span>
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedPlaceName}
                                    onChange={(e) => setSelectedPlaceName(e.target.value)}
                                    disabled={!selectedDistrict}
                                    className={`w-full appearance-none px-5 py-3.5 pr-12 rounded-xl border-2 bg-white outline-none transition-all text-sm font-semibold cursor-pointer shadow-sm ${selectedDistrict
                                            ? "border-slate-200 text-slate-800 focus:border-secondary focus:ring-4 focus:ring-secondary/10 hover:border-slate-300"
                                            : "border-slate-100 text-slate-400 bg-slate-50 cursor-not-allowed"
                                        }`}
                                >
                                    <option value="">{selectedDistrict ? "-- All Places (Show All Hotels) --" : "-- First select a district --"}</option>
                                    {selectedDistrict?.famousPlaces.map((p, i) => (
                                        <option key={i} value={p.name}>{p.name}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Result count badge */}
                        {selectedDistrict && (
                            <div className="flex items-end pb-1">
                                <div className="px-5 py-3.5 bg-gradient-to-r from-accent to-amber-500 text-white font-extrabold text-sm rounded-xl shadow-md shadow-accent/20 whitespace-nowrap">
                                    {hotelsToShow.length} {hotelsToShow.length === 1 ? "Hotel" : "Hotels"} Found
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Empty state — no district selected */}
                {!selectedDistrict && (
                    <div className="text-center py-24">
                        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-accent/10 to-amber-50 rounded-3xl flex items-center justify-center text-5xl shadow-inner">
                            🏨
                        </div>
                        <h3 className="text-2xl font-heading font-bold text-slate-800 mb-3">Select a District to Begin</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">Choose a Tamil Nadu district from the dropdown above to discover famous places and top-rated hotels.</p>

                        {/* Quick stats */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 text-center min-w-[140px]">
                                <div className="text-3xl font-heading font-extrabold text-primary-dark">{districtsData.length}</div>
                                <div className="text-xs text-slate-500 font-medium mt-1">Districts</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 text-center min-w-[140px]">
                                <div className="text-3xl font-heading font-extrabold text-secondary">{districtsData.reduce((a, d) => a + d.famousPlaces.length, 0)}</div>
                                <div className="text-xs text-slate-500 font-medium mt-1">Famous Places</div>
                            </div>
                            <div className="bg-white rounded-2xl p-6 shadow-card border border-slate-100 text-center min-w-[140px]">
                                <div className="text-3xl font-heading font-extrabold text-accent">{districtsData.reduce((a, d) => a + d.famousPlaces.reduce((b, p) => b + p.hotels.length, 0), 0)}</div>
                                <div className="text-xs text-slate-500 font-medium mt-1">Hotels</div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hotels results */}
                {selectedDistrict && (
                    <>
                        {/* District info banner */}
                        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-r from-primary-dark to-primary text-white relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10 flex flex-wrap items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center text-2xl">📍</div>
                                <div>
                                    <h3 className="text-xl font-heading font-bold">{selectedDistrict.name}</h3>
                                    <p className="text-gray-300 text-sm">
                                        {selectedPlaceName ? `Hotels near ${selectedPlaceName}` : `Showing all ${hotelsToShow.length} hotels across ${selectedDistrict.famousPlaces.length} famous places`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Hotel Cards */}
                        <div className="space-y-5">
                            {hotelsToShow.map((hotel, i) => (
                                <div
                                    key={`${hotel.name}-${i}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 border border-slate-100 hover:border-accent/20 relative"
                                    style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.08}s both` }}
                                >
                                    {/* Left accent bar */}
                                    <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-accent to-amber-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                    <div className="p-6 md:p-8">
                                        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                                            {/* Hotel Icon */}
                                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/10 to-amber-50 flex items-center justify-center text-3xl flex-shrink-0 border border-accent/10 shadow-sm">
                                                🏨
                                            </div>

                                            {/* Hotel Details */}
                                            <div className="flex-grow min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                                                    <div>
                                                        <h3 className="text-xl font-heading font-bold text-slate-900 group-hover:text-accent transition-colors">{hotel.name}</h3>
                                                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                                                            <span className="text-slate-500 text-sm flex items-center gap-1">📍 {hotel.address}</span>
                                                            {!selectedPlaceName && (
                                                                <span className="px-2.5 py-0.5 bg-secondary/10 text-secondary text-xs font-bold rounded-full">
                                                                    {hotel.placeName}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="text-right flex-shrink-0">
                                                        <div className="text-xl font-heading font-extrabold text-primary-dark">{hotel.priceRange}</div>
                                                        <span className="text-xs text-slate-400">per night</span>
                                                    </div>
                                                </div>

                                                {/* Rating */}
                                                <div className="mb-4">{renderStars(hotel.rating)}</div>

                                                {/* Amenities */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {hotel.amenities.map((amenity, j) => (
                                                        <span key={j} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg border border-slate-100 hover:border-accent/30 hover:bg-accent/5 transition-all duration-200 cursor-default">
                                                            {amenity === "Pool" && "🏊 "}
                                                            {amenity === "Spa" && "💆 "}
                                                            {amenity === "WiFi" && "📶 "}
                                                            {amenity === "Gym" && "💪 "}
                                                            {amenity === "Restaurant" && "🍽️ "}
                                                            {amenity === "Parking" && "🅿️ "}
                                                            {amenity === "Bar" && "🍸 "}
                                                            {amenity === "Garden" && "🌿 "}
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Contact */}
                                                <div className="flex flex-wrap items-center gap-5 text-sm">
                                                    <span className="flex items-center gap-2 text-slate-600 bg-green-50 px-3 py-1.5 rounded-lg">
                                                        <span className="text-green-500">📞</span>
                                                        <strong>{hotel.contact}</strong>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {hotelsToShow.length === 0 && (
                            <div className="text-center py-16">
                                <span className="text-5xl mb-4 block">🔍</span>
                                <p className="text-slate-500 text-lg">No hotels found for this selection.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HotelsExplorer;
