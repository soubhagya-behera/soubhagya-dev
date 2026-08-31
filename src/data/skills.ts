import type { SkillGroup } from '../types'

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    label: 'Backend',
    blurb: 'Where the business rules live — my deepest layer.',
    accent: 'coral',
    skills: ['Java', 'Spring Boot', 'Spring Security', 'Spring MVC', 'REST APIs', 'JPA / Hibernate', 'JWT', 'WebSocket'],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    blurb: 'React interfaces built against real APIs.',
    accent: 'cobalt',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'database',
    label: 'Database',
    blurb: 'Relational modelling first — Redis when speed demands it.',
    accent: 'mint',
    skills: ['MySQL', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    blurb: 'Containerize, version, ship, observe.',
    accent: 'yellow',
    skills: ['Docker', 'Git', 'GitHub', 'Maven', 'Postman', 'AWS'],
  },
]

export const currentlyLearning = ['Spring Microservices', 'System Design', 'JUnit testing']
