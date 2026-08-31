import type { CSSProperties } from 'react'

export type ShapeVariant =
  | 'circle'
  | 'ring'
  | 'triangle'
  | 'star'
  | 'cross'
  | 'arc'
  | 'diamond'
  | 'halfcircle'

interface ShapeProps {
  variant?: ShapeVariant
  size?: number
  color?: string
  filled?: boolean
  strokeWidth?: number
  className?: string
  style?: CSSProperties
}

function inner(variant: ShapeVariant, color: string, filled: boolean, strokeWidth: number) {
  const fill = filled && variant !== 'ring' ? color : 'none'
  const stroke = filled && variant !== 'ring' ? 'var(--ink)' : color
  switch (variant) {
    case 'circle':
      return <circle cx="24" cy="24" r="19" fill={fill} stroke={stroke} strokeWidth={strokeWidth} />
    case 'ring':
      return (
        <circle
          cx="24"
          cy="24"
          r="19"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth + 1.5}
          strokeDasharray="9 7"
          strokeLinecap="round"
        />
      )
    case 'triangle':
      return (
        <path d="M24 5 44 41H4Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      )
    case 'star':
      return (
        <path
          d="M24 3l6 12.8L44 17.5l-10 9.6 2.4 13.6L24 34l-12.4 6.7L14 27.1 4 17.5l14-1.7z"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      )
    case 'cross':
      return (
        <g
          stroke={color}
          strokeWidth={strokeWidth * 1.6}
          strokeLinecap="round"
          fill="none"
        >
          <path d="M24 6v36" />
          <path d="M6 24h36" />
        </g>
      )
    case 'arc':
      return (
        <path
          d="M5 33A19 19 0 0 1 43 33"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      )
    case 'diamond':
      return (
        <rect
          x="11"
          y="11"
          width="26"
          height="26"
          rx="4"
          transform="rotate(45 24 24)"
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )
    case 'halfcircle':
      return (
        <path d="M5 30A19 19 0 0 1 43 30Z" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round" />
      )
  }
}

export function Shape({
  variant = 'circle',
  size = 48,
  color = 'var(--coral)',
  filled = false,
  strokeWidth = 3,
  className = '',
  style,
}: ShapeProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`deco${className ? ` ${className}` : ''}`}
      style={style}
    >
      {inner(variant, color, filled, strokeWidth)}
    </svg>
  )
}
