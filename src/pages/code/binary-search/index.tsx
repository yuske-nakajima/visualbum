import { drawBlock } from '@/lib/functions.ts'
import { HSB } from '@/lib/types.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

type ResultType = 'high' | 'mid' | 'low'
type valueType =
  | 'value'
  | 'search'
  | 'ground'
  | 'index'
  | 'searchText'
  | 'background'
type ColorType = ResultType | valueType

const HueMap: Record<ColorType, HSB> = {
  value: { h: 0, s: 40, b: 100 },
  search: { h: 0, s: 0, b: 20 },
  high: { h: 40, s: 90, b: 95 },
  low: { h: 210, s: 100, b: 100 },
  mid: { h: 310, s: 100, b: 100 },
  ground: { h: 0, s: 0, b: 20 },
  index: { h: 0, s: 0, b: 100 },
  searchText: { h: 0, s: 0, b: 0 },
  background: { h: 200, s: 10, b: 100 },
}

type Result = {
  high: number
  mid: number
  low: number
  n: number
}

const binarySearch = (array: number[], searchValue: number): Result[] => {
  const result: Result[] = []

  let hi = array.length - 1
  let lo = 0
  let mid = 0

  let num = 0
  result.push({ high: hi, mid: Math.floor((lo + hi) / 2), low: lo, n: num })
  while (lo < hi) {
    mid = Math.floor((hi + lo) / 2)
    result.push({ high: hi, mid, low: lo, n: num })
    num += 1

    if (array[mid] >= searchValue) {
      hi = mid
    } else {
      lo = mid + 1
    }
  }
  result.push({ high: hi, mid: hi, low: lo, n: num })

  return result
}

const sketch: Sketch = (p5) => {
  let ground: Vector
  let arraySize: number
  let gridSize: number
  let margin: number

  let searchValue: number

  let index = 0
  let result: Result[]
  let indexTextSize: number
  let resultTextSize: number

  let isStop = true

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    gridSize = p5.height / 32

    ground = p5.createVector(0, (p5.height / 8) * 7)
    arraySize = p5.min(p5.floor((p5.width / gridSize) * 0.75), 20)
    margin = p5.floor((p5.width / gridSize - arraySize) / 2)

    searchValue = p5.floor(p5.random(1, arraySize + 1))

    const array = []
    for (let i = 1; i <= arraySize; i++) {
      array.push(i)
    }
    result = binarySearch(array, searchValue)

    indexTextSize = gridSize / 2
    resultTextSize = gridSize / 1.75
  }

  const drawGround = () => {
    drawBlock(p5, () => {
      p5.noStroke()
      p5.fill(HueMap.ground.h, HueMap.ground.s, HueMap.ground.b)
      p5.rect(ground.x, ground.y, p5.width, ground.y)
    })
    for (let i = 1; i <= arraySize; i++) {
      // index を描画
      drawBlock(p5, () => {
        if (
          result[index % result.length].low <= i - 1 &&
          i - 1 <= result[index % result.length].high
        ) {
          p5.fill(HueMap.index.h, HueMap.index.s, HueMap.index.b)
        } else {
          p5.fill(HueMap.index.h, HueMap.index.s, 30)
        }
        p5.textSize(indexTextSize)
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.text(
          i,
          (i + margin) * gridSize + gridSize / 2,
          ground.y + gridSize - gridSize / 2,
        )
      })
    }
  }

  const drawGrid = () => {
    const weight = 1
    drawBlock(p5, () => {
      p5.stroke(0, 0, 80, 0.5)
      for (let i = 0; i < p5.width; i += gridSize) {
        drawBlock(p5, () => {
          p5.strokeWeight(weight)
          p5.line(i, 0, i, p5.height)
        })
      }
      for (let i = 0; i < p5.height; i += gridSize) {
        drawBlock(p5, () => {
          p5.strokeWeight(weight)
          p5.line(0, i, p5.width, i)
        })
      }
    })
  }

  const drawBar = () => {
    for (let i = 1; i <= arraySize; i++) {
      drawBlock(p5, () => {
        p5.strokeWeight(2)
        p5.stroke(0, 0, 0, 0.1)
        if (
          result[index % result.length].low <= i - 1 &&
          i - 1 <= result[index % result.length].high
        ) {
          p5.fill(HueMap.value.h, HueMap.value.s, HueMap.value.b)
        } else {
          p5.noStroke()
          p5.fill(HueMap.value.h, 100, 100, 0.05)
        }
        p5.rect(
          (i + margin) * gridSize,
          ground.y - i * gridSize,
          gridSize,
          i * gridSize,
        )
      })
    }
  }

  const drawSearchValue = () => {
    // 検索値を描画
    drawBlock(p5, () => {
      p5.noStroke()
      p5.fill(HueMap.search.h, HueMap.search.s, HueMap.search.b)
      p5.rect(
        0,
        ground.y - searchValue * gridSize + gridSize / 3,
        p5.width,
        gridSize / 3,
      )
      drawBlock(p5, () => {
        p5.textSize(indexTextSize)
        p5.fill(HueMap.searchText.h, HueMap.searchText.s, HueMap.searchText.b)
        p5.textAlign(p5.LEFT, p5.TOP)
        p5.text(
          `${searchValue} 以上を検索`,
          10,
          ground.y - searchValue * gridSize - indexTextSize,
        )
      })
    })
  }

  const drawHiLo = (type: ResultType, indexValue: number) => {
    drawBlock(p5, () => {
      p5.noStroke()
      p5.fill(HueMap[type].h, HueMap[type].s, HueMap[type].b, 0.7)
      let xPos: number = 0
      if (type === 'high') {
        xPos = (gridSize / 3) * 2
      } else if (type === 'mid') {
        xPos = gridSize / 3
      }
      p5.rect(
        (indexValue + 1 + margin) * gridSize + xPos,
        0,
        gridSize / 3,
        p5.height,
      )
      // テキストを描画
      drawBlock(p5, () => {
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.fill(HueMap[type].h, HueMap[type].s, HueMap[type].b)
        p5.textSize(resultTextSize)
        if (type === 'high') {
          drawBlock(p5, () => {
            p5.stroke(HueMap[type].h, HueMap[type].s, HueMap[type].b)
            p5.fill(0, 0, 100)
            p5.rect(
              (indexValue + 2 + margin) * gridSize,
              ground.y - 28 * gridSize,
              gridSize * 2,
            )
          })
          drawBlock(p5, () => {
            p5.fill(HueMap[type].h, HueMap[type].s, HueMap[type].b)
            p5.text(
              'high',
              (indexValue + 3 + margin) * gridSize,
              ground.y - 27 * gridSize,
            )
          })
        } else if (type === 'mid') {
          drawBlock(p5, () => {
            p5.stroke(HueMap[type].h, HueMap[type].s, HueMap[type].b)
            p5.fill(0, 0, 100)
            p5.rect(
              (indexValue + 1 + margin) * gridSize - gridSize / 2,
              ground.y - 26 * gridSize,
              gridSize * 2,
            )
          })
          drawBlock(p5, () => {
            p5.fill(HueMap[type].h, HueMap[type].s, HueMap[type].b)
            p5.text(
              'mid',
              (indexValue + 1 + margin) * gridSize + gridSize / 2,
              ground.y - 25 * gridSize,
            )
          })
        } else {
          drawBlock(p5, () => {
            p5.stroke(HueMap[type].h, HueMap[type].s, HueMap[type].b)
            p5.fill(0, 0, 100)
            p5.rect(
              (indexValue - 1 + margin) * gridSize,
              ground.y - 24 * gridSize,
              gridSize * 2,
            )
          })
          drawBlock(p5, () => {
            p5.fill(HueMap[type].h, HueMap[type].s, HueMap[type].b)
            p5.text(
              'low',
              (indexValue + margin) * gridSize,
              ground.y - 23 * gridSize,
            )
          })
        }
      })
    })
  }

  const drawNum = () => {
    // 現在の手数を表示

    drawBlock(p5, () => {
      p5.textSize(gridSize)
      p5.textAlign(p5.LEFT, p5.BOTTOM)
      p5.fill(0)
      p5.text('二分探索', gridSize, gridSize * 2)
      if (result[index % result.length].n > 0) {
        p5.text(
          `${result[index % result.length].n}回`,
          gridSize,
          gridSize * 3.5,
        )
      }
    })
  }

  const draw = (isFirstView: boolean = false) => {
    p5.background(HueMap.background.h, HueMap.background.s, HueMap.background.b)
    drawGrid()
    drawBar()
    drawSearchValue()

    const pos = index % result.length
    const { high, mid, low } = result[pos]

    if (!isFirstView) {
      drawHiLo('high', high)
      drawHiLo('low', low)

      if (index % result.length > 0) {
        drawHiLo('mid', mid)
      }
    }
    drawGround()
    drawNum()
  }

  const drawStop = () => {
    draw()
    p5.background(0, 0, 0, 0.5)
    // 再生アイコンを真ん中に描画
    drawBlock(p5, () => {
      p5.fill(0, 0, 100)
      p5.noStroke()
      p5.beginShape()
      p5.vertex(p5.width / 2 - 10, p5.height / 2 - 10)
      p5.vertex(p5.width / 2 - 10, p5.height / 2 + 10)
      p5.vertex(p5.width / 2 + 10, p5.height / 2)
      p5.endShape(p5.CLOSE)
    })
  }

  p5.mouseClicked = () => {
    isStop = !isStop
    if (!isStop) {
      p5.loop()
    }
  }

  p5.keyPressed = () => {
    if (p5.key === ' ') {
      isStop = !isStop
      if (!isStop) {
        p5.loop()
      }
    }
  }

  p5.draw = () => {
    if (isStop) {
      drawStop()
      p5.noLoop()
    }
    if (p5.frameCount % 60 === 0) {
      draw()
      index += 1
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
