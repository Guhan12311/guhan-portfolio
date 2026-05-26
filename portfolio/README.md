# 🚀 GUHAN A — Futuristic AI-Powered Portfolio

> A production-grade, insanely premium developer portfolio with 3D scenes, AI chatbot, resume analyzer, and cinematic animations.

**Tech Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS · Three.js · React Three Fiber · Framer Motion · GSAP · Node.js · Express.js · MongoDB · Gemini AI

---

## 📁 Project Structure

```
portfolio/
├── frontend/                     # Next.js 15 app (deploy to Vercel)
│   ├── public/                   # Static assets
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── api/
│   │   │   │   ├── chat/         # Gemini chatbot API route
│   │   │   │   ├── analyze-resume/ # AI resume analyzer route
│   │   │   │   ├── contact/      # Contact form + email route
│   │   │   │   └── sitemap/      # SEO sitemap route
│   │   │   ├── globals.css       # Global styles + animations
│   │   │   ├── layout.tsx        # Root layout with SEO
│   │   │   └── page.tsx          # Main page composition
│   │   ├── components/
│   │   │   ├── 3d/               # Three.js scenes
│   │   │   │   ├── HeroGlobe.tsx # Holographic rotating globe
│   │   │   │   └── TechStack3D.tsx # Floating tech icons
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx    # Sticky glass navbar
│   │   │   │   └── Footer.tsx    # Footer with socials
│   │   │   ├── sections/         # All portfolio sections
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── SkillsSection.tsx
│   │   │   │   ├── ExperienceSection.tsx
│   │   │   │   ├── ProjectsSection.tsx
│   │   │   │   ├── ServicesSection.tsx
│   │   │   │   ├── GitHubSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   ├── CertificationsSection.tsx
│   │   │   │   ├── ResumeSection.tsx
│   │   │   │   ├── AIAnalyzerSection.tsx
│   │   │   │   ├── ContactSection.tsx
│   │   │   │   └── ChatBot.tsx   # Floating AI chatbot
│   │   │   └── ui/
│   │   │       ├── CustomCursor.tsx
│   │   │       ├── ParticleBackground.tsx
│   │   │       ├── LoadingScreen.tsx
│   │   │       ├── SectionWrapper.tsx
│   │   │       ├── ErrorBoundary.tsx
│   │   │       ├── CommandPalette.tsx
│   │   │       ├── PageTransition.tsx
│   │   │       └── MouseFollowerGlow.tsx
│   │   ├── hooks/
│   │   │   ├── useMouseMagnetic.ts
│   │   │   └── useScrollReveal.ts
│   │   └── lib/
│   │       ├── data.ts           # ← EDIT THIS to customize your portfolio
│   │       └── utils.ts
│   ├── package.json
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   ├── vercel.json
│   └── Dockerfile
│
├── backend/                      # Express.js API (deploy to Render)
│   ├── src/
│   │   ├── index.js              # Express server entry
│   │   ├── config/
│   │   │   ├── database.js       # MongoDB connection
│   │   │   └── validateEnv.js    # Env validation
│   │   ├── models/
│   │   │   └── index.js          # Mongoose schemas
│   │   ├── services/
│   │   │   ├── geminiService.js  # Gemini AI service
│   │   │   └── emailService.js   # Nodemailer service
│   │   ├── controllers/
│   │   │   ├── chatController.js
│   │   │   ├── contactController.js
│   │   │   └── analyzeController.js
│   │   ├── routes/
│   │   │   ├── chat.js
│   │   │   ├── contact.js
│   │   │   ├── analyze.js
│   │   │   └── projects.js
│   │   └── middleware/
│   │       ├── rateLimiter.js
│   │       └── validation.js
│   ├── package.json
│   ├── render.yaml
│   └── Dockerfile
│
├── docker-compose.yml            # Full stack local dev
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD pipeline
└── README.md
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 20+ ([nodejs.org](https://nodejs.org))
- npm 10+
- Git
- MongoDB Atlas account (free) — [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Gemini API key — [aistudio.google.com](https://aistudio.google.com)
- Gmail account with App Password enabled

---

## 🖥️ Step-by-Step Installation

### Step 1 — Clone the project

```bash
# Open VS Code terminal (Ctrl+` or Cmd+`)
git clone https://github.com/guhan-a/portfolio.git
cd portfolio
```

### Step 2 — Set up Frontend

```bash
# Navigate to frontend
cd frontend

# Install all dependencies (this takes 1–2 minutes)
npm install

# Copy environment file
cp .env.example .env.local
```

Now open `.env.local` in VS Code and fill in your values:

```env
GEMINI_API_KEY=your_gemini_api_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GITHUB_USERNAME=guhan-a
NEXT_PUBLIC_SITE_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```

### Step 3 — Set up Backend

```bash
# Open a NEW terminal tab (Ctrl+Shift+` in VS Code)
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env
```

Fill in `backend/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
GEMINI_API_KEY=your_gemini_api_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
FRONTEND_URL=http://localhost:3000
```

### Step 4 — Start both servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Should show: GUHAN PORTFOLIO BACKEND ONLINE — Port: 5000
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Should show: ▲ Next.js 15 ready on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser. 🎉

---

## 🔑 Getting API Keys

### Gemini API Key (FREE)
1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Sign in with Google
3. Click **"Get API key"** → **"Create API key"**
4. Copy the key — it starts with `AIza...`
5. Paste into both `.env.local` (frontend) and `.env` (backend)

### MongoDB Atlas (FREE)
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account → Create a **free M0 cluster**
3. Under **Database Access** → Add a user with password
4. Under **Network Access** → Add IP `0.0.0.0/0` (allow all)
5. Click **Connect** → **Connect your application**
6. Copy the connection string — looks like:
   `mongodb+srv://username:password@cluster0.abc123.mongodb.net/`
7. Add `/portfolio` at the end: `...mongodb.net/portfolio`

### Gmail App Password
1. Go to [myaccount.google.com](https://myaccount.google.com)
2. **Security** → **2-Step Verification** → Enable it
3. **Security** → **App passwords**
4. Select app: **Mail**, device: **Other** (name it "Portfolio")
5. Copy the 16-character password (spaces are OK)

---

## 🐳 Docker (Alternative — Full Stack in One Command)

```bash
# From root of project
cp .env.example .env
# Edit .env with your API keys

# Build and start everything
docker-compose up --build

# Stop
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v
```

Services will be available at:
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000](http://localhost:5000)
- MongoDB: `localhost:27017`

---

## ✏️ Customizing Your Portfolio

**All personal data is in ONE file:** `frontend/src/lib/data.ts`

Edit these exports:
- `PERSONAL_INFO` — your name, title, summary, email, social links
- `SKILLS` — your tech skills with proficiency levels
- `EXPERIENCE` — your work history
- `PROJECTS` — your projects
- `CERTIFICATIONS` — your certs
- `SERVICES` — services you offer
- `TESTIMONIALS` — testimonials
- `EDUCATION` — your education
- `RESUME_DATA` — the text used to train your AI chatbot

---

## 🚀 Deployment

### Deploy Frontend to Vercel (Recommended — FREE)

```bash
# Install Vercel CLI
npm install -g vercel

# From frontend directory
cd frontend

# Deploy (first time — follow prompts)
vercel

# Set environment variables on Vercel dashboard:
# vercel.com → Your Project → Settings → Environment Variables
# Add all variables from .env.example
```

**Or via Vercel Dashboard:**
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo
3. Set **Root Directory** to `frontend`
4. Add all environment variables
5. Click Deploy

### Deploy Backend to Render (FREE)

1. Go to [render.com](https://render.com) → New → **Web Service**
2. Connect your GitHub repo
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Region:** Singapore (closest to India)
4. Add all environment variables from `backend/.env.example`
5. Click **Create Web Service**

After deployment, copy your Render URL (e.g., `https://guhan-portfolio-api.onrender.com`).

Update your Vercel environment variable:
```
NEXT_PUBLIC_API_URL=https://guhan-portfolio-api.onrender.com
```

### GitHub Actions CI/CD Setup

Add these **GitHub Secrets** (repo → Settings → Secrets → Actions):

```
VERCEL_TOKEN          # vercel.com → Account Settings → Tokens
VERCEL_ORG_ID         # vercel.json or account settings
VERCEL_PROJECT_ID     # vercel project settings
RENDER_DEPLOY_HOOK_URL # render.com → service → Settings → Deploy Hook
GEMINI_API_KEY
MONGODB_URI
EMAIL_USER
EMAIL_PASS
NEXT_PUBLIC_API_URL
```

Now every push to `main` automatically deploys frontend + backend.

---

## 📂 Adding Your Resume PDF

Place your resume PDF at:
```
frontend/public/resume.pdf
```

The download button and preview will work automatically.

---

## 🧪 Testing Checklist

Run through this after local setup:

### Visual
- [ ] Loading screen animates and disappears
- [ ] Particle background visible
- [ ] Custom cursor shows on desktop
- [ ] Hero globe rotates
- [ ] Typing animation works
- [ ] All sections scroll smoothly
- [ ] Cards have hover effects
- [ ] Navbar highlights active section
- [ ] Mobile menu opens/closes
- [ ] All images/images load

### AI Features
- [ ] Chatbot opens when clicking the bot icon
- [ ] Chatbot responds to questions about Guhan
- [ ] Resume Analyzer accepts text input
- [ ] Resume Analyzer returns score and feedback
- [ ] Rate limiting works (try spam clicking)

### Forms
- [ ] Contact form validates required fields
- [ ] Contact form shows success state
- [ ] Email received in Gmail (if configured)
- [ ] Auto-reply sent to sender

### Performance
```bash
# Run Lighthouse in Chrome DevTools
# Target scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

### Backend Health Check
```bash
curl http://localhost:5000/health
# Should return: {"status":"online","version":"1.0.0",...}

curl http://localhost:5000/api/projects
# Should return: {"projects":[...],"total":5}
```

---

## 🔧 Troubleshooting

### "Module not found" errors
```bash
cd frontend && rm -rf node_modules .next && npm install
cd backend && rm -rf node_modules && npm install
```

### Three.js / WebGL not rendering
- Ensure you're on a browser that supports WebGL (Chrome/Firefox recommended)
- Check browser console for WebGL errors
- The `dynamic(() => import(...), { ssr: false })` pattern prevents SSR issues

### Gemini API "API_KEY not configured"
- Check `.env.local` has `GEMINI_API_KEY=` (no quotes, no spaces)
- Restart the dev server after editing `.env.local`
- Verify the key at [aistudio.google.com](https://aistudio.google.com)

### MongoDB connection refused
- Check your Atlas cluster is running (not paused)
- Check IP whitelist — add `0.0.0.0/0`
- Verify username/password in connection string
- Test: `node -e "const m=require('mongoose');m.connect('YOUR_URI').then(()=>console.log('OK'))"`

### Contact form not sending emails
- Enable 2-Step Verification in Gmail first
- Use an App Password, NOT your regular Gmail password
- Check spam folder for auto-reply test
- Check backend logs for nodemailer errors

### Framer Motion hydration warnings
- Normal in development, not in production
- Caused by SSR/CSR mismatch on animated elements

### "Too many requests" error
- Rate limiting is working correctly
- Wait 1 minute (chat) or 1 hour (contact) before retrying

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### Next.js build errors
```bash
cd frontend
npm run build 2>&1 | head -50
# Fix any TypeScript errors shown
```

---

## 🎨 Customization Guide

### Change Colors
Edit `frontend/tailwind.config.ts`:
```typescript
colors: {
  neon: {
    cyan: '#00f5ff',    // ← Change primary neon color
    purple: '#b300ff',  // ← Change secondary color
    pink: '#ff006e',    // ← Change accent color
  }
}
```

Also update CSS variables in `frontend/src/app/globals.css`:
```css
:root {
  --neon-cyan: #00f5ff;
  --neon-purple: #b300ff;
}
```

### Change Fonts
In `frontend/src/app/layout.tsx`, replace the Google Fonts imports.
Update `tailwind.config.ts` `fontFamily` section to match.

### Add/Remove Sections
In `frontend/src/app/page.tsx`, import and add/remove section components.

### Update AI Chatbot Knowledge
In `frontend/src/lib/data.ts`, edit `RESUME_DATA` — this is what the chatbot uses to answer questions about you.

In `backend/src/services/geminiService.js`, edit `PORTFOLIO_CONTEXT` — this is the backend chatbot knowledge base.

---

## 📊 Performance Optimization Tips

1. **Images**: Add your actual photos to `frontend/public/images/` and use `next/image`
2. **3D scenes**: Are lazy-loaded with `dynamic()` to not block initial render
3. **Fonts**: Loaded via `next/font/google` with `display: swap`
4. **Particles**: Use `requestAnimationFrame` for smooth 60fps animation
5. **API Routes**: Gemini calls are server-side, keeping API key secure

---

## 📱 Mobile Optimization

- Custom cursor and particle mouse effects are hidden on mobile
- Three.js scenes render at reduced quality on mobile via CSS media queries
- Navigation collapses to a hamburger menu on mobile
- All cards are fully responsive with CSS Grid

---

## 🔐 Security Notes

- `GEMINI_API_KEY` is used server-side only (API routes), never exposed to browser
- Rate limiting prevents API abuse
- Input validation sanitizes all user input
- Helmet.js sets security HTTP headers on backend
- CORS is configured to only allow your frontend URL in production

---

## 🙏 Credits & Licenses

- Three.js — MIT License
- React Three Fiber — MIT License
- Framer Motion — MIT License
- Tailwind CSS — MIT License
- Lucide Icons — ISC License
- Google Fonts (Orbitron, Syne, Space Mono) — Open Font License

---

**Built with ❤️ by Guhan A — Full Stack & Generative AI Developer**

[![GitHub](https://img.shields.io/badge/GitHub-guhan--a-00f5ff?style=flat-square&logo=github)](https://github.com/guhan-a)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-guhan--a-b300ff?style=flat-square&logo=linkedin)](https://linkedin.com/in/guhan-a)
