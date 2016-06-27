'use strict'

const url = require('url')
const merge = require('merge-stream')

const handlers = new Map()

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

function handle(type, glob, options) {
  const uri = parse(glob)
  const handler = handlers.get(uri.protocol)

  if (!handler) {
    throw new Error(`Unknown protocol: ${uri.protocol}`)
  }

  return handler[type](uri.path, options)
}

function src(glob, options) {
  if (Array.isArray(glob)) {
    const streams = glob.map(glob => handle('src', glob, options))
    return merge.apply(null, streams)
  }
  return handle('src', glob, options)
}

function dest(glob, options) {
  return handle('dest', glob, options)
}

function add(protocol, src, dest) {
  handlers.set(protocol, { src, dest })
}

function remove(protocol) {
  handlers.delete(protocol)
}

function clear() {
  handlers.clear()
}

module.exports = { src, dest, add, remove, clear }
