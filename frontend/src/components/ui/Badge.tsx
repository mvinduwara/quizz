import type { ReactNode } from 'react'

type Color = 'networking' | 'cloud' | 'security' | 'devops' | 'programming' | 'databases'

const palette: Record<Color, { bg: string; color: string; border: string }> = {
  networking:  { bg: '#00d4ff22', color: 'var(--cyan)',    border: '#00d4ff33' },
  cloud:       { bg: '#7c6fff22', color: 'var(--accent2)', border: 'var(--border2)' },
  security:    { bg: '#ff4d6a22', color: 'var(--red)',     border: '#ff4d6a33' },
  devops:      { bg: '#00e5a022', color: 'var(--green)',   border: '#00e5a033' },
  programming: { bg: '#ffb44422', color: 'var(--amber)',   border: '#ffb44433' },
  databases:   { bg: '#ff6eb422', color: 'var(--pink)',    border: '#ff6eb433' },
}

interface Props { category: Color; children?: ReactNode }

export default function Badge({ category, children }: Props) {
  const c = palette[category]
  return (
    <span style={{
      padding: '4px 10px', borderRadius: 100,
      fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
      textTransform: 'uppercase', background: c.bg,
      color: c.color, border: `1px solid ${c.border}`,
    }}>
      {children ?? category}
    </span>
  )
}