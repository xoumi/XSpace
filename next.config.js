/** @type {import('next').NextConfig} */
const path = require('path')

module.exports = {
  pageExtensions: ['ts', 'tsx'],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')]
  }
}
