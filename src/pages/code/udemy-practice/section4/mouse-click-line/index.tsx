import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
  }

  let mousePressed = false
  let mousePressedX = 0
  let mousePressedY = 0

  p5.draw = () => {
    // console.log('mouseX:', p5.mouseX, 'mouseY:', p5.mouseY)
    p5.stroke(0)

    if (p5.mouseIsPressed) {
      if (!mousePressed) {
        mousePressedX = p5.mouseX
        mousePressedY = p5.mouseY
        console.log('mouseIsPressed', p5.mouseX, p5.mouseY)
      }
      mousePressed = true
    } else {
      mousePressed = false
    }
  }

  p5.mouseClicked = (e: MouseEvent) => {
    p5.beginShape()
    p5.vertex(mousePressedX, mousePressedY)
    p5.vertex(e.x, e.y)
    p5.endShape()
    return false
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
