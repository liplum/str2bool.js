import test from 'ava'
import str2bool from "./dist/index.js"

test('"true"', t => {
  t.assert(str2bool("true") === true)
})