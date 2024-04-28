import { Ball } from '@/lib/class/ball.ts'

export class BallMover {
  private ball: Ball
  private otherBalls: Ball[] // 他の Ball への参照を保持

  constructor(ball: Ball, otherBalls: Ball[]) {
    this.ball = ball
    this.otherBalls = otherBalls
  }

  move() {
    this.ball.location.add(this.ball.velocity)

    // 衝突チェック
    for (const otherBall of this.otherBalls) {
      if (this.ball !== otherBall && this.isColliding(otherBall)) {
        this.handleCollision(otherBall)
      }
    }
  }

  private isColliding(otherBall: Ball) {
    const distance = this.ball.location.dist(otherBall.location)
    const combinedRadius = this.ball.size / 2 + otherBall.size / 2
    return distance <= combinedRadius
  }

  private handleCollision(otherBall: Ball) {
    // 簡単のため、velocity を反転させる
    this.ball.velocity.mult(-1)
    otherBall.velocity.mult(-1)
  }
}
