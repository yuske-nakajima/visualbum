import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    // p5.frameRate(10) // 1秒にn回drawを実行する
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)
    p5.noCursor()
    p5.rectMode(p5.CENTER)
    p5.noStroke()
  }

  p5.draw = () => {
    p5.background(p5.mouseY / 2, 100, 100)
    p5.fill(360 - p5.mouseY / 2, 100, 100)
    p5.rect(p5.width / 2, p5.height / 2, p5.mouseX + 1, p5.mouseY + 1)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
