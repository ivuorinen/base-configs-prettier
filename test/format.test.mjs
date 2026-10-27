import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import * as prettier from 'prettier'

// resolve.test.mjs proves the options object resolves; it cannot prove
// Prettier still honours it. An option Prettier drops or renames is ignored
// with only a warning, so the published config would quietly stop applying it.
// Load the config the way a consumer's .prettierrc.json does (overrides only
// apply to a config file, never to format() options) and format real sources.
const require = createRequire(import.meta.url)
const CONFIG = require.resolve('@ivuorinen/prettier-config')

/**
 * Format source as Prettier would for a consumer file at `filepath`.
 * @param {string} source The code to format.
 * @param {string} filepath The file name; its extension picks the parser and overrides.
 * @returns {Promise<string>} The formatted code.
 */
const format = async (source, filepath) => {
  const options = await prettier.resolveConfig(filepath, { config: CONFIG })
  return prettier.format(source, { ...options, filepath })
}

test('every option, overrides included, is one Prettier supports', async () => {
  const config = require(CONFIG)
  const { options } = await prettier.getSupportInfo()
  const known = new Set(options.map(option => option.name))
  const used = [
    ...Object.keys(config).filter(key => key !== 'overrides'),
    ...config.overrides.flatMap(override => Object.keys(override.options))
  ]

  assert.deepStrictEqual(
    used.filter(key => !known.has(key)),
    []
  )
})

test('JavaScript gets single quotes, no semicolons, no trailing commas and bare arrow parameters', async () => {
  const out = await format('const f = (x) => { return ["a", "b",]; };\n', 'x.js')
  assert.strictEqual(out, "const f = x => {\n  return ['a', 'b']\n}\n")

  // A single-line array drops its trailing comma under every setting; an
  // object Prettier keeps expanded is where trailingComma shows.
  assert.strictEqual(await format('const o = {\n  a: 1,\n  b: 2,\n};\n', 'x.js'), 'const o = {\n  a: 1,\n  b: 2\n}\n')
})

test('CSS and SCSS keep double quotes', async () => {
  for (const file of ['x.css', 'x.scss']) {
    assert.strictEqual(await format("a { content: 'x'; }\n", file), 'a {\n  content: "x";\n}\n')
  }
})

test('Markdown prose is never wrapped', async () => {
  assert.strictEqual(await format('One sentence\nsplit over two lines.\n', 'x.md'), 'One sentence split over two lines.\n')
})
