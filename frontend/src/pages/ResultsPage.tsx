import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '@/store/quizStore'
import ScoreCard from '@/components/results/ScoreCard'
import PerformanceChart from '@/components/results/PerformanceChart'
import ReviewList from '@/components/results/ReviewList'

export default function ResultsPage() {
  const navigate = useNavigate()
  const { sessionResult } = useQuizStore()

  useEffect(() => {
    if (!sessionResult) navigate('/')
  }, [sessionResult, navigate])

  if (!sessionResult) return null

  const { score, total, pct, totalTimeLeft, results } = sessionResult

  const metrics = [
    { val: score, label: 'Correct', color: 'var(--green)' },
    { val: total - score, label: 'Wrong', color: 'var(--red)' },
    { val: pct + '%', label: 'Score', color: 'var(--accent2)' },
    { val: totalTimeLeft + 's', label: 'Time Saved', color: 'var(--amber)' },
  ]

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <ScoreCard score={score} total={total} pct={pct} timeLeft={totalTimeLeft} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
          {metrics.map(m => (
            <div key={m.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 800, color: m.color }}>{m.val}</div>
              <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>{m.label}</div>
            </div>
          ))}
        </div>

        <PerformanceChart results={results} />
        <ReviewList results={results} />

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 8 }}>
          <button
            onClick={() => navigate('/')}
            style={{ padding: '12px 28px', borderRadius: 8, border: '1px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)', fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            ← New Quiz
          </button>
          <button
            onClick={() => navigate('/leaderboard')}
            style={{ padding: '12px 28px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
          >
            Leaderboard →
          </button>
        </div>
      </div>
    </div>
  )
}