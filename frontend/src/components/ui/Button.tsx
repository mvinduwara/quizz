import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

const variants = {
  primary: {
    background: 'linear-gradient(135deg, var(--accent3), var(--accent))',
    color: '#fff', border: 'none',
    boxShadow: '0 4px 20px #7c6fff33',
  },
  outline: {
    background: 'var(--bg3)', color: 'var(--text)',
    border: '1px solid var(--border2)',
  },
  ghost: {
    background: 'transparent', color: 'var(--text2)',
    border: '1px solid transparent',
  },
}

const sizes = {
  sm: { padding: '6px 14px', fontSize: 13 },
  md: { padding: '10px 20px', fontSize: 14 },
  lg: { padding: '14px 28px', fontSize: 16 },
}

export default function Button({ variant = 'primary', size = 'md', children, style, ...rest }: Props) {
  return (
    <button
      {...rest}
      style={{
        ...variants[variant], ...sizes[size],
        borderRadius: 8, fontFamily: 'Syne, sans-serif',
        fontWeight: 700, cursor: 'pointer',
        transition: 'all .2s', display: 'inline-flex',
        alignItems: 'center', gap: 6, letterSpacing: 0.2,
        ...style,
      }}
    >
      {children}
    </button>
  )
}