import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

/*
あみだくじ
- 余白: 上下左右 100px
*/

const calcPoint = (xPos: number, kuji: Array<Array<boolean>>): number => {
  for (let y = 0; y < kuji.length; y++) {
    /*
     * 現在のポイントがtrueだったら左右に行けるかを確認
     *   x <- ↓ -> o
     * ... x, o, o, x,
     */
    if (kuji[y][xPos]) {
      if (kuji[y][xPos + 1]) {
        // 右に行けるか確認
        xPos += 1 // 右に移動
      } else {
        // 左に行けるか確認（右に行けなければ必然的に左となる）
        xPos -= 1 // 左に移動
      }
    }
  }
  return xPos // 最終的なx座標を返却
}

const sketch: Sketch = (p5) => {
  const xNum: number = 5
  const yNum: number = 8
  const size: Vector = p5.createVector(xNum + 2, yNum * 2 + (2 + 1))
  const start: number = 3
  const goal: number = 3
  const kuji: Array<Array<boolean>> = []
  let displayKuji: Array<Array<boolean>> = []
  const yArray: Array<number> = '2 1 4 2 3 1 3 2'
    .split(' ')
    .map((item) => parseInt(item))

  let count: number = 0
  let result: string = 'NG'

  let isFinished: boolean = false

  // 最大の幅・高さ
  let maxWidth: number
  let maxHeight: number

  let addedLine: { x: number; y: number } | undefined = undefined

  let last: Vector = p5.createVector(-1, -1)

  const displayAmida = () => {
    // 縦線
    p5.push()
    p5.strokeWeight(4)
    for (let x = 0; x < xNum; x++) {
      const xPos: number = 100 + x * (maxWidth / (xNum - 1))
      p5.line(xPos, 100, xPos, maxHeight + 100)
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
      const yPos: number = 100 + y * (maxHeight / (size.y - 1))
      p5.line(xPos1, yPos, xPos2, yPos)
    }
    p5.pop()
    // 横線

    p5.push()
    p5.textSize(24)
    p5.text(
      `結果: ${last.x === -1 ? result : `${last.x} ${last.y}`}`,
      90,
      100 + maxHeight + 45,
    )
    p5.text(`カウント: ${count}`, 90, 100 + maxHeight + 75)
    p5.pop()
    count += 1
  }

  const displayResult = (k: Array<Array<boolean>>) => {
    const amidaWidth: number = maxWidth / (xNum - 1)
    const amidaHeight: number = maxHeight / (size.y - 1)
    let xPos: number = start

    // 結果表示
    p5.push()
    p5.strokeWeight(4)
    p5.stroke(130, 100, 100)
    p5.noFill()
    p5.beginShape()
    for (let y = 0; y < k.length; y++) {
      const yPos: number = 100 + y * amidaHeight

      p5.vertex(100 + (xPos - 1) * amidaWidth, yPos)
      if (k[y][xPos]) {
        if (k[y][xPos + 1]) {
          // 右に行けるか確認
          xPos += 1 // 右に移動
        } else {
          // 左に行けるか確認（右に行けなければ必然的に左となる）
          xPos -= 1 // 左に移動
        }
      }
      p5.vertex(100 + (xPos - 1) * amidaWidth, yPos)
    }
    p5.endShape()
    p5.pop()
  }

  const displayAddedLine = (x: number, y: number) => {
    p5.push()
    p5.strokeWeight(8)
    p5.stroke(0, 100, 100)
    const rowNum: number = x
    const xPos1: number = 100 + rowNum * (maxWidth / (xNum - 1))
    const xPos2: number = 100 + (rowNum + 1) * (maxWidth / (xNum - 1))
    const yPos: number = 100 + y * (maxHeight / (size.y - 1))
    p5.line(xPos1, yPos, xPos2, yPos)
    p5.pop()
  }

  // ----------------------------------------

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)
    p5.frameRate(8)

    maxWidth = p5.width - 200
    maxHeight = p5.height - 200

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
  }

  p5.draw = () => {
    // 判定
    // 初期状態のあみだくじで計算
    if (p5.frameCount === 1) {
      const xPos: number = calcPoint(start, kuji)
      if (xPos == goal) {
        result = 'OK'
        isFinished = true
        displayKuji = kuji
      }
    }

    if (!isFinished) {
      const y = p5.floor(p5.frameCount / (size.x - 2)) // 現在の行を計算
      if (y % 2 == 0) {
        return
      }
      const x = (p5.frameCount % (size.x - 2)) + 1 // 現在の列を計算

      if (y < size.y - 1 && x < size.x - 2) {
        kuji[y][x] = true
        kuji[y][x + 1] = true
        addedLine = { x: x - 1, y }

        displayKuji = kuji
          .copyWithin(0, 0, kuji.length)
          .map((item) => item.slice(0))

        // 現在位置を計算
        const xPos = calcPoint(start, kuji)

        if (xPos == goal) {
          last = p5.createVector(x, p5.floor(y / 2))
          console.log('last: ', last)
          result = 'OK'
          isFinished = true
        } else {
          // 追加した横線を元に戻す
          kuji[y][x] = false
          kuji[y][x + 1] = false
        }
      }

      if (y > size.y - 1) {
        isFinished = true
      }
    }

    // 描画
    p5.background(180, 20, 100)
    displayAmida()

    if (addedLine) {
      displayAddedLine(addedLine.x, addedLine.y)
    }

    if (displayKuji.length) {
      displayResult(displayKuji)
    }

    if (isFinished) {
      p5.noLoop()
    }
    // 判定
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
