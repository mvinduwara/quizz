import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '@/store/quizStore'
import { useTimer } from '@/hooks/useTimer'
import ProgressBar from '@/components/ui/ProgressBar'
import Timer from '@/components/ui/Timer'
import Badge from '@/components/ui/Badge'
import OptionButton from '@/components/quiz/OptionButton'
import ExplanationPanel from '@/components/quiz/ExplanationPanel'
import type { Category } from '@/types'

const KEYS = ['A', 'B', 'C', 'D']

export default function QuizPage() {
  const navigate = useNavigate()
  const store = useQuizStore()
  const { questions, current, answered, score, results } = store

  const handleExpire = useCallback(() => {
    if (!useQuizStore.getState().answered) {
      store.recordAnswer(-1, 0)
    }
  }, [store])

  const { timerVal, start } = useTimer(handleExpire)

  useEffect(() => {
    if (questions.length === 0) { navigate('/'); return }
    start()
  }, [current, questions.length])

  if (questions.length === 0) return null

  const q = questions[current]
  const lastResult = results[results.length - 1]

  function getOptionState(i: number): 'default' | 'correct' | 'wrong' | 'selected' {
    if (!answered) return 'default'
    if (i === q.ans) return 'correct'
    if (lastResult?.selected === i && i !== q.ans) return 'wrong'
    if (lastResult?.selected === i) return 'selected'
    return 'default'
  }

  function handleAnswer(i: number) {
    if (answered) return
    store.recordAnswer(i, timerVal)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      store.finishQuiz()
      const attempts = parseInt(localStorage.getItem('attempts') || '0') + 1
      localStorage.setItem('attempts', String(attempts))
      const pct = Math.round(((score + (lastResult?.correct ? 0 : 0)) / questions.length) * 100)
      const best = localStorage.getItem('bestScore')
      const finalPct = Math.round((store.score / questions.length) * 100)
      if (!best || finalPct > parseInt(best)) localStorage.setItem('bestScore', String(finalPct))
      navigate('/results')
    } else {
      store.nextQuestion()
    }
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Badge category={q.cat as Category} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--text3)' }}>
              Q {current + 1} of {questions.length}
            </span>
            <span style={{
              padding: '2px 8px', borderRadius: 100, fontSize: 11, fontWeight: 600,
              background: q.diff === 'easy' ? '#00e5a022' : q.diff === 'medium' ? '#ffb44422' : '#ff4d6a22',
              color: q.diff === 'easy' ? 'var(--green)' : q.diff === 'medium' ? 'var(--amber)' : 'var(--red)',
            }}>
              {q.diff}
            </span>
          </div>
          <Timer value={timerVal} />
        </div>

        <ProgressBar value={current} max={questions.length} />

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: 28, marginBottom: 20 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(16px, 2.5vw, 20px)', fontWeight: 700, lineHeight: 1.45, letterSpacing: -0.3, color: 'var(--text)' }}>
            {q.text}
          </div>
          {q.code && (
            <pre style={{ background: 'var(--bg4)', border: '1px solid var(--border2)', borderRadius: 8, padding: '12px 16px', fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--cyan)', marginTop: 14, whiteSpace: 'pre-wrap', overflow: 'auto' }}>
              {q.code}
            </pre>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
          {q.opts.map((opt, i) => (
            <OptionButton
              key={i}
              label={KEYS[i]}
              text={opt}
              state={getOptionState(i)}
              disabled={answered}
              onClick={() => handleAnswer(i)}
            />
          ))}
        </div>

        {answered && lastResult && (
          <ExplanationPanel
            text={q.exp}
            correct={lastResult.correct}
            timeout={lastResult.selected === -1}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 13, color: 'var(--text3)' }}>
            Score: <span style={{ color: 'var(--green)', fontWeight: 500 }}>{score}</span> / {questions.length}
          </div>
          <button
            onClick={handleNext}
            disabled={!answered}
            style={{
              padding: '12px 24px', borderRadius: 8, border: 'none',
              background: answered ? 'var(--accent)' : 'var(--bg4)',
              color: answered ? '#fff' : 'var(--text3)',
              fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700,
              cursor: answered ? 'pointer' : 'not-allowed', transition: 'all .2s',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            {current + 1 >= questions.length ? 'See Results →' : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}