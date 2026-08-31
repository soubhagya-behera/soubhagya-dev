import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '../../../types'
import { Button } from '../../ui/Button'
import { Reveal } from '../../ui/Reveal'
import { Sticker } from '../../ui/Sticker'
import { GithubIcon } from '../../ui/BrandIcons'
import { ProjectArt } from '../ProjectArt'
import './detail.css'

interface ProjectHeroProps {
  project: Project
}

export function ProjectHero({ project }: ProjectHeroProps) {
  return (
    <header className="pd-hero">
      <div className="container pd-hero__grid">
        <div className="pd-hero__copy">
          <Reveal className="pd-hero__meta">
            <Sticker accent={project.accent === 'yellow' ? 'yellow' : project.accent} rotate={-3}>
              PROJECT {project.number}
            </Sticker>
            {project.status ? (
              <Sticker accent="ghost" rotate={2}>
                {project.status}
              </Sticker>
            ) : null}
          </Reveal>

          <Reveal delay={90}>
            <h1 className="display-xl pd-hero__title">{project.title}</h1>
          </Reveal>
          <Reveal delay={150}>
            <p className="mono pd-hero__category">{project.category}</p>
          </Reveal>
          <Reveal delay={210}>
            <p className="lead pd-hero__desc">{project.description}</p>
          </Reveal>

          <Reveal delay={280} className="pd-hero__actions">
            <Button href={project.githubUrl} variant="dark" size="lg">
              <GithubIcon size={18} />
              View on GitHub
            </Button>
            {project.liveUrl ? (
              <Button href={project.liveUrl} size="lg">
                <ExternalLink size={17} aria-hidden="true" />
                Live Demo
              </Button>
            ) : null}
          </Reveal>
        </div>

        <Reveal delay={200} className="pd-hero__artwrap">
          <div className="pd-hero__art">
            <ProjectArt project={project} />
          </div>
        </Reveal>
      </div>
    </header>
  )
}

interface ProjectLinksProps {
  project: Project
  prev: Project
  next: Project
}

export function ProjectLinks({ project, prev, next }: ProjectLinksProps) {
  return (
    <section className="section pd-links-block">
      <div className="container">
        <Reveal>
          <div className="pd-cta card">
            <h2 className="display-lg">Explore the code.</h2>
            <p>Everything below is public, documented and still evolving.</p>
            <div className="pd-cta__actions">
              <Button href={project.githubUrl} variant="dark">
                <GithubIcon size={18} />
                GitHub Repository
              </Button>
              {project.liveUrl ? (
                <Button href={project.liveUrl}>
                  <ExternalLink size={16} aria-hidden="true" />
                  Live Demo
                </Button>
              ) : null}
            </div>
          </div>
        </Reveal>

        <nav className="pd-pn" aria-label="Project navigation">
          <Reveal className="pd-cell">
            <Link to={`/projects/${prev.id}`} className={`pd-pn__card pd-pn__card--prev`}>
              <ArrowLeft size={20} aria-hidden="true" />
              <span>
                <span className="mono">PREV</span>
                <strong>{prev.title}</strong>
              </span>
            </Link>
          </Reveal>
          <Reveal delay={120} className="pd-cell">
            <Link to={`/projects/${next.id}`} className="pd-pn__card pd-pn__card--next">
              <span>
                <span className="mono">NEXT</span>
                <strong>{next.title}</strong>
              </span>
              <ArrowRight size={20} aria-hidden="true" />
            </Link>
          </Reveal>
        </nav>
      </div>
    </section>
  )
}
