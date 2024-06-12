import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  let segmentCount: number = 4

  p5.keyPressed = () => {
    if (p5.key === 'ArrowUp') {
      segmentCount = 360
    }
    if (p5.key === 'ArrowRight') {
      segmentCount = 90
    }
    if (p5.key === 'ArrowDown') {
      segmentCount = 30
    }
    if (p5.key === 'ArrowLeft') {
      segmentCount = 45
    }
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    p5.colorMode(p5.HSB, 360, p5.width, p5.height)
    p5.background('#fff')
    const angleStep = 360 / segmentCount
    p5.beginShape(p5.TRIANGLE_FAN)
    p5.vertex(p5.width / 2, p5.height / 2)
    const radius = p5.width / 2
    for (let angle = 0; angle <= 360; angle += angleStep) {
      const vx = p5.width / 2 + p5.sin(p5.radians(angle)) * radius
      const vy = p5.height / 2 + p5.cos(p5.radians(angle)) * radius
      p5.vertex(vx, vy)
      p5.fill(angle, p5.mouseX, p5.mouseY)
    }
    p5.endShape()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
