import type { GetStaticProps } from 'next';
import {
  ReactElement, useContext, useLayoutEffect, useRef,
} from 'react';
import { animate } from 'motion'
import Link from 'next/link';
import PostListLayout from 'components/layout/PostListLayout';
import { getAllPosts } from 'util/posts';
import { TransitionContext } from 'context/TransitionContext';
import type { TransitionContextI } from 'types/TransitionContext';
import type { PageProps, Frontmatter } from 'types/mdx';
import { LayoutPage } from 'types/additional';

export const getStaticProps: GetStaticProps<{ allPosts: Frontmatter[] }> = async () => {
  const allPosts = await getAllPosts('dev');
  return {
    props: {
      allPosts,
    },
  };
};

const Landing: LayoutPage<PageProps> = ({ allPosts, setMeta }): ReactElement => {
  const el = useRef<HTMLUListElement>();
  const { setSequence } = useContext(TransitionContext) as TransitionContextI;

  useLayoutEffect(() => {
    if (el.current != null) {
      animate(el.current,
        { transform: `translateY(20px)`, opacity: 0 },
        { duration: 0.5, direction: 'reverse', easing: [.7, .2, .35, 1] },
      ).finished.then(() => {
        el.current?.removeAttribute('style');
        setMeta(null);
      });

      setSequence([[
        el.current,
        { y: 20, opacity: 0 },
        { duration: 0.5, easing: [.7, .2, .35, 1] }
      ]]);
    }
  }, []);

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
