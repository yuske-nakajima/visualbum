import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class Mover {
  private p5: P5CanvasInstance
  private location: Vector
  private readonly velocity: Vector
  private readonly acceleration: Vector
  private readonly mass: number
  private readonly radius: number

  constructor(p5: P5CanvasInstance, x: number, y: number, m: number) {
    this.p5 = p5
    this.location = p5.createVector(x, y)
    this.velocity = p5.createVector(0, 0)
    this.acceleration = p5.createVector(0, 0)
    this.mass = m
    this.radius = m * 10
  }

  update() {
    this.velocity.add(this.acceleration)
    this.location.add(this.velocity)
    this.acceleration.mult(0)
  }
  render() {
    this.p5.stroke(0)
    this.p5.fill(200, 100, 100, 1)
    this.p5.ellipse(this.location.x, this.location.y, this.radius)
  }
  applyForce(force: Vector) {
    const a = force.div(this.mass)
    this.acceleration.add(a)
  }
  checkEdges() {
    if (this.location.x > this.p5.width || this.location.x < 0) {
      this.velocity.x *= -1
    }
    if (this.location.y > this.p5.width || this.location.y < 0) {
      this.velocity.y *= -1
    }
  }
}
