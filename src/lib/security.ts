import xss from 'xss';

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

export function rateLimit(ip: string, limit: number = 5, windowMs: number = 60000): { success: boolean, resetTime: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true, resetTime: now + windowMs };
  }

  if (entry.count >= limit) {
    return { success: false, resetTime: entry.resetTime };
  }

  entry.count++;
  rateLimitMap.set(ip, entry);
  return { success: true, resetTime: entry.resetTime };
}

export function sanitizeInput(input: string): string {
  return xss(input);
}
