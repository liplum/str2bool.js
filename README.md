# str2bool.js

Convert a string to boolean value.

## Installation

```sh
yarn add @liplum/str2bool
# or
npm i @liplum/str2bool
# or
pnpm i @liplum/str2bool
```

## Usage

Basic usage

```js
import str2bool from "@liplum/str2bool"

console.log(str2bool("true") === true)
console.log(str2bool("false") === false)

console.log(str2bool("") === false)
console.log(str2bool("0") === false)
console.log(str2bool("1") === true)
```

Yes or No

```js
console.log(str2bool("yes",{ yesOrNo: true }) === true)
console.log(str2bool("y",{ yesOrNo: true }) === true)

console.log(str2bool("no",{ yesOrNo: true }) === false)
console.log(str2bool("n",{ yesOrNo: true }) === false)
```

The following strings will be considered as `true`:

- "true"
- "1", "-1", "0.1" and other strings can be converted to a number that isn't zero
- [Non-strict mode] "javascript", "node.js", and any non-empty string

The following strings will be considered as `false`:

- "" (empty string)
- "false"
- "0"

[strict mode] The following strings will be considered as `undefined`:

- any non-empty string like "javascript" and "node.js"

If `trim` is true, the strings containing only whitespace characters will be trimmed to an empty string,
and be considered as `false`.

If `truthy` or `falsy` are given,
then they will be tested after the above cases.

Configure the options:

```ts
export interface Str2BoolOptions {
  /**
   * In strict mode, strings that cannot be considered either `true` or `false` result in `undefined`.
   * In non-strict mode, any other non-empty strings will be consider as `true`.
   * 
   * false by default.
   */
  strict?: boolean
  /**
   * The string will be trimmed before being converted.
   * 
   * true by default.
   */
  trim?: boolean
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
```
