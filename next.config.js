/* eslint-disable */
const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
// const withTypescript = require('@zeit/next-typescript') // next.js已经内置了对ts的支持

const isProd = process.env.NODE_ENV === 'production'
const isTest = process.env.NODE_TEST === 'test'

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {}
}


module.exports = withCss(withLess({
  lessLoaderOptions: {
    javascriptEnabled: true,
    importLoaders: 1,
  },
  webpack(config, options) {
    // Further custom configuration here
    return config
  }
}))






