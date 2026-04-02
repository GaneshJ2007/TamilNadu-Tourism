import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // Payment form visibility and input states
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // Animation visibility state
  const [showAnimation, setShowAnimation] = useState(false);

  const userId = "12345"; // Replace with real auth

  useEffect(() => {
    if (location.state && location.state.cart) {
      setCartItems(location.state.cart.map(item => ({ ...item, quantity: item.quantity || 1 })));
    } else {
      // Fallback: fetch last order if no state (optional, or just show empty)
      const fetchOrders = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}/api/orders/${userId}`);
          if (res.data.length > 0) {
            const latestOrder = res.data[0];
            setCartItems(
              latestOrder.cart.map((item) => ({
                ...item,
                quantity: item.quantity || 1,
              }))
            );
          }
        } catch (err) {
          console.error("❌ Error fetching orders:", err);
        }
      };
      fetchOrders();
    }
  }, [location.state]);

  const incrementQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    setCartItems(updated);
  };

  const decrementQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      setCartItems(updated);
    }
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    return sum + price * item.quantity;
  }, 0);

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setShowCheckoutForm(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, phone, email, cardNumber, expiry, cvv } = formData;
    if (!name || !phone || !email || !cardNumber || !expiry || !cvv) {
      alert("Please fill all payment details");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Enter a valid email address");
      return false;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      alert("Enter a valid 16-digit card number");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      alert("Enter expiry in MM/YY format");
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      alert("Enter a valid 3-digit CVV");
      return false;
    }
    return true;
  };

  const [isBlockchainProcessing, setIsBlockchainProcessing] = useState(false); // ✅ Added for loading state

  const handleSubmitPayment = async (paymentType = 'card', txHash = null) => {
    // Only validate card form if it's a card payment
    if (paymentType === 'card' && !validateForm()) return;

    try {
      const orderData = {
        userId: userId,
        cart: cartItems,
        totalPrice: totalPrice.toFixed(2),
        paymentMethod: paymentType, // ✅ Store payment method
        transactionHash: txHash, // ✅ Store tx hash if available
        customerDetails: paymentType === 'card' ? formData : {
          name: "Blockchain User",
          email: "blockchain@pay.ment",
          phone: "0000000000"
        }
      };

      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}"}/api/orders`, orderData);
      console.log("✅ Order Placed:", res.data);

      setShowCheckoutForm(false);
      setShowAnimation(true);

      setTimeout(() => {
        setShowAnimation(false);
        clearCart();
        setFormData({
          name: "",
          phone: "",
          email: "",
          cardNumber: "",
          expiry: "",
          cvv: "",
        });
        navigate('/marketplace');
      }, 2500);

    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const handleBlockchainPayment = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to use blockchain payments!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      setIsBlockchainProcessing(true);
      // Modern way to import ethers v6+
      const { ethers } = await import('ethers');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // For demo, we'll convert INR to a very small amount of ETH
      // Suppose 1000 INR = 0.0001 ETH
      const ethAmount = (totalPrice / 10000000).toFixed(8);

      const tx = await signer.sendTransaction({
        to: "0x0000000000000000000000000000000000000000", // Replace with actual recipient address if needed
        value: ethers.parseEther(ethAmount)
      });

      console.log("Transaction sent:", tx.hash);
      alert(`Transaction sent! Hash: ${tx.hash}`);

      // Wait for 1 confirmation (simplified)
      // await tx.wait(); 

      await handleSubmitPayment('blockchain', tx.hash);
    } catch (err) {
      console.error("Blockchain error:", err);
      alert("Blockchain transaction failed or cancelled.");
    } finally {
      setIsBlockchainProcessing(false);
    }
  };

  const handleCancelPayment = () => {
    setShowCheckoutForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-50 rounded-xl shadow-lg font-body min-h-[50vh]">
      <h2 className="text-center mb-8 text-3xl font-bold text-gray-800 font-heading">🛒 Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <p className="text-xl text-gray-500">Your cart is empty.</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Browse Marketplace
          </button>
        </div>
      ) : (
        cartItems.map((item, index) => (
          <div key={index} className="flex items-center bg-white rounded-xl mb-5 p-5 shadow-sm hover:shadow-md transition-shadow">
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 rounded-lg mr-5 object-cover border border-gray-100"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
              <p className="text-green-600 font-bold mb-1">{item.price}</p>
              <p className="text-sm text-gray-500">
                {item.quantity} x {item.price} ={" "}
                <strong className="text-gray-800">
                  ₹{(parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * item.quantity).toFixed(2)}
                </strong>
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors text-lg"
                onClick={() => decrementQty(index)}
              >
                -
              </button>
              <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
              <button
                className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-blue-600 hover:text-white rounded-md transition-colors text-lg"
                onClick={() => incrementQty(index)}
              >
                +
              </button>
              <button
                className="ml-4 px-3 py-1.5 bg-red-100 text-red-600 hover:bg-red-600 hover:text-white rounded-md transition-colors text-sm font-medium"
                onClick={() => removeItem(index)}
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-medium text-gray-600">Total Items: <span className="text-gray-900 font-bold">{totalItems}</span></h3>
          <h3 className="text-2xl mt-2 mb-6">
            Total Price: <span className="text-green-600 font-bold">₹{totalPrice.toFixed(2)}</span>
          </h3>

          <div className="flex justify-center gap-4 flex-wrap">
            <button
              className="px-6 py-3 text-base rounded-lg bg-green-600 text-white border-none cursor-pointer hover:bg-green-700 hover:-translate-y-1 transition-all shadow-md font-bold flex items-center gap-2"
              onClick={handleCheckoutClick}
            >
              💳 Card Checkout
            </button>
            <button
              className={`px-6 py-3 text-base rounded-lg text-white border-none cursor-pointer hover:-translate-y-1 transition-all shadow-md font-bold flex items-center gap-2 ${isBlockchainProcessing ? "bg-purple-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700"
                }`}
              onClick={handleBlockchainPayment}
              disabled={isBlockchainProcessing}
            >
              {isBlockchainProcessing ? "⏳ Processing..." : "🔗 Pay with Blockchain"}
            </button>
            <button
              className="px-6 py-3 text-base rounded-lg bg-amber-400 text-gray-900 border-none cursor-pointer hover:bg-amber-500 hover:-translate-y-1 transition-all shadow-md font-bold flex items-center gap-2"
              onClick={clearCart}
            >
              🗑 Remove All Items
            </button>
          </div>
        </div>
      )}

      {/* Checkout form modal */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[10000] backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-8 w-80 sm:w-96 shadow-2xl text-center transform transition-all scale-100">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Enter Payment Details</h3>
            <div className="space-y-3">
              <input
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
              <input
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                maxLength={10}
              />
              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                type="email"
              />
              <input
                name="cardNumber"
                placeholder="Card Number (16 digits)"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                maxLength={16}
              />
              <div className="flex gap-3">
                <input
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleInputChange}
                  className="w-1/2 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  maxLength={5}
                />
                <input
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  className="w-1/2 px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                  maxLength={3}
                  type="password"
                />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleSubmitPayment('card')}
                className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-bold hover:bg-green-700 transition shadow-md"
              >
                Submit
              </button>
              <button
                onClick={handleCancelPayment}
                className="flex-1 bg-rose-500 text-white py-2.5 rounded-lg font-bold hover:bg-rose-600 transition shadow-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order placed animation overlay */}
      {showAnimation && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999] backdrop-blur-sm">
          <div className="bg-white p-10 rounded-3xl shadow-[0_0_30px_rgba(34,197,94,0.3)] text-center min-w-[300px] animate-bounce-in">
            <span className="text-6xl block mb-4">🎉</span>
            <p className="text-2xl font-bold text-green-600">Order Placed Successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
