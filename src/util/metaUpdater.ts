import { parse, resolve } from 'path';
import { remark } from 'remark';
import stringify from 'remark-stringify';
import { readSync, write } from 'to-vfile';
import { execa } from 'execa';
import matter from 'gray-matter';

const getMdxFilesFromCommit = async () => {
  const res = await execa('git', ['diff', '--name-only', '--cached']);
  const files = res.stdout;
  if (files) {
    return files.split('\n').filter((file) => parse(file).ext === '.mdx' && file.includes('posts/'));
  }
  return '';
};

const updateMeta = async (paths:string[]) => {
  await Promise.all(
    paths.map((path) => {
      const file = readSync(path);
      console.log({ file });
      const a = matter(file.value as string);
      console.log(a);
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

const updateModifiedFiles = async () => {
  // Get modified .mdx files
  const paths = await getMdxFilesFromCommit();
  console.log({ paths });
  if (paths.length > 0) {
    // Update the lastEdited metadata
    await updateMeta(paths as string[]);
    // Add these changes to the staged commit
    // await add(paths);
  }
};

updateModifiedFiles();
