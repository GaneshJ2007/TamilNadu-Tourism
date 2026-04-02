import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { vendorCategories } from "./data/travelStoreData";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // If a customer is already logged in, don't allow access to vendor login
  useEffect(() => {
    const cust = localStorage.getItem("auth_token");
    if (cust) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const from = location.state?.from?.pathname || "/vendor/upload";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please provide both email and password.");
      return;
    }
    if (!selectedCategory) {
      setError("Please select your vendor category.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}"}/api/login`, {
        email,
        password,
      });

      if (res.data.vendor) {
        // Store vendor token with selected category
        const tokenData = {
          ...res.data,
          vendorCategory: selectedCategory,
        };
        localStorage.setItem("vendor_token", JSON.stringify(tokenData));
        navigate(from, { replace: true });
      } else {
        setError("This account is not authorized as a vendor.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const categoryIcons = {
    "travel-essentials": "🎒",
    "authentic-local-products": "🍫",
    "handicrafts-cultural": "🎨",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(15,23,42,0.85), rgba(88,28,135,0.7)), url('https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=1920&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full bg-white/95 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/20 animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🏪</span>
          <h2 className="text-3xl font-extrabold text-gray-900 font-heading">
            Vendor Portal
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Login to manage your Travel Store products
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
              placeholder="vendor@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
              placeholder="••••••••"
            />
          </div>

          {/* Category Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select Your Category
            </label>
            <div className="grid grid-cols-1 gap-3">
              {vendorCategories.map((cat) => (
                <button
                  type="button"
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-300 ${selectedCategory === cat.value
                      ? "border-violet-500 bg-violet-50 text-violet-800 shadow-md shadow-violet-500/10"
                      : "border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-violet-50/50"
                    }`}
                >
                  <span className="text-2xl">{categoryIcons[cat.value]}</span>
                  <div>
                    <div className="font-bold text-sm">{cat.label}</div>
                    <div className="text-xs text-gray-500">
                      {cat.value === "travel-essentials" && "Tents, trekking gear, travel bags..."}
                      {cat.value === "authentic-local-products" && "Local foods, snacks, beverages..."}
                      {cat.value === "handicrafts-cultural" && "Paintings, sculptures, sarees..."}
                    </div>
                  </div>
                  {selectedCategory === cat.value && (
                    <span className="ml-auto text-violet-600 text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 text-white font-bold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Login as Vendor →
          </button>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm text-center font-medium animate-pulse">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
