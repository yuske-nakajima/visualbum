import { Point } from '@/lib/types'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react'

const NUM = 5
const R = 300
const CIRCLE_RANGE = 120
const SPEED = 0.5

const strokeCircle = (p5: P5CanvasInstance, r: number, point: Point) => {
  p5.stroke(255)
  p5.fill(0)
  const { x, y } = point
  p5.circle(x, y, r * 2)
}

// 回る粒子
const particle = (p5: P5CanvasInstance, point: Point) => {
  p5.noStroke()
  p5.fill(255)
  p5.ellipse(point.x, point.y, 10, 10)
}

const line = (p5: P5CanvasInstance, startPoint: Point, endPoint: Point) => {
  p5.stroke(255)
  p5.fill(0)
  p5.line(startPoint.x, startPoint.y, endPoint.x, endPoint.y)
}

const sketch: Sketch = (p5) => {
  const divNum = NUM - 1
  const pointList: Array<Point> = []
  for (let y = 0; y < NUM; y++) {
    for (let x = 0; x < NUM; x++) {
      if (x === 0 || x === divNum || y === 0 || y === divNum) {
        pointList.push({
          x: (p5.windowWidth / divNum) * x,
          y: (p5.windowHeight / divNum) * y,
        })
      }
    }
  }

  const centerPoint = {
    x: p5.windowWidth / 2,
    y: p5.windowHeight / 2,
  }
  const angleList: Array<number> = []
  for (let i = 0; i < 360; i += CIRCLE_RANGE) {
    angleList.push(i)
  }

  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    p5.background(0)
    strokeCircle(p5, R, centerPoint)
    particle(p5, centerPoint)

    for (let i = 0; i < angleList.length; i++) {
      const circlePoint = {
        x: p5.cos(p5.radians(angleList[i])) * R + p5.width / 2,
        y: p5.sin(p5.radians(angleList[i])) * R + p5.height / 2,
      }

      particle(p5, circlePoint)

      line(p5, centerPoint, circlePoint)
      for (const point of pointList) {
        line(p5, point, circlePoint)
      }

      angleList[i] += SPEED
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
