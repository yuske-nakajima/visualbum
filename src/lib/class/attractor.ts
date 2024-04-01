import { Mover } from '@/lib/class/mover'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class Attractor {
  p5: P5CanvasInstance
  private readonly location: Vector
  private readonly mass: number

  constructor(p5: P5CanvasInstance) {
    this.p5 = p5
    this.location = p5.createVector(p5.width / 2, p5.height / 2)
    this.mass = 10
  }

  attract(mover: Mover) {
    const attraction = Vector.sub(this.location, mover.location)
    let distance = attraction.mag()

    distance = this.p5.constrain(distance, 5, 30)
    attraction.normalize()

    const power = (this.mass * mover.mass) / (distance * distance)
    attraction.mult(power)

    return attraction
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
