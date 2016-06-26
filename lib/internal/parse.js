'use strict'

const url = require('url')

function parse(glob) {
  // parse protocol, removing trailing :
  const uri = url.parse(glob)
  if (uri.protocol) {
    uri.protocol = uri.protocol.slice(0, -1)
  }

  // remove leading slash if present
  if ('/' === uri.path[0]) {
    uri.path = uri.path.slice(1)
  }

  return uri
}

module.exports = parse
