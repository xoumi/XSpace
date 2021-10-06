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

export interface _Post {
  code: string
  frontmatter: {
    [key: string]: any
  }
}
