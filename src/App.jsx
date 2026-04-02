import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./Home.jsx";
import PlanTrip from "./PlanTrip.jsx";
import Marketplace from "./Marketplace.jsx";
import Cart from "./Cart.jsx";
import Feedback from "./Feedback.jsx";
import FeedbackDashboard from "./FeedbackDashboard.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import RequireAuth from "./RequireAuth.jsx";
import RequireVendor from "./RequireVendor.jsx";
import RequireGov from "./RequireGov.jsx";
import VendorUpload from "./VendorUpload.jsx";
import VendorHotelUpload from "./VendorHotelUpload.jsx";
import VendorPackageUpload from "./VendorPackageUpload.jsx";
import VendorLogin from "./VendorLogin.jsx";
import Gallery from "./Gallery.jsx";
import DestinationDetails from "./pages/DestinationDetails.jsx";
import CategoryDetails from "./pages/CategoryDetails.jsx";
import DistrictDetails from "./pages/DistrictDetails.jsx";
import TourPackages from "./pages/TourPackages.jsx";
import TourPackageDetail from "./pages/TourPackageDetail.jsx";
import HotelsExplorer from "./pages/HotelsExplorer.jsx";
import Events from "./pages/Events.jsx";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function CustomerLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("gov_token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLogout={handleLogout} />
      <main className="flex-grow mt-20"> {/* Add margin for fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// ---------------- VENDOR NAVBAR ----------------
function VendorNavbar({ onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="flex gap-4 px-10 py-4 bg-white shadow-md items-center">
      <div className="mr-auto font-bold text-xl text-primary">
        Vendor Portal
      </div>
      <button onClick={() => navigate("/vendor/upload")} className="btn btn-primary">Upload Items</button>
      <button onClick={() => navigate("/vendor/hotels")} className="btn btn-primary">🏨 Hotels</button>
      <button onClick={() => navigate("/vendor/packages")} className="btn btn-primary">🗺️ Packages</button>
      <button onClick={() => navigate("/vendor/marketplace")} className="btn btn-primary">Travel Store</button>
      <button
        onClick={onLogout}
        className="btn btn-accent"
      >
        Logout
      </button>
    </nav>
  );
}

function VendorLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("vendor_token");
    localStorage.removeItem("gov_token");
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <VendorNavbar onLogout={handleLogout} />
      <main className="flex-grow p-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

// ---------------- MARKETPLACE WRAPPER ----------------
function MarketplaceWrapper() {
  const isVendor = !!localStorage.getItem("vendor_token");
  return <Marketplace vendor={isVendor} />;
}

// ---------------- APP ----------------
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Default → always go to login first */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-login" element={<VendorLogin />} />

        {/* Protected Customer Pages */}
        <Route element={<RequireAuth><CustomerLayout /></RequireAuth>}>
          <Route path="/home" element={<Home />} />
          <Route path="/plan-your-trip" element={<PlanTrip />} />
          <Route path="/marketplace" element={<MarketplaceWrapper />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/destination/:name" element={<DestinationDetails />} />
          <Route path="/category/:id" element={<CategoryDetails />} />
          <Route path="/district/:name" element={<DistrictDetails />} />
          <Route path="/packages" element={<TourPackages />} />
          <Route path="/packages/:id" element={<TourPackageDetail />} />
          <Route path="/hotels" element={<HotelsExplorer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

        {/* Protected Vendor Pages */}
        <Route element={<RequireVendor><VendorLayout /></RequireVendor>}>
          <Route path="/vendor/upload" element={<VendorUpload />} />
          <Route path="/vendor/marketplace" element={<MarketplaceWrapper />} />
          <Route path="/vendor/hotels" element={<VendorHotelUpload />} />
          <Route path="/vendor/packages" element={<VendorPackageUpload />} />
        </Route>

        {/* Protected Government Dashboard */}
        <Route
          path="/dashboard"
          element={
            <RequireGov>
              <FeedbackDashboard />
            </RequireGov>
          }
        />

        {/* Catch all → redirect based on role */}
        <Route
          path="*"
          element={
            localStorage.getItem("auth_token") ? <Navigate to="/home" replace /> :
              localStorage.getItem("vendor_token") ? <Navigate to="/vendor/upload" replace /> :
                localStorage.getItem("gov_token") ? <Navigate to="/dashboard" replace /> :
                  <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

