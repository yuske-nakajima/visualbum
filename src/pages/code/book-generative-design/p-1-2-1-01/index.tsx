import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Color } from 'p5'

// P.1.2.1 補完で作るカラーパレット
const TILE_LENGTH = 100

const sketch: Sketch = (p5) => {
  const colorsLeft: Color[] = []
  const colorsRight: Color[] = []

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.RGB)

    for (let i = 0; i < TILE_LENGTH; i++) {
      colorsLeft.push(
        p5.color(p5.random(0, 100), p5.random(0, 100), p5.random(0, 100)),
      )
      colorsRight.push(
        p5.color(p5.random(0, 100), p5.random(0, 100), p5.random(0, 100)),
      )
    }
  }

  p5.draw = () => {
    const tileCountX = p5.int(p5.map(p5.mouseX, 0, p5.width, 2, TILE_LENGTH))
    const tileCountY = p5.int(p5.map(p5.mouseY, 0, p5.height, 2, TILE_LENGTH))

    const tileWidth = p5.width / tileCountX
    const tileHeight = p5.height / tileCountY

    for (let gridY = 0; gridY < tileCountY; gridY++) {
      const colFrom = colorsLeft[gridY]
      const colTo = colorsLeft[gridY]

      for (let gridX = 0; gridX < tileCountX; gridX++) {
        const amount = 10

        p5.fill(p5.lerpColor(colFrom, colTo, amount))

        const posX = tileWidth + gridX
        const posY = tileHeight + gridY
        p5.rect(posX, posY, tileWidth, tileHeight)
      }
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
