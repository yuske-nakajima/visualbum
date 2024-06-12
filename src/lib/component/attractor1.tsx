import { Attractor } from '@/lib/class/attractor'
import { Mover } from '@/lib/class/mover'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  let attractor: Attractor
  let mover: Mover

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    mover = new Mover(p5, 10, 0, 1)
    attractor = new Attractor(p5)
  }

  p5.draw = () => {
    p5.background(255)

    const gravity = p5.createVector(0, 0.1)
    mover.applyForce(gravity)
    mover.update()
    mover.render()
    mover.checkEdges()

    attractor.render()

    if (p5.mouseIsPressed) {
      const wind = p5.createVector(0.1, 0)
      mover.applyForce(wind)
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
