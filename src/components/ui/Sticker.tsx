import type { CSSProperties, ReactNode } from 'react'

type StickerAccent = 'white' | 'yellow' | 'coral' | 'mint' | 'cobalt' | 'ghost'

interface StickerProps {
  children: ReactNode
  accent?: StickerAccent
  rotate?: number
  className?: string
}

export function Sticker({ children, accent = 'white', rotate = 0, className = '' }: StickerProps) {
  const style: CSSProperties | undefined = rotate !== 0 ? { transform: `rotate(${rotate}deg)` } : undefined
  const cls = ['sticker', `sticker--${accent}`, className].filter(Boolean).join(' ')
  return (
    <span className={cls} style={style}>
      {children}
    </span>
  )
}
