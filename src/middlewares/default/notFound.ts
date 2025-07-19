// middlewares/notFound.ts
import type { Context } from 'hono'
 

export const notFound = (c: Context) => {
  return c.json({
    success: false,
    message: 'Route not found',
    timestamp: new Date().toISOString(),
    data: null,
    route: c.req.path,
  }, 404);
}
