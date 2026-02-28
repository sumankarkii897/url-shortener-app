import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Analytics() {
  const [shortCode, setShortCode] = useState("");
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [chartData, setChartData] = useState({});

  const token = localStorage.getItem("token");

  const handleFetch = async (e) => {
    e.preventDefault();
    setError("");
    setAnalytics(null);
    setChartData({});

    if (!shortCode) {
      setError("Please enter a short code");
      return;
    }

    try {
      const res = await axios.get(`/url/analytics/${shortCode}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalytics(res.data);

      // Prepare chart data for last 7 days
      const today = new Date();
      const labels = [];
      const clicks = [];

      for (let i = 6; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        const dayStr = day.toISOString().split("T")[0]; // YYYY-MM-DD
        labels.push(dayStr);
        const count = res.data.clickHistory.filter(
          (c) => new Date(c.timestamp).toISOString().split("T")[0] === dayStr
        ).length;
        clicks.push(count);
      }

      setChartData({
        labels,
        datasets: [
          {
            label: "Clicks per Day",
            data: clicks,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            tension: 0.3,
          },
        ],
      });
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching analytics");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">URL Analytics</h2>

      <form onSubmit={handleFetch} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Enter Short Code"
          value={shortCode}
          onChange={(e) => setShortCode(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Get Analytics
        </button>
      </form>

      {analytics && (
        <>
  
          <div className="mt-6">
            <Line data={chartData} />
          </div>

          <div className="mt-6 p-4 border rounded bg-green-50">
            <p className="font-semibold mb-2">
              Total Clicks: {analytics.totalClicks}
            </p>

            <p className="font-semibold mt-4 mb-2">Click History:</p>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="py-2 px-3 border-b text-left">S.NO</th>
                    <th className="py-2 px-3 border-b text-left">IP</th>
                    <th className="py-2 px-3 border-b text-left">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {analytics.clickHistory.map((click, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-3 border-b">{index + 1}</td>
                      <td className="py-2 px-3 border-b">{click.ip}</td>
                      <td className="py-2 px-3 border-b">
                        {new Date(click.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Analytics;