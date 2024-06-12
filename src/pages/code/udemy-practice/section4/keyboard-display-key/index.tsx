import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let textVector: Vector

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.colorMode(p5.HSB)
    p5.fill(0, 50, 90)
    p5.textSize(p5.width / 4)
    p5.rectMode(p5.CENTER)

    textVector = p5.createVector(20, p5.height / 2)
  }

  p5.draw = () => {
    p5.background(180, 5, 96)
    p5.text(p5.key, textVector.x, textVector.y)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
