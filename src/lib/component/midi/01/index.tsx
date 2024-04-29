import { Ball } from '@/lib/class/ball.ts'
import { BallMover } from '@/lib/class/ballMover.ts'
import { CanvasBoundary } from '@/lib/class/canvasBoundary.ts'
import { HSB } from '@/lib/types.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  const balls: Array<{
    ball: Ball
    ballMover: BallMover
  }> = []
  let canvasBoundary: CanvasBoundary
  const color: HSB = { h: 180, s: 20, b: 100 }

  const onMIDIMessage = (e: WebMidi.MIDIMessageEvent) => {
    const data = e.data

    // nanoKONTROL2 左から1番目のスライダー
    if (data[1] === 0) {
      color.h = p5.map(data[2], 0, 127, 0, 360)
    }

    // nanoKONTROL2 左から2番目のスライダー
    if (data[1] === 1) {
      color.s = p5.map(data[2], 0, 127, 0, 100)
    }

    // nanoKONTROL2 左から3番目のスライダー
    if (data[1] === 2) {
      color.b = p5.map(data[2], 0, 127, 0, 100)
    }
  }

  const onMIDISuccess = (midiAccess: WebMidi.MIDIAccess) => {
    console.log('MIDI ready!')
    console.log('midiAccess:', midiAccess)
    let input: WebMidi.MIDIInput
    midiAccess.inputs.forEach((item) => {
      if (item.name === 'nanoKONTROL2 SLIDER/KNOB') {
        input = item
        input.onmidimessage = onMIDIMessage
      }
    })
  }

  const onMIDIFailure = (msg: string) => {
    console.log('Failed to get MIDI access - ' + msg)
  }

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    for (let i = 0; i < 100; i++) {
      const ball = new Ball(
        p5,
        p5.createVector(p5.random(0, p5.width), p5.random(0, p5.height)),
        p5.createVector(p5.random(-3, 3), p5.random(-3, 3)),
        { h: p5.random(0, 360), s: p5.random(20, 22), b: p5.random(90, 100) },
        p5.random(50, 100),
      )
      const ballMover = new BallMover(ball)
      balls.push({ ball, ballMover })
    }

    canvasBoundary = new CanvasBoundary(p5, p5.width, p5.height)

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure)
  }

  p5.draw = () => {
    p5.background(color.h, color.s, color.b)

    for (const { ball, ballMover } of balls) {
      ballMover.move()
      canvasBoundary.checkCollision(ball)
      ball.display()
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
