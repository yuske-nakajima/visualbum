export type Point = {
  x: number
  y: number
}

export type Direction = 'up' | 'down' | 'left' | 'right'

// union => array 変換: https://mosya.dev/blog/tc-permutation
export type Permutation<T, K = T> = [T] extends [never]
  ? []
  : K extends K
    ? [K, ...Permutation<Exclude<T, K>>]
    : never

// RGB
export type Color = {
  r: number
  g: number
  b: number
}
