const ITEMS = [
  'Java',
  'Spring Boot',
  'React',
  'MySQL',
  'Redis',
  'WebSocket',
  'REST APIs',
  'JWT',
  'Docker',
]

export function HeroTechMarquee() {
  return (
    <div className="techstrip" aria-hidden="true">
      <div className="techstrip__track">
        {[0, 1].map(copy => (
          <ul className="techstrip__row" key={copy}>
            {ITEMS.map(item => (
              <li key={item}>
                <span className="techstrip__star">✦</span>
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
