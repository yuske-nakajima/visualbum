import { NextReactP5Wrapper } from '@p5-wrapper/next' // @p5-wrapper/nextからNextReactP5Wrapperをimport

import { type Sketch } from '@p5-wrapper/react' // @p5-wrapper/reactからSketchをimport

// サインカーブ写経
// https://kyndinfo.notion.site/Direction-of-the-waves-8d1da5a580614d01af8724c1e698a6e1
const sketch: Sketch = (p5) => {
  // Sketch型の変数sketchを定義し、関数を代入。p5を引数として受け取る
  p5.setup = () => {
    // p5のsetup関数を定義
    p5.createCanvas(p5.windowWidth, p5.windowHeight) // キャンバスをウィンドウの幅と高さで作成
  }

  p5.draw = () => {
    // p5のdraw関数を定義
    p5.background(240, 237, 241) // 背景色を指定

    const res = 48 + p5.floor(p5.width / 40) // 分解能を計算
    const step = p5.width / res // ステップサイズを計算

    const t = p5.frameCount / 60 // 時間を設定
    const a = p5.height / 4 // 波の振幅を設定
    const b = 1 // 波の速さを設定
    const c = 1 / 120 // 波の周期を設定

    p5.push() // 現在の描画スタイルを保存
    p5.translate(0, p5.height / 2) // 描画位置を変更
    p5.noFill() // 塗りつぶしなしの設定
    p5.beginShape() // 図形の描画を開始
    for (let i = 0; i <= res; i++) {
      // 分解能の数だけ繰り返す
      const x = step * i // x座標を計算
      const y = a * p5.sin(b * t - c * x) // y座標を計算（サインカーブを利用）
      p5.vertex(x, y) // 頂点を追加
    }
    p5.endShape() // 図形の描画を終了
    p5.pop() // 保存しておいた描画スタイルを復元
  }
}

export const index = () => {
  // index関数をエクスポート
  return <NextReactP5Wrapper sketch={sketch} /> // NextReactP5Wrapperコンポーネントを返す
}
export default index // index関数をデフォルトエクスポート
