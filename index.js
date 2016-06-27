'use strict'

const url = require('url')
const merge = require('merge-stream')

/** Map of protocol handlers. */
const handlers = new Map()

/**
 * Parse a glob into a `uri`.
 *
 * @protected
 * @param  {string} glob
 * @return {url}
 */
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

/**
 * Handle the given glob.
 * Internally it gets the associated protcol handler and call either `src` or `dest`.
 *
 * @protected
 * @param  {('src'|'dest')} type
 * @param  {string}         glob
 * @param  {object}         [options]
 * @return {stream}
 */
function handle(type, glob, options) {
  const uri = parse(glob)
  const handler = handlers.get(uri.protocol)

  if (!handler) {
    throw new Error(`Unknown protocol: ${uri.protocol}`)
  }

  return handler[type](uri.path, options)
}

/**
 * Create a vinyl stream given a glob using the appropriate vinyl registered adapter.
 *
 * @param  {string|array} glob
 * @param  {object}       [options]
 * @return {stream}
 */
function src(glob, options) {
  if (Array.isArray(glob)) {
    const streams = glob.map(glob => handle('src', glob, options))
    return merge.apply(null, streams)
  }
  return handle('src', glob, options)
}

/**
 * Create a vinyl stream given a glob using the appropriate vinyl registered adapter.
 *
 * @param  {string|array} glob
 * @param  {object}       [options]
 * @return {stream}
 */
function dest(glob, options) {
  return handle('dest', glob, options)
}

/**
 * Add a new protocol handlers.
 *
 * @param {string|null} protocol
 * @param {function}    src
 * @param {function}    dest
 */
function add(protocol, src, dest) {
  handlers.set(protocol, { src, dest })
}

/**
 * Remove protocol handlers.
 *
 * @param {string|null} protocol
 */
function remove(protocol) {
  handlers.delete(protocol)
}

/**
 * Clear all registered protocol handlers.
 */
function clear() {
  handlers.clear()
}

module.exports = { src, dest, add, remove, clear }
