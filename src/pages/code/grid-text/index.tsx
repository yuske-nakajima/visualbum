import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'
let isRandom = true

const sketch: Sketch = (p5) => {
  p5.preload = () => {}

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    p5.textAlign()
  }

  p5.draw = () => {
    if (p5.frameCount % 45 !== 0) return
    isRandom = !isRandom

    p5.background(0)

    // Set the gap between letters and the left and top margin
    const fontsize = isRandom ? 16 : 44
    p5.textSize(fontsize)

    let gap = isRandom ? p5.random(28, 32) : 70
    let margin = isRandom ? p5.random(4, 8) : 20
    p5.translate(margin * 2, margin * 2)

    let isColorDisplay = true
    let count = Math.floor(p5.random(0, 100))
    const letters = 'HUNTER HUNTER HUNTER '.split('')
    const colors = [
      [200, 200, p5.random(200, 255)],
      [200, p5.random(200, 255), 200],
      [p5.random(200, 255), 200, 200],
    ]
    for (let y = 0; y < p5.height - gap; y += gap) {
      for (let x = 0; x < p5.width - gap; x += gap) {
        let letter: string
        if (isRandom) {
          letter = p5.char(p5.random(65, 122))
        } else {
          letter = letters[count % letters.length]
        }

        if (isRandom) {
          p5.fill(100)
        } else {
          const colorCount = Math.floor(count / letters.length)
          if (isColorDisplay && colorCount % 10 === 0) {
            if (count % letters.length > 13) {
              p5.fill(colors[0][0], colors[0][1], colors[0][2])
            } else if (count % letters.length > 5) {
              p5.fill(colors[1][0], colors[1][1], colors[1][2])
            } else {
              p5.fill(colors[2][0], colors[2][1], colors[2][2])
            }
            if (count % letters.length > 19) {
              isColorDisplay = !isColorDisplay
            }
          } else {
            p5.fill(50)
          }
        }

        p5.text(letter, x, y)
        count += 1
      }
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
