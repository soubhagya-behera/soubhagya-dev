import { SectionHeader } from '../ui/SectionHeader'
import { Reveal } from '../ui/Reveal'
import { Shape } from '../decorations/Shape'
import './about.css'

export function About() {
  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionHeader
          index="01"
          label="About"
          deco="zigzag"
          decoColor="var(--cobalt)"
          title={
            <>
              Serious engineering,
              <br />
              drawn by hand.
            </>
          }
        />

        <div className="about__grid">
          <Reveal className="about__text">
            <p>
              I&apos;m Soubhagya Kumar Behera, a Java Full-Stack Developer focused on building
              secure, scalable and real-time web applications. I work primarily with Java, Spring
              Boot, React, REST APIs, JPA/Hibernate and modern backend architecture.
            </p>
            <p>
              I learn by building complete systems end-to-end — from authentication and data
              modelling to real-time communication, payments and performance. My projects are built
              around practical engineering decisions, clean architecture and production-minded
              reliability.
            </p>
            <p>
              I&apos;m currently looking for opportunities where I can contribute to backend and
              full-stack products while continuing to grow as an engineer.
            </p>
          </Reveal>

          <Reveal delay={140} className="about__cardwrap">
            <div className="dev-card">
              <div className="dev-card__head">
                <span>ENGINEER MODE</span>
                <span className="mono">MCA · 2026</span>
              </div>
              <dl className="dev-card__rows">
                <div>
                  <dt>NAME</dt>
                  <dd>Soubhagya Kumar Behera</dd>
                </div>
                <div>
                  <dt>ROLE</dt>
                  <dd>Java Full-Stack Developer</dd>
                </div>
                <div>
                  <dt>FOCUS</dt>
                  <dd>Java · Spring Boot · Backend Systems</dd>
                </div>
                <div>
                  <dt>LOOKING FOR</dt>
                  <dd>Java Backend / Full-Stack Roles</dd>
                </div>
                <div>
                  <dt>STATUS</dt>
                  <dd className="dev-card__status">
                    <span className="pulse-dot" /> Open to opportunities
                  </dd>
                </div>
              </dl>
              <div className="dev-card__foot">
                <Shape variant="star" size={34} filled color="var(--yellow)" className="float-e dev-card__shape" />
                <div className="dev-card__barcode" aria-hidden="true" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}


