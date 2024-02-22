import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  // 変数初期値
  let vecLocation: Vector
  let vecVelocity: Vector
  let vecAccel: Vector

  p5.setup = () => {
    // p5.frameRate(10) // 1秒にn回drawを実行する
    p5.createCanvas(600, 300)
    p5.colorMode(p5.HSB)

    vecLocation = p5.createVector(p5.width / 2, p5.height / 2)
    vecVelocity = p5.createVector(5, 5)
    vecAccel = p5.createVector(1, 0.11)
  }

  p5.draw = () => {
    p5.background('#fff')

    p5.noStroke()
    p5.fill(200, 100, 100, 1)
    p5.ellipse(vecLocation.x, vecLocation.y, 80, 80)

    // バウンド
    vecVelocity.y += vecAccel.y
    vecLocation.y += vecVelocity.y
    if (vecLocation.y > p5.height || vecLocation.y < 0) {
      // 画面端で移動方向を反転
      vecVelocity.y *= -1
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
