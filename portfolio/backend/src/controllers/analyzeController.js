const { analyzeResume, getCareerAdvice } = require('../services/geminiService');

// ─── POST /api/analyze/resume ─────────────────────────────────────────────
const handleResumeAnalysis = async (req, res) => {
  const { resumeText } = req.body;

  try {
    const result = await analyzeResume(resumeText);
    res.json(result);
  } catch (err) {
    console.error('[Analyze] Resume error:', err.message);

    if (err.message.includes('API_KEY') || err.message.includes('not configured')) {
      return res.status(503).json({ error: 'AI service not available. Please configure GEMINI_API_KEY.' });
    }
    if (err.message.includes('JSON')) {
      return res.status(500).json({ error: 'AI response parsing failed. Please try again.' });
    }
    res.status(500).json({ error: err.message || 'Analysis failed' });
  }
};

// ─── POST /api/analyze/career ─────────────────────────────────────────────
const handleCareerAdvice = async (req, res) => {
  const { question, context } = req.body;

  if (!question || question.trim().length < 5) {
    return res.status(400).json({ error: 'Please provide a career question' });
  }

  try {
    const advice = await getCareerAdvice(question, context);
    res.json({ advice });
  } catch (err) {
    console.error('[Analyze] Career advice error:', err.message);
    res.status(500).json({ error: err.message || 'Failed to get career advice' });
  }
};

module.exports = { handleResumeAnalysis, handleCareerAdvice };
