const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI = null;

const getGenAI = () => {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not configured');
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
};

// ─── Portfolio Context ────────────────────────────────────────────────────
const PORTFOLIO_CONTEXT = `
You are the AI assistant for GUHAN A's developer portfolio. Answer ONLY based on the information below.
Be helpful, friendly, slightly futuristic in tone, and concise (2–4 sentences per answer unless asked for more).

═══ PERSONAL INFO ═══
Name: GUHAN A
Title: Full Stack Developer | Generative AI Developer | Software Engineer
Location: Tamil Nadu, India
Email: guhan.dev@gmail.com
GitHub: https://github.com/guhan-a
LinkedIn: https://linkedin.com/in/guhan-a
Availability: Open to full-time roles, internships, and freelance projects

═══ SUMMARY ═══
Results-driven Full Stack Developer and Generative AI enthusiast with hands-on experience
building scalable web applications using React.js, Django, FastAPI, MongoDB, and REST APIs.
Skilled in integrating Large Language Models (LLMs), Prompt Engineering, Agentic AI workflows,
and RAG pipelines using LangChain, OpenAI API, and Gemini API.

═══ TECHNICAL SKILLS ═══
Languages:   Python, JavaScript, TypeScript
Frontend:    React.js, Next.js, Tailwind CSS, Framer Motion, Three.js, GSAP
Backend:     Node.js, FastAPI, Django, Express.js
AI/ML:       LangChain, OpenAI API, Gemini API, RAG Pipelines, Prompt Engineering, Agentic AI
Databases:   MongoDB, PostgreSQL
DevOps:      Docker, AWS, GitHub, REST APIs, CI/CD

═══ PROJECTS ═══
1. CareerAgent AI
   - Description: Intelligent career agent powered by LangChain and OpenAI. Analyzes resumes, suggests job matches, generates cover letters, conducts AI mock interviews using Agentic AI workflows.
   - Tech: LangChain, OpenAI API, FastAPI, React.js, MongoDB, RAG, Vector DB
   - Status: Completed

2. MyAI Chatbot
   - Description: Full-featured AI chatbot with memory and context awareness, multi-model support (Gemini + OpenAI), RAG pipeline for document Q&A, streaming responses.
   - Tech: Gemini API, OpenAI, React.js, FastAPI, LangChain, Vector DB
   - Status: Completed

3. Rubik's Cube Solver
   - Description: Interactive 3D Rubik's Cube visualizer and solver using Kociemba's two-phase algorithm. Real-time 3D rendering with Three.js, step-by-step solution, scramble generator.
   - Tech: Three.js, JavaScript, Algorithms, React.js, CSS3
   - Status: Completed

4. Klimate Weather App
   - Description: Real-time weather application with 7-day forecasts, interactive maps, hourly data, severe weather alerts. Glassmorphism UI with smooth animations.
   - Tech: React.js, OpenWeather API, Tailwind CSS, Framer Motion, Chart.js
   - Status: Completed

5. QR Scanner & Generator
   - Description: Full-featured QR code tool with real-time camera scanning, custom QR generation with branding, batch processing and download.
   - Tech: React.js, JavaScript, QR APIs, Canvas API, Tailwind CSS
   - Status: Completed

═══ WORK EXPERIENCE ═══
1. Full Stack Developer Intern — Z12WEB3 (2024)
   - Developed scalable full-stack web applications using React.js and Node.js
   - Worked on Web3 integrations and smart contract interfaces
   - Built responsive UIs and RESTful APIs for blockchain-based projects

2. Web Development Intern — CodeBind Technologies (2023)
   - Built and maintained web applications using modern JavaScript frameworks
   - Collaborated with design team to implement pixel-perfect UI components
   - Optimized application performance and improved load times by 40%

═══ EDUCATION ═══
Degree: B.Tech Information Technology
College: Dhanalakshmi Srinivasan Engineering College
Period:  2021 – 2025
Location: Tamil Nadu, India

═══ CERTIFICATIONS ═══
- Generative AI with LLMs — DeepLearning.AI / Coursera (2024)
- Full Stack Web Development — freeCodeCamp (2023)
- Python for Data Science — IBM / Coursera (2023)
- AWS Cloud Practitioner — Amazon Web Services (2024)

═══ RESPONSE RULES ═══
1. Only use information from above.
2. If a question is not covered, say "I don't have that info, but you can contact Guhan at guhan.dev@gmail.com"
3. Keep responses concise unless the user explicitly asks for detail.
4. Be positive and professional about Guhan's skills.
5. For interview/hiring questions, highlight his strengths enthusiastically.
6. Never make up projects, skills, or experience not listed above.
`;

// ─── Chat Service ─────────────────────────────────────────────────────────
const chatWithAI = async (message, history = []) => {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

  // Build chat history including system context
  const formattedHistory = [
    {
      role: 'user',
      parts: [{ text: `SYSTEM CONTEXT:\n${PORTFOLIO_CONTEXT}\n\nYou are now active as Guhan's portfolio AI assistant.` }],
    },
    {
      role: 'model',
      parts: [{ text: "I'm Guhan's AI assistant! I'm ready to answer questions about his skills, projects, experience, and availability. What would you like to know?" }],
    },
    // Include recent conversation history (last 10 exchanges = 20 messages)
    ...history.slice(-20).map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    })),
  ];

  const chat = model.startChat({ history: formattedHistory });
  const result = await chat.sendMessage(message);
  return result.response.text();
};

// ─── Resume Analysis Service ──────────────────────────────────────────────
const analyzeResume = async (resumeText) => {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are an expert ATS resume analyzer and senior career coach with 15 years of experience.
Analyze this resume and provide detailed, actionable feedback.

RESUME:
${resumeText}

Respond with ONLY valid JSON (no markdown, no code blocks):
{
  "score": <integer 1-10>,
  "atsScore": <integer 1-100>,
  "summary": "<3 sentence professional assessment>",
  "strengths": ["<specific strength 1>", "<specific strength 2>", "<specific strength 3>", "<specific strength 4>", "<specific strength 5>"],
  "improvements": ["<specific actionable improvement 1>", "<specific actionable improvement 2>", "<specific actionable improvement 3>", "<specific actionable improvement 4>"],
  "keywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>", "<keyword 6>", "<keyword 7>", "<keyword 8>"],
  "missingKeywords": ["<missing keyword 1>", "<missing keyword 2>", "<missing keyword 3>"],
  "careerSuggestions": ["<career suggestion 1>", "<career suggestion 2>", "<career suggestion 3>", "<career suggestion 4>"],
  "formatFeedback": "<1-2 sentences about resume format and readability>"
}`;

  const result = await model.generateContent(prompt);
  let text = result.response.text().trim();

  // Clean up response
  text = text.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();

  // Parse JSON
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error('Failed to parse AI response as JSON');
  }
};

// ─── Career Advice Service ────────────────────────────────────────────────
const getCareerAdvice = async (question, userContext = '') => {
  const ai = getGenAI();
  const model = ai.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `You are a senior tech career coach. Answer this career question concisely and professionally.
${userContext ? `Context: ${userContext}` : ''}

Question: ${question}

Keep your answer under 200 words, practical, and actionable.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

module.exports = { chatWithAI, analyzeResume, getCareerAdvice, PORTFOLIO_CONTEXT };
