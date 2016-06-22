'use strict'

const handlers = require('./handlers')

function unregister(protocol) {
  handlers.delete(protocol)
}

module.exports = unregister
