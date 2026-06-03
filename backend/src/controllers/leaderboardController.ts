import { Request, Response } from 'express'
import { z } from 'zod'
import db from '../db/schema'

const SubmitSchema = z.object({
  score: z.number().int().min(0),
  total: z.number().int().min(1),
  category: z.string(),
  difficulty: z.string(),
  guestName: z.string().optional(),
})

export function getLeaderboard(req: Request, res: Response): void {
  const { category } = req.query
  let query = `
    SELECT s.id, COALESCE(u.username, s.guest_name, 'Anonymous') as name,
           s.category, s.difficulty, s.score, s.total, s.pct, s.created_at
    FROM scores s LEFT JOIN users u ON s.user_id = u.id
    WHERE 1=1
  `
  const params: string[] = []
  if (category && category !== 'all') { query += ' AND s.category = ?'; params.push(String(category)) }
  query += ' ORDER BY s.pct DESC, s.score DESC LIMIT 50'
  res.json(db.prepare(query).all(...params))
}

export function submitScore(req: Request, res: Response): void {
  const { score, total, category, difficulty, guestName } = SubmitSchema.parse(req.body)
  const pct = Math.round((score / total) * 100)
  const userId = req.user?.id ?? null
  const result = db.prepare(
    'INSERT INTO scores (user_id, guest_name, category, difficulty, score, total, pct) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(userId, guestName ?? null, category, difficulty, score, total, pct)
  res.status(201).json({ id: result.lastInsertRowid, pct })
}