import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  let locationX: number
  let locationY: number
  let velocityX: number
  let velocityY: number
  let accelX: number
  let accelY: number

  p5.setup = () => {
    // p5.frameRate(10) // 1秒にn回drawを実行する
    p5.createCanvas(600, 300)
    p5.colorMode(p5.HSB)

    // 変数初期値
    locationX = p5.width / 2
    locationY = p5.height / 2
    velocityX = 5
    velocityY = 5
    accelX = 0.1
    accelY = 0.1
  }

  p5.draw = () => {
    p5.background('#fff')

    p5.noStroke()
    p5.fill(200, 100, 100, 1)
    p5.ellipse(locationX, locationY, 80, 80)

    velocityX += accelX
    locationX += velocityX
    if (locationX > p5.width || locationX < 0) {
      // 画面端で移動方向を反転
      velocityX *= -1
      accelX *= -1
    }

    velocityY += accelY
    locationY += velocityY
    if (locationY > p5.height || locationY < 0) {
      // 画面端で移動方向を反転
      velocityY *= -1
      accelY *= -1
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
