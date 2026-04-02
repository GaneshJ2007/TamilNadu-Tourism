import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  travelEssentials,
  authenticLocalProducts,
  handicraftsAndCulturalItems,
  allHandicraftItems,
  essentialFilterTags,
} from "./data/travelStoreData";
import ProductCard from "./components/ProductCard";

const TABS = [
  { id: "essentials", label: "Travel Essentials", icon: "🎒", gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/25", desc: "Gear up for your next adventure" },
  { id: "local-products", label: "Authentic Local Products", icon: "🍫", gradient: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/25", desc: "Taste Tamil Nadu's finest" },
  { id: "handicrafts", label: "Handicrafts & Cultural", icon: "🎨", gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/25", desc: "Tradition meets artistry" },
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80",
  "https://images.unsplash.com/photo-1621427640013-94afc7dce10e?w=1920&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
];

const Marketplace = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [vendorItems, setVendorItems] = useState([]);
  const [isVendor, setIsVendor] = useState(false);
  const [vendorEmail, setVendorEmail] = useState(null);
  const [activeTab, setActiveTab] = useState("essentials");
  const [essentialFilter, setEssentialFilter] = useState("All");
  const [heroIndex, setHeroIndex] = useState(0);
  const [tabTransition, setTabTransition] = useState(false);
  const sectionRef = useRef(null);

  // Hero image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vendor-items");
        setVendorItems(res.data);
      } catch (err) {
        console.error("Error fetching vendor items:", err);
      }
    };
    fetchItems();

    try {
      const vtRaw = localStorage.getItem("vendor_token");
      const vt = vtRaw ? JSON.parse(vtRaw) : null;
      if (vt && vt.vendor) {
        setIsVendor(true);
        setVendorEmail(vt.email);
      }
    } catch (error) {
      console.error("Error validating vendor:", error);
      setIsVendor(false);
    }
  }, []);

  const handleTabSwitch = (tabId) => {
    if (tabId === activeTab) return;
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setTabTransition(false);
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);
  };

  const deleteVendorItem = async (id) => {
    if (!window.confirm("Delete this product? This can't be undone.")) return;
    try {
      const vtRaw = localStorage.getItem("vendor_token");
      const vt = vtRaw ? JSON.parse(vtRaw) : null;
      if (!vt || !vt.token) {
        alert("You must be logged in as a vendor to delete items.");
        return;
      }
      await axios.delete(`http://localhost:5000/api/vendor-items/${id}`, {
        headers: { Authorization: `Bearer ${vt.token}` },
      });
      const res = await axios.get("http://localhost:5000/api/vendor-items");
      setVendorItems(res.data);
    } catch (err) {
      console.error("Error deleting item:", err);
      alert(err.response?.data?.error || "Failed to delete item");
    }
  };

  const addToCart = (product) => {
    setCart((prev) => [...prev, { ...product, quantity: 1 }]);
  };

  const goToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  const getVendorItemsForSection = (sectionId) => {
    return vendorItems.filter((item) => {
      const sec = (item.section || "").toLowerCase();
      if (sectionId === "essentials") return sec === "travel-essentials";
      if (sectionId === "local-products") return sec === "authentic-local-products";
      if (sectionId === "handicrafts") return sec === "handicrafts-cultural";
      return false;
    });
  };

  const filteredEssentials =
    essentialFilter === "All"
      ? travelEssentials
      : travelEssentials.filter((item) => item.filterTag === essentialFilter);

  const activeTabData = TABS.find((t) => t.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/40 via-orange-50/20 to-white pb-24">

      {/* ━━━━━━━━━━ HERO SECTION ━━━━━━━━━━ */}
      <div className="relative h-[520px] overflow-hidden">
        {/* Background images with crossfade */}
        {HERO_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-[2000ms] ease-in-out"
            style={{
              opacity: heroIndex === i ? 1 : 0,
              backgroundImage: `url('${img}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-amber-50/80" />

        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              width: `${8 + i * 4}px`,
              height: `${8 + i * 4}px`,
              background: `rgba(245, 158, 11, ${0.15 + i * 0.05})`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i * 2}s`,
            }}
          />
        ))}

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <div className="animate-bounce-in">
            <span className="text-6xl mb-5 block drop-shadow-2xl">🛍️</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 font-heading tracking-tight animate-fade-in-up drop-shadow-2xl">
            Tamil Nadu{" "}
            <span className="gradient-text">Travel Store</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed animate-fade-in opacity-0" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            From trekking gear to authentic local delicacies and exquisite handicrafts — everything for your Tamil Nadu adventure.
          </p>

          {/* Quick stats */}
          <div className="flex gap-8 mt-8 animate-fade-in-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            {[
              { num: "70+", label: "Products" },
              { num: "10+", label: "Places" },
              { num: "3", label: "Categories" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-extrabold text-accent font-heading">{stat.num}</div>
                <div className="text-xs text-white/60 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Hero indicator dots */}
          <div className="flex gap-2 mt-8">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`transition-all duration-500 rounded-full ${heroIndex === i
                  ? "w-8 h-2 bg-accent"
                  : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━ ANIMATED SCROLLING BANNER ━━━━━━━━━━ */}
      <div className="overflow-hidden bg-gradient-to-r from-amber-100/60 via-orange-50/40 to-amber-100/60 py-3 border-y border-amber-200/50">
        <div className="marquee whitespace-nowrap flex gap-12 text-sm text-amber-800/60 font-medium">
          {[...Array(2)].map((_, r) => (
            <span key={r} className="flex gap-12 items-center">
              <span>🏔️ Hill Stations</span>
              <span className="text-accent">✦</span>
              <span>🏖️ Beaches</span>
              <span className="text-amber-500">✦</span>
              <span>🛕 Temples</span>
              <span className="text-accent">✦</span>
              <span>🎨 Handicrafts</span>
              <span className="text-violet-400">✦</span>
              <span>🍫 Local Foods</span>
              <span className="text-accent">✦</span>
              <span>👘 Silk Sarees</span>
              <span className="text-violet-400">✦</span>
              <span>🗿 Stone Art</span>
              <span className="text-accent">✦</span>
              <span>☕ Degree Coffee</span>
              <span className="text-violet-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ━━━━━━━━━━ TAB NAVIGATION ━━━━━━━━━━ */}
      <div className="sticky top-16 z-40 bg-white/80 backdrop-blur-2xl border-b border-amber-200/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex gap-3 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`ripple-btn whitespace-nowrap px-7 py-4 rounded-2xl text-sm font-bold transition-all duration-500 flex items-center gap-3 min-w-fit ${activeTab === tab.id
                  ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl ${tab.shadow} scale-[1.02] ring-2 ring-white/10`
                  : "text-gray-500 hover:text-gray-800 hover:bg-amber-50 border border-gray-200 hover:border-amber-300"
                  }`}
              >
                <span className={`text-xl ${activeTab === tab.id ? "animate-bounce" : ""}`}>{tab.icon}</span>
                <div className="text-left">
                  <div>{tab.label}</div>
                  {activeTab === tab.id && (
                    <div className="text-xs font-normal opacity-70 mt-0.5">{tab.desc}</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ━━━━━━━━━━ VENDOR CONTROLS ━━━━━━━━━━ */}
      {isVendor && (
        <div className="max-w-7xl mx-auto px-6 mt-6 mb-2 flex justify-end animate-fade-in">
          <div className="flex gap-3">
            <button
              className="ripple-btn px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-bold hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 flex items-center gap-2 text-sm"
              onClick={() => navigate("/vendor/upload")}
            >
              <span className="text-lg">+</span> Upload New Item
            </button>
            <button
              className="px-6 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all duration-300 text-sm"
              onClick={() => {
                localStorage.removeItem("vendor_token");
                setIsVendor(false);
                window.location.reload();
              }}
            >
              Logout Vendor
            </button>
          </div>
        </div>
      )}

      {/* ━━━━━━━━━━ CONTENT AREA ━━━━━━━━━━ */}
      <div
        ref={sectionRef}
        className={`transition-all duration-300 ${tabTransition ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
      >

        {/* ──── SECTION 1: TRAVEL ESSENTIALS ──── */}
        {activeTab === "essentials" && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            {/* Section Header */}
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Section 1 of 3
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-heading mb-3 tracking-tight">
                🎒 Travel Essentials
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-lg">
                Gear up for hill stations, beaches, and temple visits
              </p>
              <div className="animated-divider max-w-xs mx-auto mt-6" />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-12 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {essentialFilterTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setEssentialFilter(tag)}
                  className={`ripple-btn px-6 py-3 rounded-2xl text-sm font-bold transition-all duration-500 border-2 ${essentialFilter === tag
                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-transparent shadow-xl shadow-emerald-500/25 scale-105"
                    : "border-gray-200 text-gray-500 hover:border-emerald-400 hover:text-emerald-600 bg-white hover:bg-emerald-50"
                    }`}
                >
                  {tag === "All" && "🌟 "}
                  {tag === "Hill Station" && "⛰️ "}
                  {tag === "Beach" && "🏖️ "}
                  {tag === "Temple Visit" && "🛕 "}
                  {tag === "All" ? "Show All" : `${tag}`}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7" key={essentialFilter}>
              {filteredEssentials.map((item, j) => (
                <ProductCard key={`ess-${j}`} item={item} onAddToCart={addToCart} isVendor={false} index={j} />
              ))}
            </div>

            {/* Vendor items */}
            {getVendorItemsForSection("essentials").length > 0 && (
              <VendorSection
                title="Travel Essentials"
                color="emerald"
                items={getVendorItemsForSection("essentials")}
                addToCart={addToCart}
                deleteItem={deleteVendorItem}
                isVendor={isVendor}
                vendorEmail={vendorEmail}
              />
            )}
          </section>
        )}

        {/* ──── SECTION 2: AUTHENTIC LOCAL PRODUCTS ──── */}
        {activeTab === "local-products" && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                Section 2 of 3
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-heading mb-3 tracking-tight">
                🍫 Authentic Local Products
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-lg">
                Famous foods from iconic Tamil Nadu destinations
              </p>
              <div className="animated-divider max-w-xs mx-auto mt-6" />
            </div>

            {authenticLocalProducts.map((group, gi) => (
              <div key={gi} className="mb-16 animate-fade-in-up" style={{ animationDelay: `${gi * 0.1}s` }}>
                {/* Place Header */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="icon-bounce w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl shadow-xl shadow-orange-500/20 ring-4 ring-orange-500/10">
                    {group.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-gray-900 font-heading tracking-tight">
                      {group.place}
                    </h3>
                    <p className="text-sm text-gray-500">Famous delicacies & specialties</p>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-amber-300/50 to-transparent ml-4" />
                  <span className="text-xs text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {group.items.length} items
                  </span>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                  {group.items.map((item, j) => (
                    <ProductCard
                      key={`food-${gi}-${j}`}
                      item={{ ...item, place: group.place }}
                      onAddToCart={addToCart}
                      isVendor={false}
                      index={gi * 4 + j}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Vendor items */}
            {getVendorItemsForSection("local-products").length > 0 && (
              <VendorSection
                title="Local Products"
                color="amber"
                items={getVendorItemsForSection("local-products")}
                addToCart={addToCart}
                deleteItem={deleteVendorItem}
                isVendor={isVendor}
                vendorEmail={vendorEmail}
              />
            )}
          </section>
        )}

        {/* ──── SECTION 3: HANDICRAFTS & CULTURAL ITEMS ──── */}
        {activeTab === "handicrafts" && (
          <section className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-12 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse" />
                Section 3 of 3
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 font-heading mb-3 tracking-tight">
                🎨 Handicrafts & Cultural Items
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto text-lg">
                Exquisite handcrafted treasures — tourism meets tradition
              </p>
              <div className="animated-divider max-w-xs mx-auto mt-6" />
            </div>

            {/* All Items View */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8 animate-fade-in">
                <span className="px-4 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-500/20">
                  ✨ All Items
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-violet-300/50 to-transparent" />
                <span className="text-xs text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
                  {allHandicraftItems.length} items
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                {allHandicraftItems.map((item, j) => (
                  <ProductCard key={`all-hc-${j}`} item={item} onAddToCart={addToCart} isVendor={false} index={j} />
                ))}
              </div>
            </div>

            {/* By Origin */}
            <div className="mt-8">
              <div className="flex items-center gap-4 mb-10 animate-fade-in">
                <span className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20">
                  📍 By Origin
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-indigo-300/50 to-transparent" />
              </div>

              {handicraftsAndCulturalItems.map((group, gi) => (
                <div key={gi} className="mb-16 animate-fade-in-up" style={{ animationDelay: `${gi * 0.12}s` }}>
                  <div className="flex items-center gap-5 mb-8">
                    <div className="icon-bounce w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-3xl shadow-xl shadow-violet-500/20 ring-4 ring-violet-500/10">
                      {group.icon}
                    </div>
                    <div>
                      <h4 className="text-2xl font-extrabold text-gray-900 font-heading tracking-tight">
                        {group.place}
                      </h4>
                      <p className="text-sm text-gray-500">Traditional crafts & artistry</p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-violet-300/50 to-transparent ml-4" />
                    <span className="text-xs text-violet-700 bg-violet-50 px-3 py-1 rounded-full border border-violet-200">
                      {group.items.length} items
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
                    {group.items.map((item, j) => (
                      <ProductCard
                        key={`hc-${gi}-${j}`}
                        item={{ ...item, place: group.place }}
                        onAddToCart={addToCart}
                        isVendor={false}
                        index={gi * 4 + j}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Vendor items */}
            {getVendorItemsForSection("handicrafts").length > 0 && (
              <VendorSection
                title="Handicrafts"
                color="violet"
                items={getVendorItemsForSection("handicrafts")}
                addToCart={addToCart}
                deleteItem={deleteVendorItem}
                isVendor={isVendor}
                vendorEmail={vendorEmail}
              />
            )}
          </section>
        )}
      </div>

      {/* ━━━━━━━━━━ FLOATING CART ━━━━━━━━━━ */}
      {cart.length > 0 && (
        <div
          className="cart-pulse fixed bottom-8 right-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 px-8 rounded-2xl shadow-2xl shadow-amber-500/40 cursor-pointer hover:shadow-amber-500/60 hover:-translate-y-2 transition-all duration-500 z-50 flex items-center gap-4 font-bold text-lg ring-2 ring-white/20 backdrop-blur-xl"
          onClick={goToCart}
        >
          <span className="text-2xl animate-bounce">🛒</span>
          <div className="flex flex-col">
            <span className="text-base">{cart.length} Items</span>
            <span className="text-xs font-normal text-amber-100">Tap to checkout</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <span className="text-2xl">→</span>
        </div>
      )}
    </div>
  );
};

/* ─── Vendor Section Sub-component ─── */
const VendorSection = ({ title, color, items, addToCart, deleteItem, isVendor, vendorEmail }) => {
  const colorMap = {
    emerald: { bar: "bg-emerald-500", text: "text-emerald-700" },
    amber: { bar: "bg-amber-500", text: "text-amber-700" },
    violet: { bar: "bg-violet-600", text: "text-violet-700" },
  };
  const c = colorMap[color] || colorMap.violet;

  return (
    <div className="mt-16 animate-fade-in-up">
      <div className="flex items-center gap-3 mb-8">
        <span className={`w-1.5 h-10 ${c.bar} rounded-full`} />
        <h3 className={`text-xl font-bold ${c.text} font-heading`}>
          Vendor Uploads — {title}
        </h3>
        <div className="flex-1 h-px bg-gray-200 ml-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {items.map((item, i) => (
          <ProductCard
            key={item.id}
            item={item}
            onAddToCart={addToCart}
            onDelete={deleteItem}
            isVendor={isVendor}
            currentVendorEmail={vendorEmail}
            index={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
