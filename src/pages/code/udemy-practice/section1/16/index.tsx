import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.frameRate(10) // 1 frame per second
    p5.createCanvas(400, 300)
  }

  let locationX = 0
  p5.draw = () => {
    p5.background(0)
    p5.ellipse(locationX, 50, 80, 80)
    locationX += 1
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
