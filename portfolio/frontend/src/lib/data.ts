// ============================================
// PORTFOLIO DATA — Edit this file to customize
// ============================================

export const PERSONAL_INFO = {
  name: 'GUHAN A',
  firstName: 'GUHAN',
  lastName: 'A',
  title: 'Full Stack Developer | Generative AI Developer | Software Engineer',
  titles: [
    'Full Stack Developer',
    'Generative AI Developer',
    'Software Engineer',
    'LLM Engineer',
    'React Specialist',
  ],
  summary:
    'Results-driven Full Stack Developer and Generative AI enthusiast with hands-on experience building scalable web applications using React.js, Django, FastAPI, MongoDB, and REST APIs. Skilled in integrating Large Language Models (LLMs), Prompt Engineering, Agentic AI workflows, and RAG pipelines using LangChain, OpenAI API, and Gemini API.',
  email: 'guhan786@gmail.com',
  github: 'https://github.com/guhan12311',
  linkedin: 'https://linkedin.com/in/guhan2004',
  location: 'Tamil Nadu, India',
  availability: 'Open to opportunities',
};

export const SKILLS = [
  // Languages
  { name: 'Python', level: 90, category: 'Languages', icon: '🐍' },
  { name: 'JavaScript', level: 88, category: 'Languages', icon: '⚡' },
  { name: 'TypeScript', level: 82, category: 'Languages', icon: '🔷' },
  // Frontend
  { name: 'React.js', level: 90, category: 'Frontend', icon: '⚛️' },
  { name: 'Next.js', level: 85, category: 'Frontend', icon: '▲' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend', icon: '🎨' },
  // Backend
  { name: 'Node.js', level: 80, category: 'Backend', icon: '🟢' },
  { name: 'FastAPI', level: 85, category: 'Backend', icon: '🚀' },
  { name: 'Django', level: 80, category: 'Backend', icon: '🎸' },
  // AI/ML
  { name: 'LangChain', level: 82, category: 'AI/ML', icon: '🔗' },
  { name: 'OpenAI API', level: 88, category: 'AI/ML', icon: '🤖' },
  { name: 'Gemini API', level: 85, category: 'AI/ML', icon: '💎' },
  { name: 'RAG Pipelines', level: 80, category: 'AI/ML', icon: '🧠' },
  { name: 'Prompt Engineering', level: 88, category: 'AI/ML', icon: '✨' },
  // Database
  { name: 'MongoDB', level: 85, category: 'Database', icon: '🍃' },
  { name: 'PostgreSQL', level: 75, category: 'Database', icon: '🐘' },
  // DevOps
  { name: 'Docker', level: 72, category: 'DevOps', icon: '🐳' },
  { name: 'AWS', level: 70, category: 'DevOps', icon: '☁️' },
  { name: 'GitHub', level: 88, category: 'DevOps', icon: '🐙' },
  // APIs
  { name: 'REST APIs', level: 90, category: 'Backend', icon: '🔌' },
];

export const TECH_STACK_ICONS = [
  'React', 'Next.js', 'TypeScript', 'Python', 'FastAPI',
  'Django', 'MongoDB', 'Docker', 'AWS', 'LangChain',
  'Node.js', 'Tailwind', 'OpenAI', 'Gemini', 'GitHub',
];

export const EXPERIENCE = [
  {
    id: 1,
    role: 'Full Stack Developer Intern',
    company: 'Z12WEB3',
    period: '2024',
    type: 'Internship',
    description:
      'Developed scalable full-stack web applications using React.js and Node.js. Worked on Web3 integrations and smart contract interfaces. Built responsive UIs and RESTful APIs for blockchain-based projects.',
    tech: ['React.js', 'Node.js', 'Web3.js', 'MongoDB', 'REST APIs'],
    color: '#00f5ff',
  },
  {
    id: 2,
    role: 'Web Development Intern',
    company: 'CodeBind Technologies',
    period: '2023',
    type: 'Internship',
    description:
      'Built and maintained web applications using modern JavaScript frameworks. Collaborated with design team to implement pixel-perfect UI components. Optimized application performance and improved load times.',
    tech: ['HTML/CSS', 'JavaScript', 'React.js', 'Python', 'Django'],
    color: '#b300ff',
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: 'CareerAgent AI',
    description:
      'An intelligent career agent powered by LangChain and OpenAI that analyzes resumes, suggests job matches, generates cover letters, and conducts AI-powered mock interviews using Agentic AI workflows.',
    tech: ['LangChain', 'OpenAI API', 'FastAPI', 'React.js', 'MongoDB', 'RAG'],
    category: 'AI/ML',
    color: '#00f5ff',
    github: 'https://github.com/guhan12311',
    live: '#',
    featured: true,
    status: 'Completed',
  },
  {
    id: 2,
    title: 'MyAI Chatbot',
    description:
      'A full-featured AI chatbot with memory, context awareness, and multi-model support. Integrates with Gemini and OpenAI APIs, features RAG pipeline for document Q&A, and supports streaming responses.',
    tech: ['Gemini API', 'OpenAI', 'React.js', 'FastAPI', 'LangChain', 'Vector DB'],
    category: 'AI/ML',
    color: '#b300ff',
    github: 'https://github.com/guhan12311',
    live: '#',
    featured: true,
    status: 'Completed',
  },
  {
    id: 3,
    title: "Rubik's Cube Solver",
    description:
      "An interactive 3D Rubik's Cube visualizer and solver using Kociemba's two-phase algorithm. Features real-time 3D rendering with Three.js, step-by-step solution display, and scramble generator.",
    tech: ['Three.js', 'JavaScript', 'Algorithms', 'React.js', 'CSS3'],
    category: 'Web',
    color: '#ff006e',
    github: 'https://github.com/guhan12311',
    live: '#',
    featured: false,
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Klimate Weather App',
    description:
      'A beautiful real-time weather application with 7-day forecasts, interactive maps, hourly data, and severe weather alerts. Features glassmorphism UI and smooth animations.',
    tech: ['React.js', 'OpenWeather API', 'Tailwind CSS', 'Framer Motion', 'Chart.js'],
    category: 'Web',
    color: '#39ff14',
    github: 'https://github.com/guhan12311',
    live: '#',
    featured: false,
    status: 'Completed',
  },
  {
    id: 5,
    title: 'QR Scanner & Generator',
    description:
      'A full-featured QR code tool with real-time scanning using device camera, custom QR generation with branding, batch processing, and download capabilities.',
    tech: ['React.js', 'JavaScript', 'QR APIs', 'Canvas API', 'Tailwind CSS'],
    category: 'Web',
    color: '#0057ff',
    github: 'https://github.com/guhan12311',
    live: '#',
    featured: false,
    status: 'Completed',
  },
];

export const CERTIFICATIONS = [
  {
    id: 1,
    title: 'Generative AI with LLMs',
    issuer: 'DeepLearning.AI / Coursera',
    date: '2024',
    color: '#00f5ff',
  },
  {
    id: 2,
    title: 'Full Stack Web Development',
    issuer: 'freeCodeCamp',
    date: '2023',
    color: '#b300ff',
  },
  {
    id: 3,
    title: 'Python for Data Science',
    issuer: 'IBM / Coursera',
    date: '2023',
    color: '#ff006e',
  },
  {
    id: 4,
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    color: '#39ff14',
  },
];

export const SERVICES = [
  {
    id: 1,
    title: 'Full Stack Development',
    description: 'End-to-end web applications with React, Next.js, Node.js, and scalable backend APIs.',
    icon: '🏗️',
    color: '#00f5ff',
    skills: ['React.js', 'Next.js', 'Node.js', 'REST APIs', 'MongoDB'],
  },
  {
    id: 2,
    title: 'Generative AI Integration',
    description: 'LLM-powered features, RAG pipelines, AI agents, and intelligent automation.',
    icon: '🤖',
    color: '#b300ff',
    skills: ['LangChain', 'OpenAI', 'Gemini', 'RAG', 'Agents'],
  },
  {
    id: 3,
    title: 'API Development',
    description: 'High-performance REST and GraphQL APIs with FastAPI, Express, and Django.',
    icon: '🔌',
    color: '#ff006e',
    skills: ['FastAPI', 'Django', 'Express.js', 'GraphQL', 'REST'],
  },
  {
    id: 4,
    title: 'UI/UX Engineering',
    description: 'Premium, responsive interfaces with modern design systems and smooth animations.',
    icon: '🎨',
    color: '#39ff14',
    skills: ['Tailwind CSS', 'Framer Motion', 'Three.js', 'GSAP', 'TypeScript'],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Senior Developer',
    company: 'Z12WEB3',
    content:
      'Guhan is an exceptional developer with deep understanding of both frontend and AI. His ability to integrate LLMs into production apps is impressive.',
    rating: 5,
    avatar: 'RK',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Tech Lead',
    company: 'CodeBind Technologies',
    content:
      'One of the most dedicated interns I have worked with. Guhan delivered high-quality work consistently and picked up new technologies incredibly fast.',
    rating: 5,
    avatar: 'PS',
  },
  {
    id: 3,
    name: 'Dr. Anand Raj',
    role: 'Professor',
    company: 'DSEC',
    content:
      'Guhan demonstrates excellent problem-solving skills and a strong foundation in software engineering. His AI projects showcase real-world applicability.',
    rating: 5,
    avatar: 'AR',
  },
];

export const EDUCATION = {
  degree: 'B.Tech Information Technology',
  college: 'Dhanalakshmi Srinivasan Engineering College',
  period: '2021 – 2025',
  location: 'Tamil Nadu, India',
};

export const RESUME_DATA = `
GUHAN A
Full Stack Developer | Generative AI Developer | Software Engineer
Email: guhan.dev@gmail.com | Location: Tamil Nadu, India

SUMMARY
Results-driven Full Stack Developer and Generative AI enthusiast with hands-on experience 
building scalable web applications using React.js, Django, FastAPI, MongoDB, and REST APIs. 
Skilled in integrating Large Language Models (LLMs), Prompt Engineering, Agentic AI workflows, 
and RAG pipelines using LangChain, OpenAI API, and Gemini API.

SKILLS
Languages: Python, JavaScript, TypeScript
Frontend: React.js, Next.js, Tailwind CSS, Framer Motion, Three.js
Backend: Node.js, FastAPI, Django, Express.js
AI/ML: LangChain, OpenAI API, Gemini API, RAG Pipelines, Prompt Engineering, Agentic AI
Database: MongoDB, PostgreSQL
DevOps: Docker, AWS, GitHub, REST APIs

EXPERIENCE
Full Stack Developer Intern — Z12WEB3 (2024)
- Developed scalable full-stack web applications using React.js and Node.js
- Worked on Web3 integrations and smart contract interfaces
- Built responsive UIs and RESTful APIs for blockchain-based projects

Web Development Intern — CodeBind Technologies (2023)
- Built and maintained web applications using modern JavaScript frameworks
- Collaborated with design team to implement pixel-perfect UI components
- Optimized application performance and improved load times

PROJECTS
1. CareerAgent AI — LangChain, OpenAI API, FastAPI, React.js, MongoDB
2. MyAI Chatbot — Gemini API, OpenAI, React.js, FastAPI, LangChain
3. Rubik's Cube Solver — Three.js, JavaScript, React.js
4. Klimate Weather App — React.js, OpenWeather API, Tailwind CSS
5. QR Scanner Generator — React.js, JavaScript, Canvas API

EDUCATION
B.Tech Information Technology
Dhanalakshmi Srinivasan Engineering College, Tamil Nadu (2021–2025)
`;
