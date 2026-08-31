import type { ReactNode } from 'react'
import { Check, Quote, ShieldCheck, Star } from 'lucide-react'
import type { AccentName, Project } from '../../../types'
import { Reveal } from '../../ui/Reveal'
import { SectionHeader } from '../../ui/SectionHeader'
import { Sticker } from '../../ui/Sticker'
import { FlowDiagram } from './FlowDiagram'
import './detail.css'

function DetailSection({
  index,
  label,
  accent,
  title,
  children,
}: {
  index: string
  label: string
  accent?: AccentName
  title?: string
  children: ReactNode
}) {
  const fallbackTitle = label.charAt(0) + label.slice(1).toLowerCase()
  return (
    <section className="section pd-block">
      <div className="container">
        <SectionHeader index={index} label={label} accent={accent} title={title ?? `${fallbackTitle}.`} />
        {children}
      </div>
    </section>
  )
}

export function ProjectOverview({ project }: { project: Project }) {
  return (
    <>
      <DetailSection index="01" label="Overview" accent="cobalt" title="The story behind it.">
        <Reveal className="pd-text">
          {project.longDescription.map(paragraph => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </Reveal>

        <div className="pd-ps">
          <Reveal>
            <article className="pd-panel pd-panel--problem">
              <Sticker accent="coral" rotate={-2}>
                THE PROBLEM
              </Sticker>
              <p>{project.problem}</p>
            </article>
          </Reveal>
          <Reveal delay={130}>
            <article className="pd-panel pd-panel--solution">
              <Sticker accent="mint" rotate={2}>
                MY SOLUTION
              </Sticker>
              <p>{project.solution}</p>
            </article>
          </Reveal>
        </div>
      </DetailSection>

      <DetailSection index="02" label="Features" accent="mint" title="What it does.">
        <ul className="pd-features">
          {project.features.map((feature, index) => (
            <Reveal key={feature} delay={(index % 3) * 90} className="pd-cell">
              <li className="pd-feature">
                <span className="pd-feature__check" aria-hidden="true">
                  <Check size={16} strokeWidth={3.5} />
                </span>
                {feature}
              </li>
            </Reveal>
          ))}
        </ul>
      </DetailSection>
    </>
  )
}

export function ProjectTechStack({ project }: { project: Project }) {
  return (
    <DetailSection index="03" label="Technology" accent="yellow" title="Built with.">
      <div className="pd-tech">
        {project.techGroups.map((group, index) => (
          <Reveal key={group.label} delay={index * 80} className="pd-cell">
            <div className="pd-tech__group">
              <p className="pd-tech__label mono">{group.label}</p>
              <ul>
                {group.items.map(item => (
                  <li key={item} className="chip">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </DetailSection>
  )
}

export function ProjectArchitecture({ project }: { project: Project }) {
  return (
    <DetailSection index="04" label="Architecture" accent="cobalt" title="How requests travel.">
      <FlowDiagram layers={project.architecture} />
      {project.architectureNote ? (
        <Reveal delay={200}>
          <p className="pd-arch-note">{project.architectureNote}</p>
        </Reveal>
      ) : null}
    </DetailSection>
  )
}

export function ProjectSecurity({ project }: { project: Project }) {
  if (!project.security || project.security.length === 0) return null
  return (
    <DetailSection index="05" label="Security" accent="mint" title="Locked down by default.">
      <ul className="pd-features pd-security">
        {project.security.map((item, index) => (
          <Reveal key={item} delay={(index % 3) * 90} className="pd-cell">
            <li className="pd-feature pd-feature--shield">
              <span className="pd-feature__check pd-feature__check--cobalt" aria-hidden="true">
                <ShieldCheck size={16} strokeWidth={3} />
              </span>
              {item}
            </li>
          </Reveal>
        ))}
      </ul>
    </DetailSection>
  )
}

export function ProjectChallenges({ project }: { project: Project }) {
  return (
    <DetailSection index="06" label="Challenges" accent="coral" title="Where it got hard — and what stuck.">
      <ol className="pd-challenges">
        {project.challenges.map((challenge, index) => (
          <Reveal key={challenge} delay={index * 80} className="pd-cell">
            <li className="pd-challenge">
              <span className="pd-challenge__number">{String(index + 1).padStart(2, '0')}</span>
              <p>{challenge}</p>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={150}>
        <aside className="pd-learnings">
          <div className="pd-learnings__head">
            <Star size={22} fill="var(--yellow)" stroke="var(--ink)" strokeWidth={2.5} aria-hidden="true" />
            <h3 className="mono">WHAT I LEARNED</h3>
          </div>
          <ul>
            {project.learnings.map(learning => (
              <li key={learning}>
                <Quote size={14} aria-hidden="true" />
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </aside>
      </Reveal>
    </DetailSection>
  )
}
