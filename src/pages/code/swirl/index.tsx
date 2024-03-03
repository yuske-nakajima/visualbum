import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let radiusOrigin: number
  let radius: number
  let step = 0.1
  let isClockwise = true // 時計回りかどうか
  let diameter: Vector
  let beforeDiameter: Vector

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    radiusOrigin = (p5.width < p5.height ? p5.width : p5.height) / 3
    radius = 0
    p5.noStroke()
    p5.background('#333')
    diameter = p5.createVector(p5.width / 2, p5.height / 2)
    beforeDiameter = diameter
  }
  p5.draw = () => {
    const sin = p5.sin(p5.radians(p5.frameCount))
    const cos = p5.cos(p5.radians(p5.frameCount))

    const vx = diameter.x + cos * radius
    const vy = diameter.y + sin * (isClockwise ? 1 : -1) * radius

    p5.stroke('#eee')
    p5.strokeWeight(10)
    p5.line(beforeDiameter.x, beforeDiameter.y, vx, vy)
    beforeDiameter = p5.createVector(vx, vy)

    radius += step

    if (radius > radiusOrigin) {
      diameter.x = p5.width / 2
      diameter.y = p5.height / 2
      radius = 0
      isClockwise = !isClockwise
      beforeDiameter = diameter
      p5.background('#333')
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
