
export type Difficulty = 'easy' | 'medium' | 'hard'

export type Category =
  | 'networking'
  | 'cloud'
  | 'security'
  | 'devops'
  | 'programming'
  | 'databases'

export interface Question {
  id: number
  cat: Category
  diff: Difficulty
  text: string
  code?: string
  opts: string[]
  ans: number
  exp: string
}

export interface QuizConfig {
  category: Category | 'all'
  difficulty: Difficulty | 'all'
  count: number
}

export interface QuizResult {
  question: Question
  selected: number
  correct: boolean
  timeUsed: number
}

export interface SessionResult {
  score: number
  total: number
  pct: number
  totalTimeLeft: number
  results: QuizResult[]
  config: QuizConfig
  timestamp: number
}

export interface LeaderboardEntry {
  id: number
  name: string
  cat: string
  diff: Difficulty
  score: number
  total: number
  pct: number
  avatar: string
}

export interface User {
  id: number
  username: string
  email: string
  token: string
}