import type { CSSProperties, ReactNode } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import './highlights.css'

interface Highlight {
  number: string
  title: string
  description: string
  accent: string
  tags: string[]
  visual: ReactNode
}

function RealtimeVisual() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="6" y="10" width="34" height="20" rx="7" fill="#FFC928" stroke="var(--ink)" strokeWidth="3" />
      <path d="M16 30l-2 8 9-8" fill="#FFC928" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
      <rect x="28" y="32" width="28" height="17" rx="6" fill="#42D6A4" stroke="var(--ink)" strokeWidth="3" />
      <g className="hl-waves" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round">
        <path d="M48 12a8 8 0 0 1 0 11" />
        <path d="M52 8a14 14 0 0 1 0 19" />
      </g>
    </svg>
  )
}

function LayersVisual() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <rect x="10" y="8" width="44" height="13" rx="4" fill="#3157E8" stroke="var(--ink)" strokeWidth="3" />
      <rect x="10" y="26" width="44" height="13" rx="4" fill="#FF5A52" stroke="var(--ink)" strokeWidth="3" />
      <rect x="10" y="44" width="44" height="13" rx="4" fill="#FFC928" stroke="var(--ink)" strokeWidth="3" />
      <circle cx="18" cy="14.5" r="2.4" fill="var(--white)" />
      <circle cx="18" cy="32.5" r="2.4" fill="var(--white)" />
      <circle cx="18" cy="50.5" r="2.4" fill="var(--white)" />
    </svg>
  )
}

function ShieldVisual() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M32 6l22 8v14c0 14-9 24-22 30C19 52 10 42 10 28V14z"
        fill="#3157E8"
        stroke="var(--ink)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="27" r="6" fill="var(--white)" stroke="var(--ink)" strokeWidth="3" />
      <path d="M32 33v9" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function GaugeVisual() {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M8 46a24 24 0 0 1 48 0" fill="#FFC928" stroke="var(--ink)" strokeWidth="3" />
      <g className="hl-needle">
        <path d="M32 46L45 29" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="46" r="4.5" fill="var(--coral)" stroke="var(--ink)" strokeWidth="3" />
      </g>
      <path d="M14 40l4 1M50 40l-4 1M32 25v4" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

const HIGHLIGHTS: Highlight[] = [
  {
    number: '01',
    title: 'Real-Time Systems',
    description:
      'Live messaging, presence and typing events over WebSocket / STOMP in PingMe — with explicit handling for reconnects and event ordering.',
    accent: '#FFC928',
    tags: ['WebSocket', 'STOMP', 'Presence', 'Typing events'],
    visual: <RealtimeVisual />,
  },
  {
    number: '02',
    title: 'Backend Engineering',
    description:
      'Layered Spring Boot services: thin controllers, services that own the business rules, repositories that stay predictable.',
    accent: '#3157E8',
    tags: ['Spring Boot', 'REST APIs', 'JPA', 'Layered architecture'],
    visual: <LayersVisual />,
  },
  {
    number: '03',
    title: 'Security',
    description:
      'JWT authentication, role-based access, OTP flows and validation-first endpoints across GreenCart and the banking system.',
    accent: '#42D6A4',
    tags: ['JWT', 'RBAC', 'OTP', 'Validation'],
    visual: <ShieldVisual />,
  },
  {
    number: '04',
    title: 'Performance',
    description:
      'Redis caching and an atomic Lua token bucket in RateLimitX — concurrency handled where it belongs.',
    accent: '#FF5A52',
    tags: ['Redis', 'Caching', 'Rate limiting', 'Concurrency'],
    visual: <GaugeVisual />,
  },
]

export function Highlights() {
  return (
    <section className="section highlights" aria-label="Engineering highlights">
      <div className="container">
        <SectionHeader
          index="02"
          label="Highlights"
          accent="coral"
          title="What I actually engineer."
          subtitle="Four areas where I have stopped reading tutorials and started shipping decisions."
        />
        <div className="highlights__grid">
          {HIGHLIGHTS.map((highlight, index) => (
            <Reveal key={highlight.number} delay={(index % 2) * 120} className="highlights__cell">
              <article className="hl-card card" style={{ '--accent': highlight.accent } as CSSProperties}>
                <div className="hl-card__top">
                  <div>
                    <p className="mono hl-card__number">{highlight.number}</p>
                    <h3 className="display-md">{highlight.title}</h3>
                  </div>
                  <div className="hl-card__visual">{highlight.visual}</div>
                </div>
                <p>{highlight.description}</p>
                <ul className="hl-card__tags">
                  {highlight.tags.map(tag => (
                    <li key={tag} className="chip">
                      {tag}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
