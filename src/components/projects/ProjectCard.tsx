import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Project } from '../../types'
import { Button } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcons'
import { ProjectArt } from './ProjectArt'

interface ProjectCardProps {
  project: Project
  wide?: boolean
}

export function ProjectCard({ project, wide = false }: ProjectCardProps) {
  const detailUrl = `/projects/${project.slug}`
  const cardFeatures = project.quickFeatures.length > 0 ? project.quickFeatures : project.features.slice(0, 4)

  return (
    <article className={`pcard${wide ? ' pcard--wide' : ''}`}>
      <Link to={detailUrl} className="pcard__media" tabIndex={-1} aria-hidden="true">
        {project.image ? (
          <img
            src={project.image}
            alt=""
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="pcard__shot"
          />
        ) : (
          <ProjectArt project={project} />
        )}
        <span className="pcard__number">{project.number}</span>
        {project.status ? <span className="sticker sticker--yellow pcard__status">{project.status}</span> : null}
        <span className="pcard__peek mono">
          OPEN CASE STUDY <ArrowRight size={14} aria-hidden="true" />
        </span>
      </Link>

      <div className="pcard__body">
        <p className="pcard__category mono">{project.category}</p>
        <h3 className="display-lg">
          <Link to={detailUrl} className="pcard__title">
            {project.title}
          </Link>
        </h3>
        <p className="pcard__desc">{project.description}</p>

        <ul className="pcard__feats">
          {cardFeatures.map(feature => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>

        <ul className="pcard__tech">
          {project.technologies.map(technology => (
            <li key={technology} className="chip">
              {technology}
            </li>
          ))}
        </ul>

        <div className="pcard__actions">
          <Button to={detailUrl} variant={project.accent === 'yellow' || project.accent === 'mint' ? 'dark' : 'primary'}>
            Case Study
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <a
            className="btn btn--sm"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          {project.liveUrl ? (
            <a className="btn btn--sm btn--cobalt" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
