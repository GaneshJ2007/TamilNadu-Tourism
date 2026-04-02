import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

const originIcon = new L.DivIcon({
    html: `<div style="font-size: 24px; filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.5));">🛫</div>`,
    className: "custom-leaflet-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24],
});

const destIcon = new L.DivIcon({
    html: `<div style="font-size: 28px; filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.6));">🚩</div>`,
    className: "custom-leaflet-icon",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
});

const touristIcon = new L.DivIcon({
    html: `<div style="font-size: 20px; filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.5));">📍</div>`,
    className: "custom-leaflet-icon",
    iconSize: [20, 20],
    iconAnchor: [10, 20],
});

const interests = [
    { id: "Hills", label: "Hill Stations", icon: "🏔️", color: "from-emerald-500 to-green-600", desc: "Cool climate & scenic peaks" },
    { id: "Beach", label: "Beaches", icon: "🏖️", color: "from-cyan-500 to-blue-500", desc: "Sun, sand & sea" },
    { id: "Temple", label: "Temples", icon: "🛕", color: "from-amber-500 to-orange-500", desc: "Ancient architecture & devotion" },
    { id: "Wildlife", label: "Wildlife", icon: "🐅", color: "from-lime-500 to-green-600", desc: "Safaris & nature reserves" },
    { id: "Heritage", label: "Heritage", icon: "🏛️", color: "from-rose-500 to-pink-600", desc: "History & culture" },
    { id: "Urban", label: "Urban", icon: "🌃", color: "from-violet-500 to-purple-600", desc: "City vibes & nightlife" },
];

const quickBudgets = [
    { label: "Budget", amount: 5000, icon: "💰", desc: "₹5,000" },
    { label: "Comfort", amount: 15000, icon: "✨", desc: "₹15,000" },
    { label: "Premium", amount: 30000, icon: "👑", desc: "₹30,000" },
    { label: "Luxury", amount: 50000, icon: "💎", desc: "₹50,000" },
];

export default function PlanTrip() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        days: 3,
        budgetAmount: "",
        members: 2,
        location: "",
        destination: "",
        interest: [],
    });
    const [itinerary, setItinerary] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [showMap, setShowMap] = useState(false);
    const [mapData, setMapData] = useState({ origin: null, destination: null, spots: [], loading: false });

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        if (showMap && (!mapData.origin || !mapData.destination)) {
            const fetchCoords = async () => {
                setMapData(prev => ({ ...prev, loading: true }));
                try {
                    const [originRes, destRes] = await Promise.all([
                        formData.location ? fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location + ', India')}`) : Promise.resolve(null),
                        formData.destination ? fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.destination + ', India')}`) : Promise.resolve(null)
                    ]);

                    const originData = originRes ? await originRes.json() : [];
                    const destData = destRes ? await destRes.json() : [];

                    const originCoords = originData.length > 0 ? [parseFloat(originData[0].lat), parseFloat(originData[0].lon)] : [13.0827, 80.2707]; // Chennai default
                    const destCoords = destData.length > 0 ? [parseFloat(destData[0].lat), parseFloat(destData[0].lon)] : [11.1271, 78.6569]; // TN default

                    // Fetch real tourist spots in the destination using Overpass API
                    let spots = [];
                    try {
                        // Use a 25km radius around the destination to find attractions, viewpoints, or historic places
                        const overpassQuery = `[out:json];(node(around:25000,${destCoords[0]},${destCoords[1]})["tourism"~"attraction|viewpoint|museum"];node(around:25000,${destCoords[0]},${destCoords[1]})["historic"];);out 15 center;`;
                        const overpassRes = await fetch("https://overpass-api.de/api/interpreter", {
                            method: "POST",
                            body: overpassQuery
                        });
                        if (overpassRes.ok) {
                            const overpassData = await overpassRes.json();
                            spots = overpassData.elements.map((el, i) => ({
                                lat: el.lat,
                                lng: el.lon,
                                id: el.id || i,
                                name: (el.tags && (el.tags.name || el.tags.tourism || el.tags.historic)) ? el.tags.name || el.tags.tourism || el.tags.historic : "Tourist Spot"
                            })).filter(s => s.name !== "yes");
                        }
                    } catch (e) {
                        console.error("Failed to fetch from Overpass API", e);
                    }

                    // Fallback if no real spots found
                    if (spots.length === 0) {
                        for(let i = 1; i <= 4; i++) {
                            spots.push({
                                lat: destCoords[0] + (Math.random() - 0.5) * 0.1,
                                lng: destCoords[1] + (Math.random() - 0.5) * 0.1,
                                id: 'fallback-' + i,
                                name: `Scenic Spot ${i}`
                            });
                        }
                    }

                    setMapData({
                        origin: originCoords,
                        destination: destCoords,
                        spots,
                        loading: false
                    });
                } catch (err) {
                    console.error("Error fetching map coordinates:", err);
                    setMapData(prev => ({ ...prev, loading: false }));
                }
            };
            fetchCoords();
        }
    }, [showMap, formData.location, formData.destination]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setError("");
    };

    const generateItinerary = async () => {
        setLoading(true);
        setError("");

        try {
            if (!formData.budgetAmount) {
                setError("Please enter a budget amount");
                setLoading(false);
                return;
            }

            const response = await fetch("http://localhost:5000/api/generate-itinerary", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    days: parseInt(formData.days),
                    budget: parseInt(formData.budgetAmount),
                    members: parseInt(formData.members),
                    interest: formData.interest.length > 0 ? formData.interest.join(", ") : "Any",
                    location: formData.location,
                    destination: formData.destination,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to generate itinerary");
            setItinerary(data);
            setStep(4);
        } catch (err) {
            setError(err.message || "Failed to generate itinerary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const perPersonPerDay = formData.budgetAmount && formData.members && formData.days
        ? Math.round(parseInt(formData.budgetAmount) / (parseInt(formData.members) * parseInt(formData.days)))
        : 0;

    const canProceedStep1 = formData.interest.length > 0;
    const canProceedStep2 = formData.location !== "" && formData.destination !== "" && formData.days >= 1;
    const canProceedStep3 = formData.budgetAmount !== "" && formData.members >= 1;

    // ——— ITINERARY RESULTS VIEW ———
    if (step === 4 && itinerary) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-slate-800 overflow-hidden">
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
                    <div className="max-w-5xl mx-auto px-6 relative z-10">
                        <button onClick={() => { setStep(1); setItinerary(null); }} className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6 text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            Plan Another Trip
                        </button>
                        <span className="text-accent font-bold text-xs tracking-[0.2em] uppercase">AI-Generated</span>
                        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white mt-2 mb-4">Your {itinerary.details.days}-Day Itinerary 🎯</h1>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                        {[
                            { label: "Duration", value: `${itinerary.details.days} Days`, icon: "📅", bg: "from-blue-500 to-blue-600" },
                            { label: "Total Budget", value: `₹${itinerary.details.budget.toLocaleString()}`, icon: "💰", bg: "from-green-500 to-emerald-600" },
                            { label: "Per Person/Day", value: `₹${itinerary.details.perPersonPerDay.toLocaleString()}`, icon: "👤", bg: "from-amber-500 to-orange-500" },
                            { label: "Travelers", value: `${itinerary.details.members} ${itinerary.details.members > 1 ? "People" : "Person"}`, icon: "👥", bg: "from-violet-500 to-purple-600" },
                        ].map((card, i) => (
                            <div key={i} className={`bg-gradient-to-br ${card.bg} rounded-2xl p-5 text-white shadow-xl`} style={{ animation: `fadeInUp 0.5s ease-out ${i * 0.1}s both` }}>
                                <span className="text-2xl mb-2 block">{card.icon}</span>
                                <span className="text-xs text-white/70 block">{card.label}</span>
                                <span className="text-lg font-heading font-extrabold">{card.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 mb-8">
                        {itinerary.details.interest && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-xl text-sm font-bold">
                                ✨ Interest: {itinerary.details.interest}
                            </div>
                        )}
                        {itinerary.details.destination && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold">
                                🏁 Destination: {itinerary.details.destination}
                            </div>
                        )}
                    </div>

                    {/* Itinerary Content */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mb-8">
                        <div className="p-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center text-white text-lg">📋</div>
                            <h3 className="text-xl font-heading font-bold text-slate-900">Detailed Itinerary</h3>
                        </div>
                        <div className="p-8 text-slate-700 leading-relaxed whitespace-pre-wrap font-body text-[15px]">
                            {itinerary.itinerary}
                        </div>
                    </div>

                    {showMap && (
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 mb-10 p-6 animate-fade-in-up">
                            <h3 className="text-xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🗺️</span> Trip Map & Details
                            </h3>
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="flex-1">
                                    <div className="w-full h-[500px] rounded-xl overflow-hidden border-2 border-slate-200 shadow-inner relative z-0">
                                        {mapData.loading ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50">
                                                <div className="animate-spin h-10 w-10 border-4 border-accent border-t-transparent rounded-full mb-3"></div>
                                                <span className="text-slate-500 font-medium">Loading Map Coordinates...</span>
                                            </div>
                                        ) : (
                                            <MapContainer 
                                                center={mapData.destination || [11.1271, 78.6569]} 
                                                zoom={7} 
                                                style={{ width: "100%", height: "100%", zIndex: 1 }}
                                                scrollWheelZoom={false}
                                            >
                                                <TileLayer
                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                {/* Origin Marker */}
                                                {mapData.origin && (
                                                    <Marker position={mapData.origin} icon={originIcon}>
                                                        <Popup className="font-sans font-bold text-slate-800">
                                                            Departure:<br/>{formData.location || "Origin"}
                                                        </Popup>
                                                    </Marker>
                                                )}

                                                {/* Destination Marker */}
                                                {mapData.destination && (
                                                    <Marker position={mapData.destination} icon={destIcon}>
                                                        <Popup className="font-sans font-bold text-green-700">
                                                            Arrival:<br/>{formData.destination}
                                                        </Popup>
                                                    </Marker>
                                                )}

                                                {/* Route Line */}
                                                {mapData.origin && mapData.destination && (
                                                    <Polyline 
                                                        positions={[mapData.origin, mapData.destination]} 
                                                        pathOptions={{ color: '#3b82f6', weight: 4, dashArray: '5, 10', opacity: 0.7 }} 
                                                    />
                                                )}

                                                {/* Tourist Spots Markers */}
                                                {mapData.spots && mapData.spots.map((spot, i) => (
                                                    <Marker key={spot.id} position={[spot.lat, spot.lng]} icon={touristIcon}>
                                                        <Popup className="font-sans font-medium text-slate-700">
                                                            {spot.name || `Recommended Spot #${i+1}`}
                                                        </Popup>
                                                    </Marker>
                                                ))}
                                            </MapContainer>
                                        )}
                                    </div>
                                </div>
                                <div className="md:w-1/3 bg-slate-50 p-5 rounded-xl border border-slate-100 flex flex-col justify-start">
                                    <h4 className="font-bold text-lg mb-4 text-slate-800 border-b border-slate-200 pb-2">Journey Details</h4>
                                    <div className="space-y-5">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mt-0.5 shadow-sm">🛫</div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Departure / Origin</div>
                                                <div className="font-bold text-slate-900 text-lg">{formData.location || "Not specified"}</div>
                                            </div>
                                        </div>
                                        <div className="h-4 border-l-2 border-dashed border-slate-300 ml-5 -my-2"></div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-0.5 shadow-sm">🛬</div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Arrival / Destination</div>
                                                <div className="font-bold text-slate-900 text-lg">{itinerary.details.destination || formData.destination}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3 pt-2">
                                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mt-0.5 shadow-sm">📸</div>
                                            <div>
                                                <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Tourist Places</div>
                                                <div className="font-medium text-slate-700 text-sm mt-1">
                                                    Top attractions and hidden gems matching your interest in <b>{itinerary.details.interest || formData.interest.join(", ") || "Any"}</b>.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-auto pt-4 border-t border-slate-200">
                                            <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                                * Map markers indicate popular tourist locations around your destination. Check the map for exact spots to explore!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex gap-4 pb-20">
                        <button onClick={() => { setStep(1); setItinerary(null); setShowMap(false); }} className="flex-1 py-4 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-500 hover:to-accent text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 text-base">
                            🔄 Plan Another Trip
                        </button>
                        <button onClick={() => setShowMap(!showMap)} className={`px-6 py-4 font-bold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-200 ${showMap ? 'bg-slate-800 text-white hover:bg-slate-900' : 'bg-green-500 text-white hover:bg-green-600'}`}>
                            {showMap ? '🗺️ Hide Map' : '🗺️ View on Map'}
                        </button>
                        <button onClick={() => window.print()} className="px-6 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all duration-200">
                            🖨️ Print
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ——— MAIN WIZARD VIEW ———
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero */}
            <div className="relative py-20 bg-gradient-to-br from-primary-dark via-primary to-slate-800 overflow-hidden">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl"></div>
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <span className="inline-block px-4 py-1.5 bg-accent/20 backdrop-blur-md text-accent font-bold text-xs tracking-[0.2em] uppercase rounded-full mb-6 border border-accent/30">
                        AI-Powered Planner
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white drop-shadow-xl leading-tight mb-4">
                        Plan Your Dream Trip
                    </h1>
                    <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto">
                        Tell us what excites you and we'll craft a personalized Tamil Nadu itinerary just for you.
                    </p>
                </div>
            </div>

            {/* Step Indicator */}
            <div className="max-w-3xl mx-auto px-6 -mt-6 relative z-20 mb-10">
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/40 p-4">
                    <div className="flex items-center justify-between">
                        {["Choose Interest", "Trip Details", "Budget & Members"].map((label, i) => {
                            const stepNum = i + 1;
                            const isActive = step === stepNum;
                            const isDone = step > stepNum;
                            return (
                                <div key={i} className="flex items-center flex-1">
                                    <button
                                        onClick={() => { if (isDone) setStep(stepNum); }}
                                        className={`flex items-center gap-2.5 transition-all duration-300 ${isDone ? "cursor-pointer" : "cursor-default"}`}
                                    >
                                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold transition-all duration-300 ${isActive ? "bg-gradient-to-r from-accent to-amber-500 text-white shadow-md shadow-accent/30 scale-110"
                                                : isDone ? "bg-green-500 text-white" : "bg-slate-200 text-slate-400"
                                            }`}>
                                            {isDone ? "✓" : stepNum}
                                        </div>
                                        <span className={`text-sm font-semibold hidden sm:block transition-colors ${isActive ? "text-slate-900" : isDone ? "text-green-600" : "text-slate-400"
                                            }`}>{label}</span>
                                    </button>
                                    {i < 2 && <div className={`flex-1 h-0.5 mx-3 rounded-full transition-all duration-500 ${step > stepNum ? "bg-green-400" : "bg-slate-200"}`}></div>}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Step Content */}
            <div className="max-w-4xl mx-auto px-6 pb-24">
                {/* ——— STEP 1: Interest ——— */}
                {step === 1 && (
                    <div className="animate-fade-in-up">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-3">What excites you most? 🎯</h2>
                            <p className="text-slate-500 text-lg">Pick the type of experience you're looking for</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-10">
                            {interests.map((item) => {
                                const isSelected = formData.interest.includes(item.id);
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            const newInterests = isSelected
                                                ? formData.interest.filter(i => i !== item.id)
                                                : [...formData.interest, item.id];
                                            setFormData({ ...formData, interest: newInterests });
                                        }}
                                        className={`relative group rounded-2xl p-6 text-left transition-all duration-300 border-2 overflow-hidden ${isSelected
                                                ? "border-accent bg-accent/5 shadow-xl shadow-accent/10 scale-[1.02]"
                                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:-translate-y-1"
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute top-3 right-3 w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">✓</div>
                                        )}
                                        <span className="text-4xl mb-3 block">{item.icon}</span>
                                        <h3 className="text-lg font-heading font-bold text-slate-900 mb-1">{item.label}</h3>
                                        <p className="text-sm text-slate-500">{item.desc}</p>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Skip interest option */}
                        <div className="text-center mb-6">
                            <button
                                onClick={() => { setFormData({ ...formData, interest: [] }); setStep(2); }}
                                className="text-sm text-slate-400 hover:text-accent transition-colors underline underline-offset-4"
                            >
                                Skip — I'm open to anything!
                            </button>
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            disabled={!canProceedStep1}
                            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 ${canProceedStep1
                                    ? "bg-gradient-to-r from-accent to-amber-500 text-white hover:-translate-y-1 hover:shadow-xl"
                                    : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                }`}
                        >
                            Continue to Trip Details →
                        </button>
                    </div>
                )}

                {/* ——— STEP 2: Trip Details ——— */}
                {step === 2 && (
                    <div className="animate-fade-in-up">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-3">Tell us about your trip 🗺️</h2>
                            <p className="text-slate-500 text-lg">Where you're coming from and how long you'd like to explore</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-8">
                            {/* Location */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center text-sm">📍</span>
                                    Where are you traveling from?
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g., Chennai, Bangalore, Mumbai"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-lg font-medium"
                                />
                            </div>

                            {/* Destination */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-red-100 text-red-500 flex items-center justify-center text-sm">🏁</span>
                                    Where do you want to go?
                                </label>
                                <input
                                    type="text"
                                    name="destination"
                                    placeholder="e.g., Ooty, Madurai, Kanyakumari"
                                    value={formData.destination}
                                    onChange={handleInputChange}
                                    className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-lg font-medium"
                                />
                            </div>

                            {/* Days selector */}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-sm">📅</span>
                                    How many days?
                                </label>
                                <div className="flex items-center gap-4 mb-4">
                                    <button onClick={() => setFormData({ ...formData, days: Math.max(1, formData.days - 1) })} className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-2xl flex items-center justify-center transition-colors">−</button>
                                    <div className="text-5xl font-heading font-extrabold text-primary-dark min-w-[80px] text-center">{formData.days}</div>
                                    <button onClick={() => setFormData({ ...formData, days: Math.min(15, formData.days + 1) })} className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-2xl flex items-center justify-center transition-colors">+</button>
                                    <span className="text-slate-500 font-medium text-lg ml-2">{formData.days === 1 ? "Day" : "Days"}</span>
                                </div>
                                {/* Quick day pills */}
                                <div className="flex flex-wrap gap-2">
                                    {[1, 3, 5, 7, 10].map((d) => (
                                        <button
                                            key={d}
                                            onClick={() => setFormData({ ...formData, days: d })}
                                            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${formData.days === d
                                                    ? "bg-accent text-white shadow-md"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                                }`}
                                        >
                                            {d} {d === 1 ? "Day" : "Days"}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button onClick={() => setStep(1)} className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                                ← Back
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                disabled={!canProceedStep2}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 ${canProceedStep2
                                        ? "bg-gradient-to-r from-accent to-amber-500 text-white hover:-translate-y-1 hover:shadow-xl"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                            >
                                Continue to Budget →
                            </button>
                        </div>
                    </div>
                )}

                {/* ——— STEP 3: Budget & Members ——— */}
                {step === 3 && (
                    <div className="animate-fade-in-up">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-heading font-extrabold text-slate-900 mb-3">Budget & Group Size 💰</h2>
                            <p className="text-slate-500 text-lg">Set your total budget and number of travelers</p>
                        </div>

                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 mb-8">
                            {/* Quick budget presets */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center text-sm">💰</span>
                                    Choose your budget tier
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                                    {quickBudgets.map((b) => {
                                        const isSelected = parseInt(formData.budgetAmount) === b.amount;
                                        return (
                                            <button
                                                key={b.amount}
                                                onClick={() => setFormData({ ...formData, budgetAmount: b.amount.toString() })}
                                                className={`relative rounded-xl p-4 text-center transition-all duration-300 border-2 ${isSelected
                                                        ? "border-green-500 bg-green-50 shadow-lg shadow-green-500/10"
                                                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
                                                    }`}
                                            >
                                                {isSelected && <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">✓</div>}
                                                <span className="text-2xl block mb-1">{b.icon}</span>
                                                <span className="text-sm font-bold text-slate-700 block">{b.label}</span>
                                                <span className="text-xs text-slate-500">{b.desc}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₹</span>
                                    <input
                                        type="number"
                                        name="budgetAmount"
                                        placeholder="Or enter a custom budget"
                                        value={formData.budgetAmount}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-5 py-4 rounded-xl border-2 border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all text-lg font-medium"
                                    />
                                </div>
                            </div>

                            {/* Members */}
                            <div className="mb-8">
                                <label className="block text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
                                    <span className="w-7 h-7 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-sm">👥</span>
                                    Number of Travelers
                                </label>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => setFormData({ ...formData, members: Math.max(1, formData.members - 1) })} className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-2xl flex items-center justify-center transition-colors">−</button>
                                    <div className="text-5xl font-heading font-extrabold text-primary-dark min-w-[80px] text-center">{formData.members}</div>
                                    <button onClick={() => setFormData({ ...formData, members: Math.min(20, formData.members + 1) })} className="w-12 h-12 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-2xl flex items-center justify-center transition-colors">+</button>
                                    <span className="text-slate-500 font-medium text-lg ml-2">{formData.members === 1 ? "Traveler" : "Travelers"}</span>
                                </div>
                                {/* People icons */}
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {[...Array(Math.min(formData.members, 20))].map((_, i) => (
                                        <span key={i} className="text-xl" style={{ animation: `fadeInUp 0.3s ease-out ${i * 0.05}s both` }}>🧑</span>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            {formData.budgetAmount && (
                                <div className="bg-gradient-to-r from-primary-dark to-primary rounded-2xl p-6 text-white">
                                    <h4 className="text-sm font-bold text-white/70 uppercase tracking-wider mb-3">Trip Summary</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                            <span className="text-xs text-white/60 block">Duration</span>
                                            <span className="text-lg font-bold">{formData.days} {formData.days === 1 ? "Day" : "Days"}</span>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                            <span className="text-xs text-white/60 block">Total Budget</span>
                                            <span className="text-lg font-bold">₹{parseInt(formData.budgetAmount).toLocaleString()}</span>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                            <span className="text-xs text-white/60 block">Per Person/Day</span>
                                            <span className="text-lg font-bold">₹{perPersonPerDay.toLocaleString()}</span>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                            <span className="text-xs text-white/60 block">Destination</span>
                                            <span className="text-lg font-bold">{formData.destination || "Any"}</span>
                                        </div>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                            <span className="text-xs text-white/60 block">Interest</span>
                                            <span className="text-lg font-bold truncate max-w-[120px] block" title={formData.interest.length > 0 ? formData.interest.join(", ") : "Any"}>
                                                {formData.interest.length > 0 ? formData.interest.join(", ") : "Any"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3 animate-fade-in">
                                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span className="font-medium">{error}</span>
                            </div>
                        )}

                        <div className="flex gap-4">
                            <button onClick={() => setStep(2)} className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all">
                                ← Back
                            </button>
                            <button
                                onClick={generateItinerary}
                                disabled={!canProceedStep3 || loading}
                                className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg transform transition-all duration-200 ${canProceedStep3 && !loading
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:-translate-y-1 hover:shadow-xl"
                                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                                    }`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Your Itinerary...
                                    </span>
                                ) : (
                                    "✨ Generate My Itinerary"
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
