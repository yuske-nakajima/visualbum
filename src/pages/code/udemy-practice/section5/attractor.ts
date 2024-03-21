import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class Attractor {
  p5: P5CanvasInstance
  private location: Vector
  private readonly mass: number

  constructor(p5: P5CanvasInstance) {
    this.p5 = p5
    this.location = p5.createVector(p5.width / 2, p5.height / 2)
    this.mass = 10
  }

  render() {
    this.p5.stroke(0)
    this.p5.fill(100, 100, 100, 1)
    this.p5.ellipse(
      this.location.x,
      this.location.y,
      this.mass * 2,
      this.mass * 2,
    )
  }
}
