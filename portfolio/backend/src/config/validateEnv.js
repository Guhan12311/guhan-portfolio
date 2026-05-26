const validateEnv = () => {
  const warnings = [];
  const errors = [];

  // Required
  if (!process.env.PORT) warnings.push('PORT not set, defaulting to 5000');

  // Warn if missing (not hard errors — app can run in degraded mode)
  if (!process.env.MONGODB_URI) warnings.push('MONGODB_URI not set — contact form will not save to DB');
  if (!process.env.GEMINI_API_KEY) warnings.push('GEMINI_API_KEY not set — AI features will be disabled');
  if (!process.env.EMAIL_USER) warnings.push('EMAIL_USER not set — contact email notifications disabled');
  if (!process.env.EMAIL_PASS) warnings.push('EMAIL_PASS not set — contact email notifications disabled');
  if (!process.env.FRONTEND_URL) warnings.push('FRONTEND_URL not set, defaulting to http://localhost:3000');

  // Log
  if (warnings.length > 0) {
    console.log('\x1b[33m[ENV] Warnings:\x1b[0m');
    warnings.forEach(w => console.log(`  \x1b[33m⚠ ${w}\x1b[0m`));
  }

  if (errors.length > 0) {
    console.error('\x1b[31m[ENV] Fatal errors:\x1b[0m');
    errors.forEach(e => console.error(`  \x1b[31m✖ ${e}\x1b[0m`));
    process.exit(1);
  }

  console.log('\x1b[32m[ENV] Environment validated\x1b[0m');
};

module.exports = validateEnv;
