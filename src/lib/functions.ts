import { Direction, Point } from '@/lib/types'

export const movePoint = (point: Point, direction: Direction, step: number): Point => {
  if (direction === 'up') return { x: point.x, y: point.y - step }
  if (direction === 'down') return { x: point.x, y: point.y + step }
  if (direction === 'left') return { x: point.x - step, y: point.y }
  return { x: point.x + step, y: point.y } // direction === 'right'
}
