import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.setup = () => p5.createCanvas(p5.windowWidth, p5.windowHeight, p5.WEBGL)

  p5.draw = () => {
    p5.background(250, 120, 120)
    p5.push()

    p5.ambientLight(10, 80, 255)
    p5.directionalLight(255, 255, 255, 1, 100, 0)
    p5.ambientMaterial(255)

    p5.rotateZ(p5.frameCount * 0.01)
    p5.rotateX(p5.frameCount * 0.02)
    p5.rotateY(p5.frameCount * 0.03)
    p5.box((p5.frameCount % p5.windowWidth) / 2, (p5.frameCount % p5.windowWidth) / 2)
    p5.pop()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
