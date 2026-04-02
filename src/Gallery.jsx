import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// ——— GALLERY DATA WITH WIKIMEDIA HIGH-RES IMAGES ———
const galleryItems = [
    { id: 1, name: "Meenakshi Amman Temple", location: "Madurai", linkTarget: "Meenakshi Amman Temple", img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=100" },
    { id: 2, name: "Brihadeeswarar Temple", location: "Thanjavur", linkTarget: "Brihadeeswarar Temple", img: "https://lh3.googleusercontent.com/gps-cs-s/AHVAweo71YSXQea4Igh6wmAmLfKpCD1NAfPPoDt7nCjkdrPbEbHhAf0GQZaTWnmjVWMW-YsGTU8NmMTdcE_C6tprysXH449jxjRxkCkJQVuUSz-1rvsquDLrtms1UA4wyfglSGxMea66msg3WAcN=w270-h312-n-k-no" },
    { id: 3, name: "Ooty Lake & Hills", location: "Ooty", linkTarget: "Ooty", img: "https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=center,quality=60,width=400,height=265,dpr=2/tour_img/a9cc40459c4b133f67fed130767dcd7bcb42ca2bcc61a79f63eccf693226b30a.jpg" },
    { id: 4, name: "Shore Temple", location: "Mahabalipuram", linkTarget: "Mahabalipuram", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg/1280px-Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg" },
    { id: 5, name: "Kodaikanal Lake", location: "Kodaikanal", linkTarget: "Kodaikanal", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIeCztYIhRYNNHfS8uBO2XwIAcZ0GKOB2cJQ&s" },
    { id: 6, name: "Ramanathaswamy Temple", location: "Rameswaram", linkTarget: "Rameswaram", img: "https://www.ancient-origins.net/sites/default/files/styles/article_image/public/field/image/The-Ramanathaswamy-Temple.jpg?itok=gBZatnn6" },
    { id: 7, name: "Hogenakkal Falls", location: "Dharmapuri", linkTarget: "Hogenakkal Falls", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3rolOwysTi0_rt2vY3--yy2C0pQFqKJfCaA&s" },
    { id: 8, name: "Kapaleeshwarar Temple", location: "Chennai", linkTarget: "Kapaleeshwarar Temple", img: "https://www.mrpilot.in/blog/wp-content/uploads/2020/01/Kapaleeshwarar-Temple-Chennai.jpg" },
    { id: 9, name: "Mudumalai Tiger Reserve", location: "Nilgiris", linkTarget: "Mudumalai", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Tiger_Drinking_Pond_Mudumalai_Mar21_DSC01310.jpg/1280px-Tiger_Drinking_Pond_Mudumalai_Mar21_DSC01310.jpg" },
    { id: 10, name: "Nataraja Temple", location: "Chidambaram", linkTarget: "Chidambaram", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSW6K1Zu3McS7VF3NbyKlKf32_s-6ojsIh85g&s" },
    { id: 11, name: "Yercaud Hills", location: "Salem", linkTarget: "Yercaud", img: "https://th.bing.com/th/id/OIP.vVe5rULCp_4petBl37SM_gHaEK?w=265&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 12, name: "Marina Beach", location: "Chennai", linkTarget: "Marina Beach", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8x3bSg_OHvNGs0sQASfTRXuNvM1P4DW1VBw&s" },
    { id: 13, name: "Kanyakumari Tip", location: "Kanyakumari", linkTarget: "Kanyakumari", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpSE78dBzajdXn_Ss6dF1yHLLhmMmTuESOzg&s" },
    { id: 14, name: "Pamban Bridge", location: "Rameswaram", linkTarget: "Rameswaram", img: "https://images.indianexpress.com/2025/04/pamban-bridge.jpg" },
    { id: 15, name: "Dhanushkodi", location: "Rameswaram", linkTarget: "Rameswaram", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-yLVk9VpP5gRiSG82q1NUw1m6_KiyOP-RMw&s" },
    { id: 16, name: "Nilgiri Toy Train", location: "Nilgiris", linkTarget: "Ooty", img: "https://www.sakshipost.com/sites/default/files/article_images/2022/01/10/OOTY-1557144864.jpg" },
];

const TiltCard = ({ item, onClick }) => {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // Calculate mouse position relative to center
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Max tilt of 12 degrees for premium feel
        const maxTilt = 12;
        const tiltX = -(y / (rect.height / 2)) * maxTilt;
        const tiltY = (x / (rect.width / 2)) * maxTilt;

        setTilt({ x: tiltX, y: tiltY });
    };

    return (
        <div
            ref={cardRef}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { setIsHovered(false); setTilt({ x: 0, y: 0 }); }}
            className="relative w-[85vw] sm:w-[500px] lg:w-[600px] h-[55vw] sm:h-[350px] lg:h-[400px] cursor-pointer"
            style={{
                transformStyle: 'preserve-3d',
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1})`,
                transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out'
            }}
        >
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)]" style={{ transform: 'translateZ(0px)' }}>
                <img src={item.img} alt={item.name} className="w-full h-full object-cover brightness-[0.5] hover:brightness-[0.8] transition-all duration-500" />
            </div>

            {/* Dynamic Glare Effect */}
            {isHovered && (
                <div
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-50 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(circle at ${(tilt.y + 12) / 24 * 100}% ${(-tilt.x + 12) / 24 * 100}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`
                    }}
                ></div>
            )}

            {/* Floating 3D Content */}
            <div className="absolute bottom-8 left-8 right-8 pointer-events-none flex flex-col items-start" style={{ transform: 'translateZ(70px)' }}>
                <span className="inline-block px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full text-xs font-bold text-cyan-400 uppercase tracking-widest mb-3 border border-cyan-400/30">
                    📍 {item.location}
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-white drop-shadow-[0_5px_8px_rgba(0,0,0,1)]">
                    {item.name}
                </h2>
            </div>
        </div>
    );
};

const Gallery = () => {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Init
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Physics constants
    const itemZSpacing = 1500; // Distance between items in Z-space
    const totalScrollHeight = (galleryItems.length + 1) * 150 + "vh"; // Creates the track length + 1

    return (
        <div style={{ height: totalScrollHeight, background: '#020205' }}>

            {/* Fixed Viewport window for the camera */}
            <div className="fixed top-0 left-0 w-full h-screen overflow-hidden bg-[#020205]" style={{ perspective: '1200px' }}>

                {/* Immersive Deep Space / Night Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#020205] to-[#020205]"></div>

                {/* Floating Dust / Stars overlay (static but sets mood) */}
                <div className="absolute inset-0 opacity-20 mix-blend-screen" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

                {/* UI Header */}
                <div
                    className="absolute top-10 left-8 md:top-14 md:left-14 z-50 pointer-events-none transition-opacity duration-1000"
                    style={{ opacity: scrollY > 300 ? 1 : 0 }}
                >
                    <h1 className="text-3xl md:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-2xl tracking-wider uppercase">
                        Tamil Nadu 3D
                    </h1>
                </div>

                {/* Interactive 3D World container */}
                <div
                    className="absolute top-1/2 left-1/2 w-full h-full pointer-events-none"
                    style={{
                        transformStyle: 'preserve-3d',
                        // Move the entire world backwards based on scroll to simulate camera moving forwards
                        transform: `translate(-50%, -50%) translateZ(${scrollY * 1.5}px)`
                    }}
                >
                    {/* Welcome Text in 3D Space */}
                    <div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-none"
                        style={{
                            transform: `translate(-50%, -50%) translate3d(0vw, 0vh, 0px)`,
                            opacity: 1 - (scrollY * 1.5) / 1000,
                            display: scrollY * 1.5 > 1000 ? 'none' : 'block'
                        }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-heading font-black text-center leading-tight uppercase tracking-tighter">
                            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Explore</span><br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-[0_0_25px_rgba(34,211,238,0.5)] block md:-mt-4">
                                Tamil Nadu
                            </span>
                        </h1>
                        <p className="text-cyan-400 font-medium tracking-[0.3em] font-body mt-8 md:mt-12 uppercase text-sm md:text-base text-center animate-pulse">
                            Scroll to explore the universe
                        </p>
                    </div>

                    {galleryItems.map((item, index) => {
                        // Position logic for each item
                        const isEven = index % 2 === 0;

                        // X Offset creates a winding path (left and right)
                        const xOffset = isEven ? 25 : -25; // vw

                        // Y Offset scatters them vertically slightly for organic feel
                        const yOffset = (index % 3 === 0 ? 15 : index % 3 === 1 ? -15 : 0); // vh

                        // Each item placed linearly deeper into the screen (moved back by an extra itemZSpacing)
                        const itemZ = -(index + 1) * itemZSpacing;

                        // Angle them slightly towards the center path
                        const rotateY = isEven ? -10 : 10;

                        // Calculate relative depth for fading and culling
                        const relativeZ = itemZ + (scrollY * 1.5);

                        // Opacity math:
                        // Disappear when behind camera (relativeZ > 600)
                        // Disappear when deep in fog (relativeZ < -6000)
                        let opacity = 1;
                        if (relativeZ > 600) opacity = 0;
                        else if (relativeZ < -6000) opacity = 0;
                        else if (relativeZ < -4000) opacity = 1 - ((-4000 - relativeZ) / 2000); // fade in from distance
                        else if (relativeZ > 0) opacity = 1 - (relativeZ / 600); // fade out as it hits camera

                        return (
                            <div
                                key={item.id}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 will-change-transform pointer-events-auto"
                                style={{
                                    transform: `translate(-50%, -50%) translate3d(${xOffset}vw, ${yOffset}vh, ${itemZ}px) rotateY(${rotateY}deg)`,
                                    opacity: opacity,
                                    zIndex: galleryItems.length - index,
                                    display: opacity <= 0 ? 'none' : 'block',
                                    transition: 'opacity 0.2s ease-out'
                                }}
                            >
                                <TiltCard item={item} onClick={() => navigate(`/destination/${encodeURIComponent(item.linkTarget)}`)} />
                            </div>
                        )
                    })}
                </div>

                {/* Scroll Indicator at bottom */}
                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-50 pointer-events-none opacity-70">
                    <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-2">Keep Scrolling</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>

            </div>
        </div>
    );
};

export default Gallery;