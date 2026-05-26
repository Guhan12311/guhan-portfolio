const router = require('express').Router();
const { apiLimiter } = require('../middleware/rateLimiter');

const PROJECTS = [
  {
    id: 1, title: 'CareerAgent AI', category: 'AI/ML', status: 'Completed',
    description: 'AI career agent powered by LangChain and OpenAI for resume analysis, job matching, and mock interviews.',
    tech: ['LangChain', 'OpenAI API', 'FastAPI', 'React.js', 'MongoDB', 'RAG'],
    github: 'https://github.com/guhan-a', featured: true,
  },
  {
    id: 2, title: 'MyAI Chatbot', category: 'AI/ML', status: 'Completed',
    description: 'Full-featured AI chatbot with memory, multi-model support, and RAG pipeline for document Q&A.',
    tech: ['Gemini API', 'OpenAI', 'React.js', 'FastAPI', 'LangChain'],
    github: 'https://github.com/guhan-a', featured: true,
  },
  {
    id: 3, title: "Rubik's Cube Solver", category: 'Web', status: 'Completed',
    description: "Interactive 3D Rubik's Cube visualizer and solver using Kociemba's algorithm.",
    tech: ['Three.js', 'JavaScript', 'React.js', 'CSS3'],
    github: 'https://github.com/guhan-a', featured: false,
  },
  {
    id: 4, title: 'Klimate Weather App', category: 'Web', status: 'Completed',
    description: 'Real-time weather app with forecasts, maps, and alerts. Glassmorphism UI.',
    tech: ['React.js', 'OpenWeather API', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/guhan-a', featured: false,
  },
  {
    id: 5, title: 'QR Scanner & Generator', category: 'Web', status: 'Completed',
    description: 'Full-featured QR code tool with camera scanning, custom generation and batch export.',
    tech: ['React.js', 'JavaScript', 'Canvas API', 'Tailwind CSS'],
    github: 'https://github.com/guhan-a', featured: false,
  },
];

router.get('/', apiLimiter, (req, res) => {
  const { category, featured } = req.query;
  let result = [...PROJECTS];
  if (category) result = result.filter(p => p.category === category);
  if (featured === 'true') result = result.filter(p => p.featured);
  res.json({ projects: result, total: result.length });
});

router.get('/:id', apiLimiter, (req, res) => {
  const project = PROJECTS.find(p => p.id === parseInt(req.params.id));
  if (!project) return res.status(404).json({ error: 'Project not found' });
  res.json(project);
});

module.exports = router;
