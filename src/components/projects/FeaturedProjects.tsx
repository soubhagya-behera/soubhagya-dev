import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { GithubIcon } from '../ui/BrandIcons'
import { ProjectCard } from './ProjectCard'
import { projects } from '../../data/projects'
import { links } from '../../data/social'
import './projects.css'

export function FeaturedProjects() {
  // Exactly the 6 showcase projects in spec order (already ordered in data)
  const showcase = projects.slice(0, 6)

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionHeader
          index="05"
          label="Projects"
          deco="zigzag"
          decoColor="var(--coral)"
          title={
            <>
              Proof of work,
              <br />
              not promises.
            </>
          }
          subtitle="Each of these lives on GitHub, ran into real edge cases and came out opinionated. Open a card for the full engineering story."
          accent="yellow"
        />

        <div className="pgrid">
          {showcase.map((project, index) => (
            <Reveal key={project.id} delay={(index % 3) * 90} className="pgrid__cell">
              <ProjectCard project={project} eager={index === 0} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="projects__more">
          <a
            href={links.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="projects__more-link"
          >
            <span className="projects__more-icon" aria-hidden="true">
              <GithubIcon size={18} />
            </span>
            <span className="projects__more-text">
              <span className="mono projects__more-title">More on GitHub →</span>
              <span className="projects__more-note">More experiments, coursework and smaller builds live on my GitHub.</span>
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
