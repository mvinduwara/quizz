import type { QuizResult } from '@/types'

const CAT_COLORS: Record<string, string> = {
  networking: 'var(--cyan)', cloud: 'var(--accent2)',
  security: 'var(--red)', devops: 'var(--green)',
  programming: 'var(--amber)', databases: 'var(--pink)',
}

interface Props { results: QuizResult[] }

export default function PerformanceChart({ results }: Props) {
  const cats: Record<string, { correct: number; total: number }> = {}
  results.forEach(r => {
    if (!cats[r.question.cat]) cats[r.question.cat] = { correct: 0, total: 0 }
    cats[r.question.cat].total++
    if (r.correct) cats[r.question.cat].correct++
  })

  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
        Performance by Category
      </div>
      {Object.entries(cats).map(([cat, data]) => {
        const pct = Math.round((data.correct / data.total) * 100)
        return (
          <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <div style={{ fontSize: 13, color: 'var(--text2)', width: 100, flexShrink: 0 }}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
            <div style={{ flex: 1, height: 8, background: 'var(--bg4)', borderRadius: 100, overflow: 'hidden' }}>
              <div style={{
                height: '100%', width: `${pct}%`, borderRadius: 100,
                background: CAT_COLORS[cat], transition: 'width .6s ease',
              }} />
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--text3)', width: 36, textAlign: 'right', flexShrink: 0 }}>
              {pct}%
            </div>
          </div>
        )
      })}
    </div>
  )
}