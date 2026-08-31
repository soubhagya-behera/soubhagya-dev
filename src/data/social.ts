export const profile = {
  name: 'Soubhagya Kumar Behera',
  logoName: 'Soubhagya',
  role: 'Java Full-Stack Developer',
  location: 'Bhubaneswar, Odisha, India',
  email: 'soubhagyabehera074@gmail.com',
  availability: 'Open to opportunities',
  heroPitch:
    'Building secure, scalable and real-time web applications with Java, Spring Boot, React and modern backend technologies.',
  siteUrl: 'https://soubhagya-portfolio-olive.vercel.app',
  avatar: '/profile.jpg',
}

export const avatarCandidates = [
  ...new Set([profile.avatar, '/profile.jpg', '/profile.jpeg', '/profile.png']),
]

export const links = {
  github: {
    label: 'GitHub',
    url: 'https://github.com/soubhagya-behera',
    handle: '@soubhagya-behera',
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/soubhagyakumar-java',
    handle: 'in/soubhagyakumar-java',
  },
  resume: {
    label: 'Resume',
    url: '/resume.pdf',
  },
  email: {
    label: 'Email',
    url: `mailto:soubhagyabehera074@gmail.com`,
  },
}
