import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Mail, FileDown, ArrowUpRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { links, profile } from '../../data/social'
import './navbar.css'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { pathname } = useLocation()
  const onHome = pathname === '/'

  const [lastPathname, setLastPathname] = useState(pathname)
  if (lastPathname !== pathname) {
    setLastPathname(pathname)
    if (open) setOpen(false)
  }

  useEffect(() => {
    document.body.classList.toggle('menu-open', open)
    return () => document.body.classList.remove('menu-open')
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (ticking || !onHome) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY + 150
        let current = 'home'
        for (const item of NAV_ITEMS) {
          const el = document.getElementById(item.id)
          if (el && el.offsetTop <= y) current = item.id
        }
        setActive(current)
        ticking = false
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onHome])

  const close = () => setOpen(false)

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="Soubhagya — back to home">
          {profile.logoName}
          <span className="navbar__brand-dot">.</span>
        </Link>

        {!onHome ? (
          <nav className="navbar__nav" aria-label="Primary">
            {NAV_ITEMS.map(item => (
              <Link key={item.id} to={item.id === 'home' ? '/' : `/#${item.id}`} className="navbar__link">
                {item.label}
              </Link>
            ))}
          </nav>
        ) : (
          <nav className="navbar__nav" aria-label="Primary">
            {NAV_ITEMS.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`navbar__link${active === item.id ? ' is-active' : ''}`}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        <div className="navbar__actions">
          <Button href={links.resume.url} variant="dark" size="sm" className="navbar__resume" download="Soubhagya-Kumar-Behera-Resume.pdf">
            <FileDown size={15} aria-hidden="true" />
            Resume
          </Button>
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen(value => !value)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`}>
        <nav className="mobile-menu__nav" aria-label="Mobile">
          {NAV_ITEMS.map((item, index) => {
            const style = { '--i': index } as CSSProperties
            const tabIndex = open ? 0 : -1
            const content = (
              <>
                <span>{item.label}</span>
                <ArrowUpRight size={26} aria-hidden="true" />
              </>
            )
            return onHome ? (
              <a key={item.id} href={`#${item.id}`} onClick={close} style={style} tabIndex={tabIndex}>
                {content}
              </a>
            ) : (
              <Link key={item.id} to={`/#${item.id}`} onClick={close} style={style} tabIndex={tabIndex}>
                {content}
              </Link>
            )
          })}
        </nav>
        <div className="mobile-menu__foot">
          <a href={links.github.url} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} aria-label="GitHub profile">
            <GithubIcon size={20} />
          </a>
          <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} aria-label="LinkedIn profile">
            <LinkedinIcon size={20} />
          </a>
          <a href={links.email.url} tabIndex={open ? 0 : -1} aria-label="Send an email">
            <Mail size={20} />
</a>
          <a
            href={links.resume.url}
            download="Soubhagya-Kumar-Behera-Resume.pdf"
            tabIndex={open ? 0 : -1}
            className="mobile-menu__resume"
          >
            <FileDown size={18} aria-hidden="true" />
            RESUME
          </a>
        </div>
      </div>
    </header>
  )
}
