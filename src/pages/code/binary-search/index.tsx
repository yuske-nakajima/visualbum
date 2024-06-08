import { drawBlock } from '@/lib/functions.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let ground: Vector
  // const array: number[] = []
  let arraySize: number
  let gridSize: number
  let margin: number

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    gridSize = p5.height / 32

    ground = p5.createVector(0, (p5.height / 8) * 7)
    arraySize = p5.min( p5.floor((p5.width / gridSize) * 0.75), 20)
    margin = p5.floor(((p5.width / gridSize) * 0.25) / 2)

    // for (let i = 1; i <= arraySize; i++) {
    //   array.push(i)
    // }
  }

  const drawGround = () => {
    drawBlock(p5, () => {
      p5.noStroke()
      p5.fill(0, 0, 20)
      p5.rect(ground.x, ground.y, p5.width, ground.y)
    })
  }

  const drawGrid = () => {
    drawBlock(p5, () => {
      p5.stroke(0, 0, 80, 0.5)
      for (let i = 0; i < p5.width; i += gridSize) {
        let weight = 1
        if (i % (gridSize * 5) === 0) {
          weight = 2
        }
        drawBlock(p5, () => {
          p5.strokeWeight(weight)
          p5.line(i, 0, i, p5.height)
        })
      }
      for (let i = 0; i < p5.height; i += gridSize) {
        let weight = 1
        if (i % (gridSize * 5) === 0) {
          weight = 2
        }
        drawBlock(p5, () => {
          p5.strokeWeight(weight)
          p5.line(0, i, p5.width, i)
        })
      }
    })
  }

  const drawBar = () => {
    for (let i = 1; i <= arraySize; i++) {
      drawBlock(p5, () => {
        p5.strokeWeight(2)
        p5.fill(0, 100, 100)
        p5.rect(
          (i + margin) * gridSize,
          ground.y - i * gridSize,
          gridSize,
          i * gridSize,
        )

        drawBlock(p5, () => {
          p5.fill(0, 0, 100)
          p5.textSize(20)
          p5.textAlign(p5.CENTER, p5.CENTER)
          p5.text(
            i - 1,
            (i + margin) * gridSize + gridSize / 2,
            ground.y + gridSize - gridSize / 2,
          )
        })
      })
    }
  }

  p5.draw = () => {
    p5.background(0, 10, 100)

    drawGround()
    drawBar()

    drawGrid()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
