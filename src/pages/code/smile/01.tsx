import { drawBlock } from '@/lib/functions.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let angle: number

  const drawFace = (position: Vector, size: number) => {
    // 輪郭
    drawBlock(p5, () => {
      p5.strokeWeight(2)
      p5.stroke(0)
      p5.fill(50, 20, 100)
      p5.circle(position.x, position.y, size)
    })

    // 目
    drawBlock(p5, () => {
      p5.fill(0, 0, 0)
      p5.circle(position.x - 50, position.y - 50, 30)
      p5.circle(position.x + 50, position.y - 50, 30)
    })

    // 口
    drawBlock(p5, () => {
      p5.fill(0, 0, 0)
      p5.arc(position.x, position.y + 50, 100, 50, 0, 180)
    })
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth / 2, p5.windowHeight / 2)
    p5.colorMode(p5.HSB)
    p5.angleMode(p5.DEGREES)

    angle = 0
  }

  p5.draw = () => {
    p5.background(0, 10, 100)

    angle += p5.noise(p5.frameCount / p5.random(1, 1000)) * 20

    drawBlock(p5, () => {
      p5.translate(p5.width / 2, p5.height / 2)
      p5.rotate(angle)
      drawFace(p5.createVector(0, 0), 300)
    })
  }
}

const index = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          backgroundColor: '#f0f0f0',
          height: '100vh',
        }}
      >
        <div
          style={{
            width: '50vw',
            height: '50vh',
            border: '1px solid #000',
          }}
        >
          <NextReactP5Wrapper sketch={sketch} />
        </div>
      </div>
    </>
  )
}
export default index
