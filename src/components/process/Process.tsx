import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { processSteps } from '../../data/projects'
import './process.css'

export function Process() {
  return (
    <section className="section process" aria-label="How I build">
      <div className="container">
        <SectionHeader
          index="07"
          label="Process"
          accent="mint"
          deco="none"
          title="How I build."
          subtitle="The same loop behind every project on this page — no magic step between 02 and SHIP."
        />

        <ol className="process__steps">
          {processSteps.map((step, index) => (
            <li key={step.number} className={`process__step process__step--${step.accent}`}>
              <Reveal delay={index * 90} className="process__cell">
                <span className="process__badge" aria-hidden="true">
                  {step.number}
                </span>
                <div>
                  <h3 className="display-md">{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
