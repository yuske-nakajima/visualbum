import { NextReactP5Wrapper } from '@p5-wrapper/next'
import { type Sketch } from '@p5-wrapper/react'

const sketch: Sketch = (p5) => {
  // const linkList: { text: string; link: string }[] = [
  //   { text: 'hello', link: 'code/hello' },
  //   { text: 'ant', link: 'code/ant' },
  //   { text: 'box', link: 'code/box' },
  //   { text: 'circle-ball', link: 'code/circle-ball' },
  //   { text: 'circle-line', link: 'code/circle-line' },
  //   { text: 'fall-kanji', link: 'code/fall-kanji' },
  //   { text: 'grid-text', link: 'code/grid-text' },
  //   { text: 'like-reversi', link: 'code/like-reversi' },
  //   { text: 'random-ball', link: 'code/random-ball' },
  //   { text: 'swirl', link: 'code/swirl' },
  //   { text: 'trigonometry', link: 'code/trigonometry' },
  //   { text: 'wave/sine-curve', link: 'code/wave/sine-curve' },
  //   { text: 'wave/sine-curve2', link: 'code/wave/sine-curve2' },
  // ]

  // テキスト
  let margin = 30 // マージン
  let row = 1
  const lineHeight = 40 // 行の高さ
  const linkAreaHeight = lineHeight - 10

  p5.setup = () => {
    p5.createCanvas(p5.windowWidth - 22, p5.windowHeight - 22)
    p5.colorMode(p5.HSB)
    p5.frameRate(1)
  }

  p5.mousePressed = (e) => {
    console.log('mousePressed', e)
    // location.href = '/code/hello'
  }

  p5.draw = () => {
    p5.background(0, 0, 90)

    for (let i = 0; i < 10; i++) {
      let x = p5.random(p5.width) // ランダムなX座標
      let y = p5.random(p5.height) // ランダムなY座標
      let diameter = p5.random(20, 100) // ランダムな直径（20から100の間）
      let fillColor = p5.color(p5.random(255), p5.random(255), p5.random(255)) // ランダムな色

      p5.fill(fillColor)
      p5.noStroke()
      p5.ellipse(x, y, diameter, diameter) // 円を描画
    }

    // console.clear()
    // for (let i = 0; i < linkList.length; i++) {
    //   p5.fill(0)
    //   p5.textSize(20)
    //
    //   if (i === 0) {
    //     margin = 30
    //     row = 1
    //   }
    //   const { text, link } = linkList[i]
    //
    //   // リンクとしてクリック領域を追加
    //   const textWidth = p5.textWidth(text)
    //
    //   if (i > 0) {
    //     if (margin + textWidth < p5.width) {
    //       margin += textWidth * 1.2
    //       console.log(text, 'margin', margin, textWidth / text.length)
    //     } else {
    //       margin = 30
    //       row += 1
    //     }
    //   }
    //
    //   let x = margin
    //   let y = row * lineHeight // 行ごとにY座標を計算
    //
    //   p5.text(text, x, y) // テキストを表示
    //
    //   const linkAreaWidth = textWidth + 20
    //   const linkArea = p5.createButton('')
    //
    //   linkArea.position(x, y - 14)
    //   linkArea.size(linkAreaWidth, linkAreaHeight)
    //   linkArea.style('background-color', 'transparent')
    //   linkArea.mousePressed(() => window.open(link)) // クリックでリンク先を開く
    // }
  }
}

const index = () => {
  return <NextReactP5Wrapper sketch={sketch} />
}
export default index
