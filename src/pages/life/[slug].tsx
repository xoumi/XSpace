import type { GetStaticPaths, GetStaticProps } from 'next';
import { getAllPaths, getPost } from 'util/posts';
import { getMDXExport } from 'mdx-bundler/client';
import type { ParsedFM } from 'types/frontmatter';
import { useMemo } from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPaths('dev');
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params !== undefined) {
    const { code } = await getPost('dev', params.slug);
    return {
      props: { code },
    };
  }

  return { props: {} };
};

const Post = ({ code }: ParsedFM): React.ReactElement => {
  const Component = useMemo(() => getMDXExport(code).default, [code]);

  return (
    <article style={{ margin: '0 auto', maxWidth: '800px', padding: '48px' }}>
      <Component />
    </article>
  );
};

export default Post;
