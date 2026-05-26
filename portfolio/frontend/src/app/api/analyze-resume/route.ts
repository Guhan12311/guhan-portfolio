import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { resumeText } = await req.json();
    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json({ error: 'Please provide more resume content (at least 50 characters)' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: 'Gemini API key not configured' }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an expert ATS resume analyzer and career coach. Analyze this resume and return a JSON response ONLY (no markdown, no code blocks, just raw JSON).

RESUME TEXT:
${resumeText}

Return this exact JSON structure:
{
  "score": <number 1-10>,
  "atsScore": <number 1-100>,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>", "<improvement 4>"],
  "keywords": ["<keyword 1>", "<keyword 2>", ... up to 12 keywords found],
  "careerSuggestions": ["<suggestion 1>", "<suggestion 2>", "<suggestion 3>", "<suggestion 4>"]
}

Be specific and actionable. Focus on:
- ATS optimization
- Impact quantification
- Skill alignment
- Format and readability
- Missing keywords for the tech industry`;

    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    // Strip markdown code blocks if present
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Try to extract JSON
      const match = text.match(/\{[\s\S]*\}/);
      if (match) {
        parsed = JSON.parse(match[0]);
      } else {
        throw new Error('Invalid AI response format');
      }
    }

    return NextResponse.json(parsed);
  } catch (err: any) {
    console.error('Resume analyzer error:', err);
    return NextResponse.json(
      { error: err.message || 'Analysis failed' },
      { status: 500 }
    );
  }
}
