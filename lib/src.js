'use strict'

const handlers = require('./internal/handlers')
const parse = require('./internal/parse')

function src(glob, options) {
  const uri = parse(glob)
  const handler = handlers.get(uri.protocol)
  return handler.src(uri.path, options)
}

module.exports = src
