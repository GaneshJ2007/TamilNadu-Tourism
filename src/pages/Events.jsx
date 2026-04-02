import React from 'react';
import { eventsData } from '../data/eventsData';

const Events = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16 relative">
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-100/50 to-transparent -z-10 rounded-3xl blur-3xl"></div>
                    <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent font-bold text-sm tracking-widest uppercase mb-4">
                        Discover & Celebrate
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-slate-800 mb-6 leading-tight">
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">Events</span> in Tamil Nadu
                    </h1>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-accent to-orange-500 mx-auto rounded-full mb-6"></div>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
                        Experience the vibrant culture, rich heritage, and seasonal festivities of our land. Plan your trip around these spectacular events!
                    </p>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-10">
                    {eventsData.map((event, index) => (
                        <div 
                            key={event.id} 
                            className="group bg-white rounded-[2rem] shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/20 overflow-hidden transform hover:-translate-y-2 transition-all duration-500 flex flex-col border border-slate-100/50"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image Section */}
                            <div className="relative h-64 overflow-hidden shrink-0 w-full">
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                                
                                {/* Category Badge */}
                                <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest border border-white/30 shadow-sm">
                                    {event.category}
                                </div>

                                {/* Date overlay */}
                                <div className="absolute bottom-5 left-5 right-5">
                                    <h3 className="text-3xl font-bold text-white mb-2 font-heading leading-tight drop-shadow-md group-hover:text-amber-300 transition-colors">
                                        {event.title}
                                    </h3>
                                    <div className="flex items-center text-white/90 text-sm font-medium">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {event.date}
                                    </div>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="p-8 flex flex-col flex-grow bg-white">
                                <div className="flex flex-col gap-3 mb-6">
                                    <div className="flex items-start text-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-indigo-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium text-[15px]">{event.timing}</span>
                                    </div>
                                    <div className="flex items-start text-slate-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-orange-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="font-medium text-[15px] leading-snug">{event.location}</span>
                                    </div>
                                </div>
                                <div className="h-[1px] w-full bg-slate-100 mb-6"></div>
                                <p className="text-slate-600 leading-relaxed text-[15px] flex-grow">
                                    {event.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
