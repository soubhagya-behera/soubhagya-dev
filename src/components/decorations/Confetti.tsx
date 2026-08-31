interface ConfettiProps {
  className?: string
}

const pieces = [
  { x: 14, y: 18, kind: 'circle', color: 'var(--coral)', rot: 0 },
  { x: 46, y: 8, kind: 'square', color: 'var(--cobalt)', rot: 18 },
  { x: 82, y: 22, kind: 'triangle', color: 'var(--yellow)', rot: -10 },
  { x: 26, y: 52, kind: 'cross', color: 'var(--ink)', rot: 0 },
  { x: 62, y: 44, kind: 'circle', color: 'var(--mint)', rot: 0 },
  { x: 98, y: 58, kind: 'square', color: 'var(--coral)', rot: 24 },
  { x: 12, y: 86, kind: 'triangle', color: 'var(--cobalt)', rot: 14 },
  { x: 50, y: 92, kind: 'circle', color: 'var(--yellow)', rot: 0 },
  { x: 88, y: 96, kind: 'cross', color: 'var(--mint)', rot: 12 },
] as const

export function Confetti({ className = '' }: ConfettiProps) {
  return (
    <svg
      viewBox="0 0 110 110"
      width="110"
      height="110"
      aria-hidden="true"
      focusable="false"
      className={`deco${className ? ` ${className}` : ''}`}
    >
      {pieces.map((piece, index) => {
        const transform = `rotate(${piece.rot} ${piece.x} ${piece.y})`
        if (piece.kind === 'circle') {
          return <circle key={index} cx={piece.x} cy={piece.y} r="5" fill={piece.color} transform={transform} />
        }
        if (piece.kind === 'square') {
          return (
            <rect
              key={index}
              x={piece.x - 4}
              y={piece.y - 4}
              width="8"
              height="8"
              rx="1.5"
              fill={piece.color}
              transform={transform}
            />
          )
        }
        if (piece.kind === 'triangle') {
          return (
            <path
              key={index}
              d={`M ${piece.x} ${piece.y - 5.5} L ${piece.x + 5} ${piece.y + 4.5} H ${piece.x - 5} Z`}
              fill={piece.color}
              transform={transform}
            />
          )
        }
        return (
          <g key={index} stroke={piece.color} strokeWidth="2" strokeLinecap="round" transform={transform}>
            <line x1={piece.x - 4.5} y1={piece.y} x2={piece.x + 4.5} y2={piece.y} />
            <line x1={piece.x} y1={piece.y - 4.5} x2={piece.x} y2={piece.y + 4.5} />
          </g>
        )
      })}
    </svg>
  )
}
