'use strict'

const handlers = require('./internal/handlers')
const parse = require('./internal/parse')

function dest(globs, options) {
  const uri = parse(globs)
  const handler = handlers.get(uri.protocol)
  return handler.dest(uri.path, options)
}

module.exports = dest
