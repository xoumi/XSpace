export interface Frontmatter {
  title: string
  slug: string
  createdAt?: Date
  updatedAt?: Date
  tags?: String[]
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
  component: string
  // TODO: Figure out making this generic
  toc?: any
}
