import { Direction, Point } from '@/lib/types'
import type { P5CanvasInstance } from '@p5-wrapper/react'

export const movePoint = (
  point: Point,
  direction: Direction,
  step: number,
): Point => {
  if (direction === 'up') return { x: point.x, y: point.y - step }
  if (direction === 'down') return { x: point.x, y: point.y + step }
  if (direction === 'left') return { x: point.x - step, y: point.y }
  return { x: point.x + step, y: point.y } // direction === 'right'
}

/*
 * ブロックを描画する
 * @param p5 P5CanvasInstance
 * @param func 描画する処理
 * @returns void
 * 渡した関数をpush/popで囲んで描画する。他の処理にスタイルが影響しないようにするため。
 */
export const drawBlock = (p5: P5CanvasInstance, func: () => void) => {
  p5.push()
  func()
  p5.pop()
}
