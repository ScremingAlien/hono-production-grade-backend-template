import type { Context } from 'hono'

class TodoController {
     async getAll(c: Context): Promise<Response> {
          return c.var.success('Get all todo', { userId: 123 })
     }
}

export default TodoController
