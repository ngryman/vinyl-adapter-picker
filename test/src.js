import test from 'ava'
import vauto from '../'
import spy from 'spy'
import intoStream from 'into-stream'
import assert from 'stream-assert'

function noop() {}

test('throw error on unknown protocol', t => {
  t.throws(() => vauto.src('1337://*.txt'), 'Unknown protocol: 1337')
})

test('use a registered protocol', t => {
  const src = spy()

  vauto.add('file', src, noop)
  vauto.src('file://*.txt', { read: false })
  vauto.remove('file')

  t.true(src.calledWith('*.txt', { read: false }))
})

test('use default protocol', t => {
  const src = spy()

  vauto.add(null, src, noop)
  vauto.src('*.txt')
  vauto.remove(null)
})

test.cb('accept a glob array', t => {
  const srcFile = () => intoStream('file')
  const srcHttp = () => intoStream('http')

  vauto.add('file', srcFile, noop)
  vauto.add('http', srcHttp, noop)
  vauto.src(['file://*.txt', 'http://*.txt'])
    .pipe(assert.first(d => t.is(d.toString(), 'file')))
    .pipe(assert.second(d => t.is(d.toString(), 'http')))
    .pipe(assert.end(t.end))
  vauto.clear()
})
