import { useState } from 'react'
import { useQuizStore } from '@/store/quizStore'
import type { LeaderboardEntry } from '@/types'

const MOCK: LeaderboardEntry[] = [
  { id:1,  name:'Aarav Shah',   cat:'networking',  diff:'hard',   score:10, total:10, pct:100, avatar:'AS' },
  { id:2,  name:'Priya Chen',   cat:'cloud',       diff:'hard',   score:9,  total:10, pct:90,  avatar:'PC' },
  { id:3,  name:'Marcus Kim',   cat:'security',    diff:'hard',   score:9,  total:10, pct:90,  avatar:'MK' },
  { id:4,  name:'Leila Nazari', cat:'all',         diff:'medium', score:17, total:20, pct:85,  avatar:'LN' },
  { id:5,  name:'James Obi',    cat:'devops',      diff:'medium', score:8,  total:10, pct:80,  avatar:'JO' },
  { id:6,  name:'Sofia Ruiz',   cat:'programming', diff:'medium', score:8,  total:10, pct:80,  avatar:'SR' },
  { id:7,  name:'Tom Larsen',   cat:'databases',   diff:'easy',   score:9,  total:10, pct:90,  avatar:'TL' },
  { id:8,  name:'Yuki Tanaka',  cat:'all',         diff:'easy',   score:14, total:20, pct:70,  avatar:'YT' },
  { id:9,  name:'Dae-Jung Park',cat:'networking',  diff:'medium', score:7,  total:10, pct:70,  avatar:'DP' },
  { id:10, name:'Anna Petrov',  cat:'cloud',       diff:'easy',   score:6,  total:10, pct:60,  avatar:'AP' },
]

const AVATAR_BG = ['#7c6fff22','#00e5a022','#ff4d6a22','#00d4ff22','#ffb44422','#ff6eb422']
const AVATAR_FG = ['var(--accent2)','var(--green)','var(--red)','var(--cyan)','var(--amber)','var(--pink)']

const FILTERS = ['all','networking','cloud','security','devops','programming','databases']

export default function LeaderboardPage() {
  const [filter, setFilter] = useState('all')
  const { sessionResult, config } = useQuizStore()

  const data = (filter === 'all' ? MOCK : MOCK.filter(e => e.cat === filter))
    .sort((a, b) => b.pct - a.pct || b.score - a.score)

  const rankSymbol = (i: number) => i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : String(i + 1)

  return (
    <div style={{ padding: 24 }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>Leaderboard</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {FILTERS.slice(0, 5).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 500, cursor: 'pointer',
                  border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
                  background: filter === f ? '#7c6fff22' : 'var(--bg3)',
                  color: filter === f ? 'var(--accent2)' : 'var(--text2)',
                  transition: 'all .15s',
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto auto auto', alignItems: 'center', padding: '12px 20px', fontSize: 11, fontWeight: 600, letterSpacing: 0.6, textTransform: 'uppercase', color: 'var(--text3)', borderBottom: '1px solid var(--border)', background: 'var(--bg3)' }}>
            <div>#</div><div>Player</div><div>Score</div><div style={{ paddingRight: 8 }}>%</div><div>Level</div>
          </div>
          {data.map((entry, i) => (
            <div
              key={entry.id}
              style={{ display: 'grid', gridTemplateColumns: '48px 1fr auto auto auto', alignItems: 'center', padding: '14px 20px', borderBottom: i === data.length - 1 ? 'none' : '1px solid var(--border)', transition: 'background .15s' }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = 'var(--bg3)'}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = ''}
            >
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 15, fontWeight: 800, color: i < 3 ? ['#ffd700','#c0c0c0','#cd7f32'][i] : 'var(--text3)' }}>
                {rankSymbol(i)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: AVATAR_BG[i % 6], color: AVATAR_FG[i % 6], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
                  {entry.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{entry.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>{entry.cat.charAt(0).toUpperCase() + entry.cat.slice(1)}</div>
                </div>
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 14, fontWeight: 500, color: 'var(--accent2)' }}>
                {entry.score}/{entry.total}
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 12, color: 'var(--text3)', paddingRight: 8 }}>
                {entry.pct}%
              </div>
              <div>
                <span style={{
                  fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 100,
                  background: entry.diff === 'easy' ? '#00e5a022' : entry.diff === 'medium' ? '#ffb44422' : '#ff4d6a22',
                  color: entry.diff === 'easy' ? 'var(--green)' : entry.diff === 'medium' ? 'var(--amber)' : 'var(--red)',
                }}>
                  {entry.diff === 'easy' ? 'Easy' : entry.diff === 'medium' ? 'Med' : 'Hard'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {sessionResult && (
          <div style={{ background: 'linear-gradient(135deg, #5544dd33, #7c6fff22)', border: '1px solid #7c6fff44', borderRadius: 12, padding: '16px 20px', marginTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>Your Latest Score</div>
              <div style={{ fontSize: 13, color: 'var(--text2)' }}>{config.category === 'all' ? 'All Topics' : config.category} · {config.difficulty}</div>
            </div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 18, fontWeight: 500, color: 'var(--accent2)' }}>
              {sessionResult.pct}%
            </div>
          </div>
        )}
      </div>
    </div>
  )
}