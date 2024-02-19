import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(400, 300)
  }

  p5.draw = () => {
    p5.ellipse(50, 50, 80, 80)
    p5.circle(50, 150, 80)

    p5.text('ellipse(50, 50, 80, 80)', 100, 50)
    p5.text('circle(50, 150, 80)', 100, 150)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
