import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SectionCard = ({ place }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    return (
        <div
            className="group relative bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-gray-100/50 flex flex-col h-full cursor-pointer ring-1 ring-black/5 hover:ring-accent/20"
            onClick={() => navigate(`/destination/${encodeURIComponent(place.name)}`)}
        >
            {/* Image Container */}
            <div className="h-64 overflow-hidden relative">
                <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                />

                {/* Location Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary rounded-full shadow-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        Explore
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow relative bg-white">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl text-primary font-heading font-bold group-hover:text-accent transition-colors duration-300 line-clamp-1">
                        {place.name}
                    </h3>
                    <span className="text-gray-300 group-hover:text-secondary transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </span>
                </div>

                <p className="text-sm text-slate-600 font-body leading-relaxed mb-4 flex-grow line-clamp-3 group-hover:text-slate-900 transition-colors">
                    {place.description}
                </p>

                {/* Expandable Content */}
                <div
                    className={`overflow-hidden transition-all duration-700 ease-in-out border-t border-dashed border-gray-200 mt-2 ${isExpanded ? 'max-h-[500px] opacity-100 pt-4' : 'max-h-0 opacity-0 pt-0'
                        }`}
                >
                    <p className="text-sm text-slate-500 italic bg-slate-50 p-3 rounded-lg border-l-2 border-accent">
                        "{place.readmore}"
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-auto flex justify-between items-center pt-4 border-t border-gray-100">
                    <button
                        className="text-xs font-bold uppercase tracking-wide text-primary-light hover:text-accent transition-colors focus:outline-none flex items-center gap-1 group/btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsExpanded(!isExpanded);
                        }}
                    >
                        {isExpanded ? (
                            <>
                                Show Less <span className="transform rotate-180 transition-transform">−</span>
                            </>
                        ) : (
                            <>
                                Read More <span className="group-hover/btn:translate-x-1 transition-transform">+</span>
                            </>
                        )}
                    </button>

                    <button
                        className="bg-primary hover:bg-primary-dark text-white p-2 rounded-full shadow-lg hover:shadow-primary/30 transform hover:scale-110 active:scale-95 transition-all duration-300"
                        title="View Details"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionCard;
