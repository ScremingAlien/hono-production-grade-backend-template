import { rateLimiter } from 'hono-rate-limiter'
import type { Context, MiddlewareHandler } from 'hono'

// Default limiter
const rawLimiter = (windowMs: number, limit: number) =>
     rateLimiter({
          windowMs,
          limit,
          standardHeaders: true,
          keyGenerator: (c) =>
               c.req.header('x-forwarded-for') ||
               c.req.header('cf-connecting-ip') ||
               c.req.raw.headers.get('x-real-ip') ||
               c.req.raw.headers.get('host') ||
               'anonymous',
     })

// Custom wrapper for your limiter with custom response
export const createLimiter = (windowMs: number, limit: number): MiddlewareHandler => {
     const limiter = rawLimiter(windowMs, limit)

     return async (c, next) => {
          try {
               await limiter(c, next) // run original limiter
          } catch (err) {
               // Custom error response
               return c.var.fail('Too many requests', { errorCode: 429 })
          }
     }
}
