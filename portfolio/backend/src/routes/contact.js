const router = require('express').Router();
const { submitContact, getContacts } = require('../controllers/contactController');
const { contactLimiter } = require('../middleware/rateLimiter');
const { validateContact } = require('../middleware/validation');

router.post('/', contactLimiter, validateContact, submitContact);
router.get('/', getContacts); // Admin — add auth middleware in production

module.exports = router;
