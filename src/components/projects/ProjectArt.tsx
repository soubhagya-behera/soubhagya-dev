import { ACCENTS } from '../../data/projects'
import type { Project } from '../../types'

interface ProjectArtProps {
  project: Project
}

type ArtVariant = 'storefront' | 'chat' | 'systems'

const VARIANTS: ArtVariant[] = ['storefront', 'chat', 'systems']

function WindowChrome({ accent }: { accent: string }) {
  return (
    <>
      {/* browser window frame */}
      <rect x="24" y="22" width="432" height="276" rx="16" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="5" />
      <path d="M24 62h432" stroke="var(--ink)" strokeWidth="4" />
      <rect x="24" y="22" width="432" height="40" rx="16" fill={accent} stroke="var(--ink)" strokeWidth="5" />
      <rect x="24" y="46" width="432" height="16" fill={accent} stroke="none" />
      <path d="M24 62h432" stroke="var(--ink)" strokeWidth="4" />
      <circle cx="48" cy="42" r="6" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="70" cy="42" r="6" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="92" cy="42" r="6" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" />
      {/* address pill */}
      <rect x="150" y="33" width="180" height="18" rx="9" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" opacity="0.85" />
    </>
  )
}

function StorefrontScreen() {
  return (
    <g>
      {/* sidebar */}
      <rect x="44" y="84" width="96" height="192" rx="10" fill="#FFF3D1" stroke="var(--ink)" strokeWidth="3.5" />
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x="56" y={100 + i * 34} width={72 - (i % 2) * 14} height="12" rx="6" fill="rgba(17,17,17,0.28)" />
      ))}
      {/* product cards */}
      {[0, 1].map(col =>
        [0, 1].map(row => (
          <g key={`${col}-${row}`}>
            <rect
              x={160 + col * 142}
              y={84 + row * 100}
              width="128"
              height="86"
              rx="10"
              fill="#DFE5FC"
              stroke="var(--ink)"
              strokeWidth="3.5"
            />
            <rect x={172 + col * 142} y={96 + row * 100} width="104" height="38" rx="6" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" />
            <rect x={172 + col * 142} y={142 + row * 100} width="60" height="10" rx="5" fill="rgba(17,17,17,0.3)" />
            <rect x={172 + col * 142} y={156 + row * 100} width="34" height="8" rx="4" fill="#FF5A52" stroke="var(--ink)" strokeWidth="2" />
          </g>
        )),
      )}
      {/* checkout bar */}
      <rect x="44" y="258" width="392" height="26" rx="13" fill="#42D6A4" stroke="var(--ink)" strokeWidth="3.5" />
      <rect x="330" y="264" width="90" height="14" rx="7" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="2.5" />
    </g>
  )
}

function ChatScreen() {
  return (
    <g>
      {/* contact rail */}
      <rect x="44" y="84" width="110" height="200" rx="10" fill="#DCF7EC" stroke="var(--ink)" strokeWidth="3.5" />
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <circle cx="66" cy={106 + i * 46} r="10" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" />
          <circle cx="74" cy={100 + i * 46} r="4" fill="#42D6A4" stroke="var(--ink)" strokeWidth="2" />
          <rect x="82" y={102 + i * 46} width={58 - (i % 2) * 12} height="9" rx="4.5" fill="rgba(17,17,17,0.28)" />
        </g>
      ))}
      {/* conversation bubbles */}
      <path d="M172 108h150a12 12 0 0 1 12 12v20a12 12 0 0 1-12 12H196l-16 14v-14h-8a12 12 0 0 1-12-12v-20a12 12 0 0 1 12-12Z" fill="#DFE5FC" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="186" y="122" width="112" height="10" rx="5" fill="rgba(17,17,17,0.3)" />
      <rect x="186" y="136" width="76" height="10" rx="5" fill="rgba(17,17,17,0.2)" />
      <path d="M368 168H218a12 12 0 0 0-12 12v20a12 12 0 0 0 12 12h140l16 14v-14h-6a12 12 0 0 0 12-12v-20a12 12 0 0 0-12-12Z" fill="#FFC928" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="round" />
      <rect x="222" y="182" width="120" height="10" rx="5" fill="rgba(17,17,17,0.3)" />
      <rect x="222" y="196" width="64" height="10" rx="5" fill="rgba(17,17,17,0.2)" />
      {/* typing indicator */}
      <g>
        <rect x="172" y="238" width="74" height="30" rx="15" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3.5" />
        <circle cx="194" cy="253" r="4" fill="#3157E8" />
        <circle cx="209" cy="253" r="4" fill="#3157E8" opacity="0.55" />
        <circle cx="224" cy="253" r="4" fill="#3157E8" opacity="0.3" />
      </g>
      {/* input bar */}
      <rect x="260" y="238" width="176" height="30" rx="15" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3.5" />
      <rect x="272" y="248" width="98" height="10" rx="5" fill="rgba(17,17,17,0.22)" />
      <circle cx="420" cy="253" r="11" fill="#FF5A52" stroke="var(--ink)" strokeWidth="3" />
    </g>
  )
}

function SystemsScreen() {
  return (
    <g>
      {/* gauge */}
      <path d="M78 232a68 68 0 0 1 136 0" fill="#FFF3D1" stroke="var(--ink)" strokeWidth="4" />
      <path d="M146 232l38-46" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
      <circle cx="146" cy="232" r="8" fill="#FF5A52" stroke="var(--ink)" strokeWidth="3.5" />
      <rect x="52" y="84" width="188" height="26" rx="13" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3.5" />
      <rect x="64" y="92" width="120" height="10" rx="5" fill="rgba(17,17,17,0.25)" />
      {/* log lines */}
      {[0, 1, 2].map(i => (
        <g key={i}>
          <rect x="52" y={126 + i * 30} width="14" height="14" rx="4" fill={i === 1 ? '#FF5A52' : '#42D6A4'} stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="76" y={129 + i * 30} width={130 - i * 26} height="9" rx="4.5" fill="rgba(17,17,17,0.28)" />
        </g>
      ))}
      {/* redis blocks */}
      <rect x="270" y="96" width="150" height="58" rx="10" fill="#FF5A52" stroke="var(--ink)" strokeWidth="4" />
      <text x="345" y="132" textAnchor="middle" fontSize="21" fontWeight="800" fill="#FFFFFF" style={{ fontFamily: 'var(--font-mono)' }}>
        REDIS
      </text>
      {[0, 1].map(i => (
        <rect key={i} x={296 + i * 56} y={170} width="40" height="40" rx="8" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3.5" />
      ))}
      <path d="M345 154v16M345 210v14" stroke="var(--ink)" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="4 5" />
      {/* shield badge */}
      <path d="M345 240l26 9v17c0 17-11 29-26 35-15-6-26-18-26-35v-17z" fill="#3157E8" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
      <circle cx="345" cy="266" r="7" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" />
      <path d="M345 273v10" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
    </g>
  )
}

export function ProjectArt({ project }: ProjectArtProps) {
  const accent = ACCENTS[project.accent]
  const seed = [...project.id].reduce((sum, char) => sum + char.charCodeAt(0), 0)
  const variant = VARIANTS[seed % VARIANTS.length]
  const letter = project.title.charAt(0).toUpperCase()

  return (
    <svg
      className="part"
      viewBox="0 0 480 320"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${project.title} interface preview`}
    >
      <rect width="480" height="320" fill={accent.tint} />

      <WindowChrome accent={accent.main} />
      {variant === 'storefront' && <StorefrontScreen />}
      {variant === 'chat' && <ChatScreen />}
      {variant === 'systems' && <SystemsScreen />}

      {/* monogram tab */}
      <g className="part__mono">
        <rect x="404" y="30" width="34" height="24" rx="7" fill="#FFFFFF" stroke="var(--ink)" strokeWidth="3" />
        <text
          x="421"
          y="48"
          textAnchor="middle"
          fontSize="17"
          fontWeight="800"
          fill="var(--ink)"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {letter}
        </text>
      </g>

      {/* small memphis accents */}
      <circle cx="34" cy="300" r="9" fill="none" stroke="var(--ink)" strokeWidth="3" strokeDasharray="5 4" opacity="0.5" />
      <path d="M452 306l5 10-10 1z" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2.5" opacity="0.9" />
    </svg>
  )
}
