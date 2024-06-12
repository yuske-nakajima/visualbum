import { Ball, HSB, KANJI, Point } from '@/lib/types'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { P5CanvasInstance, type Sketch } from '@p5-wrapper/react'
import { Bodies, Body, Engine, Runner, World } from 'matter-js'

// 厚みという変数
const thickness = 200
// const sizes = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]

// const removeBodies = (predicate: (b: Matter.Body) => boolean) => {
//   //remove from world and mark dead in our proxies
//   for (const ball of balls) {
//     if (predicate(ball.body)) {
//       ball.dead = true;
//       Composite.remove(engine.world, ball.body);
//     }
//   }
//   balls = balls.filter(function(p: IBall) {
//     return !p.dead;
//   });
// }

const drawBall = (p5: P5CanvasInstance, ball: Ball) => {
  p5.push()
  p5.fill(p5.color(ball.hue, 40, 100))
  p5.noStroke()
  p5.push()
  p5.translate(ball.body.position.x, ball.body.position.y)
  p5.rotate(ball.body.angle)
  p5.textSize(ball.diameter / 2)
  p5.textAlign(p5.CENTER, p5.CENTER)
  p5.text(ball.txt, 0, 0)
  p5.pop()
}
const createBall = (
  p5: P5CanvasInstance,
  e: Engine,
  pos: Point,
  radius: number,
): Ball => {
  const numSides = p5.random(8, 8)
  const body: Matter.Body = Bodies.polygon(pos.x, pos.y, numSides, radius, {
    restitution: p5.random(0, 1),
  })

  World.add(e.world, body)
  Body.setAngle(body, p5.random(0, p5.TWO_PI))
  Body.setVelocity(body, { x: p5.random(-1, 1), y: p5.random(-1, 1) })
  Body.setAngularVelocity(body, p5.random(-0.1, 0.1))

  const ball = {
    body: body,
    diameter: radius * 2,
    // txt: p5.random(ANNABEL_TEXT.split('')),
    txt: p5.random(KANJI.split('')),
    // txt: p5.random('さくら'.split('')),
    hue: p5.random(0, 360),
    // hue: 0,
    dead: false,
  }

  return ball
}

const isOffScreen = (p5: P5CanvasInstance, b: Body): boolean => {
  const x = b.position.x
  const y = b.position.y

  function isWithin(v: number, min: number, max: number) {
    return v >= min && v <= max
  }

  return !(isWithin(x, -1, p5.width + 1) && isWithin(y, -1, p5.height + 1))
}

const drawShape = (
  p5: P5CanvasInstance,
  bd: Body,
  color: HSB,
  alfa?: number,
) => {
  const vertices = bd.vertices

  p5.push()
  p5.fill(color.h, color.s, color.b, alfa ?? 100)
  p5.noStroke()

  p5.beginShape()
  for (let i = 0; i < vertices.length; i++) {
    p5.vertex(vertices[i].x, vertices[i].y)
  }
  p5.endShape()
  p5.pop()
}

const sketch: Sketch = (p5) => {
  let engine: Engine
  let groundList: Body[] = []
  let balls: Ball[] = []

  p5.setup = () => {
    // p5.frameRate(30)
    p5.createCanvas(p5.windowWidth, p5.windowHeight)
    engine = Engine.create()
    p5.colorMode(p5.HSB, 360, 100, 100)

    // 壁
    groundList = [
      // Bodies.rectangle(4, 0, thickness, p5.height * 2, { isStatic: true }),
      // Bodies.rectangle(p5.width - 6, 0, thickness, p5.height * 2, {
      //   isStatic: true,
      // }),
      Bodies.rectangle(p5.width / 2 / 2, p5.height, thickness, p5.height / 2, {
        isStatic: true,
      }),
      Bodies.rectangle(
        p5.width - p5.width / 2 / 2,
        p5.height,
        thickness,
        p5.height / 2,
        { isStatic: true },
      ),
      // Bodies.rectangle(p5.width - 200, p5.height, thickness, p5.height, { isStatic: true }),
      // Bodies.rectangle(0, 4, p5.width * 2, thickness, {
      //   isStatic: true,
      // }),
      Bodies.rectangle(
        p5.width - p5.width / 2,
        p5.height - 6,
        p5.width / 2,
        thickness,
        {
          isStatic: true,
        },
      ),
      // Bodies.rectangle(0, p5.height - 6, p5.width * 2, thickness, {
      //   isStatic: true,
      // }),
    ]

    World.add(engine.world, groundList)
    Runner.run(engine)
  }

  p5.draw = () => {
    p5.background('#444')

    for (const ball of balls) {
      drawShape(p5, ball.body, { h: ball.hue, s: 100, b: 100 }, 0.1)
      drawBall(p5, ball)
    }

    for (const ball of balls) {
      if (isOffScreen(p5, ball.body)) {
        World.remove(engine.world, ball.body)
        balls = balls.filter((b) => b !== ball)
      }
    }

    for (const ground of groundList) {
      drawShape(p5, ground, { h: 0, s: 0, b: 100 })
    }

    // balls.push(createBall(p5, engine, {x: p5.width / 2, y: 10}, p5.random(36, 36)))
    if (balls.length > 300) {
      if (p5.frameCount % 48 === 0) {
        balls.push(
          createBall(
            p5,
            engine,
            { x: p5.random(p5.width), y: 10 },
            p5.random(20, 30),
          ),
        )
      }
    } else if (balls.length > 200) {
      if (p5.frameCount % 24 === 0) {
        balls.push(
          createBall(
            p5,
            engine,
            { x: p5.random(p5.width), y: 10 },
            p5.random(20, 30),
          ),
        )
      }
    } else if (balls.length > 100) {
      if (p5.frameCount % 12 === 0) {
        balls.push(
          createBall(
            p5,
            engine,
            { x: p5.random(p5.width), y: 10 },
            p5.random(20, 30),
          ),
        )
      }
    } else {
      if (p5.frameCount % 6 === 0) {
        balls.push(
          createBall(
            p5,
            engine,
            { x: p5.random(p5.width), y: 10 },
            p5.random(20, 30),
          ),
        )
      }
    }
    console.log(balls.length)
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
