import 'hono'

declare module 'hono' {
  interface ContextVariableMap {
    success: (message?: string | null, data?: any) => Response
    fail: (message?: string | null, extra?: Record<string, any>) => Response
  }
}
