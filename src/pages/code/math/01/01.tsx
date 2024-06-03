import { calcEuclideanGCD } from '@/lib/math.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import type { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let oneLoop: number
  const oneFrame = 60
  let frameCount = 0
  let index = 0
  let textSize: number
  let textPosition: Vector
  let textList: string[]
  let progressMessagesLength: number

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    const x0 = p5.floor(p5.random(1, 100))
    const x1 = p5.floor(p5.random(1, 100))

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
  }

  const displayTextListItem = (index: number) => {
    p5.text(
      textList[index],
      textPosition.x,
      textPosition.y + index * (textSize + 10),
    )
  }

  p5.draw = () => {
    if (frameCount < oneLoop) {
      // 描画
      if (frameCount % oneFrame === 0) {
        if (index === 0) {
          console.log('loop start')
        }

        console.log('index', index)

        p5.push()
        p5.textSize(textSize)
        p5.textAlign(p5.LEFT, p5.TOP)

        if (index === 0) {
          // 初回のみ背景・ラインを描画
          p5.push()
          p5.background(0, 10, 100)
          p5.stroke(0, 0, 80)
          p5.line(0, textPosition.y, p5.width, textPosition.y)
          p5.line(textPosition.x, 0, textPosition.x, p5.height)
          p5.pop()

          for (let i = 0; i < 4; i++) {
            displayTextListItem(i)
          }
          index += 4
        } else if (index === 4 + progressMessagesLength) {
          for (let i = index; i < index + 3; i++) {
            displayTextListItem(i)
          }
          index += 3
        } else {
          displayTextListItem(index)
          index += 1
        }
        p5.pop()
      }
    } else {
      frameCount = 0
      index = 0
      p5.noLoop()
      console.log('loop end')
    }

    frameCount += 1
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
