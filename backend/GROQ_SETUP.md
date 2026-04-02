# Groq AI Itinerary Setup Guide

## ✅ Integration Complete!

The Plan Trip module now uses **Groq AI** to automatically generate personalized Tamil Nadu travel itineraries based on user inputs.

## 🔑 Getting Your Groq API Key

To make this work, you need a **free Groq API key**:

1. **Go to**: https://console.groq.com/keys
2. **Sign up** for a free Groq account (if you don't have one)
3. **Copy your API key**
4. **Paste it** in the `.env` file below

## 📝 Setting Up .env File

The `.env` file in this backend folder should contain:

```
GROQ_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with the key you copied from Groq console.

## 📋 How the Feature Works

1. User fills out the Plan Trip form:
   - Number of days (1-10)
   - Total budget (₹)
   - Number of travelers
   - Preferred interest (Beaches, Temples, Wildlife, etc.)
   - Starting location

2. User clicks **"Generate Itinerary ✨"**

3. **Groq AI** instantly generates:
   - Day-by-day Tamil Nadu travel plan
   - Recommended activities and experiences
   - Estimated costs for each day
   - Local transportation tips
   - Best times to visit
   - Food recommendations
   - Safety tips

## 🚀 Quick Start

After adding your API key to `.env`:

1. **Restart the backend server** (it will automatically load the .env file)
2. Go to the app and navigate to **"Plan Your Trip"**
3. Fill in your travel preferences
4. Click **Generate Itinerary** and watch the magic happen! ✨

## ⚙️ Technical Details

- **Backend Endpoint**: `POST /api/generate-itinerary`
- **AI Model**: Mixtral 8x7b (via Groq)
- **Response Time**: ~5-10 seconds
- **Free Tier**: Groq offers free API calls with rate limiting

## 🆘 Troubleshooting

**Q: Getting "401 Invalid API Key" error?**
- Make sure your API key is correctly pasted in `.env`
- Restart the backend server after updating `.env`

**Q: Getting 404 error when clicking Generate?**
- Make sure backend is running on http://localhost:5000
- Check browser console for CORS errors

**Q: The AI response is slow?**
- Groq is quite fast, but first request may take 10-15 seconds
- Subsequent requests should be faster

---

**Need help?** Check that:
- ✅ Backend is running (`npm start` in `/backend`)
- ✅ Frontend is running (`npm run dev` in root)
- ✅ MongoDB is running locally
- ✅ `.env` file has your Groq API key
- ✅ No console errors in browser DevTools
