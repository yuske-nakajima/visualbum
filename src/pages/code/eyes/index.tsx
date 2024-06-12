import { drawBlock } from '@/lib/functions.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

let t: Vector
let circles: Vector[]
const r = 30

const sketch: Sketch = (p5) => {
  const drawCircle = (c: Vector) => {
    drawBlock(p5, () => {
      p5.strokeWeight(2)
      p5.stroke(0)
      p5.fill(0, 0, 100)
      p5.circle(c.x, c.y, r * 2)
    })

    // 目玉
    drawBlock(p5, () => {
      const rad = p5.atan2(t.y - c.y, t.x - c.x)
      const x = c.x + p5.cos(rad) * (r - 10)
      const y = c.y + p5.sin(rad) * (r - 10)
      p5.fill(0, 0, 0)
      p5.circle(x, y, 18)
    })
  }

  const drawTarget = () => {
    drawBlock(p5, () => {
      p5.strokeWeight(2)
      p5.stroke(0, 0, 30, 0.2)
      p5.line(0, t.y, p5.width, t.y)
      p5.line(t.x, 0, t.x, p5.height)
    })

    drawBlock(p5, () => {
      p5.stroke(0)
      p5.fill(0, 0, 95)
      p5.circle(t.x, t.y, p5.width / 8)
    })

    drawBlock(p5, () => {
      p5.stroke(0, 100, 80)
      p5.fill(0, 100, 80)
      p5.circle(t.x, t.y, p5.width / 15)
    })
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    t = p5.createVector(p5.width / 2, p5.height / 2)

    const step: Vector = p5.createVector(p5.width / 10, p5.height / 10)
    circles = []
    for (let y = 0; y < p5.height; y += step.y) {
      for (let x = 0; x < p5.width; x += step.x) {
        circles.push(p5.createVector(x, y))
      }
    }
  }

  p5.draw = () => {
    p5.clear()
    p5.background(0, 10, 100)

    // t.x, t.y をノイズで動かす
    // 四方向に動く
    // 壁に反射する
    // 0 から p5.width, 0からp5.height までの値を取る
    t.x = p5.noise(p5.frameCount / 40) * p5.width
    t.y = p5.noise(p5.frameCount / 40 + 100) * p5.height

    drawTarget()

    circles.forEach((c) => {
      drawCircle(c)
    })
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
