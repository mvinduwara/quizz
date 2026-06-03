import { useEffect, useRef, useCallback } from 'react'
import { useQuizStore } from '@/store/quizStore'

export function useTimer(onExpire: () => void) {
  const { timerVal, answered, setTimer } = useQuizStore()
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clear = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [])

  const start = useCallback(() => {
    clear()
    setTimer(30)
    intervalRef.current = setInterval(() => {
      const current = useQuizStore.getState().timerVal
      if (current <= 1) {
        clear()
        setTimer(0)
        onExpire()
      } else {
        setTimer(current - 1)
      }
    }, 1000)
  }, [clear, setTimer, onExpire])

  useEffect(() => {
    if (answered) clear()
  }, [answered, clear])

  useEffect(() => () => clear(), [clear])

  return { timerVal, start, clear }
}