import { Check, Lightbulb } from 'lucide-react'
import type { Project } from '../../../types'
import { Reveal } from '../../ui/Reveal'
import { Button } from '../../ui/Button'
import { GithubIcon } from '../../ui/BrandIcons'
import './detail.css'

function isValidDemo(url?: string) {
  if (!url) return false
  const t = url.trim().toLowerCase()
  if (!t) return false
  if (t.includes('your_live_demo_url') || t.includes('placeholder')) return false
  return t.startsWith('http://') || t.startsWith('https://')
}

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
      {/* Title + desc + single image */}
      <section className="pd-intro">
        <div className="container">
          <Reveal>
            <h1 className="display-xl pd__title">{project.title}</h1>
          </Reveal>
          <Reveal delay={70}>
            <p className="lead pd__desc">{project.description}</p>
          </Reveal>
          <Reveal delay={120} className="pd__hero-media-wrap">
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

      {/* Overview */}
      <section className="section pd-block">
        <div className="container">
          <Reveal>
            <h2 className="pd__h2">Project Overview</h2>
          </Reveal>
          {project.longDescription.length > 0 && (
            <Reveal delay={60} className="pd-text">
              {project.longDescription.map(p => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </Reveal>
          )}
          <div className="pd-overview-grid">
            {[
              { label: 'Role', value: role },
              { label: 'Duration', value: duration },
              { label: 'Team Size', value: teamSize },
              { label: 'Status', value: status },
            ].map(item => (
              <Reveal key={item.label} className="pd-overview-cell">
                <div className="pd-overview-card">
                  <span className="mono pd-overview-label">{item.label}</span>
                  <strong className="pd-overview-value">{item.value}</strong>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section pd-block">
        <div className="container">
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

      {/* Highlights */}
      {metrics.length > 0 && (
        <section className="section pd-block">
          <div className="container">
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

      {/* Key Features — 2 col */}
      <section className="section pd-block">
        <div className="container">
          <Reveal>
            <h2 className="pd__h2">Key Features</h2>
          </Reveal>
          <div className="pd-features-grid">
            {project.features.map((f, i) => (
              <Reveal key={f} delay={(i % 2) * 70} className="pd-feat-cell">
                <div className="pd-feat">
                  <span className="pd-feat__icon" aria-hidden="true">
                    <Check size={14} strokeWidth={3.5} />
                  </span>
                  <span className="pd-feat__text">{f}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Learnings — 2 col */}
      <section className="section pd-block">
        <div className="container">
          <Reveal>
            <h2 className="pd__h2">Challenges & Learnings</h2>
          </Reveal>
          <div className="pd-learnings-grid">
            {project.learnings.map((l, i) => (
              <Reveal key={l} delay={(i % 2) * 70} className="pd-lg-cell">
                <div className="pd-lg-card">
                  <Lightbulb size={16} aria-hidden="true" className="pd-lg-icon" />
                  <span>{l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final actions */}
      <section className="section pd-block pd-block--cta">
        <div className="container">
          <Reveal>
            <div className="pd-cta card">
              <h2 className="display-lg">Explore Project</h2>
              <div className="pd-cta__actions">
                <Button href={project.githubUrl} variant="dark">
                  <GithubIcon size={18} />
                  GitHub / Source Code
                </Button>
                {hasDemo && demoUrl ? (
                  <Button href={demoUrl}>Live Demo</Button>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
