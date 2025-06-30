// 从对象中提取指定的键值对的新对象
export function pick<T, K extends keyof T>(targetObj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach((key) => {
    if (Object.prototype.hasOwnProperty.call(targetObj, key)) {
      result[key] = targetObj[key];
    }
  });
  return result;
}
