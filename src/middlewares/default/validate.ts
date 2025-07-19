// middlewares/validate.ts
import type { MiddlewareHandler } from 'hono'
import type { ZodJSONSchema } from 'zod'

export const validate = (schema: ZodJSONSchema): MiddlewareHandler => {
  return async (c, next) => {
    try {
      // Safely parse body
      let body: unknown = {}
      try {
        body = await c.req.json()
      } catch {
        body = {}
      }

      // Extract query and params
      const query = Object.fromEntries(c.req.query() || [])
      const params = c.req.param()

      // Run validation
      const result = schema.safeParse({ body, query, params })

      if (!result.success) {
        return c.json(
          {
            success: false,
            message: 'Validation failed',
            errors: result.error.errors.map(err => ({
              field: err.path.join('.'),
              message: err.message
            }))
          },
          400
        )
      }

      // Set validated data to context
      c.set('validated', result.data)
      await next()
    } catch (err) {
      console.error('Unexpected error in validate middleware:', err)
      return c.json(
        {
          success: false,
          message: 'Internal server error in validation',
        },
        500
      )
    }
  }
}
