export interface Str2BoolOptions {
  /**
   * The string will be trimed before being converted.
   */
  trim?: boolean
  /**
   * In strict mode, strings that cannot be considered either `true` or `false` result in `undefined`.
   * In non-strict mode, the above strings will result in `false`.
   */
  strict?: boolean
}

function str2bool(str: string, options?: Str2BoolOptions & { strict: false }): boolean

function str2bool(str: string, options?: Str2BoolOptions & { strict: true }): boolean | undefined

/**
 * 
 * Convert a string to boolean value.
 * 
 * The following strings will be considered as `true`.
 * - "true"
 * - "1", "-1", "0.1" and other strings can be converted to a number that isn't zero.
 * 
 * 
 * The following strings will be considered as `false`.
 * - "" (empty string)
 * - "false"
 * - "0"
 * 
 * 
 * @param str the input string
 * @param options The string will be trimed before being converted.
 * @returns a boolean
 */
function str2bool(str: string, options?: Str2BoolOptions): boolean | undefined {
  if (typeof str !== "string") {
    str = `${str}`
  }
  const strict = options?.strict ?? false
  const trim = options?.trim ?? true
  if (trim) {
    str = str.trim()
  }
  if (str.length <= 0) return false
  if (str == "true") return true
  if (str == "false") return false

  const maybeFloat = parseFloat(str)
  if (!isNaN(maybeFloat)) {
    return maybeFloat != 0
  }

  const maybeInt = parseInt(str)
  if (!isNaN(maybeInt)) {
    return maybeInt != 0
  }

  return strict ? undefined : false
}

export default str2bool