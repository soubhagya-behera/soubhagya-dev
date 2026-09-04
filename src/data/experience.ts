import type { ExperienceItem } from '../types'

export const experience: ExperienceItem[] = [
  {
    id: 'internship-seeree',
    kind: 'internship',
    role: 'Java Full Stack Developer (Intern)',
    org: 'Seeree Services Pvt. Ltd.',
    period: 'Oct. 2025 – Apr. 2026',
    location: 'Bhubaneswar, Odisha',
    description: '',
    achievements: [
      'Developed banking backend services using Spring Boot and MySQL, supporting 100+ users with role-based access control.',
      'Implemented JWT authentication and Spring Security to secure REST APIs and banking operations.',
      'Designed and developed 25+ RESTful APIs for banking transaction workflows.',
      'Maintained 80%+ unit test coverage using JUnit and Mockito.',
    ],
    technologies: ['Java', 'Spring Boot', 'MySQL', 'Spring Security', 'JWT', 'REST APIs', 'JUnit', 'Mockito'],
  },
  {
    id: 'mca-usbm',
    kind: 'education',
    role: 'MCA — Computer Applications',
    org: 'United School of Business Management, Bhubaneswar, Odisha',
    period: '2024 – 2026',
    location: 'Bhubaneswar, Odisha',
    description: '',
    achievements: ['CGPA: 8.3'],
    technologies: [],
  },
  {
    id: 'bsc-bhadrak',
    kind: 'education',
    role: 'B.Sc. in PCM',
    org: 'Bhadrak Autonomous College, Bhadrak, Odisha',
    period: '2020 – 2023',
    location: 'Bhadrak, Odisha',
    description: '',
    achievements: ['CGPA: 7.43'],
    technologies: [],
  },
]
