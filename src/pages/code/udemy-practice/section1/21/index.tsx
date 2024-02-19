import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.frameRate(10) // 1 frame per second
    p5.createCanvas(400, 300)

    // HSBモードに変更(色相、彩度、明度の順に指定するようになるよ
    p5.colorMode(p5.HSB, 360, 100, 100)
  }

  let locationX = 0 // x座標
  let velocityX = 30 // 速度
  p5.draw = () => {
    // hueの値を使って反対色にする
    p5.fill(p5.random(180, 210), 20, 100, 0.3)
    p5.noStroke()
    p5.ellipse(p5.random(0, p5.width), p5.random(0, p5.height), 80, 80)
    locationX += velocityX

    if (locationX > p5.width) {
      locationX = 0
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
