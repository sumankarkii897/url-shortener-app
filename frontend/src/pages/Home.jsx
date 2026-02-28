import React, { useState, useEffect } from "react";
import axios from "../api/axios";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!url) {
      setError("Please enter a URL");
      return;
    }

    const urlPattern = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/;
    if (!urlPattern.test(url)) {
      setError("Please enter a valid URL");
      return;
    }

    try {
      const response = await axios.post("/url/shorten", { originalUrl: url });
      setShortUrl(response.data.shortUrl);
      setError("");
    } catch (err) {
    
      if (err.response?.status === 429) {
        const retryAfter = err.response.data.message.match(/\d+/)?.[0] || 60;
        setCountdown(Number(retryAfter));
        setError(`Rate limit exceeded. Try again in ${retryAfter} seconds.`);
      } else {
        setError("Server error: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Short URL</h2>

      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <input
          className="border p-2 w-full rounded"
          placeholder="Enter URL"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={countdown > 0} // disable input during countdown
        />
        <button
          className={`px-4 py-2 rounded text-white ${
            countdown > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={countdown > 0} // disable button during countdown
        >
          {countdown > 0 ? `Wait (${countdown}s)` : "Shorten"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      {shortUrl && (
        <p className="mt-4">
          Short URL:{" "}
          <a
            className="text-blue-600 underline"
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}

export default Dashboard;