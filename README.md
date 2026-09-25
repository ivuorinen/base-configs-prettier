# @ivuorinen/prettier-config <!-- omit in toc -->

[![npm package][npm-badge]][npm-link] [![license MIT][license-badge]][license-link] [![ivuorinen's Code Style][style-badge]][style-link]

> ivuorinen's shareable configuration for [`Prettier`][prettier-link].

## Table of Contents <!-- omit in toc -->

- [Installation](#installation)
- [Documentations](#documentations)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)

## Installation

Install `this config` as a _`devDependencies`_:

```sh
# npm
npm install @ivuorinen/prettier-config --save-dev

# Yarn
yarn add @ivuorinen/prettier-config --dev
```

Create a _`.prettierrc.json`_ in the project's root folder with the following configuration:

```json
"@ivuorinen/prettier-config"
```

With npm, a `postinstall` script writes exactly this file when the project has no Prettier config yet (npm 11 warns
that the script is not covered by `allowScripts`). Yarn 4 does not run dependency install scripts, so no file is
written. pnpm refuses unapproved install scripts and fails the install until you allow this package with
`pnpm approve-builds`. In both cases create the file by hand as above — without it Prettier silently formats with its
own defaults.

> Note: This method does **not** offer a way to _extend_ the configuration to
> overwrite some properties from the shared configuration. If you need to do
> that, import it in a _`prettier.config.mjs`_ file and export the
> modifications, e.g:
>
> ```js
> import ivuorinenConfig from '@ivuorinen/prettier-config'
>
> export default {
>   ...ivuorinenConfig,
>   // Add custom options below:
>   semi: true
> }
> ```
>
> The `.mjs` extension keeps the file an ES module whether or not your `package.json` sets `"type": "module"`.

## Documentations

Read the [Prettier docs][prettier-docs-link] for more information.

## Contributing

If you are interested in helping contribute, please open an [issue][issue-link] or [pull request][pull-request-link].

## Changelog

See [CHANGELOG][changelog-link] for a human-readable history of changes.

## License

Distributed under the MIT License. See [LICENSE][license-link] for more information.

[changelog-link]: https://github.com/ivuorinen/base-configs-prettier/releases
[prettier-docs-link]: https://prettier.io
[prettier-link]: https://github.com/prettier/prettier
[issue-link]: https://github.com/ivuorinen/base-configs-prettier/issues
[license-badge]: https://img.shields.io/github/license/ivuorinen/base-configs-prettier?style=flat-square&labelColor=292a44&color=663399
[license-link]: ./LICENSE.md
[npm-badge]: https://img.shields.io/npm/v/@ivuorinen/prettier-config?style=flat-square&labelColor=292a44&color=663399
[npm-link]: https://www.npmjs.com/package/@ivuorinen/prettier-config
[pull-request-link]: https://github.com/ivuorinen/base-configs-prettier/pulls
[style-badge]: https://img.shields.io/badge/code_style-ivuorinen%E2%80%99s-663399.svg?labelColor=292a44&style=flat-square
[style-link]: https://github.com/ivuorinen/base-configs-prettier
