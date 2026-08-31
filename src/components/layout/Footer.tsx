import { ArrowUp, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { links, profile } from '../../data/social'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Squiggle } from '../decorations/Squiggle'
import { Shape } from '../decorations/Shape'
import './footer.css'

const FOOTER_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__deco" aria-hidden="true">
        <Squiggle color="rgba(248, 241, 223, 0.22)" className="footer__squiggle float-c" />
        <Shape variant="ring" size={120} color="rgba(255, 201, 40, 0.25)" strokeWidth={4} className="footer__ring float-d" />
        <Shape variant="circle" size={54} filled color="var(--coral)" className="footer__dot float-b" />
      </div>

      <div className="container footer__grid">
        <div className="footer__brand">
          <p className="footer__logo">
            {profile.logoName}
            <span>.</span>
          </p>
          <p className="footer__role">{profile.role}</p>
          <p className="footer__tag">Building serious software with a straight face and a colorful desk.</p>
          <p className="footer__loc mono">
            <MapPin size={14} aria-hidden="true" /> {profile.location}
          </p>
        </div>

        <nav className="footer__nav" aria-label="Footer">
          <h3 className="footer__heading">Menu</h3>
          <ul>
            {FOOTER_LINKS.map(link => (
              <li key={link.id}>
                <Link to={{ pathname: '/', hash: `#${link.id}` }} className="link-grow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__connect">
          <h3 className="footer__heading">Connect</h3>
          <ul>
            <li>
              <a href={links.github.url} target="_blank" rel="noopener noreferrer">
                <GithubIcon size={16} /> GitHub
              </a>
            </li>
            <li>
              <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon size={16} /> LinkedIn
              </a>
            </li>
            <li>
              <a href={links.email.url}>
                <Mail size={16} aria-hidden="true" /> {profile.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bar">
        <p>© {year} Soubhagya Kumar Behera — designed & built with React.</p>
        <Link to="/" className="footer__top" aria-label="Back to top">
          BACK TO TOP <ArrowUp size={15} aria-hidden="true" />
        </Link>
      </div>
    </footer>
  )
}
