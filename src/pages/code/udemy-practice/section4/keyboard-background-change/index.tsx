import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

let step = 1

const sketch: Sketch = (p5) => {
  let hue = 0

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.colorMode(p5.HSB)
  }

  p5.draw = () => {
    p5.background(hue, 5, 96)

    if (p5.keyIsPressed) {
      // ↑↓を押した時で色を変える
      if (p5.keyCode === p5.UP_ARROW) {
        hue = (hue + step) % 360
      }
      if (p5.keyCode === p5.DOWN_ARROW) {
        hue = (hue - step + 360) % 360
      }
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
