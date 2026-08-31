import type { AccentName } from '../../types'
import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { Sticker } from './Sticker'
import { Squiggle } from '../decorations/Squiggle'
import { ZigZag } from '../decorations/ZigZag'
import './ui.css'

interface SectionHeaderProps {
  index: string
  label: string
  title: ReactNode
  subtitle?: string
  accent?: AccentName
  align?: 'left' | 'center'
  deco?: 'squiggle' | 'zigzag' | 'none'
  decoColor?: string
}

const accentMap: Record<AccentName, 'coral' | 'cobalt' | 'yellow' | 'mint'> = {
  coral: 'coral',
  cobalt: 'cobalt',
  yellow: 'yellow',
  mint: 'mint',
}

export function SectionHeader({
  index,
  label,
  title,
  subtitle,
  accent = 'yellow',
  align = 'left',
  deco = 'squiggle',
  decoColor = 'var(--coral)',
}: SectionHeaderProps) {
  return (
    <Reveal className={`sec-head${align === 'center' ? ' sec-head--center' : ''}`}>
      <div className="sec-head__meta">
        <Sticker accent={accentMap[accent]} rotate={-2}>
          {index} / {label}
        </Sticker>
        {deco === 'zigzag' ? (
          <ZigZag className="sec-head__squiggle draw" color={decoColor} />
        ) : deco === 'squiggle' ? (
          <Squiggle className="sec-head__squiggle draw" color={decoColor} />
        ) : null}
      </div>
      <h2 className="sec-head__title">{title}</h2>
      {subtitle ? <p className="sec-head__sub lead">{subtitle}</p> : null}
    </Reveal>
  )
}
