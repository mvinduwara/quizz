import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuizStore } from '@/store/quizStore'
import { QUESTIONS } from '@/data/questions'
import type { Category, Difficulty } from '@/types'

const CATEGORIES: { label: string; value: string }[] = [
  { label: 'All Topics', value: 'all' },
  { label: 'Networking', value: 'networking' },
  { label: 'Cloud', value: 'cloud' },
  { label: 'Security', value: 'security' },
  { label: 'DevOps', value: 'devops' },
  { label: 'Programming', value: 'programming' },
  { label: 'Databases', value: 'databases' },
]

const DIFFICULTIES = [
  { label: 'All', value: 'all', color: 'var(--text2)' },
  { label: 'Easy', value: 'easy', color: 'var(--green)' },
  { label: 'Medium', value: 'medium', color: 'var(--amber)' },
  { label: 'Hard', value: 'hard', color: 'var(--red)' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { config, setConfig, setQuestions } = useQuizStore()
  const [count, setCount] = useState(10)
  const [error, setError] = useState('')
  const attempts = parseInt(localStorage.getItem('attempts') || '0')
  const bestScore = localStorage.getItem('bestScore')

  function handleStart() {
    let pool = [...QUESTIONS]
    if (config.category !== 'all') pool = pool.filter(q => q.cat === (config.category as Category))
    if (config.difficulty !== 'all') pool = pool.filter(q => q.diff === (config.difficulty as Difficulty))
    pool = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(count, pool.length))
    if (pool.length < 3) { setError('Not enough questions for that combination. Try "All" options.'); return }
    setError('')
    setConfig({ count })
    setQuestions(pool)
    navigate('/quiz')
  }

  return (
    <div style={{ padding: 24 }}>
      <div style={{ textAlign: 'center', padding: '40px 24px 32px', maxWidth: 700, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: 'var(--bg3)', border: '1px solid var(--border2)',
          borderRadius: 100, padding: '4px 14px', fontSize: 12, fontWeight: 500,
          color: 'var(--accent2)', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 20,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', animation: 'pulse 2s infinite', display: 'inline-block' }} />
          60+ Questions
        </div>
        <h1 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: -2, marginBottom: 14 }}>
          Test Your <span className="grad-text">IT Knowledge</span>
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 32px' }}>
          Challenge yourself across Networking, Cloud, Security, DevOps, Programming, and Databases.
        </p>
      </div>

      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, maxWidth: 600, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
              Category
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {CATEGORIES.map(c => (
                <button
                  key={c.value}
                  onClick={() => setConfig({ category: c.value as Category | 'all' })}
                  style={{
                    padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    border: `1px solid ${config.category === c.value ? 'var(--accent)' : 'var(--border2)'}`,
                    background: config.category === c.value ? '#7c6fff22' : 'var(--bg3)',
                    color: config.category === c.value ? 'var(--accent2)' : 'var(--text2)',
                    transition: 'all .15s',
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
              Difficulty
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {DIFFICULTIES.map(d => (
                <button
                  key={d.value}
                  onClick={() => setConfig({ difficulty: d.value as Difficulty | 'all' })}
                  style={{
                    padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                    border: `1px solid ${config.difficulty === d.value ? d.color : 'var(--border2)'}`,
                    background: config.difficulty === d.value ? `${d.color}22` : 'var(--bg3)',
                    color: config.difficulty === d.value ? d.color : 'var(--text2)',
                    transition: 'all .15s',
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>
            Number of Questions
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => setCount(c => Math.max(5, c - 5))} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', fontSize: 16, cursor: 'pointer' }}>−</button>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 22, fontWeight: 500, minWidth: 40, textAlign: 'center' }}>{count}</span>
            <button onClick={() => setCount(c => Math.min(20, c + 5))} style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg3)', border: '1px solid var(--border2)', color: 'var(--text)', fontSize: 16, cursor: 'pointer' }}>+</button>
            <span style={{ fontSize: 13, color: 'var(--text2)' }}>questions · ~{Math.round(count * 0.5)} min</span>
          </div>
        </div>

        {error && <div style={{ fontSize: 13, color: 'var(--red)', marginBottom: 12 }}>{error}</div>}

        <button
          onClick={handleStart}
          style={{
            width: '100%', padding: 14, borderRadius: 12, border: 'none',
            fontFamily: 'Syne, sans-serif', fontSize: 16, fontWeight: 700,
            background: 'linear-gradient(135deg, var(--accent3), var(--accent))',
            color: '#fff', cursor: 'pointer', transition: 'all .2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 32px #7c6fff33' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = ''; (e.currentTarget as HTMLButtonElement).style.boxShadow = '' }}
        >
          Start Quiz →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, maxWidth: 600, margin: '24px auto 0' }}>
        {[
          { num: '60+', label: 'Questions' },
          { num: '6', label: 'Categories' },
          { num: attempts, label: 'Your Attempts' },
          { num: bestScore ? bestScore + '%' : '—', label: 'Best Score' },
          { num: '3', label: 'Difficulty Levels' },
          { num: '30s', label: 'Per Question' },
        ].map(s => (
          <div key={s.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, color: 'var(--accent2)' }}>{s.num}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}