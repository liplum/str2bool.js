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

  /**
   * The strings will be considered as `true`
   */
  truthy?: string[]
  /**
   * The strings will be considered as `false`
   */
  falsy?: string[]
}

const matchIn = (str: string, cases: string[], {
  ignoreCase, trim
}: {
  ignoreCase: boolean
  trim: boolean
}) => {
  for (let test of cases) {
    test = trim ? `${test}`.trim() : `${test}`
    if (str.length == test.length &&
      (ignoreCase ? str.toLocaleLowerCase() == test.toLocaleLowerCase() : str == test)
    ) {
      return true
    }
  }
  return false
}

/**
 * 
 * Convert a string to boolean.
 * 
 * The following strings will be considered as `true`:
 * - "true"
 * - "1", "-1", "0.1" and other strings can be converted to a number that isn't zero
 * - "javascript", "node.js", and any non-empty string
 * 
 * The following strings will be considered as `false`:
 * - "" (empty string)
 * - "false"
 * - "0"
 * 
 * If {@link Str2BoolOptions.trim} is true, the strings containing only whitespace characters will be trimmed to an empty string,
 * and be considered as `false`.
 * 
 * If {@link Str2BoolOptions.truthy} or {@link Str2BoolOptions.falsy} are given,
 * then they will be tested after the above cases.
 * 
 * @param str the input string
 * @param options The string will be trimed before being converted.
 * @returns a boolean
 */
function str2bool(str: string, options?: Str2BoolOptions & { strict: false }): boolean

/**
 * 
 * Convert a string to boolean value.
 * 
 * The following strings will be considered as `true`:
 * - "true"
 * - "1", "-1", "0.1" and other strings can be converted to a number that isn't zero
 * 
 * The following strings will be considered as `false`:
 * - "" (empty string)
 * - "false"
 * - "0"
 * 
 * In strict mode, any non-empty string like "javascript" and "node.js" will result in `undefined`.
 * 
 * If {@link Str2BoolOptions.trim} is true, the strings containing only whitespace characters will be trimmed to an empty string,
 * and be considered as `false`.
 * 
 * If {@link Str2BoolOptions.truthy} or {@link Str2BoolOptions.falsy} are given,
 * then they will be tested after the above cases.
 * 
 * @param str the input string
 * @param options The string will be trimed before being converted.
 * @returns a boolean
 */
function str2bool(str: string, options?: Str2BoolOptions & { strict: true }): boolean | undefined

function str2bool(str: string, options?: Str2BoolOptions): boolean | undefined {
  if (typeof str !== "string") {
    str = `${str}`
  }
  const strict = options?.strict ?? false
  const trim = options?.trim ?? true
  const ignoreCase = options?.ignoreCase ?? true
  const yesOrNo = options?.yesOrNo ?? false
  const truthy = options?.truthy
  const falsy = options?.falsy

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

  if (truthy && matchIn(str, truthy, { ignoreCase, trim })) {
    return true
  }
  if (falsy && matchIn(str, falsy, { ignoreCase, trim })) {
    return false
  }

  return strict ? undefined : true
}

export default str2bool