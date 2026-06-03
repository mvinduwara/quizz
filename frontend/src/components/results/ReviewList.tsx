import type { QuizResult } from '@/types'

const KEYS = ['A', 'B', 'C', 'D']

interface Props { results: QuizResult[] }

export default function ReviewList({ results }: Props) {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: 24, marginBottom: 20 }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
        Question Review
      </div>
      {results.map((r, i) => (
        <div key={i} style={{
          paddingTop: 14, paddingBottom: i === results.length - 1 ? 0 : 14,
          borderBottom: i === results.length - 1 ? 'none' : '1px solid var(--border)',
          display: 'flex', gap: 12,
        }}>
          <div style={{
            width: 22, height: 22, borderRadius: '50%', flexShrink: 0, marginTop: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
            background: r.correct ? '#00e5a033' : '#ff4d6a33',
            color: r.correct ? 'var(--green)' : 'var(--red)',
          }}>
            {r.correct ? '✓' : '✗'}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: 'var(--text)', marginBottom: 4, lineHeight: 1.4 }}>
              {i + 1}. {r.question.text}
            </div>
            <div style={{ fontSize: 12, color: 'var(--text3)' }}>
              {!r.correct && (
                <span style={{ color: 'var(--red)', marginRight: 6 }}>
                  Your answer: {r.selected === -1 ? '(Timeout)' : `${KEYS[r.selected]}. ${r.question.opts[r.selected]}`} ·
                </span>
              )}
              <span style={{ color: 'var(--green)' }}>
                Correct: {KEYS[r.question.ans]}. {r.question.opts[r.question.ans]}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}