/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  dirs: ['context', 'hooks', 'types', 'util', 'pages'], //eslint extra scan dirs
  pageExtensions: ['ts', 'tsx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/sass')]
  }
}
