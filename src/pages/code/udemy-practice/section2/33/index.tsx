import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  // 変数初期値
  const vecLocation: Vector[] = []
  const vecVelocity: Vector[] = []
  const vecAccel: Vector[] = []

  p5.setup = () => {
    // p5.frameRate(10) // 1秒にn回drawを実行する
    p5.createCanvas(600, 300)
    p5.colorMode(p5.HSB)

    for (let i = 0; i < 20; i++) {
      vecLocation[i] = p5.createVector(
        p5.width / p5.random(2, 20),
        p5.height / p5.random(2, 20),
      )
      vecVelocity[i] = p5.createVector(p5.random(2, 5), p5.random(2, 5))
      vecAccel[i] = p5.createVector(0.01, 0.09)
    }
  }

  p5.draw = () => {
    p5.background('#fff')

    for (let i = 0; i < 20; i++) {
      p5.noStroke()
      p5.fill(200, 100, 100, 1)
      p5.ellipse(vecLocation[i].x, vecLocation[i].y, 80, 80)

      vecVelocity[i].add(vecAccel[i])
      vecLocation[i].add(vecVelocity[i])

      if (vecLocation[i].x > p5.width || vecLocation[i].x < 0) {
        // 画面端で移動方向を反転
        vecVelocity[i].x *= -1
      }

      if (vecLocation[i].y > p5.height || vecLocation[i].y < 0) {
        // 画面端で移動方向を反転
        vecVelocity[i].y *= -1
      }
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
