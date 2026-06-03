import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

const tabs = [
  { label: 'Home', path: '/' },
  { label: 'Quiz', path: '/quiz' },
  { label: 'Leaderboard', path: '/leaderboard' },
]

export default function Navbar() {
  const location = useLocation()
  const { isAuthenticated, logout, user } = useAuthStore()

  return (
    <nav
      style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(9,9,15,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 24px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}
    >
      <Link to="/" style={{ fontFamily: 'Syne, sans-serif', fontSize: 18, fontWeight: 800, letterSpacing: -0.5, display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: 'var(--text)' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)', display: 'inline-block' }} />
        IT<span style={{ color: 'var(--accent2)' }}>Quiz</span>
      </Link>

      <div style={{ display: 'flex', gap: 4, background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, padding: 3 }}>
        {tabs.map(t => (
          <Link
            key={t.path}
            to={t.path}
            style={{
              padding: '5px 14px', borderRadius: 4, fontSize: 13, fontWeight: 500, textDecoration: 'none',
              color: location.pathname === t.path ? 'var(--text)' : 'var(--text2)',
              background: location.pathname === t.path ? 'var(--accent)' : 'transparent',
              boxShadow: location.pathname === t.path ? '0 2px 12px #7c6fff44' : 'none',
              transition: 'all .2s',
            }}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {isAuthenticated ? (
          <>
            <span style={{ fontSize: 13, color: 'var(--text2)' }}>{user?.username}</span>
            <button
              onClick={logout}
              style={{ fontSize: 13, color: 'var(--text3)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ fontSize: 13, color: 'var(--accent2)', textDecoration: 'none', fontWeight: 500 }}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}