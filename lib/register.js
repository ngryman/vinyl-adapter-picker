'use strict'

const handlers = require('./handlers')

function register(protocol, src, dest) {
  // sanity check
  if ('function' !== typeof src)
    throw new Error('"src" must be a function')
  if ('function' !== typeof dest)
    throw new Error('"dest" must be a function')

  // add ':' suffix to an explicit protocol
  if (null !== protocol)
    protocol = `${protocol}:`

  handlers.set(protocol, { src, dest })
}

module.exports = register
