import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

let stepX: number = 10
let stepY: number = 10

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.noStroke()
    p5.colorMode(p5.HSB, p5.windowWidth - 22, p5.windowHeight - 22, 100)
  }

  p5.draw = () => {
    console.log('p5.mouseX: ', p5.mouseX)
    console.log('p5.mouseY: ', p5.mouseY)
    if (p5.mouseX < 0 || p5.mouseY < 0) {
      stepX = 10
      stepY = 10
      return
    }

    stepX = p5.mouseX + 2
    stepY = p5.mouseY + 2

    for (let gridY = 0; gridY < p5.height; gridY += stepY) {
      for (let gridX = 0; gridX < p5.width; gridX += stepX) {
        p5.fill(gridX, p5.height - gridY, 100)
        p5.rect(gridX, gridY, stepX, stepY)
      }
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
