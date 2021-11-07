import type { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPaths, getPost } from 'util/posts'
import { getMDXComponent } from 'mdx-bundler/client'
import type { ParsedFM } from 'types/frontmatter'
import React from 'react'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPaths('dev')
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params !== undefined) {
    const { code, frontmatter, component } = await getPost('dev', params.slug)
    return {
      props: { code, frontmatter, component }
    }
  }

  return { props: {} }
}

const Post = ({ code, frontmatter, component }: ParsedFM): React.ReactElement => {
  const parsedExports = getMDXComponent(component)

  const Component = React.useMemo(() => parsedExports.default, [code])

  return (
    <article style={{ margin: '0 auto', maxWidth: '800px', padding: '48px' }}>
      <Component />
    </article>
  )
}

export default Post
