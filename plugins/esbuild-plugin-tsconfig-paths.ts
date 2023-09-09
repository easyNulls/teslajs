import fs from 'fs'
import * as esbuild from 'esbuild'

import typescript from 'typescript'
import { findUpSync } from 'find-up'
import stripJsonComments from 'strip-json-comments'

const NAME = 'tsconfig-paths'

interface Options {
  name?: string
  absolute?: boolean
  tsconfig?: Tsconfig | string
  onResolved?: (resolved: string) => any
  // aliases: Record<string, string[]>
}

interface Tsconfig {
  baseUrl?: string
  compilerOptions?: {
    paths?: Record<string, string[]>
  }
}

/**
 * 创建一个 TsconfigPathsPlugin。
 *
 * @param {Object} options - 插件的配置选项。
 * @param {string} options.name - 插件的名称。默认为 `esbuild-plugin-{NAME}`。
 * @param {boolean} options.absolute - 是否将路径解析为绝对路径。默认为 `true`。
 * @param {function} options.onResolved - 当路径解析完成时调用的回调函数。
 * @param {string} options.tsconfig - tsconfig 文件的路径。
 * @return {Plugin} 创建的插件。
 */
export const TsconfigPathsPlugin = ({
  name = `esbuild-plugin-${NAME}`,
  absolute = true,
  onResolved,
  tsconfig,
}: Options) => {
  const { nodeModuleNameResolver, sys } = typescript
  const compilerOptions = loadCompilerOptions(tsconfig)
  return {
    name,
    setup: ({ onResolve }) => {
      onResolve({ filter: /.*/ }, async (args) => {
        const hasMatchingPath = Object.keys(compilerOptions?.paths || {},).some((path) =>
          new RegExp(path.replace('*', '\\w*')).test(args.path),
        )

        if (!hasMatchingPath) return null

        const { resolvedModule } = nodeModuleNameResolver(
          args.path,
          args.importer,
          compilerOptions || {},
          sys,
        )

        if (!resolvedModule) return null

        const { resolvedFileName } = resolvedModule
        // console.log(resolvedFileName)

        // if (!resolvedFileName || resolvedFileName.endsWith('.d.ts')) return null
        if (!resolvedFileName || resolvedFileName.endsWith('.d.ts')) return null
        let resolved = absolute ? sys.resolvePath(resolvedFileName) : resolvedFileName
        if (onResolved) onResolved(resolved)
        // return {
        //   path: resolved,
        // }
      })
    },
  }
}

const loadJSON = (p: string) => {
  try {
    let data = fs.readFileSync(p, 'utf-8').toString()
    data = stripJsonComments(data, {
      trailingCommas: true,
      whitespace: true
    })
    return JSON.parse(data)
  } catch (e) {
    throw new Error(`Cannot load json for '${p}'`)
  }
}

const loadCompilerOptions = (tsconfig?: Tsconfig | string) => {

  //当tsconfig.json不传，默认去找__dirname下的tsconfig.json/jsconfig.json
  if (!tsconfig) {
    const configPath = findUpSync(['tsconfig.json', 'jsconfig.json'])
    if (configPath) {
      const config = loadJSON(configPath)
      return config?.compilerOptions || {}
    }
  }

  // tsconfig为string路径时,优先查找tsconfig
  if (typeof tsconfig === 'string') {
    if (fs.existsSync(tsconfig)) {
      const config = loadJSON(tsconfig)
      return config?.compilerOptions || {}
    }
  }

  if (tsconfig && tsconfig['compilerOptions']) {
    return tsconfig['compilerOptions']
  }
  return {}
}

export default TsconfigPathsPlugin