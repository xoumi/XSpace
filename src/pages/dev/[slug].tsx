import type { GetStaticPaths, GetStaticProps } from 'next'
import {
  useLayoutEffect, useContext, useRef, useMemo, useEffect
} from 'react'
import { getMDXExport } from 'mdx-bundler/client'
import PostListLayout from 'components/layout/PostListLayout';
import { getAllPaths, getPost } from 'util/posts';
import type { ParsedFM, Toc } from 'types/mdx';
import { TransitionContext } from 'context/TransitionContext';
import type { TransitionContextI } from 'types/TransitionContext';
import { gsap } from 'gsap';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPaths('dev');
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params !== undefined) {
    const { code, frontmatter } = await getPost('dev', params.slug);
    return {
      props: { code, frontmatter },
    };
  }

  return { props: {} };
};

let toc: Toc[] = [];

const Post = ({ code, frontmatter }: ParsedFM): React.ReactElement => {

  const el = useRef<HTMLElement>();
  const Component = useMemo(() => getMDXExport(code).default, [code]);
  const { timeline } = useContext(TransitionContext) as TransitionContextI;

  useLayoutEffect(() => {
    if (el.current != null) {
      gsap.from('html', {
        '--simplebar-opacity': 0,
        duration: 0.5,
      });
      gsap.from(el.current, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: 0.3,
        ease: 'power3.out',
        onComplete: () => { if (el.current != null) gsap.set(el.current, { clearProps: 'all' }); },
      });

      timeline.add([
        gsap.to('html', {
          '--simplebar-opacity': 0,
          duration: 0.5,
        }),
        gsap.to(el.current, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          ease: 'power3.out',
        }),
      ]);
    }
  useEffect(() => setMeta && setMeta({ toc, fm: frontmatter }), [])

  return (
    <article
      id="post"
      ref={(ref) => { if (ref != null) el.current = ref; }}
    >
      <h1>{frontmatter.title}</h1>
      <Component />
    </article>
  );
};

Post.getLayout = function getLayout(page: React.ReactElement) {
  return <PostListLayout className='blue-theme'>{page}</PostListLayout>
};

export default Post;
