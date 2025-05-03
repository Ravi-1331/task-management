import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import AppRoutes from './src/routes/index.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL

const app = express()

// CORS Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// Handle preflight requests manually (for OPTIONS)
app.options('*', cors({
  origin: FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Routes
app.use('/', AppRoutes)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
