'use strict'

module.exports = {
  arrowParens: 'avoid',
  proseWrap: 'preserve',
  semi: false,
  singleQuote: true,
  trailingComma: 'none',
  overrides: [
    {
      files: ['*.css', '*.scss'],
      options: {
        singleQuote: false
      }
    }
  ]
}
