import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  let segmentCount: number = 0

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
  }

  p5.draw = () => {
    if (p5.keyIsDown(p5.UP_ARROW)) {
      if (segmentCount < 360) {
        segmentCount += 0.5
      }
    }
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
      if (segmentCount > 0) {
        segmentCount -= 0.5
      }
    }

    p5.background('#fff')
    p5.colorMode(p5.HSB, 360, p5.width, p5.height)
    const angleStep = 360 / segmentCount
    p5.beginShape(p5.TRIANGLE_FAN)

    const diameter = p5.width / 2
    p5.vertex(diameter, diameter)
    const radius = p5.width / 3
    for (let angle = 0; angle <= 360; angle += angleStep) {
      const vx = diameter + p5.sin(p5.radians(angle)) * radius
      const vy = diameter + p5.cos(p5.radians(angle)) * radius

      p5.line(diameter, diameter, vx, vy)
      p5.push()
      p5.fill(angle, p5.mouseX, p5.mouseY)
      p5.noStroke()
      p5.ellipse(vx, vy, 50)
      p5.pop()
    }
    p5.endShape()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
