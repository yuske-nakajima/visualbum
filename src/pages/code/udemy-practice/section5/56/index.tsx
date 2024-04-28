import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

const sketch: Sketch = (p5) => {
  let v1: Vector
  let v2: Vector
  let v3: Vector
  let v4: Vector
  let normal1: Vector
  let normal2: Vector

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    v1 = p5.createVector(1, 2)
    v2 = p5.createVector(3, 4)

    console.log('計算前')
    console.log('v1', JSON.stringify(v1, null, 2))
    console.log('v2', JSON.stringify(v2, null, 2))

    v2.sub(v1) // 引き算
    console.log('引き算')
    console.log('v2.sub(v1) => v2', JSON.stringify(v2, null, 2))

    v3 = v2.copy()
    v3.mult(3) // 掛け算
    console.log('掛け算')
    console.log('v3.mult(3) => v3', JSON.stringify(v3, null, 2))

    v4 = v3.copy()
    v4.div(2) // 割り算
    console.log('割り算')
    console.log('v4.div(2) => v4', JSON.stringify(v4, null, 2))

    normal1 = p5.createVector(1, 1)
    normal1.normalize() // 正規化
    console.log('正規化')
    console.log(
      'normal1.normalize() => normal1',
      JSON.stringify(normal1, null, 2),
    )

    normal2 = p5.createVector(3, 0)
    normal2.normalize() // 正規化
    console.log('正規化')
    console.log(
      'normal2.normalize() => normal2',
      JSON.stringify(normal2, null, 2),
    )
  }
  p5.draw = () => {}
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
