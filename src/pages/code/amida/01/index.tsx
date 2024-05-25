import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

/*
あみだくじ
- 余白: 上下左右 100px
*/

const sketch: Sketch = (p5) => {
  const xNum: number = 14
  const yNum: number = 10
  const size: Vector = p5.createVector(xNum + 2, yNum * 2 + (2 + 1))
  const start: number = 5
  const goal: number = 5
  const kuji: Array<Array<boolean>> = []
  const yArray: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  // 最大の幅・高さ
  let maxWidth: number
  let maxheight: number

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    maxWidth = p5.width - 200
    maxheight = p5.height - 200

    // あみだくじ初期化
    for (let y = 0; y < size.y; y++) {
      kuji.push([])
      for (let x = 0; x < size.x; x++) {
        kuji[y].push(false)
      }
    }
    for (let y = 2; y < size.y - 1; y += 2) {
      const insertRow: number = yArray[p5.floor(y / 2) - 1]
      kuji[y][insertRow] = true
      kuji[y][insertRow + 1] = true
    }

    // デバッグ用
    // for (const row of kuji) {
    //   console.log(row.map((item) => (item ? '■' : '□')).join(' '))
    // }
    // console.log(`maxWidth: ${maxWidth}, xNum: ${xNum}, ${maxWidth / (xNum - 1)}`)
    // デバッグ用

    p5.background(180, 20, 100)

    // 縦線
    p5.push()
    p5.strokeWeight(4)
    for (let x = 0; x < xNum; x++) {
      const xPos: number = 100 + x * (maxWidth / (xNum - 1))
      p5.line(xPos, 100, xPos, maxheight + 100)
    }
    p5.pop()
    // 縦線

    // 横線
    p5.push()
    p5.strokeWeight(4)
    for (let y = 2; y < size.y - 1; y += 2) {
      const rowNum: number = yArray[p5.floor(y / 2) - 1] - 1
      const xPos1: number = 100 + rowNum * (maxWidth / (xNum - 1))
      const xPos2: number = 100 + (rowNum + 1) * (maxWidth / (xNum - 1))
      const yPos: number = 100 + y * (maxheight / (size.y - 1))
      p5.line(xPos1, yPos, xPos2, yPos)
    }
    p5.pop()
    // 横線
  }

  p5.draw = () => {
    // p5.background(180, 20, 100)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
