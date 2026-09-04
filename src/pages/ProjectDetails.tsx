import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getProjectBySlug } from '../data/projects'
import { profile } from '../data/social'
import { NotFound } from './NotFound'
import { ProjectDetailContent } from '../components/projects/detail/ProjectSections'
import { Shape } from '../components/decorations/Shape'
import { Squiggle } from '../components/decorations/Squiggle'
import { ZigZag } from '../components/decorations/ZigZag'
import { Dots } from '../components/decorations/Dots'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import '../components/projects/detail/detail.css'

const DEFAULT_TITLE = 'Soubhagya Kumar Behera — Java Full-Stack Developer'
const DEFAULT_DESCRIPTION =
  'Portfolio of Soubhagya Kumar Behera, a Java full-stack developer building secure, scalable and real-time web applications with Spring Boot, React, MySQL and Redis.'

export function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? getProjectBySlug(slug) : undefined
  const pdRef = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!project) return
    document.title = `${project.title} — ${profile.name}`
    document.querySelector('meta[name="description"]')?.setAttribute('content', project.description)
    return () => {
      document.title = DEFAULT_TITLE
      document.querySelector('meta[name="description"]')?.setAttribute('content', DEFAULT_DESCRIPTION)
    }
  }, [project])

  useEffect(() => {
    const el = pdRef.current
    if (!el || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', x.toFixed(3))
        el.style.setProperty('--py', y.toFixed(3))
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', '0')
        el.style.setProperty('--py', '0')
      })
    }
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  if (!project) {
    return <NotFound />
  }

  return (
    <article className="pd" ref={pdRef}>
      <div className="pd__decor" aria-hidden="true">
        {/* Hero — tasteful Memphis (5 total visible in hero on desktop: squiggle, triangle, star, diamond, mini-dots) */}
        <Squiggle color="var(--coral)" strokeWidth={5} className="pd__decor-item pd__decor-squiggle float-c" />
        <Shape variant="triangle" size={56} filled color="var(--yellow)" className="pd__decor-item pd__decor-triangle float-b" />
        <Shape variant="star" size={34} filled color="var(--coral)" className="pd__decor-item pd__decor-star float-e" />
        <Shape variant="diamond" size={20} filled color="var(--mint)" className="pd__decor-item pd__decor-hero-diamond float-b" />
        <Dots rows={2} cols={3} color="var(--yellow)" className="pd__decor-item pd__decor-hero-dots float-f" />
        {/* Page-level — remain but auto-hidden on smaller widths where they would crowd */}
        <Shape variant="ring" size={110} color="rgba(49, 87, 232, 0.28)" strokeWidth={4} className="pd__decor-item pd__decor-ring float-d" />
        <Dots rows={3} cols={5} color="var(--mint)" className="pd__decor-item pd__decor-dots float-f" />
        <ZigZag color="var(--cobalt)" strokeWidth={4} className="pd__decor-item pd__decor-zigzag float-a" />
        <Shape variant="cross" size={22} color="var(--ink)" strokeWidth={2} className="pd__decor-item pd__decor-cross float-b" />
        <Dots rows={2} cols={4} color="rgba(17, 17, 17, 0.06)" className="pd__decor-item pd__decor-dots2 float-f" />
      </div>
      <div className="container">
        <Link to={{ pathname: '/', hash: '#projects' }} className="pd__back link-grow mono">
          <ArrowLeft size={16} aria-hidden="true" /> Back to Projects
        </Link>
      </div>
      <ProjectDetailContent project={project} />
    </article>
  )
}
