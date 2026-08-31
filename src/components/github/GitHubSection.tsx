import { MapPin } from 'lucide-react'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { GithubIcon } from '../ui/BrandIcons'
import { githubAvatarUrl, githubProfileUrl, repositories } from '../../data/repositories'
import { links, profile } from '../../data/social'
import { RepositoryCard } from './RepositoryCard'
import './github.css'

export function GitHubSection() {
  return (
    <section id="github" className="section gh">
      <div className="container">
        <SectionHeader
          index="06"
          label="GitHub"
          accent="cobalt"
          decoColor="var(--cobalt)"
          title="Where the receipts live."
          subtitle="A hand-picked snapshot of my public repositories — manually curated, no API calls to break."
        />

        <div className="gh__grid">
          <Reveal className="gh-profile-cell">
            <aside className="gh-profile card">
              <img
                src={githubAvatarUrl}
                alt={`GitHub avatar of ${profile.name}`}
                width={96}
                height={96}
                loading="lazy"
                className="gh-profile__avatar"
              />
              <div className="gh-profile__id">
                <p className="display-md">{profile.name}</p>
                <a
                  className="gh-profile__handle mono link-grow"
                  href={githubProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {links.github.handle}
                </a>
              </div>
              <p className="gh-profile__bio">
                Java Full Stack Developer · MCA 2026 · Spring Boot · React · MySQL · DSA enthusiast.
              </p>
              <p className="gh-profile__loc mono">
                <MapPin size={13} aria-hidden="true" /> Bhubaneswar, India
              </p>
              <Button href={githubProfileUrl} variant="dark">
                <GithubIcon size={18} />
                View full profile
              </Button>
            </aside>
          </Reveal>

          <div className="gh__repos">
            {repositories.map((repo, index) => (
              <Reveal key={repo.name} delay={(index % 2) * 90}>
                <RepositoryCard repo={repo} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
