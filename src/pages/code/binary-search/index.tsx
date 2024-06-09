import { drawBlock } from '@/lib/functions.ts'
import { HSB } from '@/lib/types.ts'
import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { Sketch } from '@p5-wrapper/react'
import { Vector } from 'p5'

type ResultType = 'hi' | 'mid' | 'lo'
type valueType =
  | 'value'
  | 'search'
  | 'ground'
  | 'index'
  | 'searchText'
  | 'background'
type ColorType = ResultType | valueType

const HueMap: Record<ColorType, HSB> = {
  value: { h: 0, s: 60, b: 100 },
  search: { h: 0, s: 0, b: 20 },
  hi: { h: 30, s: 80, b: 95 },
  lo: { h: 210, s: 100, b: 100 },
  mid: { h: 310, s: 100, b: 100 },
  ground: { h: 0, s: 0, b: 20 },
  index: { h: 0, s: 0, b: 100 },
  searchText: { h: 0, s: 0, b: 0 },
  background: { h: 200, s: 10, b: 100 },
}

type Result = {
  hi: number
  mid: number
  lo: number
  n: number
}

const binarySearch = (array: number[], searchValue: number): Result[] => {
  const result: Result[] = []

  let hi = array.length - 1
  let lo = 0
  let mid = 0

  let num = 0
  result.push({ hi, mid: Math.floor((lo + hi) / 2), lo, n: num })
  while (lo < hi) {
    mid = Math.floor((hi + lo) / 2)
    result.push({ hi, mid, lo, n: num })
    num += 1

    if (array[mid] >= searchValue) {
      hi = mid
    } else {
      lo = mid + 1
    }

    // result.push({ hi, mid, lo, n: num })
  }
  result.push({ hi, mid: hi, lo, n: num })
  console.log(`${num}回目で完了`)

  return result
}

const sketch: Sketch = (p5) => {
  let ground: Vector
  // const array: number[] = []
  let arraySize: number
  let gridSize: number
  let margin: number

  let searchValue: number

  let index = 0
  let result: Result[] = []
  let indexTextSize: number
  let resultTextSize: number

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)

    gridSize = p5.height / 32

    ground = p5.createVector(0, (p5.height / 8) * 7)
    arraySize = p5.min(p5.floor((p5.width / gridSize) * 0.75), 20)
    // margin = p5.floor(((p5.width / gridSize) * 0.25) / 2)
    margin = p5.floor((p5.width / gridSize - arraySize) / 2)

    searchValue = p5.floor(p5.random(1, arraySize + 1))
    // searchValue = 20

    const array = []
    for (let i = 1; i <= arraySize; i++) {
      array.push(i)
    }
    result = binarySearch(array, searchValue)

    indexTextSize = gridSize / 2
    resultTextSize = gridSize
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
          result[index % result.length].lo <= i - 1 &&
          i - 1 <= result[index % result.length].hi
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
        if (
          result[index % result.length].lo <= i - 1 &&
          i - 1 <= result[index % result.length].hi
        ) {
          p5.fill(HueMap.value.h, HueMap.value.s, HueMap.value.b)
        } else {
          p5.stroke(0, 0, 0, 0.1)
          p5.fill(HueMap.value.h, 20, 100)
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
          0,
          ground.y - searchValue * gridSize - indexTextSize,
        )
      })
    })
  }

  const drawHiLo = (type: ResultType, indexValue: number) => {
    drawBlock(p5, () => {
      p5.fill(HueMap[type].h, HueMap[type].s, HueMap[type].b)
      let xPos: number = 0
      if (type === 'hi') {
        xPos = (gridSize / 3) * 2
      } else if (type === 'mid') {
        xPos = gridSize / 3
      }
      p5.rect(
        (indexValue + 1 + margin) * gridSize + xPos,
        ground.y - 22 * gridSize,
        gridSize / 3,
        22 * gridSize,
      )
      // テキストを描画
      drawBlock(p5, () => {
        p5.textAlign(p5.CENTER, p5.CENTER)
        p5.fill(HueMap[type].h, HueMap[type].s, HueMap[type].b)
        p5.textSize(resultTextSize)
        if (type === 'hi') {
          p5.text(
            'hi',
            (indexValue + 3 + margin) * gridSize,
            ground.y - 22 * gridSize,
          )
        } else if (type === 'mid') {
          p5.text(
            'mid',
            (indexValue + 1 + margin) * gridSize + gridSize / 2,
            ground.y - 22 * gridSize - resultTextSize,
          )
        } else {
          p5.text(
            'lo',
            (indexValue + margin) * gridSize,
            ground.y - 22 * gridSize,
          )
        }
      })
    })
  }

  const drawNum = () => {
    // 現在の手数を表示

    drawBlock(p5, () => {
      p5.textSize(resultTextSize)
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

  const draw = () => {
    p5.background(HueMap.background.h, HueMap.background.s, HueMap.background.b)
    drawGrid()
    drawBar()

    const pos = index % result.length
    const { hi, mid, lo } = result[pos]
    drawHiLo('mid', mid)
    drawHiLo('hi', hi)
    drawHiLo('lo', lo)

    drawGround()
    drawSearchValue()
    drawNum()
  }

  p5.draw = () => {
    if (p5.frameCount === 1 || p5.frameCount % 60 === 0) {
      draw()
      index += 1
    }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
