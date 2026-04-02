import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // default role
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please provide email and password");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        vendor: role === "vendor",
        government: role === "government" // ✅ Added government flag
      });
      alert("Registered successfully. Please login.");
      // Depending on logic, maybe redirect to correct login page
      // But for now keeping generic login redirect or we can redirect to vendor login if role is vendor
      if (role === 'vendor') {
        navigate("/vendor/login");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-2xl shadow-xl font-sans animate-fade-in border border-gray-100">
      <h2 className="text-center mb-6 text-3xl font-bold text-gray-800">📝 Sign up</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white"
          />
        </div>

        {/* Dropdown for role selection */}
        <div className="mt-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Register as</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white transition-all cursor-pointer hover:border-indigo-400"
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="government">Government Official</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-2.5 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 mt-4">
          Sign up
        </button>
      </form>
    </div>
  );
}
