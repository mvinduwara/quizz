import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import db from '../db/schema'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'

const RegisterSchema = z.object({
  username: z.string().min(2).max(30),
  email: z.string().email(),
  password: z.string().min(6),
})

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export async function register(req: Request, res: Response): Promise<void> {
  const { username, email, password } = RegisterSchema.parse(req.body)
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) { res.status(409).json({ error: 'Email already registered' }); return }
  const hash = await bcrypt.hash(password, 12)
  const result = db.prepare('INSERT INTO users (username, email, password) VALUES (?, ?, ?)').run(username, email, hash)
  const id = result.lastInsertRowid as number
  const token = jwt.sign({ id, email, username }, SECRET, { expiresIn: '7d' })
  res.status(201).json({ id, username, email, token })
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = LoginSchema.parse(req.body)
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as { id: number; username: string; email: string; password: string } | undefined
  if (!user) { res.status(401).json({ error: 'Invalid credentials' }); return }
  const match = await bcrypt.compare(password, user.password)
  if (!match) { res.status(401).json({ error: 'Invalid credentials' }); return }
  const token = jwt.sign({ id: user.id, email: user.email, username: user.username }, SECRET, { expiresIn: '7d' })
  res.json({ id: user.id, username: user.username, email: user.email, token })
}