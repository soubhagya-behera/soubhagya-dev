import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { Project } from '../../types'
import { Button } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcons'

interface ProjectCardProps {
  project: Project
  eager?: boolean
}

function isValidDemo(url?: string) {
  if (!url) return false
  const t = url.trim()
  if (!t) return false
  if (t.includes('YOUR_LIVE_DEMO_URL') || t.toLowerCase().includes('placeholder')) return false
  return t.startsWith('http://') || t.startsWith('https://')
}

export function ProjectCard({ project, eager = false }: ProjectCardProps) {
  const detailUrl = `/project/${project.slug}`
  const stack = project.stack ?? project.technologies
  const demoUrl = (project as unknown as { demo?: string }).demo ?? project.liveUrl
  const hasLive = isValidDemo(demoUrl)

  // dynamic visible count based on available width
  const techRef = useRef<HTMLUListElement>(null)
  const [visibleCount, setVisibleCount] = useState(stack.length)

  useEffect(() => {
    const el = techRef.current
    if (!el) return

    const compute = () => {
      const containerWidth = el.clientWidth
      if (containerWidth === 0) return

      // create offscreen measurer with same chip styling
      const measurer = document.createElement('div')
      measurer.style.position = 'absolute'
      measurer.style.visibility = 'hidden'
      measurer.style.pointerEvents = 'none'
      measurer.style.left = '-9999px'
      measurer.style.top = '0'
      measurer.style.display = 'flex'
      measurer.style.gap = '0.32rem'
      document.body.appendChild(measurer)

      const pillWidths: number[] = stack.map(tech => {
        const span = document.createElement('span')
        span.className = 'chip'
        // match .pcard__tech .chip sizing
        span.style.fontSize = '0.62rem'
        span.style.fontWeight = '700'
        span.style.fontFamily = 'var(--font-mono)'
        span.style.padding = '0.22em 0.6em'
        span.style.border = '2px solid var(--ink)'
        span.style.borderRadius = '999px'
        span.style.whiteSpace = 'nowrap'
        span.textContent = tech
        measurer.appendChild(span)
        const w = span.offsetWidth
        measurer.removeChild(span)
        return w
      })

      // total width if all fit
      const gap = 5 // ~0.32rem
      const totalAll = pillWidths.reduce((s, w) => s + w, 0) + gap * Math.max(0, pillWidths.length - 1)
      if (totalAll <= containerWidth) {
        document.body.removeChild(measurer)
        setVisibleCount(stack.length)
        return
      }

      // need +N pill — measure it for max remaining digits
      const samplePlus = document.createElement('span')
      samplePlus.className = 'chip'
      samplePlus.style.fontSize = '0.62rem'
      samplePlus.style.fontWeight = '700'
      samplePlus.style.fontFamily = 'var(--font-mono)'
      samplePlus.style.padding = '0.22em 0.6em'
      samplePlus.style.border = '2px solid var(--ink)'
      samplePlus.style.borderRadius = '999px'
      samplePlus.textContent = `+${stack.length}`
      measurer.appendChild(samplePlus)
      const plusWidth = samplePlus.offsetWidth
      measurer.removeChild(samplePlus)
      document.body.removeChild(measurer)

      let used = 0
      let count = 0
      for (let i = 0; i < stack.length; i++) {
        const w = pillWidths[i]
        const needed = used + w + (count > 0 ? gap : 0)
        // if we include this, will we need plus for remaining? i < last index means plus needed
        const willNeedPlus = i < stack.length - 1
        const plusReserve = willNeedPlus ? gap + plusWidth : 0
        if (needed + plusReserve <= containerWidth) {
          used = needed
          count = i + 1
        } else {
          break
        }
      }
      // ensure at least 1 visible if possible
      if (count === 0 && stack.length > 0 && pillWidths[0] + plusWidth + gap <= containerWidth) {
        count = 1
      } else if (count === 0 && pillWidths[0] <= containerWidth) {
        count = 1
      }
      setVisibleCount(Math.max(1, Math.min(count, stack.length)))
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(el)
    window.addEventListener('resize', compute)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', compute)
    }
  }, [stack])

  const remaining = stack.length - visibleCount
  const showPlus = remaining > 0 && visibleCount < stack.length
  const visibleStack = showPlus ? stack.slice(0, visibleCount) : stack

  // if all fit, visibleStack is full, no plus
  const finalVisible = visibleCount >= stack.length ? stack : visibleStack

  return (
    <article className={`pcard pcard--${project.accent}`}>
      <Link to={detailUrl} className="pcard__media" aria-label={`View ${project.title} details`}>
        {project.image ? (
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} preview`}
            width={800}
            height={450}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={eager ? 'high' : 'auto'}
            className="pcard__img"
          />
        ) : (
          <span className="pcard__placeholder" aria-hidden="true" />
        )}
      </Link>

      <div className="pcard__body">
        <h3 className="pcard__title">
          <Link to={detailUrl} className="pcard__title">
            {project.title}
          </Link>
        </h3>
        <p className="pcard__desc">{project.description}</p>

        <ul className="pcard__tech" ref={techRef}>
          {finalVisible.map(tech => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
          {showPlus && <li className="chip">+{remaining}</li>}
        </ul>

        <div className="pcard__actions">
          <Button
            to={detailUrl}
            variant={project.accent === 'yellow' || project.accent === 'mint' ? 'dark' : 'primary'}
            size="sm"
          >
            View Details
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
          <a
            className="btn btn--sm"
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
          >
            <GithubIcon size={14} />
            GitHub
          </a>
          {hasLive && demoUrl && (
            <a
              className="btn btn--sm btn--cobalt"
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
