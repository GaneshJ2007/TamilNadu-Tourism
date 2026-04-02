import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend,
  LineChart, Line,
  ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#0088FE"];
const SENTIMENT_COLORS = { "Very Positive": "#00C49F", "Positive": "#0088FE", "Neutral": "#FFBB28", "Negative": "#FF8042", "Very Negative": "#AA336A" };

export default function FeedbackDashboard() {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [report, setReport] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);

  // ✅ Debug: Check government token
  useEffect(() => {
    const govToken = localStorage.getItem("gov_token");
    console.log("✅ Government Dashboard - Token:", govToken ? "Present" : "Missing");
    if (govToken) {
      try {
        const tokenData = JSON.parse(govToken);
        console.log("✅ Token data:", tokenData);
      } catch (e) {
        console.log("Token is a string:", govToken);
      }
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch analytics data
      const analyticsRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}"}/api/feedback/analytics`);
      console.log("📊 Analytics data received:", analyticsRes.data); // ✅ Debug log
      setAnalytics(analyticsRes.data);

      // Fetch all feedbacks
      const feedbacksRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}"}/api/feedback`);
      console.log("📝 Feedbacks received:", feedbacksRes.data); // ✅ Debug log
      setFeedbacks(feedbacksRes.data);

      setLoading(false);
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError("Failed to load sentiment analytics: " + err.message); // ✅ Show actual error
      setLoading(false);
    }
  };

  const generateReport = async () => {
    setLoadingReport(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || "${import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"}"}/api/feedback/report`);
      setReport(res.data.report || "No report generated.");
    } catch (err) {
      console.error("Error generating report:", err);
      setReport("Failed to generate report.");
    }
    setLoadingReport(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("gov_token");
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <div style={{ padding: 24 }}>📊 Loading sentiment analysis... (Make sure at least one feedback has been submitted)</div>;
  }

  if (error) {
    return <div style={{ padding: 24, color: "red" }}>❌ {error}</div>;
  }

  if (!analytics || (analytics.totalFeedbacks === 0)) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">📊 Tourist Feedback Sentiment Analysis Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem("gov_token");
              navigate("/login", { replace: true });
            }}
            className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors shadow-md"
          >
            Logout
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">📋 No Feedback Data Available Yet</h2>
          <p className="text-gray-600 mb-6">
            AI-powered sentiment analysis dashboard is ready, but no feedback has been submitted yet.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
            <h4 className="font-bold text-gray-800 mb-2">📝 How to Collect Feedback:</h4>
            <ol className="list-decimal list-inside text-gray-600 space-y-1">
              <li>Share the feedback form link with tourists visiting Tamil Nadu</li>
              <li>Tourists submit their experience and ratings</li>
              <li>AI (Groq) analyzes sentiment automatically</li>
              <li>Results appear here on this dashboard in real-time</li>
            </ol>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-emerald-500">
            <h4 className="font-bold text-gray-800 mb-2">💡 What You'll See:</h4>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>🎭 Sentiment Distribution (Positive, Negative, Neutral)</li>
              <li>⭐ Experience Aspect Ratings</li>
              <li>📈 Overall Trends & Insights</li>
              <li>🏷️ Top Keywords from Feedback</li>
              <li>📊 Detailed Analytics & Charts</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Prepare sentiment distribution data for pie chart
  const sentimentData = Object.entries(analytics.sentimentDistribution).map(([sentiment, count]) => ({
    name: sentiment,
    value: count
  }));

  // Prepare aspect ratings for radar chart
  const aspectsData = [{
    aspect: "Experience",
    rating: parseFloat(analytics.aspectsAverage.experience) || 0
  }, {
    aspect: "Service",
    rating: parseFloat(analytics.aspectsAverage.service) || 0
  }, {
    aspect: "Value",
    rating: parseFloat(analytics.aspectsAverage.value) || 0
  }, {
    aspect: "Cleanliness",
    rating: parseFloat(analytics.aspectsAverage.cleanliness) || 0
  }, {
    aspect: "Recommendation",
    rating: parseFloat(analytics.aspectsAverage.recommendation) || 0
  }];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">📊 Tourist Feedback Sentiment Analysis Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-5 py-2.5 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors shadow-md flex items-center gap-2"
        >
          Logout
        </button>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-500 mb-2">📝 Total Feedbacks</div>
          <div className="text-4xl font-extrabold text-blue-500">{analytics.totalFeedbacks}</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-500 mb-2">⭐ Average Rating</div>
          <div className="text-4xl font-extrabold text-yellow-400">{analytics.averageRating}/5</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-500 mb-2">😊 Sentiment Score</div>
          <div className="text-4xl font-extrabold text-emerald-500">{analytics.averageSentimentScore}/1</div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div className="text-sm font-medium text-gray-500 mb-2">👍 Recommendation Rate</div>
          <div className="text-4xl font-extrabold text-orange-500">{analytics.insights.recommendationRate}</div>
        </div>
      </div>

      {/* 📝 AI Total Sentiment Analysis Report */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
          <h3 className="text-xl font-bold text-gray-800">🤖 AI-Powered Total Sentiment Analysis Report</h3>
          <button
            onClick={generateReport}
            disabled={loadingReport}
            className={`px-5 py-2.5 ${loadingReport ? "bg-gray-400 cursor-not-allowed" : "bg-fuchsia-700 hover:bg-fuchsia-800"} text-white rounded-lg font-bold transition-colors shadow-md flex items-center gap-2`}
          >
            {loadingReport ? "Generating Report..." : "✨ Generate Comprehensive Analysis"}
          </button>
        </div>

        {report ? (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 max-h-96 overflow-y-auto font-mono text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
            {report}
          </div>
        ) : (
          !loadingReport && (
            <p className="text-gray-500 italic text-center py-4">
              Click the button above to generate a comprehensive AI analysis of all feedback.
            </p>
          )
        )}
      </div>

      {/* Overall Trend & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📈 Overall Trend</h3>
          <div className={`text-3xl font-bold ${analytics.insights.overallTrend === "Positive" ? "text-emerald-500" : analytics.insights.overallTrend === "Negative" ? "text-orange-500" : "text-amber-500"}`}>
            {analytics.insights.overallTrend}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {analytics.insights.overallTrend === "Positive" && "🎉 Tourists are highly satisfied!"}
            {analytics.insights.overallTrend === "Negative" && "⚠️ Improvement needed in customer satisfaction"}
            {analytics.insights.overallTrend === "Neutral" && "📊 Mixed feedback - room for improvement"}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">⭐ Best Aspect</h3>
          <div className="text-3xl font-bold text-emerald-500 capitalize">
            {analytics.insights.bestAspect}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Tourists are most satisfied with {analytics.insights.bestAspect}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🔧 Improvement Area</h3>
          <div className="text-3xl font-bold text-orange-500 capitalize">
            {analytics.insights.improvementArea}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Focus on improving {analytics.insights.improvementArea} for better satisfaction
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sentiment Distribution Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎭 Sentiment Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={sentimentData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Aspects Radar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 Experience Aspects Rating</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={aspectsData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="aspect" />
              <PolarRadiusAxis angle={90} domain={[0, 5]} />
              <Radar name="Rating" dataKey="rating" stroke="#0088FE" fill="#0088FE" fillOpacity={0.6} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🏷️ Top Sentiment Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {analytics.topKeywords.map((kw, idx) => (
            <span
              key={idx}
              className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
            >
              {kw.keyword} ({kw.count})
            </span>
          ))}
        </div>
      </div>

      {/* Recent Feedbacks Table */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📝 Recent Feedbacks with AI Analysis</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-3 text-left font-bold text-gray-700">Name</th>
                <th className="p-3 text-left font-bold text-gray-700">Feedback</th>
                <th className="p-3 text-center font-bold text-gray-700">Rating</th>
                <th className="p-3 text-center font-bold text-gray-700">Sentiment</th>
                <th className="p-3 text-center font-bold text-gray-700">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {analytics.recentFeedbacks.map((fb, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 text-gray-800 font-medium">{fb.name}</td>
                  <td className="p-3 text-gray-600">{fb.feedback}</td>
                  <td className="p-3 text-center text-yellow-500 font-bold">⭐ {fb.rating}</td>
                  <td className="p-3 text-center">
                    <span
                      className="px-2 py-1 rounded text-xs text-white font-medium"
                      style={{ backgroundColor: SENTIMENT_COLORS[fb.sentiment] || "#ccc" }}
                    >
                      {fb.sentiment}
                    </span>
                  </td>
                  <td className={`p-3 text-center font-bold ${fb.score > 0 ? "text-emerald-500" : fb.score < 0 ? "text-orange-500" : "text-amber-500"}`}>
                    {fb.score.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
