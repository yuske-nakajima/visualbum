import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const ballSize = 10

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.frameRate(30)
  }

  p5.draw = () => {
    p5.background('#fff')
    p5.colorMode(p5.HSB, 360, p5.width, p5.height)

    const radius = p5.width / 3
    const diameter = p5.width / 2
    p5.ellipse(diameter, diameter, radius * 2)
    // 円の補助線
    p5.line(diameter - radius, diameter, diameter + radius, diameter)
    p5.line(diameter, diameter - radius, diameter, diameter + radius)

    const value = p5.frameCount % 360
    const vx = diameter + p5.sin(p5.radians(value)) * radius
    const vy = diameter + p5.cos(p5.radians(value)) * radius

    // 半径
    p5.push()
    p5.strokeWeight(6)
    p5.stroke(360, p5.width, p5.height)
    p5.line(diameter, diameter, vx, vy)
    p5.pop()

    // sin
    p5.push()
    p5.stroke(120, p5.width, p5.height)

    p5.push()
    p5.strokeWeight(6)
    p5.line(diameter, diameter, diameter, vy)
    p5.pop()
    // sin-補助線
    p5.push()
    p5.drawingContext.setLineDash([10, 2])
    p5.line(vx, vy, diameter, vy)
    p5.pop()

    p5.pop()

    // cos
    p5.push()
    p5.stroke(240, p5.width, p5.height)

    p5.push()
    p5.strokeWeight(6)
    p5.line(diameter, diameter, vx, diameter)
    p5.pop()
    // cos-補助線
    p5.push()
    p5.drawingContext.setLineDash([10, 2])
    p5.line(vx, vy, vx, diameter)
    p5.pop()

    p5.pop()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
