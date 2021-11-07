import type { GetStaticProps, NextPage } from 'next'
import { ReactElement, useContext, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import PostListLayout from 'components/layout/PostListLayout'
import { getAllPosts } from 'util/posts'
import { Frontmatter } from 'types/frontmatter'
import { TransitionContext } from 'context/TransitionContext'
import type { TransitionContextI } from 'types/TransitionContext'

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
  const el = useRef<HTMLUListElement>()
  const { timeline } = useContext(TransitionContext) as TransitionContextI

  useLayoutEffect(() => {
    if (el.current != null) {
      gsap.from(el.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out'
      })

      timeline.add(
        gsap.to(el.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.in'
        })
      )
    }
  }, [])

  return (
    <ul ref={(ref) => { if (ref != null) el.current = ref }}>
      {allPosts.map(post => (
        <li key={post.slug}>
          <Link href={`/dev/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}


export default Landing
