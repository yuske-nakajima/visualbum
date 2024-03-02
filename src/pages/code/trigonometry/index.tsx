import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    // p5.background('#fff')
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    // p5.frameRate(12)
  }

  p5.draw = () => {
    const result = {
      frameCount: p5.frameCount,
      sin: p5.sin(p5.radians(p5.frameCount)),
      cos: p5.cos(p5.radians(p5.frameCount)),
      radius: p5.width / 4,
      ballSize: 50,
    }
    const { sin, cos, radius, ballSize } = result

    // p5.background('#fff')
    p5.ellipse(p5.width / 2, p5.height / 2, ballSize)
    p5.ellipse(
      p5.width / 2 + cos * radius,
      p5.height / 2 + -sin * radius,
      ballSize,
    )

    // x軸
    p5.ellipse(p5.width / 2 + cos * radius, p5.height / 2, ballSize)

    // y軸
    p5.ellipse(p5.width / 2, p5.height / 2 + -sin * radius, ballSize)

    console.log(JSON.stringify(result, null, 2))
  }
}

export const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
