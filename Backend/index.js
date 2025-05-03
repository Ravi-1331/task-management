import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import AppRoutes from './src/routes/index.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const FRONTEND_URL = process.env.FRONTEND_URL

const app = express()

// app.use(cors("*"))

// Middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true
}))

// Handle pre-flight requests
app.options('*', cors({
  origin: FRONTEND_URL,
  credentials: true
}))

app.use(express.json())

// Routes
app.use('/', AppRoutes)

// Start Server
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
