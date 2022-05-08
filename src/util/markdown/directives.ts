import { visit } from 'unist-util-visit'
import { findAfter } from 'unist-util-find-after'
import type { Plugin } from 'unified'
import type { Parent, Node, Data } from 'unist'
import { remove } from 'unist-util-remove'
import { h } from 'hastscript'
import { Root } from 'remark'

const shortList = (tree: Node<Data>, node: Node<Data>): void => {
  console.log('bob')
  const directiveName = 'shortlist'
  const listNode = findAfter(tree as Parent<Node<Data>>, node, 'list')
  const data = listNode.data ?? (listNode.data = {})
  data.hProperties = { className: directiveName }
  tree = remove(tree, { name: directiveName }) ?? tree
}

const directives: Plugin<[], Root> = () => (tree: Root) => {
  visit(tree, { type: 'leafDirective' }, (node) => {
    if (node.name === 'shortlist') shortList(tree, node)
  })
  visit(tree, (node) => {
    if (node.type === 'leafDirective' && node.name === 'file') {
      console.log({ attr: node.attributes, props: node.children })
      const data = node.data || (node.data = {})
      const hast = h('div', node.attributes, data.children)
      data.hName = hast.tagName
      data.hProperties = hast.properties
    }
  })
}

export default directives
