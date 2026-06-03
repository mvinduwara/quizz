import { create } from 'zustand'
import type { Question, QuizConfig, QuizResult, SessionResult } from '@/types'

interface QuizState {
  config: QuizConfig
  questions: Question[]
  current: number
  answered: boolean
  score: number
  timerVal: number
  totalTimeLeft: number
  results: QuizResult[]
  sessionResult: SessionResult | null
  setConfig: (c: Partial<QuizConfig>) => void
  setQuestions: (q: Question[]) => void
  recordAnswer: (selected: number, timeUsed: number) => void
  nextQuestion: () => void
  finishQuiz: () => void
  resetQuiz: () => void
  setTimer: (v: number) => void
}

export const useQuizStore = create<QuizState>((set, get) => ({
  config: { category: 'all', difficulty: 'all', count: 10 },
  questions: [],
  current: 0,
  answered: false,
  score: 0,
  timerVal: 30,
  totalTimeLeft: 0,
  results: [],
  sessionResult: null,

  setConfig: (c) => set((s) => ({ config: { ...s.config, ...c } })),

  setQuestions: (q) => set({
    questions: q, current: 0, answered: false,
    score: 0, timerVal: 30, totalTimeLeft: 0, results: [], sessionResult: null,
  }),

  recordAnswer: (selected, timeUsed) => {
    const { questions, current, score, results } = get()
    const q = questions[current]
    const correct = selected === q.ans
    set({
      answered: true,
      score: correct ? score + 1 : score,
      totalTimeLeft: get().totalTimeLeft + timeUsed,
      results: [...results, { question: q, selected, correct, timeUsed }],
    })
  },

  nextQuestion: () => set((s) => ({ current: s.current + 1, answered: false, timerVal: 30 })),

  finishQuiz: () => {
    const { questions, score, totalTimeLeft, results, config } = get()
    const total = questions.length
    const pct = Math.round((score / total) * 100)
    set({
      sessionResult: { score, total, pct, totalTimeLeft, results, config, timestamp: Date.now() },
    })
  },

  resetQuiz: () => set({
    questions: [], current: 0, answered: false,
    score: 0, timerVal: 30, totalTimeLeft: 0, results: [], sessionResult: null,
  }),

  setTimer: (v) => set({ timerVal: v }),
}))