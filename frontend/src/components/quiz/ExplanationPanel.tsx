interface Props { text: string; correct: boolean; timeout?: boolean }

export default function ExplanationPanel({ text, correct, timeout }: Props) {
  const accentColor = timeout ? 'var(--amber)' : correct ? 'var(--green)' : 'var(--red)'
  const label = timeout ? '⏱ Time\'s up!' : correct ? '✓ Correct!' : '✗ Incorrect'

  return (
    <div style={{
      background: 'var(--bg3)', border: '1px solid var(--border2)',
      borderRadius: 12, padding: '16px 20px',
      borderLeft: `3px solid ${accentColor}`,
      marginBottom: 20, animation: 'slideIn .3s ease',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase', color: accentColor, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.65 }}>{text}</div>
    </div>
  )
}