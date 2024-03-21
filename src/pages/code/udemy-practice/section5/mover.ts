import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class Mover {
  get mass(): number {
    return this._mass
  }
  get location(): Vector {
    return this._location
  }

  private p5: P5CanvasInstance
  private readonly _location: Vector
  private readonly velocity: Vector
  private readonly acceleration: Vector
  private readonly _mass: number
  private readonly radius: number

  constructor(p5: P5CanvasInstance, x: number, y: number, m: number) {
    this.p5 = p5
    this._location = p5.createVector(x, y)
    this.velocity = p5.createVector(0, 0)
    this.acceleration = p5.createVector(0, 0)
    this._mass = m
    this.radius = m * 10
  }

  update() {
    this.velocity.add(this.acceleration)
    this._location.add(this.velocity)
    this.acceleration.mult(0)
  }
  render() {
    this.p5.stroke(0)
    this.p5.fill(200, 100, 100, 1)
    this.p5.ellipse(this._location.x, this._location.y, this.radius)
  }
  applyForce(force: Vector) {
    const a = force.div(this._mass)
    this.acceleration.add(a)
  }
  checkEdges() {
    if (this._location.x > this.p5.width || this._location.x < 0) {
      this.velocity.x *= -1
    }
    if (this._location.y > this.p5.width || this._location.y < 0) {
      this.velocity.y *= -1
    }
  }
}
