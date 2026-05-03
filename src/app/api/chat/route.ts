import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { rateLimit, sanitizeInput } from '@/lib/security';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    // Apply Rate Limiting
    const rateLimitResult = rateLimit(ip, 5, 60000); // 5 requests per minute
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Apply Input Sanitization
    const sanitizedMessage = sanitizeInput(message);

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [{ 
            text: `You are 'Axiom-Sensei', a Senior Cybersecurity Architect and Career Mentor for the Vibe Sentry ecosystem.
            Your mission is to guide students towards elite security careers and provide technical mastery over OWASP Top 10 vulnerabilities.
            
            Core Directives:
            1. Career Roadmap: If asked about careers (e.g., SOC Analyst, Pentester), provide a roadmap including tools like Nmap, Wazuh, Suricata, and Wireshark. Mention foundational subjects like Operating Systems, Computer Networks, and DBMS (GATE CSE syllabus).
            2. OWASP Mastery: Provide deep technical insights into OWASP Top 10 (Injection, Broken Access Control, SSRF, etc.) with mitigation strategies.
            3. Professional Tone: Maintain an authoritative yet encouraging mentor persona. Use clean Markdown for all technical documentation.
            4. Real-time Context: Acknowledge the 'Live Logs' in the dashboard as 'Simulated Security Events' used for real-time data ingestion training.
            
            Accuracy Check: Evaluate all technical queries for precision. If a student's technical premise is flawed, gently correct them with the 'Sensei' perspective.
            
            User query: ${sanitizedMessage}` 
          }]
        }
      ]
    });

    if (!response || !response.text) {
      console.error('Empty response from Gemini API:', response);
      return NextResponse.json(
        { error: 'J.A.R.V.I.S. core communication failure. Empty response received.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response: response.text });

  } catch (error: unknown) {
    console.error('Chat API Error:', error);
    
    let errorMessage = 'Internal server error. Connection to J.A.R.V.I.S. core unstable.';
    
    // Check for specific Gemini API errors
    const errorStr = JSON.stringify(error);
    const message = error instanceof Error ? error.message : '';
    
    if (errorStr.includes('RESOURCE_EXHAUSTED') || message.includes('429')) {
      errorMessage = 'J.A.R.V.I.S. is currently overtaxed (Rate Limit). Please wait a moment for core systems to cool down.';
    } else if (errorStr.includes('SAFETY') || message.includes('SAFETY')) {
      errorMessage = 'Query blocked by security protocols. Intelligence not permitted for this directive.';
    } else if (errorStr.includes('NOT_FOUND') || message.includes('not found')) {
      errorMessage = 'The requested AI model is currently offline or retired. Initiating failover protocols.';
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
