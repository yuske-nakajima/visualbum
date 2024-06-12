import { Point } from '@/lib/types'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  // 定数系
  const moveList: Point[] = [
    { x: 0, y: -1 }, // 上
    { x: 1, y: 0 }, // 右
    { x: 0, y: 1 }, // 下
    { x: -1, y: 0 }, // 左
  ]
  // 定数系

  let moveIndex = 0

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.background(255)
    p5.noStroke()
  }

  const width = 5
  const W = Math.floor(p5.windowWidth / width)
  const H = Math.floor(p5.windowHeight / width)
  console.log('W', W, W * 10)
  console.log('H', H)

  const nowPoint: Point = { x: Math.floor(W / 2), y: Math.floor(H / 2) }
  // const nowPoint: Point = { x: 0, y: 0 }

  const square: boolean[][] = []
  // true: 白, false: 黒
  for (let i = 0; i < H; i++) {
    square.push([])
    for (let j = 0; j < W; j++) {
      square[i].push(true)
    }
  }

  let notFirst = false
  const move = () => {
    const movePoint = moveList[(moveIndex + moveList.length) % moveList.length]
    // 移動
    if (notFirst) {
      nowPoint.x = (W + nowPoint.x + movePoint.x) % W
      nowPoint.y = (H + nowPoint.y + movePoint.y) % H
    }
    notFirst = true

    // 方向転換
    moveIndex += square[nowPoint.y][nowPoint.x] ? 1 : moveList.length - 1

    // 色反転
    square[nowPoint.y][nowPoint.x] = !square[nowPoint.y][nowPoint.x]
  }

  const moveDraw = () => {
    // 盤面
    for (let Hi = 0; Hi < H; Hi++) {
      for (let Wi = 0; Wi < W; Wi++) {
        p5.fill(square[Hi][Wi] ? 255 : 0)
        p5.rect(Wi * width, Hi * width, width)
      }
    }
  }

  p5.draw = () => {
    for (let i = 0; i < 100; i++) {
      move()
    }
    if (p5.frameCount % 10 !== 0) {
      return
    }
    moveDraw()
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
