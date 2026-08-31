import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Sticker } from '../ui/Sticker'
import { currentlyLearning, skillGroups } from '../../data/skills'
import './techstack.css'

export function TechStack() {
  return (
    <section id="stack" className="section stack">
      <div className="container">
        <SectionHeader
          index="03"
          label="Stack"
          accent="cobalt"
          deco="zigzag"
          decoColor="var(--mint)"
          title="The toolbox."
          subtitle="Grouped by the layer they serve — no percentage bars, because honesty does not come in decimals."
        />

        <div className="stack__grid">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={(index % 2) * 120}>
              <article className={`stack-card stack-card--${group.accent}`}>
                <header className="stack-card__head">
                  <Sticker accent={group.accent} rotate={index % 2 === 0 ? -2 : 2}>
                    {group.label}
                  </Sticker>
                  <p>{group.blurb}</p>
                </header>
                <ul className="stack-card__skills">
                  {group.skills.map(skill => (
                    <li key={skill} className="stack-chip">
                      {skill}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="stack__learning">
          <p className="mono stack__learning-label">CURRENTLY LEARNING</p>
          <ul>
            {currentlyLearning.map(topic => (
              <li key={topic} className="chip">
                {topic}
              </li>
            ))}
          </ul>
          <span className="pulse-dot stack__learning-dot" aria-hidden="true" />
        </Reveal>
      </div>
    </section>
  )
}
