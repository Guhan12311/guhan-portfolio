const { v4: uuidv4 } = require('crypto').webcrypto
  ? require('crypto').randomUUID
    ? { v4: () => require('crypto').randomUUID() }
    : { v4: () => require('crypto').randomBytes(16).toString('hex') }
  : { v4: () => require('crypto').randomBytes(16).toString('hex') };

const { chatWithAI } = require('../services/geminiService');
const { ChatSession } = require('../models');
const mongoose = require('mongoose');

// In-memory session fallback when MongoDB is not available
const memorySessions = new Map();

const generateSessionId = () => {
  try {
    return require('crypto').randomUUID();
  } catch {
    return require('crypto').randomBytes(16).toString('hex');
  }
};

// ─── POST /api/chat ───────────────────────────────────────────────────────
const handleChat = async (req, res) => {
  const { message, sessionId: clientSessionId } = req.body;

  const sessionId = clientSessionId || generateSessionId();

  try {
    // Load session history
    let history = [];
    let session = null;

    if (mongoose.connection.readyState === 1) {
      // MongoDB available
      session = await ChatSession.findOne({ sessionId });
      if (session) {
        history = session.messages.slice(-20).map(m => ({
          role: m.role,
          content: m.content,
        }));
      }
    } else {
      // Use in-memory fallback
      const memSession = memorySessions.get(sessionId);
      if (memSession) {
        history = memSession.slice(-20);
      }
    }

    // Get AI response
    const response = await chatWithAI(message, history);

    // Save to session
    const newMessages = [
      { role: 'user', content: message, timestamp: new Date() },
      { role: 'assistant', content: response, timestamp: new Date() },
    ];

    if (mongoose.connection.readyState === 1) {
      if (session) {
        session.messages.push(...newMessages);
        // Keep only last 100 messages to prevent unbounded growth
        if (session.messages.length > 100) {
          session.messages = session.messages.slice(-100);
        }
        await session.save();
      } else {
        await ChatSession.create({
          sessionId,
          messages: newMessages,
          ipAddress: req.ip,
        });
      }
    } else {
      // In-memory fallback
      const existing = memorySessions.get(sessionId) || [];
      memorySessions.set(sessionId, [
        ...existing,
        { role: 'user', content: message },
        { role: 'assistant', content: response },
      ].slice(-40));
    }

    res.json({ response, sessionId });
  } catch (err) {
    console.error('[Chat] Error:', err.message);

    if (err.message.includes('API_KEY') || err.message.includes('not configured')) {
      return res.status(503).json({
        error: 'AI service not available',
        response: "I'm temporarily offline. Please contact Guhan directly at guhan.dev@gmail.com",
        sessionId,
      });
    }

    res.status(500).json({
      error: 'Failed to get AI response',
      response: "I encountered an error. Please try again in a moment.",
      sessionId,
    });
  }
};

// ─── DELETE /api/chat/:sessionId ──────────────────────────────────────────
const clearSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      await ChatSession.deleteOne({ sessionId });
    } else {
      memorySessions.delete(sessionId);
    }
    res.json({ success: true, message: 'Session cleared' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to clear session' });
  }
};

// ─── GET /api/chat/history/:sessionId ────────────────────────────────────
const getHistory = async (req, res) => {
  const { sessionId } = req.params;
  try {
    if (mongoose.connection.readyState === 1) {
      const session = await ChatSession.findOne({ sessionId }).select('messages');
      return res.json({ messages: session?.messages || [] });
    }
    const memSession = memorySessions.get(sessionId) || [];
    res.json({ messages: memSession });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get history' });
  }
};

module.exports = { handleChat, clearSession, getHistory };
