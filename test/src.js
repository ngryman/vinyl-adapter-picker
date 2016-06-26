import test from 'ava'
import vauto from '../'
import spy from 'spy'

function noop() {}

test('throw error on unknown protocol', t => {
  t.throws(() => vauto.src('1337://*.txt'), 'Unknown protocol: 1337')
})

test('use a registered protocol', t => {
  const src = spy()

  vauto.add(null, src, noop)
  vauto.src('*.txt')
  vauto.remove(null)

  t.true(src.called)
})
