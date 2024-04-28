import { HSB } from '@/lib/types.ts'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class Ball {
  private readonly size: number
  get velocity(): Vector {
    return this._velocity
  }

  set velocity(value: Vector) {
    this._velocity = value
  }
  private _velocity: Vector
  get location(): Vector {
    return this._location
  }

  set location(value: Vector) {
    this._location = value
  }
  private readonly p5: P5CanvasInstance
  private readonly color: HSB
  private _location: Vector

  constructor(
    p5: P5CanvasInstance,
    location: Vector,
    velocity: Vector,
    color: HSB,
    size: number,
  ) {
    this.p5 = p5
    this._location = location
    this._velocity = velocity
    this.color = color
    this.size = size
  }

  display() {
    this.p5.push()
    this.p5.strokeWeight(10)
    this.p5.colorMode(this.p5.HSB)
    const { h, s, b } = this.color
    this.p5.stroke(h, s, b)
    this.p5.fill(h, s, b, 0.3)
    const { x, y } = this._location
    this.p5.ellipse(x, y, this.size)
    this.p5.pop()
  }
}
