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

    // x0 = p5.floor(p5.random(1, 20))
    // x1 = p5.floor(p5.random(x0 + 1, 50))
    x0 = 9
    x1 = 38

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
    let hue = p5.random(0, 360)
    const randomHue = p5.random(0, 360)

    let isFinished = false
    while (wd > 0) {
      hue = (hue + randomHue) % 360
      it += 1
      if (it % 2 === 1) {
        // x方向に
        let xIt = 0
        while (position.x + wd <= numA + w && xIt < 100) {
          p5.push()
          p5.fill(hue, 40, 100, 0.2)
          p5.rect(position.x, position.y, wd, wd)
          p5.pop()

          position.x += wd
          xIt += 1
          console.log('yIt: ', xIt)

          if (xIt > 50) {
            isFinished = true
            break
          }
        }
        wd = numA - (position.x - w)
      } else {
        // y方向に
        let yIt = 0
        while (position.y + wd <= numB + h) {
          p5.push()
          p5.fill(30, 40, 100, 0.2)
          p5.rect(position.x, position.y, wd, wd)
          p5.pop()

          position.y += wd
          yIt += 1
          console.log('yIt: ', yIt)

          if (yIt > 50) {
            isFinished = true
            break
          }
        }
        wd = numB - (position.y - h)
      }
      if (isFinished) {
        break
      }
      // console.log('描画中 while end', it, wd, position.x, position.y)
    }
  }

  p5.draw = () => {
    // p5.noLoop()
    if (frameCount < oneLoop) {
      // 描画
      if (frameCount % oneFrame === 0) {
        p5.push()
        p5.background(100, 10, 100)
        p5.textSize(textSize)
        p5.textAlign(p5.LEFT, p5.TOP)

        if (index === 0) {
          // 初回のみ背景・ラインを描画
          p5.push()
          p5.stroke(0, 0, 80)
          p5.line(0, textPosition.y, p5.width, textPosition.y)
          p5.line(textPosition.x, 0, textPosition.x, p5.height)
          p5.pop()

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

        p5.pop()
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
