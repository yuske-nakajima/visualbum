import { drawBlock } from '@/lib/functions.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { P5CanvasInstance, Sketch } from '@p5-wrapper/react'

const abcList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const sketch: Sketch = (p5: P5CanvasInstance) => {
  const textSizeList: number[] = []
  // let vertAlignList = [p5.TOP, p5.CENTER, p5.BOTTOM, p5.BASELINE]
  let vertAlignList = [p5.TOP, p5.CENTER, p5.BOTTOM]
  let horizAlignList = [p5.LEFT, p5.CENTER, p5.RIGHT]

  const hueList: number[] = []
  const hueStep = 360 / (vertAlignList.length * horizAlignList.length)
  for (let i = 0; i < 360; i += hueStep) {
    hueList.push(i)
  }
  let saturation: number
  let brightness: number

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.colorMode(p5.HSB)
    for (let i = 10; i >= 0.1; i--) {
      textSizeList.push(p5.width / i)
    }
    for (let i = 0.1; i < 10; i++) {
      textSizeList.push(p5.width / i)
    }
    saturation = p5.random(20, 80)
    brightness = p5.random(80, 100)
  }

  p5.draw = () => {
    if (p5.frameCount % 120 === 0) {
      p5.background(p5.random(0, 360), 10, 100)
    }
    const text = abcList[Math.floor(p5.frameCount / 5) % abcList.length]
    if (p5.frameCount % 10 === 0) {
      saturation = p5.random(20, 80)
      brightness = p5.random(80, 100)
    }

    // 上下左右十字に線を引く
    drawBlock(p5, () => {
      p5.stroke(0, 0, 0)
      p5.strokeWeight(2)
      p5.line(p5.width / 2, 0, p5.width / 2, p5.height)
      p5.line(0, p5.height / 2, p5.width, p5.height / 2)
    })

    drawBlock(p5, () => {
      p5.textSize(
        textSizeList[Math.floor(p5.frameCount / 30) % textSizeList.length],
      )

      for (let i = 0; i < vertAlignList.length; i++) {
        for (let j = 0; j < horizAlignList.length; j++) {
          drawBlock(p5, () => {
            p5.fill(
              hueList[i * horizAlignList.length + j],
              saturation,
              brightness,
            )
            p5.textAlign(horizAlignList[j], vertAlignList[i])
            if (
              vertAlignList[i] !== p5.CENTER ||
              horizAlignList[j] !== p5.CENTER
            ) {
              p5.text(text, p5.width / 2, p5.height / 2)
            }
          })
        }
      }
      drawBlock(p5, () => {
        p5.fill(0, 0, 0)
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text(text, p5.width / 2, p5.height / 2)
      })
    })
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
