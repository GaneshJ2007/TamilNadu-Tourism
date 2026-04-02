import React from 'react';

const CuisineCard = ({ cuisine }) => {
    return (
        <div className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-2">
            {/* Background Image */}
            <div className="absolute inset-0 bg-gray-900">
                <img
                    src={cuisine.image}
                    alt={cuisine.name}
                    className="w-full h-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-60"
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Content Content */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end text-center">
                <div className="transform translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <h3 className="text-2xl font-bold font-heading text-white mb-2 drop-shadow-lg tracking-wide border-b-2 border-accent/0 group-hover:border-accent inline-block pb-1 transition-all duration-300">
                        {cuisine.name}
                    </h3>

                    <div className="max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
                        <p className="text-sm text-gray-200 mt-2 font-light leading-relaxed">
                            {cuisine.description}
                        </p>
                        <div className="mt-4">
                            <span className="text-xs font-bold text-accent uppercase tracking-widest border border-accent/50 px-3 py-1 rounded-full hover:bg-accent hover:text-white transition-colors">
                                Taste It
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Shine Effect */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-24 h-24 rounded-full bg-white/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        </div>
    );
};

export default CuisineCard;
