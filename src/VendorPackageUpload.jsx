import React, { useState, useEffect } from "react";

const STORAGE_KEY = "vendor_packages";

export default function VendorPackageUpload() {
    const [title, setTitle] = useState("");
    const [days, setDays] = useState("");
    const [price, setPrice] = useState("");
    const [places, setPlaces] = useState("");
    const [activities, setActivities] = useState("");
    const [stay, setStay] = useState("");
    const [highlights, setHighlights] = useState("");
    const [imageLink, setImageLink] = useState("");
    const [vendorPackages, setVendorPackages] = useState([]);
    const [successMsg, setSuccessMsg] = useState("");

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setVendorPackages(JSON.parse(stored));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !days || !price || !places || !activities || !stay || !highlights) {
            return alert("Please fill all required fields.");
        }

        const newPkg = {
            id: Date.now(),
            title,
            days: parseInt(days),
            price: parseInt(price),
            places: places.split(",").map((p) => p.trim()).filter(Boolean),
            activities: activities.split(",").map((a) => a.trim()).filter(Boolean),
            stay,
            highlights,
            image: imageLink || "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2070&auto=format&fit=crop",
            addedAt: new Date().toISOString(),
        };

        const updated = [newPkg, ...vendorPackages];
        setVendorPackages(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

        // Reset form
        setTitle(""); setDays(""); setPrice(""); setPlaces(""); setActivities("");
        setStay(""); setHighlights(""); setImageLink("");
        setSuccessMsg("Tour package added successfully!");
        setTimeout(() => setSuccessMsg(""), 3000);
    };

    const deletePackage = (id) => {
        if (!window.confirm("Delete this tour package?")) return;
        const updated = vendorPackages.filter((p) => p.id !== id);
        setVendorPackages(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">

                {/* Upload Form */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12 animate-fade-in-up">
                    <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span>🗺️</span> Add Tour Package
                        </h2>
                        <p className="text-violet-100 mt-1">Create a new tour package with places, activities, and pricing</p>
                    </div>

                    {successMsg && (
                        <div className="mx-8 mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-semibold flex items-center gap-2 animate-fade-in">
                            <span>✅</span> {successMsg}
                        </div>
                    )}

                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Basic Info */}
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span>📋</span> Package Info
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-3">
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Package Title *</label>
                                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Madurai Temple Trail" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Duration (Days) *</label>
                                        <input type="number" min="1" max="30" value={days} onChange={(e) => setDays(e.target.value)} placeholder="e.g. 3" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Price per Person (₹) *</label>
                                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 12000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image URL</label>
                                        <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} placeholder="Paste image link (optional)" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>

                            {/* Itinerary Details */}
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-100">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                    <span>📍</span> Itinerary Details
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Places Covered (comma separated) *</label>
                                        <textarea value={places} onChange={(e) => setPlaces(e.target.value)} placeholder="e.g. Meenakshi Temple, Thirumalai Nayakkar Mahal, Gandhi Museum" rows="2" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Fun Activities (comma separated) *</label>
                                        <textarea value={activities} onChange={(e) => setActivities(e.target.value)} placeholder="e.g. Temple Darshan, Heritage Walk, Street Food Tour" rows="2" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Stay Details *</label>
                                        <input type="text" value={stay} onChange={(e) => setStay(e.target.value)} placeholder="e.g. 2 Nights in heritage hotel near temple" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Package Highlights *</label>
                                        <textarea value={highlights} onChange={(e) => setHighlights(e.target.value)} placeholder="Brief description of what makes this package special..." rows="3" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all" />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="w-full py-4 px-6 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-1 transition-all duration-200 text-base">
                                🗺️ Add Tour Package
                            </button>
                        </form>
                    </div>
                </div>

                {/* Listed Packages */}
                <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-violet-600 pl-4">
                        🗺️ Your Tour Packages ({vendorPackages.length})
                    </h3>

                    {vendorPackages.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                            <span className="text-4xl mb-3 block">🗺️</span>
                            <p className="text-gray-500 text-lg">No packages yet. Create your first tour package above!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {vendorPackages.map((pkg) => (
                                <div key={pkg.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                                    <div className="flex flex-col sm:flex-row">
                                        {/* Image */}
                                        <div className="sm:w-48 h-36 sm:h-auto flex-shrink-0 overflow-hidden">
                                            <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        {/* Content */}
                                        <div className="p-5 flex-grow">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="px-2 py-0.5 bg-violet-100 text-violet-700 text-xs font-bold rounded">{pkg.days} {pkg.days === 1 ? "Day" : "Days"}</span>
                                                        <span className="text-green-600 font-bold text-sm">₹{pkg.price.toLocaleString()}</span>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-gray-800">{pkg.title}</h4>
                                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{pkg.highlights}</p>
                                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                                        {pkg.places.slice(0, 4).map((p, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded font-medium">📍 {p}</span>
                                                        ))}
                                                        {pkg.places.length > 4 && (
                                                            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 text-xs rounded font-bold">+{pkg.places.length - 4} more</span>
                                                        )}
                                                    </div>
                                                </div>
                                                <button onClick={() => deletePackage(pkg.id)} className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg transition-colors text-sm font-bold flex items-center gap-1 flex-shrink-0 self-start">
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </div>
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
