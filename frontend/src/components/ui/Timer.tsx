interface Props { value: number; max?: number }

export default function Timer({ value, max = 30 }: Props) {
  const r = 18
  const circumference = 2 * Math.PI * r
  const offset = circumference - (value / max) * circumference
  const stroke = value > 15 ? 'var(--green)' : value > 8 ? 'var(--amber)' : 'var(--red)'

  return (
    <div style={{ position: 'relative', width: 44, height: 44 }}>
      <svg width="44" height="44" viewBox="0 0 44 44" style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx="22" cy="22" r={r}
          fill="none"
          stroke="var(--bg4)"
          strokeWidth="3"
        />
        <circle
          cx="22" cy="22" r={r}
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.5s linear, stroke 0.5s' }}
        />
      </svg>
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Mono, monospace',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--text)',
      }}>
        {value}
      </div>
    </div>
  )
}