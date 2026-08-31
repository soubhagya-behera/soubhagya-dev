import { FileDown, Mail } from 'lucide-react'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Shape } from '../decorations/Shape'
import { Squiggle } from '../decorations/Squiggle'
import { links } from '../../data/social'
import './cta.css'

export function FinalCta() {
  return (
    <section className="section cta" aria-label="Call to action">
      <div className="container">
        <Reveal>
          <div className="cta__panel">
            <div className="cta__decos" aria-hidden="true">
              <Shape variant="star" size={92} filled color="var(--yellow)" className="deco-abs cta__shape-1 float-e" />
              <Shape variant="ring" size={130} color="rgba(248, 241, 223, 0.4)" strokeWidth={4} className="deco-abs cta__shape-2 float-d" />
              <Squiggle color="rgba(255, 255, 255, 0.5)" strokeWidth={5} className="deco-abs cta__squiggle float-c" />
              <Shape variant="circle" size={54} filled color="var(--coral)" className="deco-abs cta__shape-3 float-b" />
            </div>

            <p className="mono cta__kicker">CURRENT STATUS</p>
            <h2 className="display-xl cta__title">
              Open to Java backend &amp;
              <br />
              full-stack opportunities.
            </h2>
            <p className="cta__sub">
              Interested in building reliable software together? Let&apos;s talk — worst case we
              compare notes on Spring Boot.
            </p>

            <div className="cta__actions">
              <Button href={links.email.url} size="lg">
                <Mail size={18} aria-hidden="true" />
                Contact me
              </Button>
              <Button href={links.resume.url} variant="yellow" size="lg" download="Soubhagya-Kumar-Behera-Resume.pdf">
                <FileDown size={18} aria-hidden="true" />
                Download resume
              </Button>
            </div>

            <p className="cta__social">
              <span>OR FIND ME ON</span>
              <a href={links.github.url} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={18} /> GitHub
              </a>
              <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={18} /> LinkedIn
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
