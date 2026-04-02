import React, { useEffect, useRef } from "react";
import HeroSection from "./components/HeroSection";
import SectionCard from "./components/SectionCard";
import CuisineCard from "./components/CuisineCard";
import Chatbot from "./components/Chatbot";
import { categories } from "./data/destinations";

// Premium Exact Hero Images (Wikimedia High-Res)
const heroImages = [
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80",
  "https://www.stayvista.com/blog/wp-content/uploads/2024/12/harshal-more-8dS_mTPZ38w-unsplash-1536x1229.jpg",
  "https://www.fabhotels.com/blog/wp-content/uploads/2024/04/a3ae2f1b-velankanni.png",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg/1280px-Shore_Temple_-Mamallapuram_-Tamil_Nadu_-N-TN-C55.jpg"
];

// Categories imported from data/destinations.js

const cuisineData = [
  {
    name: "Chettinad Chicken",
    image: "https://th.bing.com/th/id/OIP.FiT61W3EN3orU-6XDTfjGgHaHa?w=173&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    description: "Spicy and aromatic chicken curry from the Chettinad region, famous for its roasted spices and coconut.",
  },
  {
    name: "Idli & Sambar",
    image: "https://tse1.mm.bing.net/th/id/OIP.yawESbOSHJ0OS_NR6I6e1wHaHa?w=600&h=600&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Soft, fluffy steamed rice cakes served with lentil stew and coconut chutney. The classic breakfast.",
  },
  {
    name: "Masala Dosa",
    image: "https://img.freepik.com/premium-photo/masala-dosa-this-is-popular-south-indian-dosa-variety-made-with-potato-filling-known-as-masala-dosa-is-made-by-spreading-thin-layer-fermented-rice-lentil-batter-hot-griddle_57665-25046.jpg?w=2000",
    description: "Crispy savory crepe stuffed with spiced potato filling, a globally loved South Indian delicacy.",
  },
  {
    name: "Filter Coffee",
    image: "https://th.bing.com/th/id/OIP.ehTtjC5a7tZMh5jVEzKWGwHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Strong, frothy coffee brewed in a traditional metal filter, known as 'Kaapi'.",
  }
];

const Home = () => {
  const scrollRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            entry.target.classList.remove("opacity-0", "translate-y-10");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    scrollRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      if (scrollRef.current) {
        scrollRef.current.forEach((el) => el && observer.unobserve(el));
      }
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !scrollRef.current.includes(el)) {
      scrollRef.current.push(el);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero Section */}
      <HeroSection images={heroImages} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">

        {/* 2. Destination Categories */}
        {[
          { id: 'hills', title: '⛰️ Hills & Valleys', data: categories.flatMap(c => c.data).filter(p => p.area === 'Hills' && !p.hideOnHome).slice(0, 6) },
          { id: 'falls', title: '🌊 Waterfalls', data: categories.flatMap(c => c.data).filter(p => p.area === 'Falls' && !p.hideOnHome).slice(0, 6) },
          { id: 'spiritual', title: '🕊️ Spiritual Places', data: categories.flatMap(c => c.data).filter(p => (p.area === 'Temple' || p.area === 'Pilgrim') && !p.hideOnHome).slice(0, 6) },
          { id: 'beach', title: '🏖️ Beaches', data: categories.flatMap(c => c.data).filter(p => p.area === 'Beach' && !p.hideOnHome).slice(0, 6) },
          { id: 'heritage', title: '🏛️ Heritage & Architecture', data: categories.flatMap(c => c.data).filter(p => p.area === 'Heritage' && !p.hideOnHome).slice(0, 6) },
          { id: 'wildlife', title: '🐾 Wildlife & Nature', data: categories.flatMap(c => c.data).filter(p => (p.area === 'Wildlife' || p.area === 'Nature') && !p.hideOnHome).slice(0, 6) }
        ].filter(cat => cat.data.length > 0).map((category, catIndex) => (
          <div key={category.id} ref={addToRefs} className="opacity-0 translate-y-10 transition-all duration-1000 ease-out">
            <div className="flex items-center gap-4 mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark">
                {category.title}
              </h2>
              <div className="flex-grow h-[1px] bg-gradient-to-r from-accent to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.data.map((place, index) => (
                <div key={index} className="h-full">
                  <SectionCard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* 3. Cuisine Section */}
        <div ref={addToRefs} className="opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="text-center mb-12">
            <span className="text-accent font-bold tracking-widest uppercase text-sm">Flavors of South</span>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-dark mt-2">
              Culinary Delights
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cuisineData.map((item, index) => (
              <CuisineCard key={index} cuisine={item} />
            ))}
          </div>
        </div>

        {/* 4. Call to Action / Info Banner */}
        <div ref={addToRefs} className="opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <div className="relative rounded-3xl overflow-hidden bg-primary-dark text-white p-12 md:p-20 text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90"></div>
            {/* Decorative circles */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 leading-tight">
                Ready to Experience the Magic?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 font-light">
                Plan your perfect getaway with us. From temple trails to misty mountains, we have curated the best of Tamil Nadu just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-accent hover:bg-accent-hover text-white font-bold rounded-full shadow-lg hover:shadow-accent/50 transition-all transform hover:-translate-y-1 text-lg">
                  Plan Your Trip Now
                </button>
                <button className="px-8 py-4 bg-transparent border border-white/30 hover:bg-white/10 text-white font-bold rounded-full transition-all text-lg backdrop-blur-sm">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Chatbot />
    </div>
  );
};

export default Home;