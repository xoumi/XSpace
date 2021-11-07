import fs from 'fs'
import path from 'path'
import matter from 'front-matter'
import parseMD from './markdown/xdm'
import type { Frontmatter, Slug, ParsedFM } from 'types/frontmatter'

const ROOT_PATH = path.join(process.cwd(), 'posts')

export function getAllPosts (category: string): Frontmatter[] {
  const postsDir = path.join(ROOT_PATH, category)
  const fileNames = fs.readdirSync(postsDir)
  return fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx?$/, '')
    const fullPath = path.join(postsDir, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf-8')
    const parsedMatter = matter<Frontmatter>(fileContents)
    return { ...parsedMatter.attributes, slug }
  })
}

export function getAllPaths (category: string): Slug[] {
  return getAllPosts(category).map(fm => ({
    params: { slug: fm.slug }
  }))
}

export async function getPost (category: string, slug: string | string[] | undefined): Promise<ParsedFM> {
  if (typeof (slug) === 'string') {
    const postDir = path.join(ROOT_PATH, category, slug + '.mdx')
    const source = fs.readFileSync(postDir, 'utf-8')

    return await parseMD(source, postDir)
  }
  return { code: '', frontmatter: {}, component: '' }
}
