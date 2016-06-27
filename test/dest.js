import test from 'ava'
import vauto from '../'
import spy from 'spy'

function noop() {}

test('throw error on unknown protocol', t => {
  t.throws(() => vauto.dest('1337://*.txt'), 'Unknown protocol: 1337')
})

test('use a registered protocol', t => {
  const dest = spy()

  vauto.add('file', noop, dest)
  vauto.dest('file://*.txt', { read: false })
  vauto.remove('file')

  t.true(dest.calledWith('*.txt', { read: false }))
})
