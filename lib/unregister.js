'use strict'

const handlers = require('./handlers')

function unregister(protocol) {
  // add ':' suffix to an explicit protocol
  if (null !== protocol)
    protocol = `${protocol}:`

  handlers.delete(protocol)
}

module.exports = unregister
