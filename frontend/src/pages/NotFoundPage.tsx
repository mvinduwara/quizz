import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div style={{ padding: 24, minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 96, fontWeight: 800, letterSpacing: -6, background: 'linear-gradient(135deg, var(--accent2), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        404
      </div>
      <div style={{ fontSize: 18, color: 'var(--text2)', marginBottom: 24 }}>This page doesn't exist.</div>
      <button onClick={() => navigate('/')} style={{ padding: '12px 28px', borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>
        Go Home
      </button>
    </div>
  )
}