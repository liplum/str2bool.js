# str2bool.js

## Installation

```sh
yarn add @liplum/str2bool
# or
npm i @liplum/str2bool
# or
pnpm i @liplum/str2bool
```

## Usage

### Basic usage

```js
import str2bool from "@liplum/str2bool"
console.log(str2bool("true") === true)
console.log(str2bool("false") === false)
console.log(str2bool("") === false)
console.log(str2bool("0") === false)
console.log(str2bool("1") === false)
```
