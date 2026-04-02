import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import tourPackages from "../data/tourPackagesData";

const TourPackageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pkg = tourPackages.find((p) => p.id === parseInt(id));

    useEffect(() => { window.scrollTo(0, 0); }, [id]);

    if (!pkg) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <h2 className="text-3xl font-heading font-bold text-slate-900 mb-4">Package Not Found</h2>
                    <button onClick={() => navigate("/packages")} className="btn btn-primary">Back to Packages</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Image */}
            <div className="relative h-[50vh] min-h-[380px] overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-6 pb-10 z-10">
                    <button
                        onClick={() => navigate("/packages")}
                        className="flex items-center gap-2 text-white/80 hover:text-accent transition-colors mb-4 text-sm font-medium backdrop-blur-md bg-black/20 px-4 py-2 rounded-full w-fit"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                        All Packages
                    </button>
                    <div className="flex items-center gap-4 mb-3">
                        <span className="bg-accent text-white text-sm font-extrabold px-4 py-2 rounded-full shadow-lg">
                            {pkg.days} {pkg.days === 1 ? "Day" : "Days"} Package
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white drop-shadow-xl">{pkg.title}</h1>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-[1fr_360px] gap-10">
                    {/* Left Content */}
                    <div className="space-y-10">
                        {/* Overview */}
                        <div className="bg-white rounded-2xl p-8 shadow-card border border-slate-100">
                            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-amber-400 flex items-center justify-center text-white text-lg">📋</span>
                                Overview
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-base">{pkg.highlights}</p>
                        </div>

                        {/* Places Covered */}
                        <div className="bg-white rounded-2xl p-8 shadow-card border border-slate-100">
                            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center text-white text-lg">📍</span>
                                Places Covered
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {pkg.places.map((place, i) => (
                                    <div key={i} className="group flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-gradient-to-r hover:from-accent/5 hover:to-amber-50 border border-slate-100 hover:border-accent/30 transition-all duration-300 cursor-default">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-amber-400 flex items-center justify-center text-white text-xs font-extrabold shadow-sm flex-shrink-0">
                                            {i + 1}
                                        </div>
                                        <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors text-sm">{place}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Fun Activities */}
                        <div className="bg-white rounded-2xl p-8 shadow-card border border-slate-100">
                            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white text-lg">🎯</span>
                                Fun Activities
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {pkg.activities.map((activity, i) => (
                                    <div key={i} className="group relative p-5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-100 hover:border-green-200 hover:shadow-md transition-all duration-300 overflow-hidden">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-500 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl">🎪</span>
                                            <span className="font-medium text-slate-700 text-sm">{activity}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stay Details */}
                        <div className="bg-white rounded-2xl p-8 shadow-card border border-slate-100">
                            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-4 flex items-center gap-3">
                                <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-400 flex items-center justify-center text-white text-lg">🏨</span>
                                Stay Details
                            </h2>
                            <div className="p-5 rounded-xl bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-100">
                                <p className="text-slate-700 font-medium leading-relaxed">{pkg.stay}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar — Price Card */}
                    <div className="lg:sticky lg:top-28 h-fit space-y-6">
                        <div className="bg-white rounded-2xl p-8 shadow-card-hover border border-slate-100 relative overflow-hidden">
                            <div className="absolute -top-16 -right-16 w-40 h-40 bg-accent/10 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Starting from</span>
                                <div className="text-4xl font-heading font-extrabold text-primary-dark mt-1 mb-1">
                                    ₹{pkg.price.toLocaleString()}
                                </div>
                                <span className="text-slate-400 text-sm">per person</span>

                                <div className="h-[1px] bg-slate-100 my-6"></div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">📅</span>
                                        <span className="text-slate-600"><strong className="text-slate-800">{pkg.days}</strong> {pkg.days === 1 ? "Day" : `Days / ${pkg.days - 1} Nights`}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">📍</span>
                                        <span className="text-slate-600"><strong className="text-slate-800">{pkg.places.length}</strong> Places</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-500">🎯</span>
                                        <span className="text-slate-600"><strong className="text-slate-800">{pkg.activities.length}</strong> Activities</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 bg-gradient-to-r from-accent to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:-translate-y-0.5 transition-all duration-300 text-base">
                                    Book This Package
                                </button>
                                <button className="w-full py-3 mt-3 bg-slate-50 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 transition-all text-sm border border-slate-200">
                                    Contact for Inquiry
                                </button>
                            </div>
                        </div>

                        {/* Quick help */}
                        <div className="bg-gradient-to-br from-primary-dark to-primary rounded-2xl p-6 text-white relative overflow-hidden">
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <h4 className="font-heading font-bold mb-2">Need Help?</h4>
                                <p className="text-gray-300 text-sm mb-3">Our travel experts are here to customize your trip.</p>
                                <div className="flex items-center gap-2 text-accent font-bold text-sm">
                                    📞 +91-1800-123-4567
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourPackageDetail;
