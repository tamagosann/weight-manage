export const VERY_BAD = 1
export const BAD = 2
export const SO_SO = 3
export const GOOD = 4
export const VERY_GOOD = 5

export type EvaluateStatus = {
  status: number,
  message: string,
}

type EvaluateStatusByBmi = (bmi: number) => EvaluateStatus

export const evaluateStatusByBmi: EvaluateStatusByBmi = (bmi) => {
  console.log(bmi)
  if(bmi >= 30) {
    return {status: VERY_BAD, message: 'ご自愛ください'}
  } else if (bmi >= 25 && 30 > bmi) {
    return {status: BAD, message: '運動もしてみませんか？'}
  } else if (bmi >= 21 && 25 > bmi) {
    return {status: SO_SO, message: '健康的です！'}
  } else if (bmi >= 18 && 21 > bmi) {
    return {status: GOOD, message: 'とても良いですね！'}
  } else {
    return {status: GOOD, message: '痩せすぎでは！？'}
  }
}