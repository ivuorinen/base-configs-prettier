# Architecture Profile

Generated: 2026-09-25

Confidence: none — manual review required

## Detected Patterns

Detected: none.

No catalogued pattern reaches Low confidence. Structural evidence:

- Source is three files: `index.cjs` (the options object), `wrapper.mjs` (ESM re-export of `index.cjs`) and
  `scripts/postinstall.cjs` (install-time starter-file writer).
- Import edges: `wrapper.mjs` → `./index.cjs`; `scripts/postinstall.cjs` → `@ivuorinen/config-checker` and Node
  built-ins.
- `package.json` `exports` routes `import` → `wrapper.mjs`, `require` → `index.cjs`; the repo's own
  `.prettierrc.json` points at `./index.cjs`.

Shape, for orientation (descriptive, not a catalogued pattern): shareable-config package — declarative data behind a
dual-format entry point, plus one install-time script with a side effect outside its own tree (`INIT_CWD`).

## Detected Combination

None.

## Inferred Structural Rules

None.

## Ambiguities & Contradictions

None.
