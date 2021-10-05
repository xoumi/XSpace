/** @type {import('next').NextConfig} */
const path = require('path')
const withMDX = require('@next/mdx')()
module.exports = withMDX()

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
})
