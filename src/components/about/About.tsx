import { useRef } from 'react'
import type { ReactNode } from 'react'
import { SectionHeader } from '../ui/SectionHeader'
import { Reveal } from '../ui/Reveal'
import { Shape } from '../decorations/Shape'
import { useCardTilt } from '../../hooks/useCardTilt'
import { repositories } from '../../data/repositories'
import { skillGroups } from '../../data/skills'
import './about.css'

/* Snapshot numbers are derived from the existing data modules so they stay
   truthful if the project or skill data changes. */
const projectCount = repositories.length
const techCount = skillGroups.reduce((total, group) => total + group.skills.length, 0)

const snapshotRows: Array<[string, string]> = [
  ['EDUCATION', 'MCA · 2026'],
  ['ROLE', 'Java Full-Stack Developer'],
  ['FOCUS', 'Backend-focused'],
  ['PROJECTS', `${projectCount}+ shipped`],
  ['TECHNOLOGIES', `${techCount}+`],
]

const builtItems = [
  'REST APIs',
  'Authentication Systems',
  'Full-Stack Applications',
  'Real-Time Systems',
  'Performance-focused Backends',
]

const learningItems = ['Docker', 'AWS', 'Microservices', 'System Design']

const openRoles = ['Java Developer', 'Backend Developer', 'Software Engineer']

const aboutMeItems = [
  'Java Full-Stack Developer',
  'MCA Graduate · 2026',
  'Backend-focused engineer',
  'Secure, scalable & real-time systems',
]

interface InfoCardProps {
  title: string
  index: string
  delay: number
  children: ReactNode
}

/* Reusable Memphis footer — extracted from Engineer Mode. Every card shares
   the identical YELLOW STAR + BARCODE identity marks so the 3×2 wall reads as
   one component family. */
function CardFooterDecoration() {
  return (
    <>
      <Shape variant="star" size={34} filled color="var(--yellow)" className="about-card__star" />
      <div className="about-card__barcode" aria-hidden="true" />
    </>
  )
}

/* Compact sibling of the Engineer Mode card: same coral header, black border,
   thick offset shadow, hand-drawn rotation and the exact same pointer-follow
   interaction via the shared hook. Content shape varies, shell is identical. */
function InfoCard({ title, index, delay, children }: InfoCardProps) {
  const tiltRef = useRef<HTMLElement | null>(null)
  useCardTilt(tiltRef)

  return (
    <Reveal delay={delay} className="about__cell">
      <article ref={tiltRef} className="info-card">
        <header className="info-card__head">
          <span>{title}</span>
          <span className="mono info-card__index">{index}</span>
        </header>
        <div className="info-card__body">{children}</div>
        <div className="info-card__foot" aria-hidden="true">
          <CardFooterDecoration />
        </div>
      </article>
    </Reveal>
  )
}

export function About() {
  const tiltRef = useRef<HTMLDivElement | null>(null)
  useCardTilt(tiltRef)

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

        {/* One coherent 3 x 2 card wall. Engineer Mode is a regular grid cell,
            not a separate right-side column. */}
        <div className="about__grid">
          <InfoCard title="ABOUT ME" index="01" delay={0}>
            <ul className="info-card__list">
              {aboutMeItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="info-card__chips">
              <span className="info-chip">MCA · 2026</span>
              <span className="info-chip">Java · Spring Boot · React</span>
            </div>
          </InfoCard>

          <Reveal delay={70} className="about__cell">
            <div ref={tiltRef} className="dev-card">
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
              </dl>
              <div className="dev-card__foot">
                <CardFooterDecoration />
              </div>
            </div>
          </Reveal>

          <InfoCard title="DEVELOPER SNAPSHOT" index="02" delay={140}>
            <dl className="info-card__rows">
              {snapshotRows.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </InfoCard>

          <InfoCard title="WHAT I BUILD" index="03" delay={210}>
            <ul className="info-card__list">
              {builtItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard title="CURRENTLY LEARNING" index="04" delay={280}>
            <ul className="info-card__list">
              {learningItems.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="info-card__lead info-card__lead--small">
              Building stronger foundations in deployment, distributed systems and system design.
            </p>
          </InfoCard>

          <InfoCard title="OPEN TO WORK" index="05" delay={350}>
            <ul className="info-card__list">
              {openRoles.map(role => (
                <li key={role}>{role}</li>
              ))}
            </ul>
            <p className="info-card__lead info-card__lead--small">
              Open to opportunities where I can contribute to backend and full-stack products.
            </p>
          </InfoCard>
        </div>
      </div>
    </section>
  )
}

