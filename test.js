import test from 'ava'
import str2bool from "./dist/index.js"

test("true", t => {
  t.assert(str2bool("true") === true)
})

test("false", t => {
  t.assert(str2bool("false") === false)
})

test("True", t => {
  t.assert(str2bool("True") === true)
})

test("False", t => {
  t.assert(str2bool("False") === false)
})

test("0", t => {
  t.assert(str2bool("0") === false)
})

test("1", t => {
  t.assert(str2bool("1") === true)
})

test('javascript', t => {
  t.assert(str2bool("javascript") === true)
})

test('""', t => {
  t.assert(str2bool("") === false)
})

test('"  "', t => {
  t.assert(str2bool("  ") === false)
})

test('"  " trim off', t => {
  t.assert(str2bool("  ", { trim: false }) === true)
})

test("0.1", t => {
  t.assert(str2bool("0.1") === true)
})

test("0x00", t => {
  t.assert(str2bool("0x00") === false)
})