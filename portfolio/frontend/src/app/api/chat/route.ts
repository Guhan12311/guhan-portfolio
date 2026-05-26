import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RESUME_DATA, PERSONAL_INFO, SKILLS, PROJECTS, EXPERIENCE } from '@/lib/data';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `You are Guhan's AI portfolio assistant. You answer questions about Guhan A based ONLY on the information below. Be helpful, concise, and professional. Use a friendly but slightly futuristic tone.

--- PORTFOLIO DATA ---
${RESUME_DATA}

PROJECTS:
${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tech: ${p.tech.join(', ')})`).join('\n')}

EXPERIENCE:
${EXPERIENCE.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}

CONTACT:
Email: ${PERSONAL_INFO.email}
GitHub: ${PERSONAL_INFO.github}
LinkedIn: ${PERSONAL_INFO.linkedin}
Location: ${PERSONAL_INFO.location}
Status: ${PERSONAL_INFO.availability}
--- END DATA ---

Rules:
1. Only answer based on the data above.
2. If asked something not in the data, say you don't have that info but direct them to contact Guhan directly.
3. Keep answers concise (2-4 sentences usually).
4. For code/technical questions not about Guhan, politely redirect.
5. Always be positive about Guhan's skills and experience.`;

export async function POST(req: NextRequest) {
  try {
    const { message, history = [] } = await req.json();
    if (!message) return NextResponse.json({ error: 'Message required' }, { status: 400 });
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        response: "I'm temporarily offline (API key not configured). Please contact Guhan directly at " + PERSONAL_INFO.email,
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Build conversation with system context
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: 'You are Guhan\'s AI assistant. Here is the portfolio data you should use to answer questions: ' + SYSTEM_PROMPT }],
        },
        {
          role: 'model',
          parts: [{ text: 'Understood! I\'m Guhan\'s AI assistant and I\'ll help answer questions about his portfolio, skills, projects, and experience based on the provided data.' }],
        },
        // Prior conversation history
        ...history.slice(-8).map((m: { role: string; content: string }) => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(message);
    const response = result.response.text();

    return NextResponse.json({ response });
  } catch (err: any) {
    console.error('Chat API error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to get response' },
      { status: 500 }
    );
  }
}
