// All credits to: https://leerob.io/snippets/update-mdx-meta
// I went the gray-matter approach as I'm already using it

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
      const {data, content} = matter(file);
      if(data.created)
        data.updated = new Date().toISOString()
      else
        data.created = new Date().toISOString()

      const updatedFile = matter.stringify(content, data);
      await promises.writeFile(path, updatedFile);
    }),
  );
};

const updateModifiedFiles = async () => {
  const paths = await getMdxFilesFromCommit();
  if (paths.length > 0) {
    await updateMeta(paths);
    await execa('git', ['add', ...[paths]]);
  }
};

updateModifiedFiles();
