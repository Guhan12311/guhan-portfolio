// ─── Sanitize String ──────────────────────────────────────────────────────
const sanitize = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/javascript:/gi, '')
    .trim()
    .slice(0, 10000);
};

// ─── Validate Contact Form ────────────────────────────────────────────────
const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('Valid email address is required');
  }
  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }
  if (name && name.length > 100) errors.push('Name too long (max 100 chars)');
  if (message && message.length > 5000) errors.push('Message too long (max 5000 chars)');

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join('. ') });
  }

  // Sanitize
  req.body.name = sanitize(name);
  req.body.email = email.trim().toLowerCase();
  req.body.subject = sanitize(subject || '');
  req.body.message = sanitize(message);

  next();
};

// ─── Validate Chat Message ────────────────────────────────────────────────
const validateChat = (req, res, next) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.trim().length < 1) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 chars)' });
  }

  req.body.message = sanitize(message);
  next();
};

// ─── Validate Resume Text ─────────────────────────────────────────────────
const validateResumeText = (req, res, next) => {
  const { resumeText } = req.body;

  if (!resumeText || typeof resumeText !== 'string') {
    return res.status(400).json({ error: 'resumeText is required' });
  }
  if (resumeText.trim().length < 50) {
    return res.status(400).json({ error: 'Resume text is too short (min 50 chars)' });
  }
  if (resumeText.length > 50000) {
    return res.status(400).json({ error: 'Resume text too long (max 50,000 chars)' });
  }

  req.body.resumeText = sanitize(resumeText);
  next();
};

module.exports = { validateContact, validateChat, validateResumeText, sanitize };
