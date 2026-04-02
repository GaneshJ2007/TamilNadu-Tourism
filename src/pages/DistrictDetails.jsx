import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/destinations';
import { exactMapping } from '../data/district/districtData';

const DistrictDetails = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const [filteredPlaces, setFilteredPlaces] = useState([]);

    useEffect(() => {
        // Flatten all data from categories
        const allPlaces = categories.flatMap(cat => cat.data);
        const term = name.toLowerCase();

        // 1. Explicit district mapping for 100% accuracy to prevent false positives
        // The exactMapping is now imported from '../data/district/districtData'

        const places = allPlaces.filter(p => {
            const placeName = p.name ? p.name.trim() : "";
            const explicitDistrict = exactMapping[placeName];
            
            // If mapped explicitly, rely 100% on the map mapping to avoid false positives!
            if (explicitDistrict) {
                return explicitDistrict.toLowerCase() === term;
            }
            
            // Fallback for absolutely new data
            if (p.name && p.name.toLowerCase().includes(term)) return true;
            if (p.description && p.description.toLowerCase().includes(term)) return true;
            if (p.readmore && p.readmore.toLowerCase().includes(term)) return true;
            return false;
        });

        // Deduplicate places (remove identically named entries)
        const uniquePlaces = [];
        const seenNames = new Set();
        for (const p of places) {
            if (p.name && !seenNames.has(p.name)) {
                seenNames.add(p.name);
                uniquePlaces.push(p);
            }
        }

        setFilteredPlaces(uniquePlaces);
    }, [name]);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-4">
                        Discover {name}
                    </h1>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                    <p className="mt-4 text-lg text-slate-600">Explore the best tourist places located in this beautiful district.</p>
                </div>

                {filteredPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlaces.map((place, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/destination/${encodeURIComponent(place.name)}`)}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden shrink-0">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                                        {place.area}
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-accent transition-colors">
                                        {place.name}
                                    </h3>
                                    <p className="text-slate-600 line-clamp-3 mb-4 text-sm leading-relaxed flex-grow">
                                        {place.description}
                                    </p>
                                    <div className="flex items-center text-accent font-bold text-sm uppercase tracking-wide mt-auto pt-4 border-t border-slate-100">
                                        Explore <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <span className="text-6xl mb-4 block">🗺️</span>
                        <p className="text-2xl font-heading font-bold text-slate-800 mb-2">No specific places found</p>
                        <p className="text-lg text-slate-500 max-w-md mx-auto">We are continually updating our database. More spots in {name} will be added soon!</p>
                        <button onClick={() => navigate('/home')} className="mt-8 px-8 py-3 bg-gradient-to-r from-accent to-amber-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DistrictDetails;
