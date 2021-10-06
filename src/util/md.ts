import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { bundleMDX } from 'mdx-bundler'
import remarkDirective from 'remark-directive'
import shortList from './shortList'

import type { Frontmatter, Slug, _Post } from 'types/frontmatter'

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe')
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild')
}

const ROOT_PATH = path.join(process.cwd(), 'posts')

export function getAllPosts (category: string): Frontmatter[] {
  const postsDir = path.join(ROOT_PATH, category)
  const fileNames = fs.readdirSync(postsDir)
  return fileNames.map(fileName => {
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const parsedMatter = matter(fileContents)
    return parsedMatter.data as Frontmatter
  })
}

export function getAllPaths (category: string): Slug[] {
  const postsDir = path.join(ROOT_PATH, category)
  const fileNames = fs.readdirSync(postsDir)
  return fileNames.map(fileName => {
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const parsedMatter = matter(fileContents)
    return {
      params: { slug: parsedMatter.data.slug as string }
    }
  })
}

export async function getPost (category: string, slug: string | string[] | undefined): Promise<_Post> {
  if (typeof (slug) === 'string') {
    const postDir = path.join(ROOT_PATH, category, slug + '.mdx')
    const source = fs.readFileSync(postDir, 'utf-8')

    const { code, frontmatter } = await bundleMDX(source, {
      xdmOptions (options) {
        options.remarkPlugins = [...(options.remarkPlugins ?? []), remarkDirective, shortList]
        return options
      },
      cwd: postDir
    }) as _Post
    return { code, frontmatter }
  } else {
    return { code: '', frontmatter: {} }
  }
}
