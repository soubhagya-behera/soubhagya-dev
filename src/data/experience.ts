import type { ExperienceItem } from '../types'

export const experience: ExperienceItem[] = [
  {
    id: 'independent-development',
    kind: 'independent',
    role: 'Java Full-Stack Developer',
    org: 'Independent Development · Personal Projects',
    period: '2024 — Present',
    location: 'Bhubaneswar, India · Remote-friendly',
    description:
      'Self-directed, end-to-end ownership of personal products — database schema to deployed UI. Every project is personal, public and documented on GitHub.',
    achievements: [
      'Built GreenCart — grocery e-commerce with JWT auth, Razorpay checkout and role-based dashboards',
      'Engineering PingMe — real-time chat over WebSocket / STOMP with presence and typing events',
      'Shipped RateLimitX — Redis-backed distributed rate limiter using atomic Lua scripts, Dockerized',
      'Created DevScout-AI — GitHub developer analyzer that scores profiles and drafts AI-assisted insights',
    ],
    technologies: ['Java', 'Spring Boot', 'React', 'MySQL', 'Redis', 'WebSocket', 'Docker'],
  },
  {
    id: 'mca-bput',
    kind: 'education',
    role: 'MCA — Computer Applications',
    org: 'Biju Patnaik University of Technology, Odisha',
    period: '2024 — 2026',
    location: 'Bhubaneswar, India',
    description:
      'Postgraduate coursework in software engineering fundamentals — database management systems, operating systems and application development.',
    achievements: [],
    technologies: ['DBMS', 'Operating Systems', 'Software Engineering'],
  },
]
