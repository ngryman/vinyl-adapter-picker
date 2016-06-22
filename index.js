'use strict'

const handlers = require('./lib/handlers')

// set vinyl-fs as file: protocol handler
handlers.set('file:', require('vinyl-fs'))

module.exports = {
  src: require('./lib/src')
}
