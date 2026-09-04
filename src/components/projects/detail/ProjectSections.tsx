import { Check, Lightbulb, ExternalLink } from 'lucide-react'
import type { Project } from '../../../types'
import { Reveal } from '../../ui/Reveal'
import { Sticker } from '../../ui/Sticker'
import { Button } from '../../ui/Button'
import { GithubIcon } from '../../ui/BrandIcons'
import { Squiggle } from '../../decorations/Squiggle'
import { ZigZag } from '../../decorations/ZigZag'
import './detail.css'

function isValidDemo(url?: string) {
  if (!url) return false
  const t = url.trim().toLowerCase()
  if (!t) return false
  if (t.includes('your_live_demo_url') || t.includes('placeholder')) return false
  return t.startsWith('http://') || t.startsWith('https://')
}

const overviewAccents: Array<'coral' | 'cobalt' | 'yellow' | 'mint'> = ['coral', 'cobalt', 'yellow', 'mint']
const featureIconAccents: Array<'coral' | 'cobalt' | 'yellow' | 'mint'> = ['mint', 'yellow', 'coral', 'cobalt', 'yellow', 'mint']

export function ProjectDetailContent({ project }: { project: Project }) {
  const stack = project.stack ?? project.technologies
  const metrics = project.metrics ?? project.engineeringHighlights ?? []
  const role = project.role ?? 'Java Full-Stack Developer'
  const duration = project.duration ?? project.year ?? '2024'
  const teamSize = project.teamSize ?? 'Individual'
  const status = project.status ?? 'Completed'
  const demoUrl = (project as unknown as { demo?: string }).demo ?? project.liveUrl
  const hasDemo = isValidDemo(demoUrl)

  return (
    <>
      {/* ── centered hero ── */}
      <section className="pd-intro">
        <div className="container">
          <Reveal className="pd__meta-row">
            <Sticker accent={project.accent === 'yellow' ? 'yellow' : project.accent} rotate={-2}>
              {project.category}
            </Sticker>
            {project.status ? (
              <Sticker accent="ghost" rotate={1}>
                {project.status}
              </Sticker>
            ) : null}
          </Reveal>
          <Reveal delay={70}>
            <h1 className="display-xl pd__title">{project.title}</h1>
          </Reveal>
          <Reveal delay={110} className="pd__desc-wrap">
            <p className="lead pd__desc">{project.description}</p>
          </Reveal>
          <Reveal delay={150} className="pd__hero-media-wrap">
            <div className={`pd__hero-media pd__hero-media--${project.accent}`}>
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.imageAlt ?? `${project.title} preview`}
                  className="pd__hero-img"
                  width={800}
                  height={450}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : (
                <div className="pd__hero-placeholder">
                  <span>{project.title.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Overview ── */}
      <section className="pd-block">
        <div className="container">
          <Reveal className="pd__head">
            <Sticker accent="yellow" rotate={-2}>01 / Overview</Sticker>
            <Squiggle className="pd__head-squiggle draw" color="var(--coral)" />
          </Reveal>
          <Reveal>
            <h2 className="pd__h2">Project Overview</h2>
          </Reveal>
          {project.longDescription.length > 0 && (
            <Reveal delay={60} className="pd-text">
              {project.longDescription.map(p => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </Reveal>
          )}
          <div className="pd-overview-grid">
            {[
              { label: 'Role', value: role, accent: overviewAccents[0] },
              { label: 'Duration', value: duration, accent: overviewAccents[1] },
              { label: 'Team Size', value: teamSize, accent: overviewAccents[2] },
              { label: 'Status', value: status, accent: overviewAccents[3] },
            ].map((item, idx) => (
              <Reveal key={item.label} delay={(idx % 4) * 70} className="pd-overview-cell">
                <div className={`pd-overview-card pd-overview-card--${item.accent}`}>
                  <span className="mono pd-overview-label">{item.label}</span>
                  <strong className="pd-overview-value">{item.value}</strong>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className="pd-block">
        <div className="container">
          <Reveal className="pd__head">
            <Sticker accent="cobalt" rotate={-1}>02 / Stack</Sticker>
            <ZigZag className="pd__head-squiggle draw" color="var(--mint)" strokeWidth={4} />
          </Reveal>
          <Reveal>
            <h2 className="pd__h2">Tech Stack</h2>
          </Reveal>
          <Reveal delay={60}>
            <ul className="pd-stack-list">
              {stack.map(tech => (
                <li key={tech} className="chip pd-chip">
                  {tech}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ── Highlights ── */}
      {metrics.length > 0 && (
        <section className="pd-block">
          <div className="container">
            <Reveal className="pd__head">
              <Sticker accent="coral" rotate={2}>03 / Highlights</Sticker>
              <Squiggle className="pd__head-squiggle draw" color="var(--yellow)" />
            </Reveal>
            <Reveal>
              <h2 className="pd__h2">Project Highlights</h2>
            </Reveal>
            <div className="pd-highlights">
              {metrics.map((m, i) => (
                <Reveal key={m} delay={(i % 3) * 60} className="pd-hl-cell">
                  <div className="pd-hl-card">{m}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Key Features — 2 col ── */}
      <section className="pd-block">
        <div className="container">
          <Reveal className="pd__head">
            <Sticker accent="mint" rotate={-2}>04 / Features</Sticker>
            <ZigZag className="pd__head-squiggle draw" color="var(--cobalt)" />
          </Reveal>
          <Reveal>
            <h2 className="pd__h2">Key Features</h2>
          </Reveal>
          <div className="pd-features-grid">
            {project.features.map((f, i) => {
              const accent = featureIconAccents[i % featureIconAccents.length]
              return (
                <Reveal key={f} delay={(i % 2) * 70} className="pd-feat-cell">
                  <div className="pd-feat">
                    <span className={`pd-feat__icon pd-feat__icon--${accent}`} aria-hidden="true">
                      <Check size={14} strokeWidth={3.5} />
                    </span>
                    <span className="pd-feat__text">{f}</span>
                  </div>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Challenges & Learnings — 2 col ── */}
      <section className="pd-block">
        <div className="container">
          <Reveal className="pd__head">
            <Sticker accent="yellow" rotate={1}>05 / Learnings</Sticker>
            <Squiggle className="pd__head-squiggle draw" color="var(--coral)" />
          </Reveal>
          <Reveal>
            <h2 className="pd__h2">Challenges & Learnings</h2>
          </Reveal>
          <div className="pd-learnings-grid">
            {project.learnings.map((l, i) => (
              <Reveal key={l} delay={(i % 2) * 70} className="pd-lg-cell">
                <div className="pd-lg-card">
                  <span className="pd-lg-icon" aria-hidden="true">
                    <Lightbulb size={13} strokeWidth={2.2} />
                  </span>
                  <span>{l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="pd-block pd-block--cta">
        <div className="container">
          <Reveal>
            <div className="pd-cta">
              <h2 className="display-lg">Explore Project</h2>
              <p>Code, commits and live demo — everything is public and still evolving.</p>
              <div className="pd-cta__actions">
                <Button href={project.githubUrl} variant="dark">
                  <GithubIcon size={18} />
                  GitHub / Source Code
                </Button>
                {hasDemo && demoUrl ? (
                  <Button href={demoUrl} variant="primary">
                    <ExternalLink size={16} aria-hidden="true" />
                    Live Demo
                  </Button>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
