import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  let vecLocation1: Vector
  let vecVelocity1: Vector

  let vecLocation2: Vector
  let vecVelocity2: Vector

  let vecLocation3: Vector
  let vecVelocity3: Vector

  p5.setup = () => {
    // p5.frameRate(5)
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)
    p5.angleMode(p5.DEGREES)
    vecLocation1 = p5.createVector(p5.width / 2, p5.height / 2) // center
    vecLocation2 = p5.createVector(p5.width / 2, p5.height / 2) // center
    vecLocation3 = p5.createVector(p5.width / 2, p5.height / 2) // center
  }

  const radius = 50

  p5.draw = () => {
    p5.background('#fff')

    vecVelocity1 = p5.createVector(10, p5.sin(p5.frameCount) * 2)
    vecLocation1.add(vecVelocity1)
    p5.push()
    p5.noStroke()
    p5.fill(360, 30, 100)
    p5.ellipse(p5.width / 2, vecLocation1.y, radius)
    p5.pop()

    vecVelocity2 = p5.createVector(
      p5.cos(p5.frameCount) * 2,
      p5.sin(p5.frameCount) * 2,
    )
    vecLocation2.add(vecVelocity2)
    p5.push()
    p5.noStroke()
    p5.fill(300, 30, 100)
    p5.ellipse(vecLocation2.x, vecLocation2.y, radius)
    p5.pop()

    vecVelocity3 = p5.createVector(
      p5.sin(p5.frameCount) * 3,
      p5.cos(p5.frameCount) * 3,
    )
    vecLocation3.add(vecVelocity3)
    p5.push()
    p5.noStroke()
    p5.fill(260, 30, 100)
    p5.ellipse(vecLocation3.x, vecLocation3.y, radius)
    p5.pop()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
