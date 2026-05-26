const router = require('express').Router();
const { handleResumeAnalysis, handleCareerAdvice } = require('../controllers/analyzeController');
const { analyzeLimiter } = require('../middleware/rateLimiter');
const { validateResumeText } = require('../middleware/validation');

router.post('/resume', analyzeLimiter, validateResumeText, handleResumeAnalysis);
router.post('/career', analyzeLimiter, handleCareerAdvice);

module.exports = router;
