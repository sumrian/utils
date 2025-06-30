/**
 * 千分位展示 方法名称修改
 * @param number
 * @returns
 */
function formatToThousand(number: number): string {
  // 先判断值是否可转数字类型
  if (Number.isNaN(number)) {
    throw new Error("Invalid number");
  }
  const isNegative = number < 0;
  const numStr = Math.abs(number).toString();

  // 分割整数和小数部分
  const [integerPart, decimalPart] = numStr.split(".");

  // 格式化整数部分
  let result = "";
  let count = 0;

  for (let i = integerPart.length - 1; i >= 0; i--) {
    result = integerPart[i] + result;
    count++;

    if (count % 3 === 0 && i !== 0) {
      result = "," + result;
    }
  }

  // 如果有小数部分，加上小数部分
  if (decimalPart) {
    result += "." + decimalPart;
  }

  return isNegative ? `-${result}` : result;
}

export default formatToThousand;
