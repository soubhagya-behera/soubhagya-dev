interface DotsProps {
  className?: string
  rows?: number
  cols?: number
  gap?: number
  radius?: number
  color?: string
}

export function Dots({
  className = '',
  rows = 3,
  cols = 5,
  gap = 18,
  radius = 4,
  color = 'var(--mint)',
}: DotsProps) {
  const width = cols * gap
  const height = rows * gap
  const circles = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      circles.push(
        <circle key={`${r}-${c}`} cx={(c + 0.5) * gap} cy={(r + 0.5) * gap} r={radius} fill={color} />,
      )
    }
  }
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      focusable="false"
      className={`deco${className ? ` ${className}` : ''}`}
    >
      {circles}
    </svg>
  )
}
