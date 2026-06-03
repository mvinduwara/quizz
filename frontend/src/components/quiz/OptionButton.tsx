interface Props {
  label: string
  text: string
  state: 'default' | 'correct' | 'wrong' | 'selected'
  disabled: boolean
  onClick: () => void
}

const stateStyles = {
  default:  { border: '1px solid var(--border)', background: 'var(--bg2)' },
  selected: { border: '1px solid var(--accent)',  background: '#7c6fff12' },
  correct:  { border: '1px solid var(--green)',   background: '#00e5a018' },
  wrong:    { border: '1px solid var(--red)',     background: '#ff4d6a18' },
}

const keyStyles = {
  default:  { background: 'var(--bg4)', color: 'var(--text2)', border: '1px solid var(--border2)' },
  selected: { background: 'var(--accent)', color: '#fff', border: '1px solid var(--accent)' },
  correct:  { background: 'var(--green)',  color: '#000', border: '1px solid var(--green)' },
  wrong:    { background: 'var(--red)',    color: '#fff', border: '1px solid var(--red)' },
}

export default function OptionButton({ label, text, state, disabled, onClick }: Props) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        ...stateStyles[state],
        padding: '14px 18px', borderRadius: 12,
        display: 'flex', alignItems: 'center', gap: 14,
        cursor: disabled ? 'default' : 'pointer',
        transition: 'all .15s', textAlign: 'left', width: '100%',
      }}
      onMouseEnter={(e) => {
        if (!disabled && state === 'default')
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border3)'
      }}
      onMouseLeave={(e) => {
        if (!disabled && state === 'default')
          (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
      }}
    >
      <div style={{
        ...keyStyles[state],
        width: 28, height: 28, borderRadius: 4,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'DM Mono, monospace', fontSize: 12, fontWeight: 500, flexShrink: 0,
        transition: 'all .15s',
      }}>
        {label}
      </div>
      <span style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{text}</span>
    </button>
  )
}