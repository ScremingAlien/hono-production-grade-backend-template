// middlewares/errorHandler.ts
import type { MiddlewareHandler } from 'hono'

export const errorHandler: MiddlewareHandler = async (c, next) => {
  try {
    await next()
  } catch (err: any) {
    console.error(err.stack)
    return c.json({
      success: false,
      message: err.message || 'Internal Server Error',
      timestamp: new Date().toISOString(),
      data: null,
      route: c.req.path,
    }, 500)
  }
}
