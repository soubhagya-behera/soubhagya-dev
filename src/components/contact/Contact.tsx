import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Check, Copy, Mail, Send } from 'lucide-react'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Sticker } from '../ui/Sticker'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { links, profile } from '../../data/social'
import './contact.css'

interface FormState {
  name: string
  email: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form: FormState): Errors {
  const errors: Errors = {}
  if (form.name.trim().length < 2) errors.name = 'Tell me at least your name.'
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'That email does not look valid.'
  if (form.message.trim().length < 10) errors.message = 'Give me at least one full sentence.'
  return errors
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [copied, setCopied] = useState(false)

  const update = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(previous => ({ ...previous, [field]: event.target.value }))
    setErrors(previous => ({ ...previous, [field]: undefined }))
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    const subject = encodeURIComponent(`Portfolio contact — ${form.name.trim()}`)
    const body = encodeURIComponent(`${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeader
          index="07"
          label="Contact"
          accent="coral"
          title="Let's talk shop."
          subtitle="Email is the fastest way to reach me — everything else is linked below."
        />

        <div className="contact__grid">
          <div className="contact__info">
            <Reveal>
              <div className="contact__email card">
                <p className="mono contact__label">EMAIL</p>
                <a href={links.email.url} className="contact__address">
                  {profile.email}
                </a>
                <div className="contact__email-actions">
                  <button type="button" className="btn btn--sm btn--yellow" onClick={copyEmail}>
                    {copied ? (
                      <>
                        <Check size={15} aria-hidden="true" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={15} aria-hidden="true" /> Copy address
                      </>
                    )}
                  </button>
                  <a className="btn btn--sm btn--cobalt" href={links.email.url}>
                    <Mail size={15} aria-hidden="true" /> Compose
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} className="contact__cards">
              <a className="contact__mini card" href={links.github.url} target="_blank" rel="noopener noreferrer">
                <span className="contact__mini-icon contact__mini-icon--ink" aria-hidden="true">
                  <GithubIcon size={22} />
                </span>
                <span>
                  <strong>GitHub</strong>
                  <small>{links.github.handle}</small>
                </span>
              </a>
              <a className="contact__mini card" href={links.linkedin.url} target="_blank" rel="noopener noreferrer">
                <span className="contact__mini-icon contact__mini-icon--cobalt" aria-hidden="true">
                  <LinkedinIcon size={22} />
                </span>
                <span>
                  <strong>LinkedIn</strong>
                  <small>{links.linkedin.handle}</small>
                </span>
              </a>
            </Reveal>

            <Reveal delay={180}>
              <p className="mono contact__loc">{profile.location} · Usually replies within a day.</p>
            </Reveal>
          </div>

          <Reveal delay={140} className="contact__formwrap">
            <form className="contact__form card" onSubmit={handleSubmit} noValidate>
              <Sticker accent="mint" rotate={-2}>
                QUICK MESSAGE
              </Sticker>

              <div className="field">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={update('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                />
                {errors.name ? (
                  <p id="contact-name-error" role="alert" className="field__error mono">
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                />
                {errors.email ? (
                  <p id="contact-email-error" role="alert" className="field__error mono">
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message ? (
                  <p id="contact-message-error" role="alert" className="field__error mono">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button type="submit" className="btn btn--primary btn--lg contact__send">
                <Send size={17} aria-hidden="true" />
                Send message
              </button>
              <p className="mono contact__hint">
                This opens your email app with the message prefilled — nothing is sent through
                this website.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
