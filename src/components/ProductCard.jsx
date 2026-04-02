import React from 'react';

const ProductCard = ({ item, onAddToCart, onDelete, isVendor, currentVendorEmail, index = 0 }) => {
    const isOwner = isVendor && item.owner === currentVendorEmail;
    const delay = (index % 8) * 80; // stagger delay in ms

    return (
        <div
            className="stagger-card group relative bg-white rounded-2xl overflow-hidden flex flex-col border border-gray-100/50 hover:border-transparent transition-all duration-500 glow-border"
            style={{
                animationDelay: `${delay}ms`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
            }}
        >
            {/* Image Section */}
            <div className="h-60 overflow-hidden relative bg-gradient-to-br from-gray-100 to-gray-50">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                    onError={(e) => { e.target.src = 'https://placehold.co/400x300/f1f5f9/94a3b8?text=No+Image'; }}
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Price Badge — glass style */}
                <div className="absolute top-3 right-3 glass-card px-3.5 py-1.5 rounded-full font-bold text-sm shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 text-gray-800">
                    {item.price}
                </div>

                {/* Filter / Place Badge */}
                {(item.filterTag || item.place) && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-all duration-300">
                        {item.filterTag || item.place}
                    </div>
                )}

                {/* Add to Cart overlay — slides up from bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <button
                        onClick={() => onAddToCart(item)}
                        className="ripple-btn w-full bg-white/95 backdrop-blur-md text-gray-900 font-bold py-3 px-6 rounded-xl hover:bg-accent hover:text-white transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 text-sm"
                    >
                        <span className="text-lg">🛒</span> Add to Cart
                    </button>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-2">
                    <h3 className="text-base font-heading font-bold text-gray-800 line-clamp-1 group-hover:text-violet-700 transition-colors duration-300">
                        {item.name}
                    </h3>
                    {item.description ? (
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {item.description}
                        </p>
                    ) : (
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1.5">
                            {item.vendorName ? `By ${item.vendorName}` : "Authentic Tamil Nadu"}
                        </p>
                    )}
                </div>

                {/* Bottom bar */}
                <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-gray-400 font-medium">
                            {isOwner ? "Your Product" : item.vendorName ? `${item.vendorName}` : "In Stock"}
                        </span>
                    </div>

                    {isOwner && (
                        <button
                            className="text-red-400 hover:text-white hover:bg-red-500 p-2 rounded-lg transition-all duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(item.id);
                            }}
                            title="Delete Item"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
