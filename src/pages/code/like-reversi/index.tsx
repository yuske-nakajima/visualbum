import { movePoint } from '@/lib/functions'
import { Direction, Permutation, Point } from '@/lib/types'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const directionList: Permutation<Direction> = ['up', 'down', 'left', 'right']
const CIRCLE_WIDTH = 100
const BOUNDARY = CIRCLE_WIDTH / 16

let color = 255
let color_step = 50

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(0)
  }

  // ------------------------------------------------------------------
  let particlePoint: Point = {
    x: p5.windowWidth / 2,
    y: p5.windowHeight / 2,
  }

  p5.draw = () => {
    p5.fill(color)
    const direction: Direction =
      directionList[Math.floor(Math.random() * directionList.length + 1) % directionList.length]

    const confirmPoint = movePoint(particlePoint, direction, CIRCLE_WIDTH)
    if (
      confirmPoint.x < BOUNDARY ||
      confirmPoint.x > p5.windowWidth - BOUNDARY ||
      confirmPoint.y < BOUNDARY ||
      confirmPoint.y > p5.windowHeight - BOUNDARY
    ) {
      if (color + color_step > 255) {
        color_step = 0 - color_step
      } else if (color + color_step < 0) {
        color_step = Math.abs(color_step)
      }
      color = color + color_step
      return
    }

    particlePoint = confirmPoint
    p5.ellipse(particlePoint.x, particlePoint.y, CIRCLE_WIDTH, CIRCLE_WIDTH)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
