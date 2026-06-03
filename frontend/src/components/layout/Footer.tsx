export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)', padding: '20px 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <span style={{ fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 800, color: 'var(--text3)' }}>
        IT<span style={{ color: 'var(--accent)' }}>Quiz</span>
      </span>
      <span style={{ fontSize: 12, color: 'var(--text3)' }}>
        60+ questions across 6 IT categories
      </span>
    </footer>
  )
}