const nodemailer = require('nodemailer');

let transporter = null;

const getTransporter = () => {
  if (!transporter) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email credentials not configured');
    }
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      pool: true,
      maxConnections: 5,
      rateDelta: 20000,
      rateLimit: 5,
    });
  }
  return transporter;
};

// ─── HTML Email Template ──────────────────────────────────────────────────
const emailBase = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0f; color: #e8eaf0; }
    .container { max-width: 600px; margin: 0 auto; padding: 32px 16px; }
    .card { background: #0f1a2e; border: 1px solid rgba(0,245,255,0.15); border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, rgba(0,245,255,0.1), rgba(179,0,255,0.1)); padding: 32px; border-bottom: 1px solid rgba(0,245,255,0.1); }
    .logo { font-family: monospace; font-size: 24px; font-weight: 900; color: #00f5ff; letter-spacing: 0.2em; }
    .body { padding: 32px; }
    .field-label { font-size: 11px; color: rgba(0,245,255,0.7); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 4px; font-family: monospace; }
    .field-value { color: #e8eaf0; font-size: 15px; margin-bottom: 20px; }
    .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 16px; margin: 16px 0; }
    .message-text { color: rgba(255,255,255,0.8); line-height: 1.7; white-space: pre-wrap; font-size: 14px; }
    .footer { padding: 20px 32px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; }
    .footer-text { color: rgba(255,255,255,0.3); font-size: 12px; font-family: monospace; }
    .divider { height: 1px; background: linear-gradient(90deg,transparent,rgba(0,245,255,0.3),transparent); margin: 16px 0; }
    .highlight { color: #00f5ff; }
    .btn { display: inline-block; padding: 12px 24px; background: rgba(0,245,255,0.1); border: 1px solid rgba(0,245,255,0.3); border-radius: 8px; color: #00f5ff; text-decoration: none; font-family: monospace; font-size: 13px; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      ${content}
      <div class="footer">
        <p class="footer-text">GUHAN.DEV — Full Stack &amp; Generative AI Developer</p>
        <p class="footer-text" style="margin-top:4px">Tamil Nadu, India</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// ─── Send Contact Notification ────────────────────────────────────────────
const sendContactNotification = async ({ name, email, subject, message }) => {
  const html = emailBase(`
    <div class="header">
      <div class="logo">GUHAN.DEV</div>
      <p style="color:rgba(255,255,255,0.6);margin-top:8px;font-size:14px">New Portfolio Message</p>
    </div>
    <div class="body">
      <div class="field-label">From</div>
      <div class="field-value"><span class="highlight">${name}</span> &lt;${email}&gt;</div>
      <div class="field-label">Subject</div>
      <div class="field-value">${subject || 'No subject'}</div>
      <div class="divider"></div>
      <div class="field-label">Message</div>
      <div class="message-box">
        <div class="message-text">${message}</div>
      </div>
      <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:16px">
        Received at ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
      </p>
    </div>
  `);

  await getTransporter().sendMail({
    from: `"Guhan Portfolio" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] ${subject || 'New Message'} from ${name}`,
    html,
    text: `From: ${name} (${email})\nSubject: ${subject}\n\n${message}`,
  });
};

// ─── Send Auto-Reply ──────────────────────────────────────────────────────
const sendAutoReply = async ({ name, email, message }) => {
  const html = emailBase(`
    <div class="header">
      <div class="logo">GUHAN.DEV</div>
      <p style="color:rgba(255,255,255,0.6);margin-top:8px;font-size:14px">Message Received</p>
    </div>
    <div class="body">
      <h2 style="color:#e8eaf0;margin-bottom:16px">Hey <span class="highlight">${name}</span>! 👋</h2>
      <p style="color:rgba(255,255,255,0.7);line-height:1.7;margin-bottom:16px">
        Thanks for reaching out! I've received your message and will get back to you
        <strong style="color:#00f5ff">within 24 hours</strong>.
      </p>
      <div class="message-box">
        <div class="field-label">Your message</div>
        <div class="message-text" style="color:rgba(255,255,255,0.5);font-style:italic">"${message.slice(0, 150)}${message.length > 150 ? '...' : ''}"</div>
      </div>
      <div class="divider"></div>
      <p style="color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:24px;font-size:14px">
        In the meantime, feel free to explore my work:
      </p>
      <div style="display:flex;gap:12px;flex-wrap:wrap">
        <a href="https://github.com/guhan-a" class="btn">GitHub Projects</a>
        <a href="https://linkedin.com/in/guhan-a" class="btn">LinkedIn</a>
      </div>
      <div class="divider"></div>
      <p style="color:rgba(255,255,255,0.5);font-size:14px;line-height:1.7">
        — <strong>Guhan A</strong><br>
        <span style="color:rgba(0,245,255,0.7)">Full Stack &amp; Generative AI Developer</span>
      </p>
    </div>
  `);

  await getTransporter().sendMail({
    from: `"Guhan A" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Got your message! I'll reply soon — Guhan A`,
    html,
    text: `Hey ${name}!\n\nThanks for reaching out. I'll reply within 24 hours.\n\n— Guhan A`,
  });
};

module.exports = { sendContactNotification, sendAutoReply };
