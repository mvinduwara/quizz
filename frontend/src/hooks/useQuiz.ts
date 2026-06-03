import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '@/store/quizStore'
import { QUESTIONS } from '@/data/questions'
import type { Category, Difficulty } from '@/types'

export function useQuiz() {
  const store = useQuizStore()
  const navigate = useNavigate()

  const startQuiz = useCallback(() => {
    const { config } = store
    let pool = [...QUESTIONS]
    if (config.category !== 'all') pool = pool.filter(q => q.cat === (config.category as Category))
    if (config.difficulty !== 'all') pool = pool.filter(q => q.diff === (config.difficulty as Difficulty))
    pool = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(config.count, pool.length))
    if (pool.length < 3) return false
    store.setQuestions(pool)
    navigate('/quiz')
    return true
  }, [store, navigate])

  const submitAnswer = useCallback((selected: number) => {
    const timeUsed = useQuizStore.getState().timerVal
    store.recordAnswer(selected, timeUsed)
  }, [store])

  const advance = useCallback(() => {
    const { current, questions } = useQuizStore.getState()
    if (current + 1 >= questions.length) {
      store.finishQuiz()
      navigate('/results')
    } else {
      store.nextQuestion()
    }
  }, [store, navigate])

  return { startQuiz, submitAnswer, advance }
}