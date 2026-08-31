import { Fragment } from 'react'
import type { ArchitectureLayer } from '../../../types'
import { Reveal } from '../../ui/Reveal'

interface FlowDiagramProps {
  layers: ArchitectureLayer[]
}

export function FlowDiagram({ layers }: FlowDiagramProps) {
  return (
    <div className="flow" role="img" aria-label={`Request flow: ${layers.map(layer => layer.label).join(' → ')}`}>
      {layers.map((layer, index) => (
        <Fragment key={layer.label}>
          {index > 0 && (
            <span className="flow__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 12h15M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          )}
          <Reveal delay={index * 80} className="flow__cell">
            <div className="flow__node">
              <span className="flow__step">{String(index + 1).padStart(2, '0')}</span>
              <span className="flow__label">{layer.label}</span>
              {layer.note ? <span className="flow__note">{layer.note}</span> : null}
            </div>
          </Reveal>
        </Fragment>
      ))}
    </div>
  )
}
