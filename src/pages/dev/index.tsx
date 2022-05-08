import type { GetStaticProps } from 'next';
import { ReactElement, useContext, useLayoutEffect, useRef, } from 'react';
import gsap from 'gsap';
import Link from 'next/link';
import PostListLayout from 'components/layout/PostListLayout';
import { getAllPosts } from 'util/posts';
import { Frontmatter } from 'types/frontmatter';
import { TransitionContext } from 'context/TransitionContext';
import type { TransitionContextI } from 'types/TransitionContext';
import { LayoutPage } from 'types/additional';

interface PageProps {
  allPosts: Frontmatter[]
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allPosts = await getAllPosts('dev');
  return {
    props: {
      allPosts,
    },
  };
};

const Landing: LayoutPage<PageProps> = ({ allPosts }): ReactElement => {
  const el = useRef<HTMLUListElement>();
  const { timeline } = useContext(TransitionContext) as TransitionContextI;

  useLayoutEffect(() => {
    if (el.current != null) {
      gsap.from(el.current, {
        opacity: 0, y: 20, duration: 0.5, ease: 'power3.out',
        onComplete: () => { if (el.current != null) gsap.set(el.current, { clearProps: 'all' }); },
      });

      timeline.add(
        gsap.to(el.current, {
          opacity: 0, y: 20, duration: 0.5,
          ease: 'power3.out',
        }),
      );
    }
  });

  return (
    <ul className='postList' ref={(ref) => { if (ref != null) el.current = ref; }}>
      {allPosts.map((post) => (
        <li className='post' key={post.slug}>
          <Link href={`/dev/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return <PostListLayout className='blue-theme'>{page}</PostListLayout>;
};

export default Landing;
