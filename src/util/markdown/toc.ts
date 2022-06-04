import slug from 'slug';
import { valueToEstree } from 'estree-util-value-to-estree';
import { visitParents } from 'unist-util-visit-parents';
import { findBefore } from 'unist-util-find-before';
import type { Plugin } from 'unified';
import { Toc } from 'types/mdx';
import type { Root, Text, Heading, Code } from 'mdast';
import type { LeafDirective } from 'mdast-util-directive';
import { toString } from 'mdast-util-to-string';

const toc: Plugin<[], Root> = () => (tree: Root) => {
  const toc: Toc[] = [];
  let currentHeading: Toc | null = null;

  visitParents(tree, (node) => {
    if (node.type == 'heading') {
      currentHeading = {
        depth: node.depth,
        value: toString(node),
        type: 'heading',
        id: typeof (node?.data?.id) === 'string' ? node.data.id : '',
      };
      toc.push(currentHeading);
    } else if (node.type == 'code') {
      const fileDirectiveNode = findBefore<LeafDirective>(tree, node, 'leafDirective');
      if (fileDirectiveNode && fileDirectiveNode.name == 'file') {
        const id:string = slug((fileDirectiveNode.children[0] as Text).value);
        if (!toc.find(el => el.id === id))
          toc.push({
            depth: currentHeading != null ? currentHeading.depth : 0,
            value: (fileDirectiveNode.children[0] as Text).value,
            type: 'code',
            id
          });
      }
    }
  });

  tree.children.unshift({
    // @ts-ignore
    type: 'mdxjsEsm',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [{
                type: 'VariableDeclarator',
                id: { type: 'Identifier', name: 'toc' },
                init: valueToEstree(toc),
              }],
            },
          },
        ],
      },
    },
  });
};

export default toc;
