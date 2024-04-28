import { Ball } from '@/lib/class/ball.ts'

export class BallMover {
  private ball: Ball

  constructor(ball: Ball) {
    this.ball = ball
  }

  move() {
    this.ball.location = this.ball.location.add(this.ball.velocity)
  }
}
