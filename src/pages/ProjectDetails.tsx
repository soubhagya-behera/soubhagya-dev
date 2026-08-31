import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getProjectBySlug, projects } from '../data/projects'
import { profile } from '../data/social'
import { NotFound } from './NotFound'
import { ProjectHero, ProjectLinks } from '../components/projects/detail/ProjectHero'
import {
  ProjectArchitecture,
  ProjectChallenges,
  ProjectOverview,
  ProjectSecurity,
  ProjectTechStack,
} from '../components/projects/detail/ProjectSections'

const DEFAULT_TITLE = 'Soubhagya Kumar Behera — Java Full-Stack Developer'
const DEFAULT_DESCRIPTION =
  'Portfolio of Soubhagya Kumar Behera, a Java full-stack developer building secure, scalable and real-time web applications with Spring Boot, React, MySQL and Redis.'

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined

  useEffect(() => {
    if (!project) return
    document.title = `${project.title} — ${profile.name}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', project.description)
    return () => {
      document.title = DEFAULT_TITLE
      document.querySelector('meta[name="description"]')?.setAttribute('content', DEFAULT_DESCRIPTION)
    }
  }, [project])

  if (!project) {
    return <NotFound />
  }

  const index = projects.findIndex(item => item.id === project.id)
  const prev = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <article className="pd">
      <div className="container">
        <Link to={{ pathname: '/', hash: '#projects' }} className="pd__back link-grow">
          <ArrowLeft size={17} aria-hidden="true" /> All projects
        </Link>
      </div>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectTechStack project={project} />
      <ProjectArchitecture project={project} />
      <ProjectSecurity project={project} />
      <ProjectChallenges project={project} />
      <ProjectLinks project={project} prev={prev} next={next} />
    </article>
  )
}
