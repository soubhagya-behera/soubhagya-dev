import { Button } from '../components/ui/Button'
import { Sticker } from '../components/ui/Sticker'
import { Confetti } from '../components/decorations/Confetti'
import './notfound.css'

export function NotFound() {
  return (
    <section className="section nf">
      <div className="container nf__inner">
        <Confetti className="nf__confetti float-e" />
        <Sticker accent="coral" rotate={-4}>
          ERROR 404
        </Sticker>
        <h1 className="display-xl">Wrong door.</h1>
        <p className="lead">This route returned nothing — much like an API without tests.</p>
        <Button to="/" size="lg">
          Back home
        </Button>
      </div>
    </section>
  )
}
