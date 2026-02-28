const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const rateLimiter = require("../middleware/rateLimiter");
const {
  createShortUrl,
  redirectUrl,
  getAnalytics,
} = require("../controllers/urlController");
router.post("/shorten", auth, rateLimiter, createShortUrl);
router.get("/analytics/:code", auth, getAnalytics);
router.get("/:code", redirectUrl);
module.exports = router;
