const rateLimit = require('express-rate-limit');

// ─── Chat Rate Limiter ────────────────────────────────────────────────────
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: 'Too many chat requests. Please wait a moment.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => req.ip,
});

// ─── Contact Form Rate Limiter ────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'Too many contact requests. Please try again in an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: false,
});

// ─── Resume Analyzer Rate Limiter ─────────────────────────────────────────
const analyzeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: 'Too many analysis requests. Please wait 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── General API Rate Limiter ─────────────────────────────────────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { error: 'Too many requests from this IP.' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { chatLimiter, contactLimiter, analyzeLimiter, apiLimiter };
