import { drawBlock } from '@/lib/functions.ts'
import { calcEuclideanGCD } from '@/lib/math.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let x0: number
  let x1: number

  let oneLoop: number
  const oneFrame = 20
  let frameCount = 0
  let index = 0
  let textSize: number
  let textPosition: Vector
  let textList: string[]

  let position: Vector
  let numA: number
  let numB: number
  let wd: number

  let w: number
  let h: number

  let rectWidth: number
  let rectHeight: number

  type Rect = {
    x: number
    y: number
    wd: number
    hue: number
  }
  const rectList: Rect[] = []

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    x0 = p5.floor(p5.random(1, 30))
    x1 = p5.floor(p5.random(x0 + 1, 50))
    // x0 = 10
    // x1 = 7

    // x0 > x1 にする
    if (x1 > x0) {
      ;[x0, x1] = [x1, x0]
    }

    const { answer } = calcEuclideanGCD(x0, x1)
    textSize = p5.width / 40
    textPosition = p5.createVector(p5.width / 16, p5.height / 16)
    textList = [
      `${x0} と ${x1} の最大公約数をユークリッドの互除法で求める`,
      `最小の正四角形の1辺の長さ ${answer} が答え!!!`,
    ]

    // 四角を計算する
    w = p5.width / 8
    h = p5.height / 4

    rectWidth = w * 6
    rectHeight = rectWidth * (x1 / x0)

    w += w / 2

    calcRectList()

    // 描画回数
    const size = rectList.length
    oneLoop = size * oneFrame
  }

  const displayTextListItem = (index: number) => {
    drawBlock(p5, () => {
      p5.textSize(textSize)
      p5.textAlign(p5.LEFT, p5.TOP)

      p5.text(
        textList[index],
        textPosition.x,
        textPosition.y + index * (textSize + 10),
      )
    })
  }

  const calcRectList = () => {
    position = p5.createVector(w, h)
    numA = rectWidth
    numB = rectHeight
    wd = numB
    let it = 0
    let hue = 0
    const hueIterator = 60

    while (wd > 0.005) {
      hue = (hue + hueIterator) % 360
      it += 1
      if (it % 2 === 1) {
        // x方向に
        while (position.x + wd <= numA + w && wd > 0.005) {
          const { x, y } = position
          rectList.push({ x, y, wd, hue })

          position.x += wd
        }
        wd = numA - (position.x - w)
      } else {
        // y方向に
        while (position.y + wd <= numB + h && wd > 0.005) {
          const { x, y } = position
          rectList.push({ x, y, wd, hue })

          position.y += wd
        }
        wd = numB - (position.y - h)
      }
    }
  }

  const displayLine = () => {
    drawBlock(p5, () => {
      p5.stroke(0, 0, 80)
      p5.line(0, textPosition.y, p5.width, textPosition.y)
      p5.line(textPosition.x, 0, textPosition.x, p5.height)
    })
  }

  p5.draw = () => {
    if (frameCount < oneLoop) {
      // 描画
      if (frameCount % oneFrame === 0) {
        drawBlock(p5, () => {
          p5.background(200, 10, 100)
          displayLine()

          displayTextListItem(0)

          // 四角を描画
          drawBlock(p5, () => {
            for (let i = 0; i <= index; i++) {
              p5.fill(rectList[i].hue, 50, 100, 0.2)
              p5.strokeWeight(2)
              p5.rect(
                rectList[i].x,
                rectList[i].y,
                rectList[i].wd,
                rectList[i].wd,
              )
            }
          })

          drawBlock(p5, () => {
            p5.textSize(textSize)
            p5.textAlign(p5.CENTER, p5.TOP)

            p5.text(x0, w + rectWidth / 2, h - textSize - 20)
            p5.text(x1, w - textSize - 20, h + rectHeight / 2 - textSize / 2)

            p5.noFill()
            p5.strokeWeight(2)
            p5.rect(w, h, rectWidth, rectHeight)
          })

          // マスを描画
          drawBlock(p5, () => {
            p5.stroke(0, 0, 0, 0.1)
            p5.textSize(10)
            p5.textAlign(p5.CENTER, p5.TOP)

            const oneWidth = rectWidth / x0
            const oneHeight = rectHeight / x1
            for (let i = 0; i <= x0; i++) {
              drawBlock(p5, () => {
                if (i % 5 === 0) {
                  p5.strokeWeight(1.5)
                  p5.fill(0, 0.2)
                  p5.text(i, w + i * oneWidth, h - 12)
                } else {
                  p5.strokeWeight(0.5)
                }
                p5.line(w + i * oneWidth, h, w + i * oneWidth, h + rectHeight)
              })
            }
            for (let i = 0; i <= x1; i++) {
              drawBlock(p5, () => {
                if (i % 5 === 0) {
                  p5.strokeWeight(1.5)
                  if (i !== 0) {
                    p5.fill(0, 0.2)
                    p5.text(i, w - 12, h + i * oneHeight - 6)
                  }
                } else {
                  p5.strokeWeight(0.5)
                }
                p5.line(w, h + i * oneHeight, w + rectWidth, h + i * oneHeight)
              })
            }
          })

          index += 1
        })
      }
    } else {
      displayTextListItem(1)
      frameCount = 0
      index = 0
      p5.noLoop()
    }

    frameCount += 1
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
