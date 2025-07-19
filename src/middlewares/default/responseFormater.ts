import { createMiddleware } from 'hono/factory'

export const responseFormatter = createMiddleware<{
  Variables: {
    success: (message?: string | null, data?: any) => Response
    fail: (message?: string | null, extra?: Record<string, any>) => Response
  }
}>(async (c, next) => {
  c.set('success', (message = null, data = null) =>
    c.json({
      success: true,
      message,
      timestamp: new Date().toISOString(),
      data,
    })
  )

  c.set('fail', (message = null, extra = {}) =>
    c.json({
      success: false,
      message,
      timestamp: new Date().toISOString(),
      route: c.req.path,
      data: null,
      ...extra,
    })
  )

  await next()
})
