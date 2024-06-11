import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

let tx: number
let ty: number
let circles: Vector[]
const r = 30

const sketch: Sketch = (p5) => {
  const drawCircle = (c: Vector) => {
    p5.strokeWeight(2)
    p5.stroke(240)
    p5.noFill()
    p5.circle(c.x, c.y, r * 2)
    const rad = p5.atan2(ty - c.y, tx - c.x)
    p5.line(c.x, c.y, c.x + p5.cos(rad) * r, c.y + p5.sin(rad) * r)
  }

  const drawTarget = () => {
    p5.strokeWeight(2)
    p5.stroke(240)
    p5.line(tx - 10, ty, tx + 10, ty)
    p5.line(tx, ty - 10, tx, ty + 10)

    // マウスに追従
    tx = p5.mouseX
    ty = p5.mouseY
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    tx = p5.width / 2
    ty = p5.height / 2

    circles = []
    for (let i = 0; i < 50; i++) {
      const x = p5.random(p5.width)
      const y = p5.random(p5.height)
      circles.push({ x, y } as Vector)
    }
  }

  p5.draw = () => {
    p5.clear()
    p5.background(0, 0, 10)

    // ty++;
    // ty %= p5.height;

    circles.forEach((c) => {
      drawCircle(c)
    })

    drawTarget()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
