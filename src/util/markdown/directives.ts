import { visit } from 'unist-util-visit'
import { findAfter } from 'unist-util-find-after'
import type { Plugin } from 'unified'
import type { Parent, Node, Data } from 'unist'
import { remove } from 'unist-util-remove'

const shortList = (tree: Node<Data>, node: Node<Data>): void => {
  const directiveName = 'shortlist'
  const listNode = findAfter(tree as Parent<Node<Data>>, node, 'list')
  const data = listNode.data ?? (listNode.data = {})
  data.hProperties = { className: directiveName }
  tree = remove(tree, { name: directiveName }) ?? tree
}

interface DirectiveNode extends Node<Data> {
  name?: string
}
const directives: Plugin = () => (tree) => {
  const test = { type: 'leafDirective' }
  visit(tree, test, (node: DirectiveNode) => {
    if (node.name === 'shortlist') shortList(tree, node)
  })
}

export default directives
