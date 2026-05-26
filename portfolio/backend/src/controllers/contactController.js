const { Contact } = require('../models');
const { sendContactNotification, sendAutoReply } = require('../services/emailService');
const mongoose = require('mongoose');

// ─── POST /api/contact ────────────────────────────────────────────────────
const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // 1. Save to MongoDB if available
    if (mongoose.connection.readyState === 1) {
      await Contact.create({
        name, email, subject, message,
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      });
    }

    // 2. Send email notifications (fire-and-forget pattern for speed)
    let emailSent = false;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        await Promise.all([
          sendContactNotification({ name, email, subject, message }),
          sendAutoReply({ name, email, message }),
        ]);
        emailSent = true;
      } catch (emailErr) {
        console.error('[Contact] Email send failed:', emailErr.message);
        // Don't fail the whole request if email fails
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I\'ll get back to you within 24 hours.',
      emailSent,
    });
  } catch (err) {
    console.error('[Contact] Error:', err.message);
    res.status(500).json({ error: 'Failed to save message. Please try emailing directly.' });
  }
};

// ─── GET /api/contact (admin endpoint — no auth for now, add JWT later) ───
const getContacts = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not available' });
    }
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(50)
      .select('-__v');
    res.json({ contacts, total: contacts.length });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

module.exports = { submitContact, getContacts };
