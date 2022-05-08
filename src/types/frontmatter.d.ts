export interface Frontmatter {
  title: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
  tags?: string[]
}

export interface Slug {
  params: {
    slug: string
  }
}

export interface ParsedFM {
  code: string
  frontmatter: Frontmatter | {
    [key: string]: any
  }
  // TODO: Figure out making this generic
  toc?: any
}
