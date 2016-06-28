import test from 'ava'
import vp from '../'
import spy from 'spy'
import intoStream from 'into-stream'
import assert from 'stream-assert'

function noop() {}

test('throw error on unknown protocol', t => {
  t.throws(() => vp.src('1337://*.txt'), 'Unknown protocol: 1337')
})

test('use a registered protocol', t => {
  const src = spy()

  vp.add('file', { src, dest: noop })
  vp.src('file://*.txt', { read: false })
  vp.remove('file')

  t.true(src.calledWith('*.txt', { read: false }))
})

test('use default protocol', t => {
  const src = spy()

  vp.add(null, { src, dest: noop })
  vp.src('*.txt')
  vp.remove(null)
})

test.cb('accept a glob array', t => {
  const srcFile = () => intoStream('file')
  const srcHttp = () => intoStream('http')

  vp.add('file', { src: srcFile, dest: noop })
  vp.add('http', { src: srcHttp, dest: noop })
  vp.src(['file://*.txt', 'http://*.txt'])
    .pipe(assert.first(d => t.is(d.toString(), 'file')))
    .pipe(assert.second(d => t.is(d.toString(), 'http')))
    .pipe(assert.end(t.end))
  vp.clear()
})
