import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  let locationX: number
  let locationY: number
  let velocityX: number
  let velocityY: number

  p5.setup = () => {
    // p5.frameRate(10) // 1秒にn回drawを実行する
    p5.createCanvas(600, 300)
    p5.colorMode(p5.HSB)

    // 変数初期値
    locationX = p5.width / 2
    locationY = p5.height / 2
    velocityX = 2
    velocityY = 5
  }

  p5.draw = () => {
    p5.background('#fff')

    p5.noStroke()
    p5.fill(200, 100, 100, 1)
    p5.ellipse(locationX, locationY, 80, 80)

    locationX += velocityX
    locationY += velocityY
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
