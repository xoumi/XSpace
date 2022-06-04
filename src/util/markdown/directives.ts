import { visit } from 'unist-util-visit';
import { findAfter } from 'unist-util-find-after';
import slug from 'slug';
import type { Plugin } from 'unified';
import type { Parent, Node, Data, Text } from 'unist';
import { remove } from 'unist-util-remove';
import type { Root } from 'mdast';

const shortList = (tree: Node<Data>, node: Node<Data>): void => {
  const directiveName = 'shortlist';
  console.log({ tree, node });
  // TODO: Fix this
  // const listNode = findAfter(tree as Parent<Node<Data>>, node, 'list');
  // const data = listNode.data ?? (listNode.data = {});
  // data.hProperties = { className: directiveName };
  // tree = remove(tree, { name: directiveName }) ?? tree;
};

const fileName = (tree: Node<Data>, node: Node<Data>): void => {
  const id = slug((node.children[0] as Text).value);
  node.data = {};
  node.data.hName = 'div';
  node.data.hProperties = { className: ['filename'], id  };
}

const directives: Plugin<[], Root> = () => (tree: Root) => {
  visit(tree, (node) => {
    if (node.type === 'leafDirective' && node.name === 'shortlist') { shortList(tree, node); }
  });
  visit(tree, (node) => {
    if (node.type === 'leafDirective' && node.name === 'file') {
      fileName(tree, node);
    }
  });
};

export default directives;
