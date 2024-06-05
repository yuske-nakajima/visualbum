import { drawBlock } from '@/lib/functions.ts'
import { calcEuclideanGCD } from '@/lib/math.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let x0: number
  let x1: number

  let oneLoop: number
  const oneFrame = 60
  let frameCount = 0
  let index = 0
  let textSize: number
  let textPosition: Vector
  let textList: string[]
  let progressMessagesLength: number

  let position: Vector
  let numA: number
  let numB: number
  let wd: number

  let w: number
  let h: number

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    x0 = p5.floor(p5.random(1, 20))
    x1 = p5.floor(p5.random(x0 + 1, 50))

    // x0 > x1 にする
    if (x1 > x0) {
      ;[x0, x1] = [x1, x0]
    }

    const { answer, lastIndex, progressMessages } = calcEuclideanGCD(x0, x1)
    progressMessagesLength = progressMessages.length

    textSize = p5.width / 40
    textPosition = p5.createVector(p5.width / 16, p5.height / 16)
    textList = [
      'ユーグリッドの互除法を行う',
      `x0 = ${x0}`,
      `x1 = ${x1}`,
      '',
      '途中経過',
      ...progressMessages,
      '計算終了',
      '',
      `x${lastIndex}の値:${answer} が最大公約数です`,
    ]

    // 描画回数
    const size = 3 + progressMessagesLength
    oneLoop = size * oneFrame

    w = p5.width / 8
    h = p5.height / 4
  }

  const displayTextListItem = (index: number) => {
    p5.text(
      textList[index],
      textPosition.x,
      textPosition.y + index * (textSize + 10),
    )
  }

  const displayRect = () => {
    position = p5.createVector(w, h)
    numA = w * 6
    numB = numA * (x1 / x0)
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
          drawBlock(p5, () => {
            p5.fill(hue, 40, 100, 0.2)
            p5.rect(position.x, position.y, wd, wd)
          })

          position.x += wd
        }
        wd = numA - (position.x - w)
      } else {
        // y方向に
        while (position.y + wd <= numB + h && wd > 0.005) {
          drawBlock(p5, () => {
            p5.fill(hue, 40, 100, 0.2)
            p5.rect(position.x, position.y, wd, wd)
          })

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
          p5.background(100, 10, 100)
          displayLine()
          p5.textSize(textSize)
          p5.textAlign(p5.LEFT, p5.TOP)

          if (index === 0) {
            for (let i = 0; i < 4; i++) {
              displayTextListItem(i)
            }
            index += 4
          } else if (index === 4 + progressMessagesLength) {
            for (let i = 0; i < index + 3; i++) {
              displayTextListItem(i)
            }
            index += 4
          } else {
            for (let i = 0; i <= index; i++) {
              displayTextListItem(i)
            }
            index += 1
          }
        })
      }
    } else {
      displayRect()
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
