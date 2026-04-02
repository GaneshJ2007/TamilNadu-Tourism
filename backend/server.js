import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Sentiment from "sentiment"; // ✅ NEW
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Groq from "groq-sdk"; // ✅ Groq AI
import dotenv from "dotenv"; // ✅ Load environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = 5000;
const sentiment = new Sentiment(); // ✅ Initialize
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key";

// ✅ Initialize Groq AI
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "",
});

// ======================
// Middleware
// ======================
app.use(
  cors({
    origin: ["https://tamil-nadu-tourism.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Explicitly handle preflight requests for mobile browsers
app.options("*", cors());
app.use(express.json());

// ======================
// MongoDB Connection
// ======================
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Tamilnadu_Tourism";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected to Tamilnadu_Tourism"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ======================
// ✅ Groq AI Sentiment Analysis for Feedback
// ======================
const analyzeSentimentWithGroq = async (feedbackText) => {
  try {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_api_key_here") {
      // Fallback to simple sentiment analysis
      return analyzeSentimentSimple(feedbackText);
    }

    const prompt = `Analyze the sentiment of this tourist feedback and provide detailed analysis.

Feedback: "${feedbackText}"

Please provide a JSON response with:
1. "sentiment" (one of: "Very Positive", "Positive", "Neutral", "Negative", "Very Negative")
2. "score" (number from -1 to 1, where -1 is very negative, 0 is neutral, 1 is very positive)
3. "confidence" (percentage confidence in your analysis, 0-100)
4. "keywords" (array of key sentiment-bearing words found)
5. "summary" (one sentence summary of the sentiment)
6. "aspects" (object with ratings for: experience (0-5), service (0-5), value (0-5), cleanliness (0-5), recommendation (0-5))

Respond ONLY with valid JSON, no other text.`;

    console.log("🤖 Analyzing sentiment with Groq AI...");

    const message = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const responseText = message.choices[0].message.content;

    // Parse JSON response
    const analysis = JSON.parse(responseText);
    console.log("✅ Groq AI sentiment analysis received");

    return analysis;
  } catch (err) {
    console.warn("⚠️ Groq AI sentiment analysis failed, using simple analysis:", err.message);
    return analyzeSentimentSimple(feedbackText);
  }
};

// Simple sentiment fallback
const analyzeSentimentSimple = (feedbackText) => {
  const result = sentiment.analyze(feedbackText);
  let sentimentLabel = "Neutral";

  if (result.score > 2) sentimentLabel = "Very Positive";
  else if (result.score > 0) sentimentLabel = "Positive";
  else if (result.score < -2) sentimentLabel = "Very Negative";
  else if (result.score < 0) sentimentLabel = "Negative";

  return {
    sentiment: sentimentLabel,
    score: Math.min(1, Math.max(-1, result.score / 5)),
    confidence: 65,
    keywords: result.words || [],
    summary: `Feedback is ${sentimentLabel.toLowerCase()}.`,
    aspects: {
      experience: 3,
      service: 3,
      value: 3,
      cleanliness: 3,
      recommendation: 3
    }
  };
};

// ======================
// POST feedback (with AI Sentiment Analysis)
// ======================

// ✅ Feedback Schema with detailed sentiment analysis
const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  feedback: String,
  rating: Number,
  sentiment: String, // Positive, Negative, Neutral, Very Positive, Very Negative
  sentimentAnalysis: {
    score: Number, // -1 to 1
    confidence: Number, // 0-100
    keywords: [String],
    summary: String,
    aspects: {
      experience: { type: Number, default: 3 }, // 0-5
      service: { type: Number, default: 3 }, // 0-5
      value: { type: Number, default: 3 }, // 0-5
      cleanliness: { type: Number, default: 3 }, // 0-5
      recommendation: { type: Number, default: 3 } // 0-5
    }
  },
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.post("/api/feedback", async (req, res) => {
  try {
    console.log("📩 Incoming feedback:", req.body);

    const { name, email, phone, feedback, rating } = req.body;

    // ✅ Use Groq AI for detailed sentiment analysis
    const sentimentAnalysis = await analyzeSentimentWithGroq(feedback);

    // Save feedback with detailed sentiment analysis
    const newFeedback = new Feedback({
      name,
      email,
      phone,
      feedback,
      rating,
      sentiment: sentimentAnalysis.sentiment,
      sentimentAnalysis: sentimentAnalysis,
    });

    await newFeedback.save();

    console.log("✅ Feedback saved with sentiment:", sentimentAnalysis.sentiment);

    res.status(201).json({
      message: "✅ Feedback saved successfully!",
      sentiment: sentimentAnalysis.sentiment,
      analysis: sentimentAnalysis,
    });
  } catch (err) {
    console.error("❌ Error saving feedback:", err);
    res.status(500).json({ error: err.message });
  }
});

// ======================
// GET all feedback
// ======================
app.get("/api/feedback", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// GET feedback analytics & sentiment insights
// ======================
app.get("/api/feedback/analytics", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    if (feedbacks.length === 0) {
      return res.json({
        totalFeedbacks: 0,
        sentimentDistribution: {},
        averageRating: 0,
        averageSentimentScore: 0,
        aspectsAverage: {},
        topKeywords: [],
        recentFeedbacks: []
      });
    }

    // Calculate sentiment distribution
    const sentimentCounts = {};
    let totalScore = 0;
    let totalRating = 0;
    const aspectCounts = {
      experience: 0,
      service: 0,
      value: 0,
      cleanliness: 0,
      recommendation: 0
    };
    const keywordMap = {};

    feedbacks.forEach(fb => {
      // Count sentiments
      sentimentCounts[fb.sentiment] = (sentimentCounts[fb.sentiment] || 0) + 1;

      // Accumulate scores
      totalScore += fb.sentimentAnalysis?.score || 0;
      totalRating += fb.rating || 0;

      // Accumulate aspect ratings
      if (fb.sentimentAnalysis?.aspects) {
        aspectCounts.experience += fb.sentimentAnalysis.aspects.experience || 0;
        aspectCounts.service += fb.sentimentAnalysis.aspects.service || 0;
        aspectCounts.value += fb.sentimentAnalysis.aspects.value || 0;
        aspectCounts.cleanliness += fb.sentimentAnalysis.aspects.cleanliness || 0;
        aspectCounts.recommendation += fb.sentimentAnalysis.aspects.recommendation || 0;
      }

      // Collect keywords
      if (fb.sentimentAnalysis?.keywords) {
        fb.sentimentAnalysis.keywords.forEach(kw => {
          keywordMap[kw] = (keywordMap[kw] || 0) + 1;
        });
      }
    });

    // Calculate averages
    const averageSentimentScore = totalScore / feedbacks.length;
    const averageRating = totalRating / feedbacks.length;
    const aspectsAverage = {
      experience: (aspectCounts.experience / feedbacks.length).toFixed(2),
      service: (aspectCounts.service / feedbacks.length).toFixed(2),
      value: (aspectCounts.value / feedbacks.length).toFixed(2),
      cleanliness: (aspectCounts.cleanliness / feedbacks.length).toFixed(2),
      recommendation: (aspectCounts.recommendation / feedbacks.length).toFixed(2)
    };

    // Get top keywords
    const topKeywords = Object.entries(keywordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([keyword, count]) => ({ keyword, count }));

    // Get recent feedbacks
    const recentFeedbacks = feedbacks.slice(0, 5).map(fb => ({
      id: fb._id,
      name: fb.name,
      feedback: fb.feedback.substring(0, 100) + "...",
      rating: fb.rating,
      sentiment: fb.sentiment,
      score: fb.sentimentAnalysis?.score || 0,
      createdAt: fb.createdAt
    }));

    res.json({
      totalFeedbacks: feedbacks.length,
      sentimentDistribution: sentimentCounts,
      averageRating: averageRating.toFixed(2),
      averageSentimentScore: averageSentimentScore.toFixed(2),
      aspectsAverage,
      topKeywords,
      recentFeedbacks,
      insights: {
        overallTrend: averageSentimentScore > 0.3 ? "Positive" : averageSentimentScore < -0.3 ? "Negative" : "Neutral",
        bestAspect: Object.entries(aspectsAverage).sort((a, b) => b[1] - a[1])[0][0],
        improvementArea: Object.entries(aspectsAverage).sort((a, b) => a[1] - b[1])[0][0],
        recommendationRate: (aspectCounts.recommendation / feedbacks.length / 5 * 100).toFixed(1) + "%"
      }
    });
  } catch (err) {
    console.error("❌ Analytics error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 📝 Generate Comprehensive Sentiment Report (AI)
// ======================
app.get("/api/feedback/report", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }).limit(20);

    if (feedbacks.length === 0) {
      return res.json({ report: "No feedback available to generate a report." });
    }

    const feedbackTexts = feedbacks.map(f => `- "${f.feedback}" (Rating: ${f.rating}/5)`).join("\n");

    const prompt = `You are a senior data analyst for Tamil Nadu Tourism. Analyze the following recent tourist feedbacks and provide a comprehensive "Total Sentiment Analysis Report".

Feedbacks:
${feedbackTexts}

Please structure your report with the following sections:
1. **Executive Summary**: A brief overview of the general sentiment.
2. **Key Strengths**: What are tourists loving the most?
3. **Areas for Improvement**: What are the common complaints or issues?
4. **Actionable Recommendations**: 3-5 specific steps the government should take to improve tourism.

Keep the tone professional and constructive. Format the output in Markdown.`;

    // Check for API key
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_api_key_here") {
      return res.json({ report: "Groq API Key is missing. Cannot generate AI report." });
    }

    const message = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const report = message.choices[0].message.content;
    res.json({ report });

  } catch (err) {
    console.error("❌ Report generation error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ======================
// GET individual feedback with detailed analysis
// ======================
app.get("/api/feedback/:id", async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: "Feedback not found" });
    }
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 📌 Orders Schema + Model
// ======================
const orderSchema = new mongoose.Schema({
  userId: String,
  cart: [
    {
      name: String,
      price: String,
      image: String,
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: String,
  paymentMethod: { type: String, default: 'card' }, // ✅ Added
  transactionHash: { type: String }, // ✅ Added
  customerDetails: {
    name: String,
    phone: String,
    email: String,
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

// POST order
app.post("/api/orders", async (req, res) => {
  try {
    console.log("🛒 Incoming order:", req.body);
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "✅ Order saved successfully!" });
  } catch (err) {
    console.error("❌ Error saving order:", err);
    res.status(500).json({ error: err.message });
  }
});

// GET all orders (admin use)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET orders by userId
app.get("/api/orders/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// 📌 Users Schema + Model
// ======================
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vendor: { type: Boolean, default: false },
  government: { type: Boolean, default: false }, // ✅ Added government field
  lastLogin: Date, // ✅ NEW field
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ======================
// 📌 VendorItem Schema + Model
// ======================
const vendorItemSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  section: String,
  owner: String, // vendor email
  vendorName: String, // ✅ NEW
  createdAt: { type: Date, default: Date.now },
});

const VendorItem = mongoose.model("VendorItem", vendorItemSchema);

// ======================
// 📌 Login Logs Schema + Model
// ======================
const loginLogSchema = new mongoose.Schema({
  email: String,
  role: String,
  loginTime: { type: Date, default: Date.now },
  userAgent: String,
  ip: String
});
const LoginLog = mongoose.model("LoginLog", loginLogSchema);

// ======================
// 🛡️ Auth Middleware
// ======================
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// ======================
// 🔐 Auth Routes
// ======================
app.post("/api/signup", async (req, res) => {
  try {
    const { email, password, vendor, government } = req.body; // ✅ Added government
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, vendor, government }); // ✅ Pass government flag
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      console.warn(`⚠️ Login failed: User not found [${email}]`);
      return res.status(400).json({ error: "User not found" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.warn(`⚠️ Login failed: Invalid password [${email}]`);
      return res.status(400).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ email: user.email, vendor: user.vendor, government: user.government }, JWT_SECRET); // ✅ Include government flag

    // ✅ Track login event
    let userRole = "customer";
    if (user.vendor) userRole = "vendor";
    if (user.government) userRole = "government"; // ✅ Handle government role

    const log = new LoginLog({
      email: user.email,
      role: userRole,
      userAgent: req.headers["user-agent"],
      ip: req.ip
    });
    await log.save();

    // Update lastLogin on user
    user.lastLogin = new Date();
    await user.save();

    res.json({ token, email: user.email, vendor: user.vendor, government: user.government }); // ✅ Return government flag
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Create vendor item (authenticated vendors only)
app.post("/api/vendor-items", authMiddleware, async (req, res) => {
  try {
    const { name, price, image, section, vendorName } = req.body; // ✅ Added vendorName
    const owner = req.user.email;
    if (!name || !price || !owner) return res.status(400).json({ error: "name, price and owner required" });

    // Only allow if user is vendor
    if (!req.user.vendor) return res.status(403).json({ error: "Only vendors can create items" });

    const item = new VendorItem({ name, price, image, section, owner, vendorName });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// List all vendor items (optional query ?owner=)
app.get("/api/vendor-items", async (req, res) => {
  try {
    const q = {};
    if (req.query.owner) q.owner = req.query.owner;
    const items = await VendorItem.find(q).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get vendor items by owner
app.get("/api/vendor-items/vendor/:email", async (req, res) => {
  try {
    const items = await VendorItem.find({ owner: req.params.email }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Delete vendor item (owner must match request body owner)
// Delete vendor item (only owner vendor)
app.delete("/api/vendor-items/:id", authMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const item = await VendorItem.findById(id);
    if (!item) return res.status(404).json({ error: "Not found" });
    if (item.owner !== req.user.email) return res.status(403).json({ error: "Forbidden" });
    if (!req.user.vendor) return res.status(403).json({ error: "Only vendors can delete items" });
    await item.deleteOne();
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// ======================
// ✅ Mock Itinerary Generator (Fallback)
// ======================
const generateMockItinerary = (days, budget, members, interest, location, destination) => {
  const destinations = {
    Beach: [
      "Marina Beach, Chennai",
      "Mahabalipuram Beach",
      "Pondicherry",
      "Rameswaram",
      "Kanyakumari"
    ],
    Temple: [
      "Meenakshi Temple, Madurai",
      "Tirupati Temple",
      "Chidambaram Nataraja Temple",
      "Kumbakonam Temples",
      "Thanjavur Brihadeeswarar Temple"
    ],
    Hills: [
      "Ooty (Nilgiris)",
      "Coonoor Tea Gardens",
      "Kodaikanal",
      "Valparai",
      "Yercaud"
    ],
    Wildlife: [
      "Mudumalai Wildlife Sanctuary",
      "Anamalai Tiger Reserve",
      "Kalakad-Mundanthurai Tiger Reserve",
      "Indira Gandhi Wildlife Sanctuary",
      "Point Calimere Wildlife Sanctuary"
    ],
    Heritage: [
      "Thanjavur Brihadeeswarar Temple",
      "Chidambaram Temple",
      "Tanjore Art Gallery",
      "Tiruvannamalai Temple",
      "Atiranachanda Temple"
    ]
  };

  const activities = {
    Beach: ["Swimming", "Surfing", "Seafood dining", "Beach walks", "Water sports"],
    Temple: ["Temple darshan", "Photography", "Spiritual tours", "Local culture", "Historical walks"],
    Hills: ["Trekking", "Tea plantation tours", "Nature walks", "Photography", "Camping"],
    Wildlife: ["Safari drives", "Bird watching", "Nature photography", "Jungle treks"],
    Heritage: ["Historical tours", "Museum visits", "Architecture tours", "Photography"]
  };

  const selectedInterest = interest || "Any";
  
  let baseDests = interest && destinations[interest] 
    ? destinations[interest] 
    : ["Chennai", "Madurai", "Ooty", "Mahabalipuram", "Kanyakumari"];

  // If destination is specified, make sure all days focus on that specific destination 
  const selectedDests = destination 
    ? Array.from({ length: days }).map((_, i) => `${destination} (Day ${i+1} Explorations)`)
    : Array.from({ length: days }).map((_, i) => baseDests[i % baseDests.length]);

  let itinerary = `🎯 YOUR PERSONALIZED ${days}-DAY TAMIL NADU ITINERARY\n`;
  itinerary += `📍 Starting from: ${location || "Not specified"}\n`;
  itinerary += `🏁 Destination: ${destination || selectedDests[0]}\n`;
  itinerary += `👥 Group size: ${members} person(s)\n`;
  itinerary += `💰 Total Budget: ₹${budget} (₹${Math.round(budget / members / days)} per person per day)\n`;
  itinerary += `🎈 Interest: ${selectedInterest}\n`;
  itinerary += `\n${'='.repeat(60)}\n\n`;

  const costPerDay = Math.round(budget / days);

  for (let i = 1; i <= days; i++) {
    itinerary += `📅 DAY ${i}: ${selectedDests[i - 1]}\n`;
    itinerary += `💵 Budget for this day: ₹${costPerDay}\n`;
    itinerary += `\nActivities:\n`;

    const dayActivities = activities[selectedInterest] || activities.Beach;
    dayActivities.slice(0, 3).forEach((activity, idx) => {
      itinerary += `  ${idx + 1}. ${activity}\n`;
    });

    itinerary += `\nAccommodation Tips:\n`;
    itinerary += `  • Budget Hotels: ₹${Math.round(costPerDay * 0.4)}\n`;
    itinerary += `  • Mid-range Hotels: ₹${Math.round(costPerDay * 0.6)}\n`;
    itinerary += `  • Food & Activities: ₹${Math.round(costPerDay * 0.35)}\n`;

    itinerary += `\nLocal Food Recommendations:\n`;
    const foods = [
      "Idli & Sambar (South Indian breakfast)",
      "Dosa with chutney (crispy pancake)",
      "Chettinad Curry (spiced meat curry)",
      "filter Coffee (strong & delicious)",
      "Appam & Stew (rice pancake with gravy)"
    ];
    foods.slice(0, 3).forEach((food, idx) => {
      itinerary += `  • ${food}\n`;
    });

    if (i < days) {
      itinerary += `\n🚗 Transportation to next destination:\n`;
      itinerary += `  • Bus: ₹${Math.round(Math.random() * 300 + 100)} per person\n`;
      itinerary += `  • Train: ₹${Math.round(Math.random() * 400 + 150)} per person\n`;
      itinerary += `  • Taxi: ₹${Math.round(Math.random() * 800 + 300)} (shared)\n`;
    }

    itinerary += `\n${'='.repeat(60)}\n\n`;
  }

  itinerary += `✅ TRIP SUMMARY\n`;
  itinerary += `  • Total Days: ${days}\n`;
  itinerary += `  • Total Budget: ₹${budget}\n`;
  itinerary += `  • Per Person Cost: ₹${Math.round(budget / members)}\n`;
  itinerary += `  • Best Time to Visit: Oct - Feb (Pleasant weather)\n`;
  itinerary += `  • Languages: Tamil, English widely spoken\n`;
  itinerary += `  • Currency: Indian Rupee (₹)\n\n`;

  itinerary += `🎒 PACKING TIPS:\n`;
  itinerary += `  • Sunscreen & sunglasses (tropical sun)\n`;
  itinerary += `  • Comfortable walking shoes\n`;
  itinerary += `  • Cotton clothes (lightweight)\n`;
  itinerary += `  • First aid kit & medicines\n`;
  itinerary += `  • Portable charger\n\n`;

  itinerary += `⚠️ SAFETY TIPS:\n`;
  itinerary += `  • Drink bottled water only\n`;
  itinerary += `  • Avoid street food initially\n`;
  itinerary += `  • Keep valuables secure\n`;
  itinerary += `  • Use registered taxis\n`;
  itinerary += `  • Keep emergency contact handy\n`;

  return itinerary;
};

// ======================
// ✅ Chatbot API
// ======================
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_api_key_here") {
      return res.json({ reply: "I am currently offline. Please set up the Groq API key." });
    }

    const prompt = `You are an expert AI travel assistant for Tamil Nadu Tourism. 
Answer the following user query about tourism, places, culture, and travel in Tamil Nadu accurately and concisely. Be helpful and friendly. 
If the query is not related to Tamil Nadu tourism, politely steer the conversation back to Tamil Nadu tourism.

User Query: "${message}"`;

    const aiResponse = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({ reply: aiResponse.choices[0].message.content });
  } catch (err) {
    console.error("❌ Chatbot error:", err);
    res.status(500).json({ error: "Sorry, I am having trouble connecting right now." });
  }
});

// ======================
// ✅ Groq AI Itinerary Generation
// ======================

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend API is working!" });
});

app.post("/api/generate-itinerary", async (req, res) => {
  try {
    const { days, budget, members, interest, location, destination } = req.body;

    console.log("📝 Received itinerary request:", { days, budget, members, interest, location, destination });

    if (!days || !budget || !members) {
      return res.status(400).json({ error: "Missing required fields: days, budget, members" });
    }

    let itinerary = "";
    let usedGroq = false;

    // Try to use Groq AI if API key is configured
    if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY !== "your_groq_api_key_here") {
      try {
        const prompt = `You are an expert travel advisor for Tamil Nadu tourism. 
Generate a highly accurate, precise, and realistic ${days}-day travel itinerary for ${members} person(s) with a total budget of strictly ₹${budget}.

Strict Requirements:
- Travel from (Origin): ${location || "Not specified"}
- Destination: ${destination || "Best places in Tamil Nadu matching the interest"}
- Primary Interest: ${interest || "Any"}
- Budget per person per day: ₹${Math.round(budget / members / days)}. Do not exceed the budget!

Provide an exact day-by-day plan:
- Specify exact places to visit in the mentioned destination.
- Include estimated realistic costs for travel, accommodations, food, and entry fees.
- Give accurate food recommendations local to the destination.
- Provide practical travel and safety tips.
Do NOT hallucinate fake places. Give exactly the requested details and stick completely to the given budget and destination.`;

        console.log("🤖 Trying Groq AI...");

        const message = await groq.chat.completions.create({
          model: "llama-3.3-70b-versatile",
          max_tokens: 2000,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });

        itinerary = message.choices[0].message.content;
        usedGroq = true;
        console.log("✅ Groq AI response received");
      } catch (groqErr) {
        console.warn("⚠️ Groq AI failed, using mock generator:", groqErr.message);
        itinerary = generateMockItinerary(days, budget, members, interest, location, destination);
      }
    } else {
      console.log("📋 Using mock itinerary generator (Groq API key not configured)");
      itinerary = generateMockItinerary(days, budget, members, interest, location, destination);
    }

    res.json({
      success: true,
      itinerary: itinerary,
      details: {
        days,
        budget,
        members,
        interest,
        location,
        destination,
        perPersonPerDay: Math.round(budget / members / days),
      },
      source: usedGroq ? "Groq AI" : "Mock Generator"
    });
  } catch (err) {
    console.error("❌ Itinerary Error:", err.message);
    res.status(500).json({
      error: "Failed to generate itinerary: " + err.message,
      fallback: generateMockItinerary(
        req.body.days || 3,
        req.body.budget || 10000,
        req.body.members || 1,
        req.body.interest || "",
        req.body.location || "",
        req.body.destination || ""
      )
    });
  }
});

// ======================
// Start Server
// ======================
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
