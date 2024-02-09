import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react'

class maker {
  private p5: P5CanvasInstance
  constructor(p5: P5CanvasInstance) {
    this.p5 = p5
  }

  //　円を数分描画する
  public createCircle = (num: number): void => {
    for (let i = 0; i < num; i++) {
      const rand = Math.random() * 100
      this.p5.strokeWeight(Math.random() * 5 + 5)
      this.p5.stroke(0, 0, 0)
      this.p5.fill(
        Math.random() * 50 + 200,
        Math.random() * 100 + 100,
        Math.random() * 50 + 200,
      )
      this.p5.circle(
        (this.p5.frameCount * Math.random() * 1000) % this.p5.windowWidth,
        this.p5.windowHeight * rand,
        Math.random() * 100,
      )
    }
  }
}

const sketch: Sketch = (p5) => {
  const makerInstance = new maker(p5)

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
  }

  p5.draw = () => {
    if (p5.frameCount % 500 === 0) {
      p5.background(240)
    }
    makerInstance.createCircle(200)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
