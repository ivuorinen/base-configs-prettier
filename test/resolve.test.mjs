import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'

// Resolve the package by its own name so the published `exports` map (both
// conditions) is exercised, not the files on disk. A condition pointing at a
// missing file fails here exactly as it would for a consumer.
const require = createRequire(import.meta.url)
const PKG = '@ivuorinen/prettier-config'

test('require() resolves the options object', () => {
  const config = require(PKG)
  assert.strictEqual(config.singleQuote, true)
  assert.strictEqual(config.semi, false)
})

test('import() resolves the same options', async () => {
  const config = (await import(PKG)).default
  assert.deepStrictEqual(config, require(PKG))
})
