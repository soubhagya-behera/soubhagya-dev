import type { ReactNode } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { Reveal } from '../ui/Reveal'
import { Sticker } from '../ui/Sticker'
import { Shape } from '../decorations/Shape'
import './about.css'

interface MiniCard {
  number: string
  title: string
  accent: 'coral' | 'cobalt' | 'mint'
  items: string[]
}

const MINI_CARDS: MiniCard[] = [
  {
    number: '01',
    title: 'Backend',
    accent: 'coral',
    items: ['Java / Spring Boot', 'REST API design', 'Security & JWT', 'JPA / Hibernate'],
  },
  {
    number: '02',
    title: 'Full-Stack',
    accent: 'cobalt',
    items: ['React & responsive UI', 'API integration', 'State that scales honestly'],
  },
  {
    number: '03',
    title: 'Systems',
    accent: 'mint',
    items: ['Real-time messaging', 'Caching with Redis', 'Concurrency-aware design', 'Relational databases'],
  },
]

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeader
          index="01"
          label="About"
          deco="zigzag"
          decoColor="var(--cobalt)"
          title={
            <>
              Serious engineering,
              <br />
              drawn by hand.
            </>
          }
        />

        <div className="about__grid">
          <Reveal className="about__text">
            <p>
              I&apos;m Soubhagya Kumar Behera — a Java full-stack developer from Bhubaneswar, India,
              finishing my MCA in 2026. My core work is the backend: REST APIs with Spring Boot,
              security with JWT and Spring Security, persistence with JPA / Hibernate, and data
              modelling in MySQL and Redis.
            </p>
            <p>
              I learn by shipping complete systems end to end — an e-commerce platform with real
              payment flows, a WebSocket chat backend, a Redis-backed rate limiter. Every project is
              public, documented and open to review on GitHub.
            </p>
            <p>
              What I look for in an engineering problem: a clear data model, honest failure paths
              and layers that own their decisions.
            </p>
          </Reveal>

          <Reveal delay={140} className="about__cardwrap">
            <div className="dev-card">
              <div className="dev-card__head">
                <span>ENGINEER MODE</span>
                <span className="mono">MCA · 2026</span>
              </div>
              <dl className="dev-card__rows">
                <div>
                  <dt>NAME</dt>
                  <dd>Soubhagya Kumar Behera</dd>
                </div>
                <div>
                  <dt>ROLE</dt>
                  <dd>Java Full-Stack Developer</dd>
                </div>
                <div>
                  <dt>FOCUS</dt>
                  <dd>Java · Spring Boot · Backend Systems</dd>
                </div>
                <div>
                  <dt>LOOKING FOR</dt>
                  <dd>Java Backend / Full-Stack Roles</dd>
                </div>
                <div>
                  <dt>STATUS</dt>
                  <dd className="dev-card__status">
                    <span className="pulse-dot" /> Open to opportunities
                  </dd>
                </div>
              </dl>
              <div className="dev-card__foot">
                <Shape variant="star" size={34} filled color="var(--yellow)" className="float-e dev-card__shape" />
                <div className="dev-card__barcode" aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="about__minis">
          {MINI_CARDS.map((mini, index) => (
            <Reveal key={mini.number} delay={index * 110}>
              <article className={`mini-card mini-card--${mini.accent}`}>
                <div className="mini-card__top">
                  <Sticker accent="ghost">{mini.number}</Sticker>
                  <h3 className="display-md">{mini.title}</h3>
                </div>
                <MiniList items={mini.items} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function MiniList({ items }: { items: ReactNode[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={String(item)}>{item}</li>
      ))}
    </ul>
  )
}
