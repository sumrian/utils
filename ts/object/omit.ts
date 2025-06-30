/**
 * 从对象中删除指定的键并返回新对象
 * @param obj 源对象
 * @param keys 要删除的键或键数组
 * @returns 删除指定键后的新对象
 * @example
 * ```ts
 * // 数组形式
 * const obj = { a: 1, b: 2, c: 3 };
 * const result1 = omit(obj, ['a', 'c']);
 * // result1: { b: 2 }
 *
 * // 可变参数形式
 * const result2 = omit(obj, 'a', 'c');
 * // result2: { b: 2 }
 * ```
 */
export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: (K | K[])[]
): Omit<T, K> {
  if (!obj) {
    return {} as Omit<T, K>;
  }

  const result = { ...obj };
  const flattenedKeys: K[] = [];

  // 扁平化键数组
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    if (Array.isArray(key)) {
      flattenedKeys.push(...key);
    } else {
      flattenedKeys.push(key);
    }
  }

  // 删除指定的键
  // eslint-disable-next-line no-restricted-syntax
  for (const key of flattenedKeys) {
    delete result[key];
  }

  return result as Omit<T, K>;
}

export default omit;
