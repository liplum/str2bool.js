export interface Str2BoolOptions {
  /**
   * The string will be trimed before being converted.
   * 
   * true by default.
   */
  trim?: boolean
  /**
   * In strict mode, strings that cannot be considered either `true` or `false` result in `undefined`.
   * In non-strict mode, any other non-empty strings will be consider as `true`.
   * 
   * false by default.
   */
  strict?: boolean
  /**
   * Ignore the case.
   * 
   * true by default.
   */
  ignoreCase?: boolean

  /**
   * If enabled, "yes" and "y" will be considered as `true`,
   * while "no" and "n" will be considered as `false`.
   * 
   * false by default.
   */
  yesOrNo?: boolean

  // truthy?: string[]

  // falsy?: string[]
}

function str2bool(str: string, options?: Str2BoolOptions & { strict: false }): boolean

function str2bool(str: string, options?: Str2BoolOptions & { strict: true }): boolean | undefined

/**
 * 
 * Convert a string to boolean value.
 * 
 * The following strings will be considered as `true`.
 * - "true"
 * - "1", "-1", "0.1" and other strings can be converted to a number that isn't zero
 * 
 * The following strings will be considered as `false`.
 * - "" (empty string)
 * - "false"
 * - "0"
 * 
 * In strict mode, any non-empty string like "javascript" and "node.js" will be considered as `true`.
 * If `trim` is true, the strings containing only whitespace characters will be trimmed to an empty string,
 * and be considered as `false`.
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
  const ignoreCase = options?.ignoreCase ?? true
  const yesOrNo = options?.yesOrNo ?? false
  if (trim) {
    str = str.trim()
  }
  if (str.length <= 0) return false
  if (str.length == 4) {
    if (ignoreCase ? str.toLowerCase() == "true" : str == "true")
      return true
  }
  if (str.length == 5) {
    if (ignoreCase ? str.toLowerCase() == "false" : str == "false")
      return false
  }

  if (yesOrNo) {
    if (str.length == 3) {
      if (ignoreCase ? str.toLowerCase() == "yes" : str == "yes")
        return true
    }
    if (str.length == 1) {
      if (ignoreCase ? str.toLowerCase() == "y" : str == "y")
        return true
    }
    if (str.length == 2) {
      if (ignoreCase ? str.toLowerCase() == "no" : str == "no")
        return false
    }
    if (str.length == 1) {
      if (ignoreCase ? str.toLowerCase() == "n" : str == "n")
        return false
    }
  }

  const maybeFloat = parseFloat(str)
  if (!isNaN(maybeFloat)) {
    return maybeFloat != 0
  }

  const maybeInt = parseInt(str)
  if (!isNaN(maybeInt)) {
    return maybeInt != 0
  }

  return strict ? undefined : true
}

export default str2bool