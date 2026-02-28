const Url = require("../models/Url");
const { nanoid } = require("nanoid");

exports.createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        message: "Original URL is required"
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Unauthorized"
      });
    }

    const shortCode = nanoid(6);

    const newUrl = await Url.create({
      originalUrl,
      shortCode,
      user: req.user.id
    });

    res.status(201).json({
      message: "Short URL Created Successfully",
      shortUrl: `${process.env.BASE_URL}/api/url/${shortCode}`,
      shortCode
    });

  } catch (error) {
    console.error("Create URL Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.code
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not Found"
      });
    }

    url.clicks += 1;
    url.clickHistory.push({
      ip: req.ip,
      createdAt: new Date()
    });

    await url.save();

    res.redirect(url.originalUrl);

  } catch (error) {
    console.error("Redirect Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.code,
      user: req.user.id
    });

    if (!url) {
      return res.status(404).json({
        message: "URL not Found"
      });
    }

    res.status(200).json({
      totalClicks: url.clicks,
      clickHistory: url.clickHistory
    });

  } catch (error) {
    console.error("Analytics Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};