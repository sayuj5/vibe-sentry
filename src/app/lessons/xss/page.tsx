import LessonContent from '@/components/LessonContent';

export default function XSSLesson() {
  return (
    <LessonContent 
      id="xss"
      title="XSS Fundamentals"
      vulnerability="Cross-Site Scripting (XSS) occurs when an attacker injects malicious scripts into content that is then delivered to other users. This can lead to session hijacking, cookie theft, or website defacement."
      explanation={`XSS attacks leverage the trust a browser has in the content it receives from a server. If the server does not sanitize user-provided data before echoing it back to the client, an attacker can include <script> tags or event handlers like onload.

There are three main types of XSS:
1. Stored XSS: The script is permanently stored on the server (e.g., in a database).
2. Reflected XSS: The script is 'reflected' off a web application to the victim's browser (e.g., in a URL parameter).
3. DOM-based XSS: The vulnerability exists in client-side code rather than server-side code.

In Vibe Sentry, we use the 'xss' library to sanitize all user inputs before they are processed by our AI or stored in memory.`}
      defenseSnippet={`import xss from 'xss';

export function sanitizeInput(input: string): string {
  // Use the xss library to strip malicious HTML and scripts
  return xss(input);
}

// Implementation in API Route:
const { message } = await req.json();
const sanitizedMessage = sanitizeInput(message);`}
      practiceInstructions="Review the defense snippet above. Notice how we use a dedicated library to handle the complexities of HTML sanitization rather than relying on custom regex. Click the button below once you've understood the implementation."
    />
  );
}
