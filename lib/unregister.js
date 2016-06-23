'use strict'

const handlers = require('./internal/handlers')

function unregister(protocol) {
  handlers.remove(protocol)
}

module.exports = unregister
