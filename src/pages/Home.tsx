import { Hero } from '../components/hero/Hero'
import { MemphisBackground } from '../components/decorations/MemphisBackground'
import { About } from '../components/about/About'
import { TechStack } from '../components/skills/TechStack'
import { Experience } from '../components/experience/Experience'
import { FeaturedProjects } from '../components/projects/FeaturedProjects'
import { Process } from '../components/process/Process'
import { GitHubSection } from '../components/github/GitHubSection'
import { FinalCta } from '../components/cta/FinalCta'
import { Contact } from '../components/contact/Contact'

export function Home() {
  return (
    <>
      <MemphisBackground />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <FeaturedProjects />
      <GitHubSection />
      <Process />
      <FinalCta />
      <Contact />
    </>
  )
}
