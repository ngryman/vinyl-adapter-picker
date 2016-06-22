import test from 'ava'
import vauto from '../'
import path from 'path'
import assert from 'stream-assert'

const fixturesPath = path.join(__dirname, 'fixtures')

test('throw error on unknown protocol', t => {
  t.throws(() => vauto.src('1337://*.txt'), 'Unknown protocol: 1337:')
})

test.cb('use vinyl-fs by default', t => {
  vauto.src('*.txt', { cwd: fixturesPath })
    .pipe(assert.length(2))
    .pipe(assert.first(d => 'a.txt' === d.relative))
    .pipe(assert.second(d => 'b.txt' === d.relative))
    .pipe(assert.end(t.end))
})

test.cb('use vinyl-fs explicitly', t => {
  vauto.src('file://*.txt', { cwd: fixturesPath })
    .pipe(assert.length(2))
    .pipe(assert.first(d => 'a.txt' === d.relative))
    .pipe(assert.second(d => 'b.txt' === d.relative))
    .pipe(assert.end(t.end))
})
