import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

let angle = 0 //角度
let r = 2 //半径
let x, y //xy座標

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.noStroke()
    p5.background(50)
  }

  p5.draw = () => {
    p5.push()
    p5.translate(p5.width / 2, p5.height / 2)
    x = p5.cos(p5.radians(angle)) * r
    y = p5.sin(p5.radians(angle)) * r
    p5.ellipse(x, y, 2, 2)
    p5.pop()

    angle += 1
    r += 0.5
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
