import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
  }

  p5.draw = () => {
    p5.background('#fff')
    p5.colorMode(p5.HSB, 360, p5.width, p5.height)

    const radius = p5.width / 3
    const diameter = p5.width / 2
    p5.ellipse(
      diameter + p5.sin(p5.radians(180)) * radius,
      diameter + p5.cos(p5.radians(90)) * radius,
      radius * 2,
    )

    const value = p5.frameCount % 360
    const vx = diameter + p5.sin(p5.radians(value)) * radius
    const vy = diameter + p5.cos(p5.radians(value)) * radius

    // p5.line(diameter, diameter, vx, vy)
    p5.line(vx, vy, vx, diameter)
    p5.line(vx, vy, diameter, vy)
    p5.line(diameter, diameter, vx, diameter)
    p5.line(diameter, diameter, diameter, vy)

    p5.push()
    p5.fill(value, p5.mouseX, p5.mouseY)
    p5.noStroke()
    p5.ellipse(diameter, diameter, 10)
    p5.ellipse(vx, vy, 30)
    p5.ellipse(vx, diameter, 10)
    p5.ellipse(diameter, vy, 10)
    p5.pop()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
