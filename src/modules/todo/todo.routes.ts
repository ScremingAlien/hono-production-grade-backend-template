import { Hono } from 'hono'
import TodoController from './todo.controller.js'
import { createLimiter } from '../../middlewares/default/rateLimiter.js'

const book = new Hono()

const tc = new TodoController()

book.get('/', createLimiter(60 * 60, 5), tc.getAll) // call with context


export default book
