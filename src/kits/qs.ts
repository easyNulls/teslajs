
/**
 * 将对象转换为 URL 查询字符串。
 *
 * @param params - 要转换的对象。
 * @returns URL 查询字符串。
 */
export const query_stringify = (params: Record<string, any>): string => {
  const parts: Array<string> = []

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key]
      const encodedKey = encodeURIComponent(key)
      const encodedValue = encodeURIComponent(value)
      parts.push(`${encodedKey}=${encodedValue}`)
    }
  }

  return parts.join('&')
}

/**
 * 将 URL 查询字符串解析为对象。
 *
 * @param queryString - 要解析的 URL 查询字符串。
 * @returns 解析后的对象。
 */
export const query_parse = (queryString: string): Record<string, string> => {
  const result: Record<string, string> = {}

  const keyValuePairs = queryString.split('&')
  for (const pair of keyValuePairs) {
    const [key, value] = pair.split('=')
    const decodedKey = decodeURIComponent(key)
    const decodedValue = decodeURIComponent(value || '')
    result[decodedKey] = decodedValue
  }

  return result
}
