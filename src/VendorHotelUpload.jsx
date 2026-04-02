import React, { useState, useEffect } from "react";
import districtsData from "./data/hotelsData";

const STORAGE_KEY = "vendor_hotels";

export default function VendorHotelUpload() {
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedPlaceName, setSelectedPlaceName] = useState("");
    const [hotelName, setHotelName] = useState("");
    const [rating, setRating] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [amenities, setAmenities] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [vendorHotels, setVendorHotels] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");

    const selectedDistrict = districtsData.find((d) => d.id === selectedDistrictId);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setVendorHotels(JSON.parse(stored));
    }, []);

    const handleDistrictChange = (e) => {
        setSelectedDistrictId(e.target.value);
        setSelectedPlaceName("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDistrictId || !selectedPlaceName || !hotelName || !rating || !priceMin || !priceMax || !contact || !address) {
            return alert("Please fill all required fields.");
        }

        const newHotel = {
            id: Date.now(),
            district: selectedDistrict.name,
            districtId: selectedDistrictId,
            place: selectedPlaceName,
            name: hotelName,
            rating: parseFloat(rating),
            priceRange: `₹${parseInt(priceMin).toLocaleString()} - ₹${parseInt(priceMax).toLocaleString()}`,
            amenities: amenities.split(",").map((a) => a.trim()).filter(Boolean),
            contact,
            address,
            addedAt: new Date().toISOString(),
        };

        const updated = [newHotel, ...vendorHotels];
        setVendorHotels(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Reset form
        setHotelName("");
        setRating("");
        setPriceMin("");
        setPriceMax("");
        setAmenities("");
        setContact("");
        setAddress("");
        setSelectedDistrictId("");
        setSelectedPlaceName("");
        setSuccessMsg("Hotel added successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const deleteHotel = (id) => {
        if (!window.confirm("Delete this hotel listing?")) return;
        const updated = vendorHotels.filter((h) => h.id !== id);
        setVendorHotels(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const amenityOptions = ["WiFi", "Pool", "Spa", "Restaurant", "Gym", "Parking", "Bar", "Room Service", "Garden", "AC Rooms", "Sea View", "Mountain View", "Business Center", "Laundry"];

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Upload Form */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 animate-fade-in-up">
                    <div className="bg-gradient-to-r from-teal-600 to-emerald-600 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span>🏨</span> Add Hotel Listing
                        </h2>
                        <p className="text-teal-100 mt-1">Add a hotel to a specific district and famous place in Tamil Nadu</p>
                    </div>

                    {successMsg && (
                        <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fade-in">
                            <span>✅</span> {successMsg}
                        </div>
                    )}

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Location Section */}
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span>📍</span> Location
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">District *</label>
                                        <select
                                            value={selectedDistrictId}
                                            onChange={handleDistrictChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white text-sm font-medium"
                                        >
                                            <option value="">-- Select District --</option>
                                            {districtsData.map((d) => (
                                                <option key={d.id} value={d.id}>{d.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Famous Place *</label>
                                        <select
                                            value={selectedPlaceName}
                                            onChange={(e) => setSelectedPlaceName(e.target.value)}
                                            disabled={!selectedDistrict}
                                            className={`w-full px-4 py-3 rounded-lg border border-gray-300 outline-none transition-all text-sm font-medium ${selectedDistrict ? "focus:ring-2 focus:ring-teal-500 focus:border-teal-500 bg-white" : "bg-gray-100 cursor-not-allowed text-gray-400"}`}
                                        >
                                            <option value="">{selectedDistrict ? "-- Select Place --" : "-- First select district --"}</option>
                                            {selectedDistrict?.famousPlaces.map((p, i) => (
                                                <option key={i} value={p.name}>{p.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Hotel Details */}
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span>🏨</span> Hotel Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Hotel Name *</label>
                                        <input type="text" value={hotelName} onChange={(e) => setHotelName(e.target.value)} placeholder="e.g. Grand Palace Hotel" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Rating (1-5) *</label>
                                        <input type="number" step="0.1" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="e.g. 4.5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Min Price (₹) *</label>
                                        <input type="number" value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="e.g. 3000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Max Price (₹) *</label>
                                        <input type="number" value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="e.g. 8000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Address *</label>
                                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full hotel address" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Contact Number *</label>
                                        <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+91-xxx-xxx-xxxx" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>

                            {/* Amenities */}
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span>✨</span> Amenities
                                </h3>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {amenityOptions.map((a) => {
                                        const selected = amenities.split(",").map((x) => x.trim()).includes(a);
                                        return (
                                            <button
                                                key={a}
                                                type="button"
                                                onClick={() => {
                                                    const current = amenities.split(",").map((x) => x.trim()).filter(Boolean);
                                                    if (selected) {
                                                        setAmenities(current.filter((x) => x !== a).join(", "));
                                                    } else {
                                                        setAmenities([...current, a].join(", "));
                                                    }
                                                }}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border ${selected ? "bg-teal-500 text-white border-teal-500 shadow-sm" : "bg-white text-gray-600 border-gray-200 hover:border-teal-300"
                                                    }`}
                                            >
                                                {a}
                                            </button>
                                        );
                                    })}
                                </div>
                                <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} placeholder="Or type amenities separated by commas" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 outline-none transition-all text-sm" />
                            </div>

                            <button type="submit" className="w-full py-4 px-6 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-base">
                                🏨 Add Hotel Listing
                            </button>
                        </form>
                    </div>
                </div>

                {/* Listed Hotels */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-teal-600 pl-4">
                        🏨 Your Hotel Listings ({vendorHotels.length})
                    </h3>

                    {vendorHotels.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                            <span className="text-4xl mb-3 block">🏨</span>
                            <p className="text-gray-500 text-lg">No hotel listings yet. Add your first hotel above!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {vendorHotels.map((hotel) => (
                                <div key={hotel.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 group">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                        <div className="flex-grow">
                                            <h4 className="text-lg font-bold text-gray-800">{hotel.name}</h4>
                                            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-gray-500">
                                                <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded font-medium text-xs">{hotel.district}</span>
                                                <span>→</span>
                                                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-medium text-xs">{hotel.place}</span>
                                            </div>
                                            <p className="text-sm text-gray-500 mt-2">📍 {hotel.address}</p>
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <span className="text-sm font-bold text-green-600">{hotel.priceRange}</span>
                                                <span className="text-sm text-amber-500 font-bold">⭐ {hotel.rating}</span>
                                                <span className="text-sm text-gray-500">📞 {hotel.contact}</span>
                                            </div>
                                            {hotel.amenities.length > 0 && (
                                                <div className="flex flex-wrap gap-1.5 mt-3">
                                                    {hotel.amenities.map((a, i) => (
                                                        <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">{a}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <button onClick={() => deleteHotel(hotel.id)} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-bold flex items-center gap-1 flex-shrink-0">
                                            🗑️ Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
