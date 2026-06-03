interface Props { value: number; max: number }

export default function ProgressBar({ value, max }: Props) {
  const pct = Math.round((value / max) * 100)
  return (
    <div style={{ height: 3, background: 'var(--bg4)', borderRadius: 100, overflow: 'hidden', marginBottom: 28 }}>
      <div style={{
        height: '100%', width: `${pct}%`,
        background: 'linear-gradient(90deg, var(--accent3), var(--accent2))',
        borderRadius: 100, transition: 'width .4s ease',
      }} />
    </div>
  )
}