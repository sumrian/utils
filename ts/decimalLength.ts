/**
 * 计算数字的小数位数
 * @param num
 * @returns 小数位数
 */
export function decimalLength(num: number): number {
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}


