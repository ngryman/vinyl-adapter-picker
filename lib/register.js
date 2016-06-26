'use strict'

const hi5 = require('hi5')
const handlers = require('./internal/handlers')

module.exports = hi5.guard(handlers.set, [
  [ 'protocol', [ String, null ]],
  [ 'src', Function ],
  [ 'dest', Function ]
])
