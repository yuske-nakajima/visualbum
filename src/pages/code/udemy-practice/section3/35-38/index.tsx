import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)
  }

  p5.draw = () => {
    p5.background('#fff')

    const radius = p5.width / 3
    const sin = p5.sin(p5.radians(p5.frameCount))
    const cos = p5.cos(p5.radians(p5.frameCount))

    p5.noStroke()
    p5.fill(360, 50, 100)
    p5.ellipse(p5.width / 4, p5.height / 4, sin * radius)

    p5.fill(240, 50, 100)
    p5.ellipse((p5.width / 4) * 3, (p5.height / 4) * 3, cos * radius)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
