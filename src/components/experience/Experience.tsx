import { Fragment } from 'react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Sticker } from '../ui/Sticker'
import { ExperienceCard } from './ExperienceCard'
import { experience } from '../../data/experience'
import './experience.css'

const GROUPS: { kind: 'independent' | 'education'; label: string }[] = [
  { kind: 'independent', label: 'Independent Development' },
  { kind: 'education', label: 'Education' },
]

export function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="container">
        <SectionHeader
          index="04"
          label="Experience & Education"
          accent="mint"
          deco="zigzag"
          decoColor="var(--mint)"
          title="The road so far."
          subtitle="Independent builds and formal education — no padded titles, every entry shipped real code."
        />
        <ol className="timeline">
          {GROUPS.map(group => {
            const items = experience.filter(item => item.kind === group.kind)
            if (items.length === 0) return null
            return (
              <Fragment key={group.kind}>
                <li className="timeline__group">
                  <Sticker accent={group.kind === 'independent' ? 'coral' : 'cobalt'} rotate={-2}>
                    {group.label}
                  </Sticker>
                </li>
                {items.map((item, index) => (
                  <li key={item.id} className="timeline__item">
                    <span className={`timeline__node timeline__node--${item.kind}`} aria-hidden="true" />
                    <Reveal delay={index * 100}>
                      <ExperienceCard item={item} />
                    </Reveal>
                  </li>
                ))}
              </Fragment>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
