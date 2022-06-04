import { Heading } from 'mdast';

export interface Meta {
  toc: Toc[],
  fm: Frontmatter
}

export interface Frontmatter {
  title: string
  slug: string
  created?: string
  updated?: string
  tags?: string[]
}

export interface Slug {
  params: {
    slug: string
  }
}

export interface Toc {
  depth: Heading.depth
  value: string
  id: string
  type: 'heading' | 'code'
}

interface PageProps {
  allPosts: Frontmatter[],
  setMeta: Function
}

export interface ParsedFM {
  code: string
  frontmatter: Frontmatter
  toc?: Toc[],
  setMeta?: (meta: Meta) => void
}
