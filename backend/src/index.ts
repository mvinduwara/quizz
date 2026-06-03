import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth'
import questionRoutes from './routes/questions'
import leaderboardRoutes from './routes/leaderboard'
import { errorHandler } from './middleware/errorHandler'
import './db/schema'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }))
app.use('/api/auth', authRoutes)
app.use('/api/questions', questionRoutes)
app.use('/api/leaderboard', leaderboardRoutes)

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))