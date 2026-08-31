import './decorations.css'

interface SquiggleProps {
  className?: string
  color?: string
  strokeWidth?: number
}

export function Squiggle({ className = '', color = 'var(--ink)', strokeWidth = 4 }: SquiggleProps) {
  return (
    <svg
      viewBox="0 0 120 26"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`deco${className ? ` ${className}` : ''}`}
    >
      <path
        d="M3 14C9 2 16 24 24 13S39 2 47 13s15 11 23 0 15-11 23 0 15 11 24 0"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
