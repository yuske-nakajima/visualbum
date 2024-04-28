import { Ball } from '@/lib/class/ball.ts'
import { P5CanvasInstance } from '@p5-wrapper/react'

export class CanvasBoundary {
  private readonly width: number
  private readonly height: number
  private p5: P5CanvasInstance

  constructor(p5: P5CanvasInstance, width: number, height: number) {
    this.p5 = p5
    this.width = width
    this.height = height
  }

  checkCollision(ball: Ball) {
    // ボールが境界に衝突しているかどうかを検知するロジック
    if (ball.location.x < 0 || ball.location.x > this.width) {
      ball.velocity = this.p5.createVector(
        ball.velocity.x * -1,
        ball.velocity.y,
      )
    }
    if (ball.location.y < 0 || ball.location.y > this.height) {
      ball.velocity = this.p5.createVector(
        ball.velocity.x,
        ball.velocity.y * -1,
      )
    }
  }
}
