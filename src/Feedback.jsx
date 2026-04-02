import React, { useState } from "react";
import axios from "axios";

export default function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentimentResult, setSentimentResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message || rating === 0) {
      alert("Please fill all fields and select a rating");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/feedback", {
        name,
        email,
        phone,
        feedback: message,
        rating
      });

      console.log("Response:", response.data);
      setSentimentResult(response.data.analysis);
      setSuccess("✅ Thank you for your feedback!");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setRating(0);
      setHover(0);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">📝 Submit Feedback</h2>
          <p className="mt-2 text-sm text-gray-600">
            Share your experience at Tamil Nadu tourism destinations
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="Your Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
                placeholder="+91 9876543210"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feedback *</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Share your experience in Tamil Nadu tourism..."
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating *</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-3xl cursor-pointer transition-transform hover:scale-110 ${star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                  >
                    ★
                  </span>
                ))}
                <span className="ml-2 text-gray-600 font-medium">{rating}/5</span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all shadow-md hover:shadow-lg`}
          >
            {loading ? "⏳ Analyzing with Groq AI..." : "Submit Feedback"}
          </button>

          {success && (
            <div className="animate-fade-in">
              <p className="text-green-600 font-bold text-center bg-green-50 p-3 rounded-lg border border-green-100">
                {success}
              </p>

              {/* ✅ Display Sentiment Analysis Results */}
              {sentimentResult && (
                <div className="mt-6 p-6 bg-blue-50 border-2 border-blue-500 rounded-xl shadow-inner">
                  <h3 className="text-lg font-bold text-blue-600 mb-4 flex items-center gap-2">
                    🤖 AI Sentiment Analysis Results
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Sentiment</div>
                      <div className={`text-lg font-bold ${sentimentResult.sentiment === "Very Positive" ? "text-emerald-500" :
                        sentimentResult.sentiment === "Positive" ? "text-blue-500" :
                          sentimentResult.sentiment === "Neutral" ? "text-amber-500" :
                            sentimentResult.sentiment === "Negative" ? "text-orange-500" :
                              "text-rose-600"
                        }`}>
                        {sentimentResult.sentiment}
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg text-center shadow-sm">
                      <div className="text-xs text-gray-500 mb-1">Score</div>
                      <div className="text-lg font-bold text-blue-500">
                        {(sentimentResult.score * 100).toFixed(0)}%
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg text-center shadow-sm sm:col-span-1 col-span-2">
                      <div className="text-xs text-gray-500 mb-1">Confidence</div>
                      <div className="text-lg font-bold text-emerald-500">
                        {sentimentResult.confidence}%
                      </div>
                    </div>
                  </div>

                  {/* Aspects Breakdown */}
                  <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                    <h4 className="font-bold text-gray-700 mb-2 text-sm">📊 Experience Aspects:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {sentimentResult.aspects && Object.entries(sentimentResult.aspects).map(([aspect, rating]) => (
                        <div key={aspect} className="text-sm text-gray-600 flex justify-between">
                          <strong className="capitalize">{aspect}:</strong> <span>{rating}/5 ⭐</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary */}
                  {sentimentResult.summary && (
                    <div className="bg-white p-4 rounded-lg shadow-sm text-sm text-gray-600 italic border-l-4 border-blue-500 mb-4">
                      <strong>Analysis:</strong> {sentimentResult.summary}
                    </div>
                  )}

                  {/* Keywords */}
                  {sentimentResult.keywords && sentimentResult.keywords.length > 0 && (
                    <div>
                      <h4 className="font-bold text-gray-700 mb-2 text-sm">🏷️ Key Terms Detected:</h4>
                      <div className="flex flex-wrap gap-2">
                        {sentimentResult.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
