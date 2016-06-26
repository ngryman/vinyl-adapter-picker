'use strict'

const handlers = new Map()

function get(protocol) {
  // gets the associated handler
  const handler = handlers.get(protocol)
  if (!handler) {
    throw new Error(`Unknown protocol: ${protocol}`)
  }

  return handler
}

function set(protocol, src, dest) {
  handlers.set(protocol, { src, dest })
}

function remove(protocol) {
  handlers.delete(protocol)
}

module.exports.get = get
module.exports.set = set
module.exports.remove = remove
