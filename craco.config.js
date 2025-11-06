const path = require('path')

module.exports = {
  webpack: {
// Temp comment
    alias: {
      '@': path.resolve(__dirname, 'src/')
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
