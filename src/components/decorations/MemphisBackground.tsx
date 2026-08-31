import { Shape } from './Shape'
import { Squiggle } from './Squiggle'
import { ZigZag } from './ZigZag'
import { Dots } from './Dots'
import './decorations.css'

export function MemphisBackground() {
  return (
    <div className="memphis-bg" aria-hidden="true">
      <Shape
        variant="ring"
        size={210}
        color="rgba(49, 87, 232, 0.08)"
        strokeWidth={4}
        className="memphis-bg__item memphis-bg__tl float-d"
      />
      <Squiggle color="rgba(255, 90, 82, 0.11)" className="memphis-bg__item memphis-bg__r float-b" />
      <Shape
        variant="arc"
        size={150}
        color="rgba(255, 201, 40, 0.16)"
        strokeWidth={5}
        className="memphis-bg__item memphis-bg__bl float-c"
      />
      <Dots rows={2} cols={4} color="rgba(17, 17, 17, 0.06)" className="memphis-bg__item memphis-bg__ml float-f" />
      <ZigZag color="rgba(66, 214, 164, 0.22)" strokeWidth={5} className="memphis-bg__item memphis-bg__br float-a" />
    </div>
  )
}
