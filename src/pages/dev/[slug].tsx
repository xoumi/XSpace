import type { GetStaticPaths, GetStaticProps } from 'next'
import {
  useLayoutEffect, useContext, useRef, useMemo, useEffect
} from 'react'
import { getMDXExport } from 'mdx-bundler/client'
import { animate } from 'motion'

import PostListLayout from 'components/layout/PostListLayout';
import { getAllPaths, getPost } from 'util/posts';
import type { ParsedFM, Toc } from 'types/mdx';
import { TransitionContext } from 'context/TransitionContext';
import type { TransitionContextI } from 'types/TransitionContext';

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

const Post = ({ code, frontmatter, setMeta }: ParsedFM): React.ReactElement => {
  const Component = useMemo(() => {
    const mdxExport = getMDXExport<{ toc: Toc[] }, unknown>(code);
    toc = mdxExport.toc;

    return mdxExport.default;
  }, [code]);

  const el = useRef<HTMLElement>();
  const { setSequence } = useContext(TransitionContext) as TransitionContextI;
  useLayoutEffect(() => {
    if (el.current != null && el.current != undefined) {
      animate('html', { '--simplebar-opacity': 1 }, { duration: 0.5});
      animate(el.current,
        { transform: `translateY(20px)`, opacity: 0 },
        { duration: 0.5, direction: 'reverse', easing: [.7, .2, .35, 1] }
      ).finished.then(() => {
        el.current?.removeAttribute('style');
      })

      setSequence([
        [ el.current, { y: 20, opacity: 0 }, { duration: 0.5, easing: [.7, .2, .35, 1] } ],
        [ 'html', {'--simplebar-opacity': 0}, { duration: 0.5 } ]
      ]);
    }
  }, []);
  useEffect(() => setMeta && setMeta({ toc, fm: frontmatter }), [])

  return (
    <article
      id="post"
      ref={(ref) => { if (ref != null) el.current = ref; }}
    >
      <Component />
    </article>
  );
};

Post.getLayout = function getLayout(page: React.ReactElement) {
  return <PostListLayout className='blue-theme'>{page}</PostListLayout>
};

export default Post;
