import LessonContent from '@/components/LessonContent';

export default function RateLimitLesson() {
  return (
    <LessonContent 
      id="rate-limiting"
      title="Rate Limiting Theory"
      vulnerability="Without rate limiting, an application is vulnerable to Brute Force attacks (trying thousands of passwords) and Denial of Service (DoS) attacks that overwhelm server resources."
      explanation={`Rate limiting is a strategy for limiting network traffic. It puts a cap on how often someone can repeat an action within a certain timeframe – for instance, trying to log in to an account.

We implement this using a 'Window' approach. For every IP address, we track the number of requests made within a 60-second window. If the count exceeds our threshold, further requests are blocked until the window resets.

In Vibe Sentry, this protocol is integrated into our Chat API to prevent AI resource exhaustion.`}
      defenseSnippet={`const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true };
  }

  if (entry.count >= limit) {
    return { success: false };
  }

  entry.count++;
  return { success: true };
}`}
      practiceInstructions="Observe the in-memory map implementation. While simple, it provides robust protection for session-based interactions. Click the button below to finalize your curriculum."
    />
  );
}
