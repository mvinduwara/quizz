import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit() {
    setError(''); setLoading(true)
    try {
      const url = mode === 'login' ? '/api/auth/login' : '/api/auth/register'
      const body = mode === 'login'
        ? { email: form.email, password: form.password }
        : form
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setUser(data)
      navigate('/')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: '100%', padding: '11px 14px', background: 'var(--bg3)',
    border: '1px solid var(--border2)', borderRadius: 8, color: 'var(--text)',
    fontSize: 14, fontFamily: 'DM Sans, sans-serif', outline: 'none',
    marginBottom: 12,
  }

  return (
    <div style={{ padding: 24, minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, width: '100%', maxWidth: 400 }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, marginBottom: 6 }}>
          {mode === 'login' ? 'Welcome back' : 'Create account'}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 24 }}>
          {mode === 'login' ? 'Sign in to track your scores.' : 'Join to save progress and compete.'}
        </div>

        {mode === 'register' && (
          <input style={inputStyle} placeholder="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} />
        )}
        <input style={inputStyle} placeholder="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input style={inputStyle} placeholder="Password" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />

        {error && <div style={{ fontSize: 13, color: 'var(--red)', marginBottom: 12 }}>{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: '100%', padding: 12, borderRadius: 8, border: 'none', background: 'var(--accent)', color: '#fff', fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
        >
          {loading ? 'Loading…' : mode === 'login' ? 'Sign In' : 'Register'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--text3)' }}>
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button onClick={() => setMode(m => m === 'login' ? 'register' : 'login')} style={{ color: 'var(--accent2)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500 }}>
            {mode === 'login' ? 'Register' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  )
}