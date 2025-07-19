import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { responseFormatter } from './middlewares/default/responseFormater.js'
import { notFound } from './middlewares/default/notFound.js'
import book from './modules/todo/todo.routes.js'

const app = new Hono()

// 🌐 Global Middlewares
app.use('*', logger())
app.use('*', cors())
app.use('*', secureHeaders())
app.use('*', responseFormatter)
app.notFound(notFound)

app.route('/todo', book)

// ✅ Route using the helper

app.get('/ok', (c) => {
  return c.var.success('It worked!', { userId: 123 })
})

app.get('/error', (c) => {
  return c.var.fail('Something went wrong', { errorCode: 500 })
})

export default app
