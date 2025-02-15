import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import { corsConfig } from './config/cors'
import { connectDB } from './config/db'
import authRoutes from './routes/authRoutes'
import projectRoutes from './routes/projectRoutes'

dotenv.config()
connectDB()

const app = express()
app.use(cors(corsConfig))

// Logging
app.use(morgan('dev'))
// Leer datos del formulario
app.use(express.json())
/* app.use('/api/auth', ) */
app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

export default app