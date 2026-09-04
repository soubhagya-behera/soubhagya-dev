import { Briefcase, GraduationCap, MapPin } from 'lucide-react'
import type { ExperienceItem } from '../../types'
import { Sticker } from '../ui/Sticker'

interface ExperienceCardProps {
  item: ExperienceItem
}

export function ExperienceCard({ item }: ExperienceCardProps) {
  const isInternship = item.kind === 'internship'
  const isEducation = item.kind === 'education'
  const isBsc = item.id === 'bsc-bhadrak'
  const isMca = item.id === 'mca-usbm'

  return (
    <article
      className={`xp-card xp-card--${item.kind}${isBsc ? ' xp-card--compact' : ''}${isMca ? ' xp-card--mca' : ''}`}
    >
      <header className="xp-card__head">
        <Sticker accent={isEducation ? 'cobalt' : 'coral'} rotate={-2}>
          {isInternship ? (
            <>
              <Briefcase size={12} aria-hidden="true" /> Internship
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

      {item.description ? <p className="xp-card__desc">{item.description}</p> : null}

      {item.achievements.length > 0 && (
        <ul className="xp-card__list">
          {item.achievements.map(achievement => (
            <li key={achievement}>{achievement}</li>
          ))}
        </ul>
      )}

      {item.technologies.length > 0 && (
        <ul className="xp-card__tech">
          {item.technologies.map(technology => (
            <li key={technology} className="chip">
              {technology}
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
