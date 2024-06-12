import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.colorMode(p5.HSB)
    p5.background(0, 0, 100)
  }

  p5.mouseClicked = () => {
    p5.noStroke()
    p5.fill(p5.random(300, 360), p5.random(80, 100), p5.random(80, 100))
    p5.ellipse(p5.mouseX, p5.mouseY, 50, 50)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
