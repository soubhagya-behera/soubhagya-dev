import { GraduationCap, MapPin, Terminal } from 'lucide-react'
import type { ExperienceItem } from '../../types'
import { Sticker } from '../ui/Sticker'

interface ExperienceCardProps {
  item: ExperienceItem
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  return (
    <article className={`xp-card xp-card--${item.kind}`}>
      <header className="xp-card__head">
        <Sticker accent={item.kind === 'independent' ? 'coral' : 'cobalt'} rotate={-2}>
          {item.kind === 'independent' ? (
            <>
              <Terminal size={12} aria-hidden="true" /> Independent
            </>
          ) : (
            <>
              <GraduationCap size={13} aria-hidden="true" /> Education
            </>
          )}
        </Sticker>
        <p className="xp-card__period mono">{item.period}</p>
      </header>

      <h3 className="display-lg">{item.role}</h3>
      <p className="xp-card__org">{item.org}</p>
      <p className="xp-card__loc mono">
        <MapPin size={13} aria-hidden="true" /> {item.location}
      </p>

      <p className="xp-card__desc">{item.description}</p>

      {item.achievements.length > 0 && (
        <ul className="xp-card__list">
          {item.achievements.map(achievement => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      )}

      <ul className="xp-card__tech">
        {item.technologies.map(technology => (
          <li key={technology} className="chip">
            {technology}
          </li>
        ))}
      </ul>
    </article>
  )
}
