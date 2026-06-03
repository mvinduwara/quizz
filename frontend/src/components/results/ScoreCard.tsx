interface Props { score: number; total: number; pct: number; timeLeft: number }

const getGrade = (pct: number) => {
  if (pct >= 90) return { grade: 'A', msg: 'Outstanding! You\'re an IT expert.', cls: '#00e5a0' }
  if (pct >= 75) return { grade: 'B', msg: 'Great job! Solid IT knowledge.', cls: 'var(--accent2)' }
  if (pct >= 60) return { grade: 'C', msg: 'Good effort! Room to grow.', cls: 'var(--amber)' }
  return { grade: 'D', msg: 'Keep studying — you\'ll get there!', cls: 'var(--red)' }
}

export default function ScoreCard({ score, total, pct, timeLeft }: Props) {
  const { grade, msg, cls } = getGrade(pct)
  return (
    <div style={{ textAlign: 'center', padding: '32px 0 24px' }}>
      <div style={{
        fontFamily: 'Syne, sans-serif', fontSize: 72,
        fontWeight: 800, letterSpacing: -4, lineHeight: 1,
        background: `linear-gradient(135deg, ${cls}, var(--cyan))`,
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
      }}>
        {grade}
      </div>
      <div style={{ fontSize: 16, color: 'var(--text2)', marginTop: 8 }}>{msg}</div>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 18, color: 'var(--text)', marginTop: 4 }}>
        {pct}% · {score}/{total} correct · {timeLeft}s saved
      </div>
    </div>
  )
}