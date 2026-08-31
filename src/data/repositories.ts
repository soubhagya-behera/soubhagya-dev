import type { Repository } from '../types'

export const repositories: Repository[] = [
  {
    name: 'GreenCart',
    url: 'https://github.com/soubhagya-behera/GreenCart',
    description: 'Full-stack grocery delivery platform — Spring Boot API, React storefront, MySQL, JWT auth, Razorpay payments.',
    language: 'Java',
    stars: null,
  },
  {
    name: 'api-rate-limiter',
    url: 'https://github.com/soubhagya-behera/api-rate-limiter',
    description: 'Redis-powered distributed API rate limiter — atomic Lua token buckets, Spring Boot filter, Dockerized.',
    language: 'Java',
    stars: null,
  },
  {
    name: 'pingme',
    url: 'https://github.com/soubhagya-behera/pingme',
    description: 'Real-time chat over WebSocket / STOMP — presence, typing events and persistent history. In development.',
    language: 'Java',
    stars: null,
  },
  {
    name: 'secure-digital-banking-management-system',
    url: 'https://github.com/soubhagya-behera/secure-digital-banking-management-system',
    description: 'Digital banking app with OTP auth, fraud-detection rules, Razorpay integration and an AI chatbot.',
    language: 'Java',
    stars: 1,
  },
  {
    name: 'DevScout-AI',
    url: 'https://github.com/soubhagya-behera/DevScout-AI',
    description: 'AI-powered GitHub developer analyzer — Spring Boot pipeline, weighted scoring, Gemini-generated insights.',
    language: 'Java',
    stars: null,
  },
  {
    name: 'ai-powered-browser-assistant',
    url: 'https://github.com/soubhagya-behera/ai-powered-browser-assistant',
    description: 'Chrome extension using the Gemini API for chat, webpage summarization and text explanation.',
    language: 'JavaScript',
    stars: null,
  },
]

export const githubProfileUrl = 'https://github.com/soubhagya-behera'
export const githubAvatarUrl = 'https://avatars.githubusercontent.com/u/228096594?v=4'

export const languageColors: Record<string, string> = {
  JavaScript: '#EFD81D',
  Java: '#E76F00',
  TypeScript: '#3178C6',
}
