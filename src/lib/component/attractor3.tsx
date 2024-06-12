import { Attractor } from '@/lib/class/attractor'
import { Mover } from '@/lib/class/mover'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const MOVER_LENGTH = 100

const sketch: Sketch = (p5) => {
  let attractor: Attractor
  let mover: Mover[] = []

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    for (let i = 0; i < MOVER_LENGTH; i++) {
      mover.push(
        new Mover(
          p5,
          p5.random(p5.width),
          p5.random(p5.height),
          p5.random(0.5, 5),
        ),
      )
    }
    attractor = new Attractor(p5)
  }

  p5.draw = () => {
    p5.background(255)

    for (let i = 0; i < mover.length; i++) {
      const attraction = attractor.attract(mover[i])
      mover[i].applyForce(attraction)
      mover[i].update()
      mover[i].render()
      mover[i].checkEdges()
    }

    attractor.render()

    if (p5.mouseIsPressed) {
      const wind = p5.createVector(0.1, 0)
      for (let i = 0; i < mover.length; i++) {
        mover[i].applyForce(wind)
      }
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
