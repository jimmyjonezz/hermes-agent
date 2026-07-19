import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

// Clear stale ESBUILD_BINARY_PATH that may point to a different esbuild
// version (e.g. ~/.hermes/esbuild-built 0.28.0 vs local node_modules 0.27.7),
// which would cause "Host version does not match binary version" on Android.
delete process.env.ESBUILD_BINARY_PATH;

const { buildSync } = require('esbuild');

buildSync({
  entryPoints: [resolve(root, 'src/entry-exports.ts')],
  outfile: resolve(root, 'dist/entry-exports.js'),
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node18',
  external: [
    'react',
    'react/jsx-runtime',
    'react/compiler-runtime',
    'react-reconciler',
    'react-reconciler/constants.js',
    'react-dom',
    'chalk',
    'strip-ansi',
    'wrap-ansi',
    'indent-string',
    'cli-boxes',
    'auto-bind',
    'stack-utils',
    'bidi-js',
    'code-excerpt',
    'emoji-regex',
    'lodash-es/*',
    'signal-exit',
    'usehooks-ts',
    'ink-text-input',
    'get-east-asian-width',
    'semver',
    '@alcalzone/ansi-tokenize',
  ],
  metafile: true,
});

console.log('✓ entry-exports.js built');
