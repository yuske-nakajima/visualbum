import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const ballNum = 100

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  // 変数初期値
  const vecLocation: Vector[] = []
  const vecVelocity: Vector[] = []
  const vecAccel: Vector[] = []
  const hue: number[] = []
  const saturation: number[] = []
  const brightness: number[] = []
  const bollSize: number[] = []

  p5.setup = () => {
    // p5.frameRate(10) // 1秒にn回drawを実行する
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.colorMode(p5.HSB)

    for (let i = 0; i < ballNum; i++) {
      vecLocation[i] = p5.createVector(
        p5.width / p5.random(2, 20),
        p5.height / p5.random(2, 20),
      )
      vecVelocity[i] = p5.createVector(p5.random(2, 3), p5.random(2, 3))
      vecAccel[i] = p5.createVector(
        p5.random(0.01, 0.05),
        p5.random(0.05, 0.09),
      )
      hue[i] = p5.random(1, 360)
      saturation[i] = p5.random(40, 100)
      brightness[i] = p5.random(80, 100)
      bollSize[i] = p5.random(20, 80)
    }
  }

  p5.draw = () => {
    p5.background('#fff')

    for (let i = 0; i < ballNum; i++) {
      p5.push()
      p5.fill(hue[i], saturation[i], brightness[i], 1)
      p5.noStroke()
      p5.ellipse(vecLocation[i].x, vecLocation[i].y, bollSize[i])

      vecVelocity[i].add(vecAccel[i])
      vecLocation[i].add(vecVelocity[i])
      p5.pop()

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
