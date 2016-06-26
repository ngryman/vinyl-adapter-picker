import test from 'ava'
import vauto from '../'
import spy from 'spy'

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
