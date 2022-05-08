// All credits to: https://leerob.io/snippets/update-mdx-meta

import { parse, resolve } from 'path';
import { remark } from 'remark';
// import { readSync, write } from 'to-vfile';
import { promises }from 'fs';
import { execa } from 'execa';
import matter from 'gray-matter';

// Get modified .mdx files
const getMdxFilesFromCommit = async () => {
  const res = await execa('git', ['diff', '--name-only', '--cached']);
  const files = res.stdout;
  if (files) {
    return files.split('\n').filter((file) => parse(file).ext === '.mdx' && file.includes('posts/'));
  }
  return '';
};

const updateMeta = async (paths) => {
  await Promise.all(
    paths.map(async (path) => {
      const file = await promises.readFile(path);
      console.log({ file });
      const res = matter(file);
      res.data.lastEdited = new Date().toISOString()
      const updatedFile = matter.stringify(res.content, res.data);
      console.log(updatedFile);
      await promises.writeFile(path, updatedFile);
      //   .use(mdxMetadata, {
      //     meta: {
      //       lastEdited: new Date().toISOString(),
      //     },
      //   })
      //   .use(stringify, {
      //     fences: true,
      //     listItemIndent: '1',
      //   })
      //   .process(file);

      // const contents = result.toString();

      // await write({
      //   path,
      //   contents,
      // });
    }),
  );
};

const add = async (files) => {
  return execa('git', ['add', ...[files]]);
}

const updateModifiedFiles = async () => {
  const paths = await getMdxFilesFromCommit();
  console.log({ paths });
  if (paths.length > 0) {
    await updateMeta(paths);
    await add(paths);
  }
};

updateModifiedFiles();
