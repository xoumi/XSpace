import path from 'path'
import { bundleMDX } from 'mdx-bundler'
import remarkDirective from 'remark-directive'
import shortList from './shortList'
import type { ParsedFM } from 'types/frontmatter'

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe')
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild')
}

const REMARK_PLUGINS = [
  remarkDirective,
  shortList
]

export default async function parseMD (source: string, postDir: string): Promise<ParsedFM> {
  const { code, frontmatter } = await bundleMDX(source, {
    xdmOptions (options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...REMARK_PLUGINS
      ]
      return options
    },
    cwd: postDir
  })
  return { code, frontmatter }
}
