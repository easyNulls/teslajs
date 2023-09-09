import { defineConfig, Options } from 'tsup'
import TsconfigPathsPlugin from './plugins/esbuild-plugin-tsconfig-paths'

// https://tsup.egoist.dev/
// https://esbuild.github.io/

export default defineConfig((options: Options): Options | Promise<Options> => {
  const { NODE_ENV } = options?.env ?? {}
  console.log('NODE_ENV', NODE_ENV, NODE_ENV === 'production')

  return {
    name: 'tsup',
    ignoreWatch: [],
    entry: [
      './src/index.ts',
    ],
    outExtension({ format }) {
      console.log('format', format)
      const extension = format === 'esm' ? '.mjs' : '.js'
      return {
        js: extension,
      }
    },
    target: 'es6',
    format: [
      'cjs',
      'esm',
    ],
    shims: false,
    clean: true,
    dts: {
    },
    sourcemap: true,
    splitting: true,
    minify: false,
    esbuildPlugins: [
      TsconfigPathsPlugin({})
    ]
  }
})
