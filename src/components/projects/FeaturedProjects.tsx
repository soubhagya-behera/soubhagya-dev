import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Button } from '../ui/Button'
import { GithubIcon } from '../ui/BrandIcons'
import { ProjectCard } from './ProjectCard'
import { projects } from '../../data/projects'
import { links } from '../../data/social'
import './projects.css'

export function FeaturedProjects() {
  const featured = projects.filter(project => project.featured)

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
          {featured.map((project, index) => (
            <Reveal
              key={project.id}
              delay={(index % 2) * 130}
              className={`pgrid__cell${index === 0 || index === featured.length - 1 ? ' pgrid__cell--wide' : ''}`}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="projects__more">
          <Button href={links.github.url} variant="dark" size="lg">
            <GithubIcon size={18} />
            More on GitHub
          </Button>
          <p className="mono projects__more-note">Experiments, coursework and older builds live on my profile.</p>
        </Reveal>
      </div>
    </section>
  )
}
