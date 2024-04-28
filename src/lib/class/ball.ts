import { HSB } from '@/lib/types.ts'
import { P5CanvasInstance } from '@p5-wrapper/react'
import { Vector } from 'p5'

export class Ball {
  get size(): number {
    return this._size
  }
  private readonly _size: number
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

  private readonly p5: P5CanvasInstance
  private readonly color: HSB
  private readonly _location: Vector

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
    this._size = size
  }

  display() {
    this.p5.push()
    this.p5.noStroke()
    this.p5.colorMode(this.p5.HSB)
    const { h, s, b } = this.color
    this.p5.fill(h, s, b)
    const { x, y } = this._location
    this.p5.ellipse(x, y, this._size)
    this.p5.pop()
  }
}
