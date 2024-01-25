import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

let angle = 0
let r = 0

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.noStroke()
    p5.background(30)
  }

  p5.draw = () => {
    p5.push()
    p5.translate(p5.width / 2, p5.height / 2)
    const x = p5.cos(p5.radians(angle)) * r
    const y = p5.sin(p5.radians(angle)) * r
    p5.ellipse(x, y, 10, 10)
    p5.fill(243, 43, 24)
    p5.pop()

    angle += p5.pow(2, 10)
    r += p5.pow(6.4, 0.1)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
