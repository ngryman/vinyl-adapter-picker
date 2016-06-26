import test from 'ava'
import vauto from '../'
import spy from 'spy'

test('throw error on invalid protocol', t => {
  t.throws(() => vauto.register(123, null, null), "'protocol' must be a String or null")
})

test('throw error on invalid src function', t => {
  t.throws(() => vauto.register('protocol', null, null), "'src' must be a Function")
})

test('throw error on invalid dest function', t => {
  t.throws(() => vauto.register('protocol', function() {}, null), "'dest' must be a Function")
})

test('register a protocol', t => {
  const src = spy(), dest = spy()

  vauto.register('42', src, dest)
  vauto.src('42://*.txt')
  vauto.dest('42://*.txt')

  t.true(src.called)
  t.true(dest.called)
})

test('register a default protocol', t => {
  const src = spy(), dest = spy()

  vauto.register(null, src, dest)
  vauto.src('*.txt')
  vauto.dest('*.txt')

  t.true(src.called)
  t.true(dest.called)
})
