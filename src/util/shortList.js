import { visit } from 'unist-util-visit'
import { findAfter } from 'unist-util-find-after'
import { remove } from 'unist-util-remove'

export default function shortList () {
  const extensionName = 'shortlist'
  const test = { type: 'leafDirective', name: extensionName }
  return (tree) => {
    visit(tree, test, (node) => {
      const listNode = findAfter(tree, node, 'list')
      const data = listNode.data || (listNode.data = {})
      data.hProperties = { className: extensionName }
    })
    tree = remove(tree, { name: extensionName })
  }
}
