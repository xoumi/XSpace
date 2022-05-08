import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Frontmatter, Slug, ParsedFM } from 'types/frontmatter';
import parseMD from './markdown/xdm';

const ROOT_PATH = path.join(process.cwd(), 'posts');

export async function getAllPosts(category: string): Promise<Frontmatter[]> {
  const postsDir = path.join(ROOT_PATH, category);
  const fileNames = await fs.promises.readdir(postsDir);
  const filesPromises: Promise<string>[] = [];
  const slugs: string[] = [];

  fileNames.forEach((fileName) => {
    slugs.push(fileName.replace(/\.mdx?$/, ''));
    const fullPath = path.join(postsDir, fileName);
    filesPromises.push(fs.promises.readFile(fullPath, 'utf-8'));
  });

  const files = await Promise.all(filesPromises);
  return files.map((file, i) => {
    const parsedMatter: Frontmatter = (matter(file).data as Frontmatter);
    return { ...parsedMatter, slug: slugs[i] };
  });
}

export async function getAllPaths(category: string): Promise<Slug[]> {
  const frontmatterList = await getAllPosts(category);
  return frontmatterList.map((fm: Frontmatter) => ({
    params: { slug: fm.slug },
  }));
}

export async function getPost(category: string, slug: string | string[] | undefined): Promise<ParsedFM> {
  if (typeof (slug) === 'string') {
    const postDir = path.join(ROOT_PATH, category, `${slug}.mdx`);
    const source = fs.readFileSync(postDir, 'utf-8');

    return parseMD(source, postDir);
  }
  return { code: '', frontmatter: {} };
}
