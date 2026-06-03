import { Request, Response } from 'express'
import db from '../db/schema'

interface RawQuestion {
  id: number; category: string; difficulty: string
  text: string; code: string | null; opts: string; ans: number; explanation: string
}

function parseQuestion(q: RawQuestion) {
  return { ...q, opts: JSON.parse(q.opts) }
}

export function getAllQuestions(req: Request, res: Response): void {
  const { category, difficulty } = req.query
  let query = 'SELECT * FROM questions WHERE 1=1'
  const params: string[] = []
  if (category && category !== 'all') { query += ' AND category = ?'; params.push(String(category)) }
  if (difficulty && difficulty !== 'all') { query += ' AND difficulty = ?'; params.push(String(difficulty)) }
  const rows = db.prepare(query).all(...params) as RawQuestion[]
  res.json(rows.map(parseQuestion))
}

export function getQuestionById(req: Request, res: Response): void {
  const q = db.prepare('SELECT * FROM questions WHERE id = ?').get(req.params.id) as RawQuestion | undefined
  if (!q) { res.status(404).json({ error: 'Question not found' }); return }
  res.json(parseQuestion(q))
}