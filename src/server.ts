// src/server.ts
import './config/envLoader.js'; // NOTE: must match built filename if run from dist
import { serve } from '@hono/node-server'
import app from './app.js'

const PORT = Number(process.env.PORT) || 3000

serve(
  {
    fetch: app.fetch,
    port: PORT
  },
  (info) => {
    console.log(`✅ Server running at http://localhost:${info.port}`)
  }
)
