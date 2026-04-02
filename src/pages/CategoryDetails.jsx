import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from '../data/destinations';

const CategoryDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [filteredPlaces, setFilteredPlaces] = useState([]);
    const [title, setTitle] = useState("");

    useEffect(() => {
        // Flatten all data from categories
        const allPlaces = categories.flatMap(cat => cat.data);
        let places = [];
        let pageTitle = "";

        switch (id) {
            case 'hills':
                places = allPlaces.filter(p => p.area === 'Hills');
                pageTitle = "Hills & Valleys";
                break;
            case 'beach':
                places = allPlaces.filter(p => p.area === 'Beach');
                pageTitle = "Sunny Beaches";
                break;
            case 'spiritual':
                places = allPlaces.filter(p => p.area === 'Temple' || p.area === 'Pilgrim');
                pageTitle = "Spiritual Journeys";
                break;
            case 'wildlife':
                places = allPlaces.filter(p => p.area === 'Wildlife');
                pageTitle = "Wildlife & Nature";
                break;
            case 'heritage':
                places = allPlaces.filter(p => p.area === 'Heritage');
                pageTitle = "Heritage & Culture";
                break;
            case 'falls':
                places = allPlaces.filter(p => p.area === 'Falls');
                pageTitle = "Waterfalls";
                break;
            case 'trekking':
                places = allPlaces.filter(p => p.area === 'Trekking' || p.area === 'Hills');
                pageTitle = "Trekking Adventures";
                break;
            case 'nature':
                places = allPlaces.filter(p => p.area === 'Nature' || p.area === 'Hills' || p.area === 'Wildlife');
                pageTitle = "Eco Tourism";
                break;
            default:
                places = [];
                pageTitle = "Category";
        }

        setFilteredPlaces(places);
        setTitle(pageTitle);
    }, [id]);

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary-dark mb-4">{title}</h1>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full"></div>
                </div>

                {filteredPlaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPlaces.map((place, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/destination/${encodeURIComponent(place.name)}`)}
                                className="group bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={place.image}
                                        alt={place.name}
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wider">
                                        {place.area}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-accent transition-colors">
                                        {place.name}
                                    </h3>
                                    <p className="text-slate-600 line-clamp-3 mb-4 text-sm leading-relaxed">
                                        {place.description}
                                    </p>
                                    <div className="flex items-center text-accent font-bold text-sm uppercase tracking-wide">
                                        Explore <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-xl text-slate-500">Coming Soon! We are curating the best experiences for this category.</p>
                        <button onClick={() => navigate('/home')} className="mt-8 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
                            Back to Home
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetails;
