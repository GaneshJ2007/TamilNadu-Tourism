import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-primary-dark text-slate-300 pt-20 pb-10 mt-auto font-body border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <h2 className="text-2xl font-heading font-extrabold text-white mb-6">
                            TAMILNADU <span className="text-accent">TOURISM</span>
                        </h2>
                        <p className="leading-relaxed text-sm opacity-80 mb-6">
                            Embark on a journey through time and nature. Discover the land of temples, diverse cultures, and breathtaking landscapes.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-accent hover:text-white transition-all cursor-pointer">
                                    <div className="w-4 h-4 bg-current opacity-50 rounded-sm"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Explore</h3>
                        <ul className="space-y-4 text-sm">
                            {['Destinations', 'Culture', 'Cuisine', 'Festivals'].map((item) => (
                                <li key={item}>
                                    <Link to="/home" className="hover:text-accent transition-colors flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent opacity-0 hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Resources</h3>
                        <ul className="space-y-4 text-sm">
                            {[
                                { name: 'Marketplace', path: '/marketplace' },
                                { name: 'Gallery', path: '/gallery' },
                                { name: 'Feedback', path: '/feedback' },
                                { name: 'Plan a Trip', path: '/plan-trip' }
                            ].map((item) => (
                                <li key={item.name}>
                                    <Link to={item.path} className="hover:text-accent transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-heading font-bold text-lg mb-6">Contact</h3>
                        <ul className="space-y-4 text-sm">
                            <li className="flex gap-3">
                                <span className="text-accent">📍</span>
                                <span>Directorate of Tourism,<br />Chennai, Tamilnadu</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-accent">📞</span>
                                <span>+91-123-456-7890</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="text-accent">✉️</span>
                                <span>info@tamilnadutourism.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Tamilnadu Tourism. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

