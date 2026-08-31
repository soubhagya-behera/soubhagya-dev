interface ZigZagProps {
  className?: string
  color?: string
  strokeWidth?: number
}

export function ZigZag({ className = '', color = 'var(--cobalt)', strokeWidth = 4 }: ZigZagProps) {
  return (
    <svg
      viewBox="0 0 100 26"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`deco${className ? ` ${className}` : ''}`}
    >
      <polyline
        points="2,20 15,6 28,20 41,6 54,20 67,6 80,20 93,6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
