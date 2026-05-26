const mongoose = require('mongoose');

// ─── Contact Message Schema ───────────────────────────────────────────────
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
    subject: { type: String, trim: true, maxlength: 200, default: 'No subject' },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    ipAddress: { type: String },
    userAgent: { type: String },
    read: { type: Boolean, default: false },
    replied: { type: Boolean, default: false },
  },
  { timestamps: true }
);

contactSchema.index({ email: 1 });
contactSchema.index({ createdAt: -1 });

// ─── Chat Session Schema ──────────────────────────────────────────────────
const chatMessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true, maxlength: 10000 },
  timestamp: { type: Date, default: Date.now },
});

const chatSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true, index: true },
    messages: [chatMessageSchema],
    ipAddress: { type: String },
    totalMessages: { type: Number, default: 0 },
    lastActiveAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

chatSessionSchema.index({ sessionId: 1 });
chatSessionSchema.index({ lastActiveAt: -1 });
chatSessionSchema.index({ createdAt: -1 });

// Auto-update lastActiveAt and message count
chatSessionSchema.pre('save', function (next) {
  this.totalMessages = this.messages.length;
  this.lastActiveAt = new Date();
  next();
});

// ─── Page View / Analytics Schema ────────────────────────────────────────
const pageViewSchema = new mongoose.Schema(
  {
    path: { type: String, required: true },
    referrer: { type: String },
    userAgent: { type: String },
    ipAddress: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

pageViewSchema.index({ createdAt: -1 });
pageViewSchema.index({ path: 1 });

// ─── Resume Download Schema ───────────────────────────────────────────────
const resumeDownloadSchema = new mongoose.Schema(
  {
    ipAddress: { type: String },
    userAgent: { type: String },
    referrer: { type: String },
  },
  { timestamps: true }
);

// ─── Exports ──────────────────────────────────────────────────────────────
const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);
const ChatSession = mongoose.models.ChatSession || mongoose.model('ChatSession', chatSessionSchema);
const PageView = mongoose.models.PageView || mongoose.model('PageView', pageViewSchema);
const ResumeDownload = mongoose.models.ResumeDownload || mongoose.model('ResumeDownload', resumeDownloadSchema);

module.exports = { Contact, ChatSession, PageView, ResumeDownload };
