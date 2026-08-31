import { ArrowUpRight, Star } from 'lucide-react'
import type { Repository } from '../../types'
import { languageColors } from '../../data/repositories'

interface RepositoryCardProps {
  repo: Repository
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <a className="repo-card" href={repo.url} target="_blank" rel="noopener noreferrer">
      <div className="repo-card__top">
        <h3>{repo.name}</h3>
        <ArrowUpRight size={18} className="repo-card__arrow" aria-hidden="true" />
      </div>
      <p className="repo-card__desc">{repo.description}</p>
      <div className="repo-card__meta mono">
        {repo.language ? (
          <span className="repo-card__lang">
            <i style={{ background: languageColors[repo.language] ?? 'var(--ink)' }} aria-hidden="true" />
            {repo.language}
          </span>
        ) : null}
        {repo.stars ? (
          <span>
            <Star size={12} fill="var(--yellow)" stroke="var(--ink)" strokeWidth={2} aria-hidden="true" /> {repo.stars}
          </span>
        ) : null}
      </div>
    </a>
  )
}
