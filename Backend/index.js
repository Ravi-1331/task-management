import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import AppRoutes from './src/routes/index.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

// CORS Middleware
app.use(cors("*"))

app.use(express.json())

// Routes
app.use('/', AppRoutes)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`)
})
