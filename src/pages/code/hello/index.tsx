;`use client`
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)

  p5.draw = () => {
    p5.background(100)
    p5.normalMaterial()
    // p5.push();
    p5.rotateZ(p5.frameCount * 0.01)
    p5.rotateX(p5.frameCount * 0.01)
    p5.rotateY(p5.frameCount * 0.01)
    p5.plane(100)
    p5.pop()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
