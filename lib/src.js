'use strict'

const url = require('url')
const handlers = require('./handlers')

function src(globs, options) {
  // parse protocol
  const uri = url.parse(globs)

  // gets the associated handler
  const handler = handlers.get(uri.protocol)
  if (!handler)
    throw new Error(`Unknown protocol: ${uri.protocol}`)

  // remove leading slash if present
  let path = uri.path.slice(1)

  return handler.src(path, options)
}

module.exports = src
