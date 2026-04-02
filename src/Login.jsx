import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // customer, vendor, government
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const resetError = () => setError("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetError();

    if (!email || password.trim().length === 0) {
      setError("Please enter email and password.");
      return;
    }

    // ---------------- SIGNUP ----------------
    if (mode === "signup") {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}"}/api/signup`, {
          email,
          password,
          vendor: role === "vendor",
          government: role === "government" // ✅ Added government flag
        });

        // Auto-login or redirect
        if (role === "vendor") {
          navigate("/vendor-login"); // Redirect to vendor login page
        } else if (role === "government") {
          // For government officials, redirect to login to authenticate
          alert("Account created! Please log in.");
          setMode("login");
        } else {
          // For customer, try to login automatically or redirect to login (switching mode)
          alert("Account created! Please log in.");
          setMode("login");
        }
      } catch (err) {
        console.error("Signup error:", err);
        setError(err.response?.data?.error || "Signup failed");
      }
      return;
    }

    // ---------------- LOGIN ----------------
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}"}/api/login`, {
        email,
        password
      });

      const { token, vendor, government, email: userEmail } = res.data; // ✅ Added government

      if (vendor) {
        // Logged in as vendor
        localStorage.setItem("vendor_token", JSON.stringify(res.data));
        navigate("/vendor/upload", { replace: true });
      } else if (government) {
        // ✅ Logged in as government official
        localStorage.setItem("gov_token", JSON.stringify(res.data));
        navigate("/dashboard", { replace: true });
      } else {
        // Logged in as customer
        localStorage.setItem("auth_token", token);
        navigate("/home", { replace: true });
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-[#030712] font-sans selection:bg-indigo-500/30">
      {/* Left: Cinematic Showcase (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center bg-gradient-to-br from-indigo-900/40 to-violet-900/40 border-r border-white/5">
        {/* Abstract Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-fuchsia-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-1000" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] left-[30%] w-[20vw] h-[20vw] bg-blue-500/20 rounded-full blur-[80px] mix-blend-screen animate-pulse duration-1000" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 p-12 max-w-xl text-center transform transition-all hover:scale-105 duration-700">
          <div className="inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-2xl relative group">
            <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-xl group-hover:bg-indigo-500/40 transition-colors"></div>
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-400/50 relative z-10 drop-shadow-[0_0_20px_rgba(99,102,241,0.6)] transform group-hover:scale-110 transition-transform duration-500">
              <img
                src="https://img.freepik.com/premium-photo/watercolor-illustration-tamil-nadu-day-with-iconic-temples_1102-14904.jpg?w=2000"
                alt="Tamil Nadu Logo"
                className="w-full h-full object-cover object-center scale-[1.35]"
              />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-white mb-6 tracking-tight drop-shadow-lg">
            Discover Tamil Nadu.
          </h1>
          <p className="text-lg text-indigo-200/80 font-light leading-relaxed">
            Embark on a soul-stirring journey through the Land of Temples. Immerse yourself in ancient architectural marvels, vibrant culture, and breathtaking landscapes that span from misty hills to serene coastlines.
          </p>
        </div>

      </div>

      {/* Right: Authentication Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden">
        {/* Mobile Background Elements */}
        <div className="absolute inset-0 lg:hidden overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[80vw] h-[80vw] bg-indigo-600/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-fuchsia-600/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          {/* Form Header */}
          <div className="mb-10 text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 tracking-tight">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {mode === "login"
                ? "Please enter your details to sign in."
                : "Start your journey with us today."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5 group">
              <label className="text-sm font-medium text-gray-300 block">Email address</label>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:bg-white/10 focus-within:border-indigo-500/50 transition-all duration-300">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path></svg>
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent focus:outline-none text-white placeholder-gray-500/70"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-1.5 group">
              <label className="text-sm font-medium text-gray-300 block">Password</label>
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 focus-within:bg-white/10 focus-within:border-indigo-500/50 transition-all duration-300">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-transparent focus:outline-none text-white placeholder-gray-500/70"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-1.5 group transition-all duration-500" style={{ animation: "fade-in-up 0.4s ease-out forwards" }}>
                <label className="text-sm font-medium text-gray-300 block">Account Type</label>
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] focus-within:bg-[#1e293b] focus-within:border-indigo-500/50 transition-all duration-300 shadow-inner">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500 group-focus-within:text-indigo-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-transparent focus:outline-none text-white appearance-none cursor-pointer"
                  >
                    <option value="customer" className="bg-slate-900 text-white py-2">Traveler / Explorer</option>
                    <option value="vendor" className="bg-slate-900 text-white py-2">Partner Vendor</option>
                    <option value="government" className="bg-slate-900 text-white py-2">Government Official</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3 backdrop-blur-sm" style={{ animation: "fade-in 0.3s ease-out forwards" }}>
                <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <p className="text-sm text-red-400 font-medium leading-relaxed">{error}</p>
              </div>
            )}

            <div className="pt-2">
              <button type="submit" className="relative w-full py-4 text-white font-bold rounded-xl overflow-hidden group shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 border border-indigo-500/30">
                {/* Button Background gradient + animated hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 transition-transform duration-500 group-hover:scale-[1.05]"></div>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {mode === "login" ? "Sign In" : "Create Account"}
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-gray-400 text-sm">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              {' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  resetError();
                }}
                className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none hover:underline underline-offset-4 decoration-2"
              >
                {mode === "login" ? "Sign up" : "Log in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
