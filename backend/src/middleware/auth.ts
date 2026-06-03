import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { JwtPayload } from '../types'

const SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' })
    return
  }
  try {
    req.user = jwt.verify(header.slice(7), SECRET) as JwtPayload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}