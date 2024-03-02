import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
  }

  p5.draw = () => {
    p5.background('#F2F4F8')
    p5.colorMode(p5.HSB, 360, p5.width, p5.height)

    const radius = (p5.width < p5.height ? p5.width : p5.height) / 3
    const diameter: Vector = p5.createVector(p5.width / 2, p5.height / 2)
    p5.ellipse(diameter.x, diameter.y, radius * 2)
    // 円の補助線
    p5.line(diameter.x - radius, diameter.y, diameter.x + radius, diameter.y)
    p5.line(diameter.x, diameter.y - radius, diameter.x, diameter.y + radius)

    const degree = p5.frameCount % 360
    const radians = p5.radians(degree)
    const sin = p5.sin(radians)
    const cos = p5.cos(radians)
    const vx = diameter.x + cos * radius
    const vy = diameter.y + -sin * radius

    // sin
    p5.push()
    p5.stroke(120, p5.width, p5.height)

    p5.push()
    p5.strokeWeight(6)
    p5.line(diameter.x, diameter.y, diameter.x, vy)
    p5.pop()
    // sin-補助線
    p5.push()
    p5.drawingContext.setLineDash([10, 2])
    p5.line(vx, vy, diameter.x, vy)
    p5.pop()

    p5.pop()

    // cos
    p5.push()
    p5.stroke(240, p5.width, p5.height)

    p5.push()
    p5.strokeWeight(6)
    p5.line(diameter.x, diameter.y, vx, diameter.y)
    p5.pop()
    // cos-補助線
    p5.push()
    p5.drawingContext.setLineDash([10, 2])
    p5.line(vx, vy, vx, diameter.y)
    p5.pop()

    p5.pop()

    p5.push()
    p5.strokeWeight(3)
    p5.arc(diameter.x, diameter.y, radius / 4, radius / 4, -radians, 0, p5.PIE)
    p5.pop()

    // 半径
    p5.push()
    p5.strokeWeight(6)
    p5.stroke(360, p5.width, p5.height)
    p5.line(diameter.x, diameter.y, vx, vy)
    p5.pop()

    p5.push()
    p5.textSize(20)

    p5.push()
    p5.stroke(120, p5.width, p5.height)
    p5.text(`sin: ${sin.toFixed(2)}`, 10, 30)
    p5.pop()

    p5.push()
    p5.stroke(240, p5.width, p5.height)
    p5.text(`cos: ${cos.toFixed(2)}`, 10, 60)
    p5.pop()

    p5.push()
    p5.stroke('#555')
    p5.text(`degree: ${degree.toFixed(2)}`, 10, 90)
    p5.text(`radians: ${radians.toFixed(2)}`, 10, 120)
    p5.pop()

    p5.pop()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
