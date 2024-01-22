import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
  }

  const SPEED = 60
  const AMOUNT = SPEED * (Math.random() * 0.5 + 0.5)
  const SIZE = Math.random() * 100 + 50
  const EDGE = SIZE / 2

  const w_4 = p5.windowWidth / 4
  const w_8 = p5.windowWidth / 8
  const RIGHT_MAX = p5.windowWidth - EDGE
  const LEFT_MAX = EDGE
  let right = w_4 * 3 - w_8
  let left = w_4 + w_8
  let x = w_4 * 2

  const h_4 = p5.windowHeight / 4
  const h_8 = p5.windowHeight / 8
  const TOP_MAX = p5.windowHeight - EDGE
  const BOTTOM_MAX = EDGE
  let top = h_4 * 3 - h_8
  let bottom = h_4 + h_8
  let y = h_4 * 2

  let isRight = Math.random() < 0.5
  let isTop = Math.random() < 0.5

  let fillColor = Math.random() * 150 + 100
  let strokeColor = Math.random() * 150 + 100

  const changeColor = () => {
    fillColor = Math.random() * 150 + 100
    strokeColor = Math.random() * 150 + 100
  }

  p5.draw = () => {
    // p5.background(240)
    p5.stroke(strokeColor, strokeColor, strokeColor)
    p5.strokeWeight(SIZE / 10)
    p5.fill(fillColor, fillColor, fillColor)

    if (isRight) {
      x += SPEED
    } else {
      x -= SPEED
    }
    if (x >= right) {
      isRight = false
      changeColor()
      if (right <= RIGHT_MAX) right += AMOUNT
      else right = RIGHT_MAX
    } else if (x <= left) {
      isRight = true
      changeColor()
      if (left >= LEFT_MAX) left -= AMOUNT
      else left = LEFT_MAX
    }

    if (isTop) {
      y += SPEED * 0.9
    } else {
      y -= SPEED * 0.3
    }
    if (y >= top) {
      isTop = false
      changeColor()
      if (top <= TOP_MAX) top += AMOUNT
      else top = TOP_MAX
    } else if (y <= bottom) {
      isTop = true
      changeColor()
      if (bottom >= BOTTOM_MAX) bottom -= AMOUNT
      else bottom = BOTTOM_MAX
    }

    p5.circle(x, y, SIZE)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
