import { valueToEstree } from 'estree-util-value-to-estree'
import { visit } from 'unist-util-visit'
import type { Node, Data, Parent } from 'unist'
import type { Heading } from 'mdast'
import { toString } from 'mdast-util-to-string'

interface IdHeading extends Heading {
  id?: string
  value?: string
}

const toc = () => (tree: Parent<Node<Data>>) => {
  const headings: IdHeading[] = []
  visit(tree, 'heading', (node: Heading) => {
    const heading: IdHeading = {
      ...node,
      depth: node.depth,
      value: toString(node),
      id: typeof (node?.data?.id) === 'string' ? node.data.id : ''
    }
    headings.push(heading)
  })
  tree.children.unshift({
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
                init: valueToEstree(headings)
              }]
            }
          }
        ]
      }
    }
  })
}

export default toc
