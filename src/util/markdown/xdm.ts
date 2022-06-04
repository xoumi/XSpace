import path from 'path';
import { bundleMDX } from 'mdx-bundler';
import remarkDirective from 'remark-directive';
import remarkPrism from 'remark-prism';
import remarkSlug from 'remark-slug';
import type { ParsedFM } from 'types/mdx';
import getToc from './toc';
import directives from './directives';

if (process.platform === 'win32') {
  process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'esbuild.exe');
} else {
  process.env.ESBUILD_BINARY_PATH = path.join(process.cwd(), 'node_modules', 'esbuild', 'bin', 'esbuild');
}

const REMARK_PLUGINS = [
  remarkSlug,
  remarkDirective,
  directives,
  getToc,
  remarkPrism,
];

export default async function parseMD(source: string, postDir: string): Promise<ParsedFM> {
  const final = await bundleMDX(source, {
    xdmOptions(options) {
      // eslint-disable-next-line no-param-reassign
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...REMARK_PLUGINS,
      ];
      return options;
    },
    cwd: postDir,
  });
  return final;
}
