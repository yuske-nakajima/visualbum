import { Ball } from '@/lib/class/ball.ts'
import { BallMover } from '@/lib/class/ballMover.ts'
import { CanvasBoundary } from '@/lib/class/canvasBoundary.ts'
import { PAGE_INFO_LIST } from '@/lib/constants.ts'
import { PageInfo } from '@/lib/types.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Element } from 'p5'

const sketch: Sketch = (p5) => {
  const balls: Array<{
    ball: Ball
    ballMover: BallMover
  }> = []
  let canvasBoundary: CanvasBoundary
  const linkAreaList: Array<Element> = []
  let sortedPageInfoList: PageInfo[]

  p5.setup = () => {
    sortedPageInfoList = PAGE_INFO_LIST.sort((a: PageInfo, b: PageInfo) =>
      a.title < b.title ? -1 : 1,
    )

    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.colorMode(p5.HSB)

    for (let i = 0; i < 100; i++) {
      const ball = new Ball(
        p5,
        p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height)),
        p5.createVector(p5.random(-3, 3), p5.random(-3, 3)),
        { h: p5.random(0, 360), s: p5.random(20, 22), b: p5.random(90, 100) },
        p5.random(50, 100),
      )
      const ballMover = new BallMover(ball)
      balls.push({ ball, ballMover })
    }

    for (let i = 0; i < PAGE_INFO_LIST.length; i++) {
      const linkArea = p5.createButton('')
      linkAreaList.push(linkArea)
    }

    canvasBoundary = new CanvasBoundary(p5, p5.width, p5.height)
  }

  p5.draw = () => {
    p5.background(180, 20, 100)

    for (const { ball, ballMover } of balls) {
      ballMover.move()
      canvasBoundary.checkCollision(ball)
      ball.display()
    }

    // ぼかし
    // p5.filter(p5.BLUR, 20)

    // text
    let beforeTextX = 0
    let beforeTextWidth = 0
    const margin = 10 + 20
    const lineHeight = 40

    let row = 1

    for (let i = 0; i < sortedPageInfoList.length; i++) {
      const pageInfo = PAGE_INFO_LIST[i]
      const linkArea = linkAreaList[i]

      p5.push()
      p5.textSize(20)
      let x = margin + beforeTextX + beforeTextWidth
      if (x + p5.textWidth(pageInfo.title) > p5.width - 22) {
        x = margin
        row += 1
      }
      const y = row * lineHeight

      const linkAreaWidth = p5.textWidth(pageInfo.title) + 20

      p5.push()
      p5.fill(100)
      p5.noStroke()
      p5.rect(x - 8, y - 22, linkAreaWidth, lineHeight - 10, 10, 10, 10, 10)
      p5.pop()

      p5.text(pageInfo.title, x, y)
      beforeTextWidth = p5.textWidth(pageInfo.title)
      beforeTextX = x

      linkArea.position(x, y - 14)
      linkArea.size(linkAreaWidth, 30)
      linkArea.style('background-color', 'transparent')
      linkArea.style('border', 'none')
      linkArea.mousePressed(() => window.open(pageInfo.href))

      p5.pop()
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
