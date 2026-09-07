import { useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Check, Copy, Mail, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { Reveal } from '../ui/Reveal'
import { SectionHeader } from '../ui/SectionHeader'
import { Sticker } from '../ui/Sticker'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { links, profile } from '../../data/social'
import { useCardTilt } from '../../hooks/useCardTilt'
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
  const formRef = useRef<HTMLFormElement>(null)
  const leftRef = useRef<HTMLDivElement | null>(null)
  const formCardRef = useRef<HTMLFormElement | null>(null)
  const githubRef = useRef<HTMLAnchorElement | null>(null)
  const linkedinRef = useRef<HTMLAnchorElement | null>(null)
  const availabilityRef = useRef<HTMLDivElement | null>(null)
  useCardTilt(leftRef)
  useCardTilt(formCardRef)
  useCardTilt(githubRef)
  useCardTilt(linkedinRef)
  useCardTilt(availabilityRef)
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const update = (field: keyof FormState) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(previous => ({ ...previous, [field]: event.target.value }))
    setErrors(previous => ({ ...previous, [field]: undefined }))
    if (status !== 'idle' && status !== 'sending') {
      setStatus('idle')
      setFeedback('')
    }
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.values(nextErrors).some(Boolean)) return

    const rawServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
    const rawTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
    const rawPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

    const serviceId = rawServiceId?.trim()
    const templateId = rawTemplateId?.trim()
    const publicKey = rawPublicKey?.trim()

    const hasServiceId = Boolean(serviceId)
    const hasTemplateId = Boolean(templateId)
    const hasPublicKey = Boolean(publicKey)

    if (import.meta.env.DEV) {
      // Presence-only check — never log actual IDs/keys
      // Verify exact IDs match EmailJS dashboard without exposing values:
      // serviceId must exactly equal the Service ID shown under EmailJS → Email Services
      // templateId must exactly equal the Template ID for "Contact Us" under Email Templates
      // publicKey must exactly equal the Public Key under Account → API Keys (same account)
      const looksLikeServiceId = Boolean(serviceId?.startsWith('service_'))
      const looksLikeTemplateId = Boolean(templateId?.startsWith('template_'))
      console.debug('[Contact] EmailJS config present:', {
        hasServiceId,
        hasTemplateId,
        hasPublicKey,
        // safe shape checks — no values exposed
        looksLikeServiceId,
        looksLikeTemplateId,
        serviceIdLength: serviceId?.length ?? 0,
        templateIdLength: templateId?.length ?? 0,
        publicKeyLength: publicKey?.length ?? 0,
      })
      if (!looksLikeServiceId || !looksLikeTemplateId) {
        console.warn(
          '[Contact] EmailJS ID shape looks wrong — Service ID should start with "service_" and Template ID with "template_". Copy the exact strings from EmailJS dashboard; do not truncate.',
        )
      }
      // Template variables already verified: {{name}} {{email}} {{message}} — do not change field names
      if (formRef.current) {
        try {
          const fd = new FormData(formRef.current)
          console.debug('[Contact] form payload fields present:', {
            hasNameField: fd.has('name'),
            hasEmailField: fd.has('email'),
            hasMessageField: fd.has('message'),
            fieldNames: [...fd.keys()],
          })
        } catch {
          console.debug('[Contact] could not inspect form fields')
        }
      }
    }

    if (!hasServiceId || !hasTemplateId || !hasPublicKey) {
      if (import.meta.env.DEV) {
        console.warn('[Contact] EmailJS misconfigured — missing required env (presence check):', {
          hasServiceId,
          hasTemplateId,
          hasPublicKey,
        })
      }
      setStatus('error')
      setFeedback('Email service is not configured. Add your EmailJS keys to .env and restart the dev server.')
      return
    }

    if (!formRef.current) {
      if (import.meta.env.DEV) console.warn('[Contact] formRef is null — cannot send')
      return
    }

    // Verify the actual HTML form contains the three fields EmailJS template expects: {{name}}, {{email}}, {{message}}
    // If the EmailJS template uses different variable names (e.g. from_name, reply_to), the request will 400.
    // Do NOT change frontend names without fixing the template — report mismatch instead.
    if (import.meta.env.DEV) {
      const el = formRef.current
      const hasNameEl = Boolean(el.querySelector('[name="name"]'))
      const hasEmailEl = Boolean(el.querySelector('[name="email"]'))
      const hasMessageEl = Boolean(el.querySelector('[name="message"]'))
      if (!hasNameEl || !hasEmailEl || !hasMessageEl) {
        console.warn('[Contact] Template variable mismatch — form is missing expected fields:', {
          hasNameEl,
          hasEmailEl,
          hasMessageEl,
          expected: ['name', 'email', 'message'],
        })
      }
    }

    setStatus('sending')
    setFeedback('')

    try {
      await emailjs.sendForm(serviceId!, templateId!, formRef.current, {
        publicKey: publicKey!,
      })
      if (import.meta.env.DEV) {
        console.debug('[Contact] EmailJS sendForm succeeded', {
          hasServiceId,
          hasTemplateId,
          hasPublicKey,
        })
      }
      setStatus('success')
      setFeedback('Message sent — I usually reply within a day.')
      setForm({ name: '', email: '', message: '' })
      setErrors({})
      formRef.current.reset()
      window.setTimeout(() => {
        setStatus('idle')
        setFeedback('')
      }, 5000)
    } catch (rawError: unknown) {
      const err = rawError as { status?: number; text?: string; message?: string }
      const statusCode = err?.status
      const errorText = err?.text ?? err?.message ?? 'Unknown EmailJS error'

      if (import.meta.env.DEV) {
        console.error('[Contact] EmailJS sendForm failed', {
          status: statusCode,
          text: errorText,
          // presence only — never log actual IDs
          hasServiceId,
          hasTemplateId,
          hasPublicKey,
          hasFormRef: Boolean(formRef.current),
        })
        // Exact cause — template variables already verified as {{name}} {{email}} {{message}}
        // so remaining 400 causes are Service/Template/Key/Account linkage or service connectivity:
        // 1) Template ID does not exactly match "Contact Us" template (check Email Templates → "Contact Us" → ID)
        // 2) Service ID does not belong to the Email Service linked to that template (check Email Services)
        // 3) Public Key belongs to a different EmailJS account than the service/template
        // 4) Email Service is not connected/active (e.g. Gmail OAuth expired / disconnected / not authorized)
        // 5) To Email / sender / reply-to blocked by service provider limits
        // 6) Domain not whitelisted or origin blocked (check Account → Security / Allowed origins)
        // 7) EmailJS plan limits / service requires re-authentication
        if (statusCode === 400) {
          console.warn(
            '[Contact] 400 Bad Request — template variables are correct, so check: (a) copy EXACT Service ID from EmailJS → Email Services, (b) copy EXACT Template ID for "Contact Us" from Email Templates, (c) copy EXACT Public Key from Account → API Keys — all three must be from the SAME account/project. Then (d) open Email Services → verify service shows "Connected" (re-connect Gmail/Outlook if expired), (e) check To Email is valid/verified and not blocked. Do not print IDs — just replace .env values with exact dashboard strings and restart vite.',
          )
          // Extra hint when EmailJS returns text containing service/template/key hints
          if (typeof errorText === 'string' && errorText.length > 0) {
            const lower = errorText.toLowerCase()
            if (lower.includes('service')) {
              console.warn('[Contact] EmailJS 400 text mentions "service" — Service ID is wrong, not found, or not owned by this Public Key account. Re-copy Service ID from Email Services.')
            } else if (lower.includes('template')) {
              console.warn('[Contact] EmailJS 400 text mentions "template" — Template ID is wrong, not found, or not owned by this account. Re-copy Template ID for "Contact Us".')
            } else if (lower.includes('public') || lower.includes('key') || lower.includes('account')) {
              console.warn('[Contact] EmailJS 400 text mentions key/account — Public Key does not match the service/template account. Copy Public Key from Account → API Keys of the SAME account.')
            } else if (lower.includes('gmail') || lower.includes('oauth') || lower.includes('connect') || lower.includes('auth')) {
              console.warn('[Contact] EmailJS 400 text hints at auth/connect — Email Service (e.g. Gmail) is disconnected or needs re-authentication. Re-connect the service in EmailJS dashboard.')
            }
          }
        }
      }

      setStatus('error')
      setFeedback('Failed to send. Please try again or email me directly.')
    }
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
          <Reveal className="contact__leftWrap">
            <div ref={leftRef} className="contact__left card">
              <div className="contact__left-top">
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

              <div className="contact__socials">
                <a
                  ref={githubRef}
                  className="contact__mini"
                  href={links.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact__mini-icon contact__mini-icon--ink" aria-hidden="true">
                    <GithubIcon size={22} />
                  </span>
                  <span>
                    <strong>GitHub</strong>
                    <small>{links.github.handle}</small>
                  </span>
                </a>
                <a
                  ref={linkedinRef}
                  className="contact__mini"
                  href={links.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="contact__mini-icon contact__mini-icon--cobalt" aria-hidden="true">
                    <LinkedinIcon size={22} />
                  </span>
                  <span>
                    <strong>LinkedIn</strong>
                    <small>{links.linkedin.handle}</small>
                  </span>
                </a>
              </div>

              <div ref={availabilityRef} className="contact__availability">
                <p className="mono contact__availability-label">AVAILABILITY STATUS</p>
                <p className="contact__availability-text">
                  Open to Java Backend, Java Full Stack, and Software Engineering opportunities.
                </p>
              </div>

              <p className="mono contact__loc">{profile.location} · Usually replies within a day.</p>
            </div>
          </Reveal>

          <Reveal delay={120} className="contact__formwrap">
            <form
              ref={node => {
                formRef.current = node
                formCardRef.current = node
              }}
              className="contact__form card"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="contact__form-head">
                <Sticker accent="mint" rotate={-2}>
                  QUICK MESSAGE
                </Sticker>
              </div>

              <div className="contact__row">
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
                    required
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
                    required
                  />
                  {errors.email ? (
                    <p id="contact-email-error" role="alert" className="field__error mono">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="field">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={update('message')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  required
                />
                {errors.message ? (
                  <p id="contact-message-error" role="alert" className="field__error mono">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn btn--sm btn--primary contact__send"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? (
                  'SENDING...'
                ) : status === 'success' ? (
                  <>
                    <Check size={15} aria-hidden="true" /> MESSAGE SENT ✓
                  </>
                ) : status === 'error' ? (
                  'FAILED TO SEND — TRY AGAIN'
                ) : (
                  <>
                    <Send size={15} aria-hidden="true" />
                    SEND MESSAGE
                  </>
                )}
              </button>

              {feedback ? (
                <p
                  className={`mono contact__feedback contact__feedback--${status}`}
                  role={status === 'error' ? 'alert' : 'status'}
                  aria-live="polite"
                >
                  {feedback}
                </p>
              ) : (
                <p className="mono contact__hint">Your message is sent directly to my inbox — I read every one.</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
