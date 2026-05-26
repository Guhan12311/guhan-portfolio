const router = require('express').Router();
const { handleChat, clearSession, getHistory } = require('../controllers/chatController');
const { chatLimiter } = require('../middleware/rateLimiter');
const { validateChat } = require('../middleware/validation');

router.post('/', chatLimiter, validateChat, handleChat);
router.delete('/:sessionId', clearSession);
router.get('/history/:sessionId', getHistory);

module.exports = router;
