import test from 'ava'
import str2bool from "./dist/index.js"

test("true", t => {
  t.assert(str2bool("true") === true)
})

test("false", t => {
  t.assert(str2bool("false") === false)
})

test("0", t => {
  t.assert(str2bool("0") === false)
})

test("1", t => {
  t.assert(str2bool("1") === true)
})

test('""', t => {
  t.assert(str2bool("") === false)
})