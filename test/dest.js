import test from 'ava'
import vp from '../'
import spy from 'spy'

function noop() {}

test('throw error on unknown protocol', t => {
  t.throws(() => vp.dest('1337://*.txt'), 'Unknown protocol: 1337')
})

test('use a registered protocol', t => {
  const dest = spy()

  vp.add('file', { src: noop, dest })
  vp.dest('file://*.txt', { read: false })
  vp.remove('file')

  t.true(dest.calledWith('*.txt', { read: false }))
})
