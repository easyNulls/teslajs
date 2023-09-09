import * as esbuild from 'esbuild'
import stripJsonComments from 'strip-json-comments'
import fs from 'fs'
import { rimrafSync } from 'rimraf'


import TsconfigPathsPlugin from './plugins/esbuild-plugin-tsconfig-paths'
import EsbuildPluginDtsBundleGenerator from 'esbuild-plugin-dts-bundle-generator'
import { findUpSync } from 'find-up'




const entryPoints = [
  {
    in: 'src/index.ts',
    out: 'index'
  }
]


const loadJSON = (p: string) => {
  try {
    const data = stripJsonComments(fs.readFileSync(p, 'utf-8').toString(), {
      trailingCommas: true,
      whitespace: true
    })
    return JSON.parse(data)
  } catch (e) {
    throw new Error(`Cannot load json for '${p}'`)
  }
}



const defaultOutExtension = ({ format, pkgType }: { format: esbuild.Format, pkgType?: string }): { js: string, dts: string } => {
  let jsExtension = '.js'
  let dtsExtension = '.d.ts'
  const isModule = pkgType === 'module'

  if (isModule && 'cjs' === format) {
    jsExtension = '.cjs'
    dtsExtension = '.d.cts'
  } else if (!isModule && 'esm' === format) {
    jsExtension = '.mjs'
    dtsExtension = '.d.mts'
  } else if ('iife' === format) {
    jsExtension = '.global.js'
  }

  return {
    js: jsExtension,
    dts: dtsExtension,
  }
}



const toEsbuildOptions = (format: esbuild.Format): esbuild.BuildOptions => {
  const pkg = findUpSync(['package.json'])
  if (!pkg) throw new Error('Cannot find package.json')

  const pkgJSON = loadJSON(pkg)
  const extension = defaultOutExtension({ format, pkgType: pkgJSON.type })
  return {
    entryPoints,
    platform: 'node',
    bundle: true,
    splitting: false,
    minify: false,
    sourcemap: false,
    outdir: 'dist',
    outExtension: {
      '.js': extension.js,
    },
    format,
    logLevel: 'debug',
    charset: 'utf8',
    plugins: [
      TsconfigPathsPlugin({}),
      EsbuildPluginDtsBundleGenerator({
        entryPoints,
        tsconfig: './tsconfig.json'
      }),
    ]
  }
}



(() => {
  const rm = rimrafSync('dist')
  console.log(`rm 'dist'`, rm)
  const extensions: Array<esbuild.Format> = ['cjs', 'esm']

  extensions.forEach(async ext => {
    const res = await esbuild.build(toEsbuildOptions(ext))
    const { errors } = res
    console.log(`built ${ext} ${errors?.length ?? 0} errors`)
  })
})()
