import type { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPaths, getPost } from 'util/md'
import { getMDXComponent } from 'mdx-bundler/client'
import type { ParsedFM } from 'types/frontmatter'
import React from 'react'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPaths('dev')
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params !== undefined) {
    const post = await getPost('dev', params.slug)
    return {
      props: { ...post }
    }
  }

  return { props: {} }
}

const Post: React.FC<ParsedFM> = ({ code, frontmatter }): React.ReactElement => {
  const Component = React.useMemo(() => getMDXComponent(code), [code])
  return (
    <article style={{ margin: '0 auto', maxWidth: '800px', padding: '48px' }}>
      <Component />
    </article>
  )
}

export default Post
