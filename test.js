import test from 'ava'
import str2bool from "./dist/index.js"

test("true and false", t => {
  t.assert(str2bool("true") === true)
  t.assert(str2bool("false") === false)
  t.assert(str2bool("True") === true)
  t.assert(str2bool("False") === false)
})

test("number", t => {
  t.assert(str2bool("0") === false)
  t.assert(str2bool("1") === true)
  t.assert(str2bool("0.1") === true)
  t.assert(str2bool("0x00") === false)
})

test('javascript', t => {
  t.assert(str2bool("javascript") === true)
})

test('whitespace', t => {
  t.assert(str2bool("") === false)
  t.assert(str2bool("  ") === false)
  t.assert(str2bool("  ", { trim: false }) === true)
})

test("yes or no", t => {
  t.assert(str2bool("yes", { yesOrNo: true }) === true)
  t.assert(str2bool("y", { yesOrNo: true }) === true)
  t.assert(str2bool("Y", { yesOrNo: true }) === true)
  t.assert(str2bool("no", { yesOrNo: true }) === false)
  t.assert(str2bool("n", { yesOrNo: true }) === false)
  t.assert(str2bool("N", { yesOrNo: true }) === false)
})