type CalcEuclideanGCDResult = {
  answer: number
  lastIndex: number
  progressMessages: string[]
}

export const calcEuclideanGCD = (
  a: number,
  b: number,
): CalcEuclideanGCDResult => {
  const progressMessages: string[] = []

  let c: number = a % b // 余り
  let d: number = b
  let i: number = 0
  while (d > 0) {
    i += 1
    c = Math.floor(a / b) //
    d = a % b
    progressMessages.push(
      `${i}回目: x${i - 1}(${a}) / x${i}(${b}) = ` +
        `${c}(余りは ${d} ${d > 0 ? `で x${i + 1} に代入` : ''})`,
    )

    a = b
    b = d
  }

  return { answer: a, lastIndex: i, progressMessages }
}
