import { NextReactP5Wrapper } from '@p5-wrapper/next' // @p5-wrapper/nextからNextReactP5Wrapperをimport

import { Color } from '@/lib/types' // @p5-wrapper/reactからSketchをimport
import { type Sketch } from '@p5-wrapper/react'

const backgroundColor: Color = {
  r: 255,
  g: 255,
  b: 3,
}

const accentColor: Color = {
  r: 115,
  g: 6,
  b: 175,
}

// サインカーブ写経
// https://kyndinfo.notion.site/Direction-of-the-waves-8d1da5a580614d01af8724c1e698a6e1
const sketch: Sketch = (p5) => {
  // Sketch型の変数sketchを定義し、関数を代入。p5を引数として受け取る
  p5.setup = () => {
    // p5のsetup関数を定義
    p5.createCanvas(p5.windowWidth, p5.windowHeight) // キャンバスをウィンドウの幅と高さで作成
  }

  const amplitude = p5.windowHeight / 2.5 // 波の振幅を設定
  const speed = 0.5 // 波の速さを設定
  const period = 1 / 120 // 波の周期を設定

  // サインカーブの中心の角度とサインカーブの値を保持する変数
  let dataSine = 0

  p5.draw = () => {
    p5.background(backgroundColor.r, backgroundColor.g, backgroundColor.b) // 背景色を指定

    // 真ん中に縦横線
    p5.push()
    p5.stroke(accentColor.r, accentColor.g, accentColor.b)
    p5.strokeWeight(1)
    p5.line(p5.windowWidth / 2, 0, p5.windowWidth / 2, p5.windowHeight)
    p5.line(0, p5.windowHeight / 2, p5.windowWidth, p5.windowHeight / 2)
    p5.pop()

    const res = 48 + p5.floor(p5.width / 40) // 分解能を計算
    const step = p5.width / res // ステップサイズを計算

    const time = p5.frameCount / 60 // 時間を設定

    p5.push() // 現在の描画スタイルを保存
    p5.translate(0, p5.windowHeight / 2) // 描画位置を変更
    p5.noFill() // 塗りつぶしなしの設定
    p5.stroke(accentColor.r, accentColor.g, accentColor.b) // ストロークカラーを指定
    p5.strokeWeight(3) // ストロークの太さを指定
    p5.beginShape() // 図形の描画を開始
    for (let i = 0; i <= res; i++) {
      // 分解能の数だけ繰り返す
      const positionX = step * i // x座標を計算
      const angle = speed * time - period * positionX // 角度を計算
      const sine = p5.sin(angle) // サインカーブを計算
      const positionY = amplitude * sine // y座標を計算（サインカーブを利用）

      p5.vertex(positionX, positionY) // 頂点を追加

      // サインカーブの中心に円を描く
      if (i === p5.round(res / 2)) {
        p5.push()
        p5.fill(accentColor.r, accentColor.g, accentColor.b) // 塗りつぶしのカラーを指定
        p5.ellipse(positionX, positionY, 10, 10)
        p5.pop()
        dataSine = sine
      }
    }
    p5.endShape() // 図形の描画を終了
    p5.pop() // 保存しておいた描画スタイルを復元

    p5.push()
    p5.fill(accentColor.r, accentColor.g, accentColor.b)
    p5.textStyle('bold')
    p5.textSize(30)
    p5.text(`sine: ${p5.round(dataSine, 2)}`, 50, p5.windowHeight - 70)
    p5.pop()
  }
}

export const index = () => {
  // index関数をエクスポート
  return <NextReactP5Wrapper sketch={sketch} /> // NextReactP5Wrapperコンポーネントを返す
}
export default index // index関数をデフォルトエクスポート
