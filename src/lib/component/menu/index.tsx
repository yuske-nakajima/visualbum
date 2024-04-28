import { Ball } from '@/lib/class/ball.ts'
import { BallMover } from '@/lib/class/ballMover.ts'
import { CanvasBoundary } from '@/lib/class/canvasBoundary.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  const balls: Array<{
    ball: Ball
    ballMover: BallMover
  }> = []
  let canvasBoundary: CanvasBoundary
  const ballList: Array<Ball> = []

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    for (let i = 0; i < 10; i++) {
      const ball = new Ball(
        p5,
        p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height)),
        p5.createVector(p5.random(-3, 3), p5.random(-3, 3)),
        { h: p5.random(0, 360), s: p5.random(20, 100), b: p5.random(90, 100) },
        100,
      )
      ballList.push(ball)
      const ballMover = new BallMover(ball, ballList)
      balls.push({ ball, ballMover })
    }

    canvasBoundary = new CanvasBoundary(p5, p5.width, p5.height)
  }

  p5.draw = () => {
    p5.background(180, 10, 100)

    for (const { ball, ballMover } of balls) {
      ballMover.move()
      canvasBoundary.checkCollision(ball)
      ball.display()
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
