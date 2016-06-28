'use strict'

const url = require('url')
const merge = require('merge-stream')

/** Map of adapters. */
const adapters = new Map()

/**
 * Parse a string uri into an object uri.
 *
 * @protected
 * @param  {string} uri
 * @return {url}
 */
function parse(uri) {
  uri = url.parse(uri)

  // remove protocol trailing `:`
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
 * Internally it gets the associated adapter and call either `src` or `dest`.
 *
 * @protected
 * @param  {('src'|'dest')} type
 * @param  {string}         glob
 * @param  {object}         [options]
 * @return {stream}
 */
function handle(type, glob, options) {
  const uri = parse(glob)
  const adapter = adapters.get(uri.protocol)

  if (!adapter) {
    throw new Error(`Unknown protocol: ${uri.protocol}`)
  }

  return adapter[type](uri.path, options)
}

/**
 * Create a stream of vinyl files given globs using the appropriate adapter.
 *
 * @param  {string|array} globs
 * @param  {object}       [options]
 * @return {stream}
 */
function src(globs, options) {
  if (Array.isArray(globs)) {
    const streams = globs.map(glob => handle('src', glob, options))
    return merge.apply(null, streams)
  }
  return handle('src', globs, options)
}

/**
 * Create a stream of vinyl files given an uri using the appropriate adapter.
 *
 * @param  {string} uri
 * @param  {object} [options]
 * @return {stream}
 */
function dest(uri, options) {
  return handle('dest', uri, options)
}

/**
 * Add a new adapter.
 *
 * @param {string|null} protocol
 * @param {object}      adapter
 */
function add(protocol, adapter) {
  adapters.set(protocol, adapter)
}

/**
 * Remove an adapter.
 *
 * @param {string|null} protocol
 */
function remove(protocol) {
  adapters.delete(protocol)
}

/**
 * Clear all registered adapters.
 */
function clear() {
  adapters.clear()
}

module.exports = { src, dest, add, remove, clear }
