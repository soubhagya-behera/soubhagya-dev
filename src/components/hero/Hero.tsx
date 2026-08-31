import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import { Coffee, FileDown, Lock, Zap } from 'lucide-react'
import { Button } from '../ui/Button'
import { Sticker } from '../ui/Sticker'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { Squiggle } from '../decorations/Squiggle'
import { ZigZag } from '../decorations/ZigZag'
import { Dots } from '../decorations/Dots'
import { Shape } from '../decorations/Shape'
import { links, profile, avatarCandidates } from '../../data/social'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { HeroTechMarquee } from './HeroTechMarquee'
import './hero.css'

export function Hero() {
  const heroRef = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const [avatarIndex, setAvatarIndex] = useState(0)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let raf = 0
    const onMove = (event: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        hero.style.setProperty('--px', x.toFixed(3))
        hero.style.setProperty('--py', y.toFixed(3))
      })
    }
    const onLeave = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        hero.style.setProperty('--px', '0')
        hero.style.setProperty('--py', '0')
      })
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [reduced])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__decos" aria-hidden="true">
        <Squiggle color="var(--coral)" strokeWidth={5} className="deco-abs hero__deco-squiggle float-c" />
        <Shape variant="triangle" size={56} filled color="var(--yellow)" className="deco-abs hero__deco-triangle float-b" />
        <Shape variant="ring" size={110} color="rgba(49, 87, 232, 0.32)" strokeWidth={4} className="deco-abs hero__deco-ring float-d" />
        <Dots rows={3} cols={5} color="var(--mint)" className="deco-abs hero__deco-dots float-f" />
        <ZigZag color="var(--cobalt)" strokeWidth={4} className="deco-abs hero__deco-zigzag float-a" />
        <Shape variant="star" size={34} filled color="var(--coral)" className="deco-abs hero__deco-star float-e" />
        <Shape variant="cross" size={22} color="var(--ink)" strokeWidth={2} className="deco-abs hero__deco-cross float-b" />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <Sticker accent="mint" rotate={-3} className="hero__badge">
            <span className="pulse-dot" />
            Open to opportunities
          </Sticker>

          <p className="hero__eyebrow mono">Soubhagya Kumar Behera</p>

          <h1 className="display-hero hero__title">
            <span className="hero__line">
              <span className="hero__line-inner" style={{ '--d': '60ms' } as CSSProperties}>
                JAVA<span className="hero__dot">.</span>
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__line-inner outline-word" style={{ '--d': '150ms' } as CSSProperties}>
                FULL-STACK
              </span>
            </span>
            <span className="hero__line">
              <span className="hero__line-inner" style={{ '--d': '240ms' } as CSSProperties}>
                DEVELOPER
                <Squiggle color="var(--yellow)" strokeWidth={6} className="hero__underline" />
              </span>
            </span>
          </h1>

          <p className="lead hero__pitch">{profile.heroPitch}</p>

          <div className="hero__actions">
            <Button href="#projects" size="lg">
              View Projects
            </Button>
            <Button href={links.resume.url} variant="outline" size="lg" download="Soubhagya-Kumar-Behera-Resume.pdf">
              <FileDown size={18} aria-hidden="true" />
              Download Resume
            </Button>
          </div>

          <div className="hero__social">
            <a href={links.github.url} target="_blank" rel="noopener noreferrer" className="link-grow">
              <GithubIcon size={18} /> GitHub
            </a>
            <a href={links.linkedin.url} target="_blank" rel="noopener noreferrer" className="link-grow">
              <LinkedinIcon size={18} /> LinkedIn
            </a>
          </div>
        </div>

        <div className="hero__visual">
          <div
            className="id-card"
            role="img"
            aria-label="Developer identification card for Soubhagya Kumar Behera, Java full-stack developer, open to work"
          >
            <div className="id-card__head mono" aria-hidden="true">
              <span>DEVELOPER.ID</span>
              <span>MCA · 2026</span>
            </div>
            <div className="id-card__body">
              <div className="id-card__avatar" aria-hidden="true">
                {avatarIndex >= avatarCandidates.length ? (
                  <span>SK</span>
                ) : (
                  <img
                    src={avatarCandidates[avatarIndex]}
                    alt=""
                    width={84}
                    height={84}
                    loading="eager"
                    decoding="async"
                    onError={() => setAvatarIndex((index) => index + 1)}
                  />
                )}
              </div>
              <div className="id-card__who">
                <p className="id-card__name">Soubhagya Kumar Behera</p>
                <p className="id-card__role">{profile.role}</p>
              </div>
            </div>
            <ul className="id-card__stack" aria-hidden="true">
              <li>JAVA</li>
              <li>SPRING BOOT</li>
              <li>REACT</li>
              <li>MYSQL</li>
            </ul>
            <div className="id-card__status" aria-hidden="true">
              <span className="pulse-dot" />
              OPEN TO WORK
            </div>
            <div className="id-card__barcode" aria-hidden="true" />
          </div>

          <span className="hero__float-tag hero__float-tag--1 float-a sticker sticker--coral" aria-hidden="true">
            <Coffee size={14} /> Java
          </span>
          <span className="hero__float-tag hero__float-tag--2 float-b sticker sticker--cobalt" aria-hidden="true">
            <Zap size={14} /> Real-Time
          </span>
          <span className="hero__float-tag hero__float-tag--3 float-f sticker sticker--yellow" aria-hidden="true">
            <Lock size={14} /> Secure by default
          </span>
        </div>
      </div>

      <HeroTechMarquee />
    </section>
  )
}
