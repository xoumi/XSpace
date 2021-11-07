import type { GetStaticProps, NextPage } from 'next'
import type { ReactElement } from 'react'
import Link from 'next/link'
import { getAllPosts } from 'util/posts'
import { Frontmatter } from 'types/frontmatter'

interface PageProps {
  allPosts: Frontmatter[]
}

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
  const allPosts = getAllPosts('dev')
  return {
    props: {
      allPosts
    }
  }
}

const Landing: NextPage<PageProps> = ({ allPosts }): ReactElement => {
  return (
    <>
      <ul>
        {allPosts.map(post => (
          <li key={post.slug}>
            <Link href={`/dev/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Landing