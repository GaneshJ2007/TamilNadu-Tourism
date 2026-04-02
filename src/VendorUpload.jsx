import { useState, useEffect } from "react";
import axios from "axios";
import {
  vendorCategories,
  vendorPlaces,
  vendorFilterTags,
} from "./data/travelStoreData";

const defaultImages = [
  "https://m.media-amazon.com/images/I/81R7tjKHBeL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81BBZo+-YAL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71lZ-f3JKdL._SL1200_.jpg",
  "https://m.media-amazon.com/images/I/91NKf7M0XML._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/71cnCROCVUL._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/61X9Q9lK4hL._SL1100_.jpg",
  "https://m.media-amazon.com/images/I/71QIPwR6W8L._SL1500_.jpg",
  "https://m.media-amazon.com/images/I/81xpJRoiR3L._SL1500_.jpg",
];

export default function VendorUpload() {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorItems, setVendorItems] = useState([]);
  const [vendorEmail, setVendorEmail] = useState("");

  useEffect(() => {
    const tokenStr = localStorage.getItem("vendor_token");
    if (tokenStr) {
      const token = JSON.parse(tokenStr);
      setVendorEmail(token.email || "");
      // Pre-select category from vendor login
      if (token.vendorCategory) {
        setCategory(token.vendorCategory);
      }
      fetchVendorItems(token.email);
    }
  }, []);

  const fetchVendorItems = async (email) => {
    if (!email) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/vendor-items/vendor/${email}`
      );
      setVendorItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !productName ||
      !category ||
      !price ||
      !description ||
      !imageLink ||
      !vendorName
    ) {
      return alert("Please fill all fields including Vendor Name.");
    }

    try {
      const tokenStr = localStorage.getItem("vendor_token");
      const token = tokenStr ? JSON.parse(tokenStr) : null;

      if (!token || !token.token) {
        return alert("You must be logged in as a vendor to upload.");
      }

      const payload = {
        name: productName,
        category: subCategory || category,
        price: price.startsWith("₹") ? price : `₹${price}`,
        description,
        image: imageLink,
        section: category, // Main section (travel-essentials, authentic-local-products, handicrafts-cultural)
        subCategory: subCategory, // Filter tag or place
        vendorName: vendorName,
      };

      await axios.post("http://localhost:5000/api/vendor-items", payload, {
        headers: { Authorization: `Bearer ${token.token}` },
      });

      alert("Product uploaded successfully!");
      setProductName("");
      setSubCategory("");
      setPrice("");
      setDescription("");
      setImageLink("");
      fetchVendorItems(vendorEmail);
    } catch (err) {
      console.error("Error uploading item:", err);
      alert(err.response?.data?.error || "Upload failed");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const tokenStr = localStorage.getItem("vendor_token");
      const token = tokenStr ? JSON.parse(tokenStr) : null;

      await axios.delete(`http://localhost:5000/api/vendor-items/${id}`, {
        headers: { Authorization: `Bearer ${token.token}` },
      });

      fetchVendorItems(vendorEmail);
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("Failed to delete item");
    }
  };

  const getCategoryLabel = (val) => {
    const found = vendorCategories.find((c) => c.value === val);
    return found ? found.label : val;
  };

  const categoryIcons = {
    "travel-essentials": "🎒",
    "authentic-local-products": "🍫",
    "handicrafts-cultural": "🎨",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Upload Form Section */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-12 animate-fade-in-up border border-gray-100">
          <div className="bg-gradient-to-r from-violet-600 to-indigo-700 px-8 py-7">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <span className="text-3xl">📤</span> Vendor Upload Portal
            </h2>
            <p className="text-violet-100 mt-1">
              Add new products to the Tamil Nadu Travel Store
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Vendor Name + Product Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="Your Business Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Ooty Homemade Chocolates"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              {/* Row 2: Category + Sub-category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Store Section
                  </label>
                  <div className="space-y-2">
                    {vendorCategories.map((cat) => (
                      <label
                        key={cat.value}
                        className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300 ${category === cat.value
                            ? "border-violet-500 bg-violet-50 shadow-sm"
                            : "border-gray-200 hover:border-violet-300 bg-white"
                          }`}
                      >
                        <input
                          type="radio"
                          name="category"
                          value={cat.value}
                          checked={category === cat.value}
                          onChange={(e) => {
                            setCategory(e.target.value);
                            setSubCategory("");
                          }}
                          className="sr-only"
                        />
                        <span className="text-xl">
                          {categoryIcons[cat.value]}
                        </span>
                        <span className="font-bold text-sm text-gray-800">
                          {cat.label}
                        </span>
                        {category === cat.value && (
                          <span className="ml-auto text-violet-600">✓</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  {/* Conditional sub-category */}
                  {category === "travel-essentials" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Gear Type
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                      >
                        <option value="">Select gear type...</option>
                        {vendorFilterTags.map((tag) => (
                          <option key={tag} value={tag}>
                            {tag} Gear
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {category === "authentic-local-products" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Place of Origin
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                      >
                        <option value="">Select place...</option>
                        {vendorPlaces
                          .filter((p) => p !== "Mahabalipuram" && p !== "Kanchipuram")
                          .map((place) => (
                            <option key={place} value={place}>
                              {place}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  {category === "handicrafts-cultural" && (
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Place of Origin
                      </label>
                      <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                      >
                        <option value="">Select place...</option>
                        {vendorPlaces.map((place) => (
                          <option key={place} value={place}>
                            {place}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Price */}
                  <div className={category ? "mt-4" : ""}>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 1500"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                />
              </div>

              {/* Image Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Choose a Default Image or paste custom link:
                </label>
                <div className="flex flex-wrap gap-3 mb-4">
                  {defaultImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Default ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-xl cursor-pointer transition-all duration-200 hover:scale-110 ${imageLink === img
                          ? "ring-4 ring-violet-500 scale-105 shadow-lg"
                          : "border border-gray-200 hover:border-violet-300"
                        }`}
                      onClick={() => setImageLink(img)}
                    />
                  ))}
                </div>
                <input
                  type="text"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  placeholder="Or paste an Image URL here"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all bg-gray-50/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/25 transform hover:-translate-y-1 transition-all duration-200 text-lg"
              >
                Upload Product ⬆️
              </button>
            </form>
          </div>
        </div>

        {/* Uploaded Items Grid */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-violet-600 rounded-full" />
            📦 Your Uploaded Products
          </h3>

          {vendorItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
              <span className="text-5xl block mb-3">📭</span>
              <p className="text-gray-500 text-lg">No items uploaded yet.</p>
              <p className="text-sm text-gray-400 mt-1">
                Use the form above to add your first product!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {vendorItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:-translate-y-1"
                >
                  <div className="h-40 overflow-hidden bg-gray-100 relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    {/* Section Badge */}
                    <div className="absolute top-2 left-2 bg-violet-600/90 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {getCategoryLabel(item.section)}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4
                      className="font-bold text-gray-800 mb-1 truncate"
                      title={item.name}
                    >
                      {item.name}
                    </h4>
                    <p className="text-green-600 font-bold mb-3">{item.price}</p>
                    <button
                      onClick={() => deleteProduct(item.id)}
                      className="w-full py-2 px-3 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-xl transition-colors text-sm font-bold flex items-center justify-center gap-2"
                    >
                      <span>🗑️</span> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
