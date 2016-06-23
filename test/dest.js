import test from 'ava'
import vauto from '../'
import path from 'path'
import assert from 'stream-assert'
import intoStream from 'into-stream'
import File from 'vinyl'

const fixturesPath = path.join(__dirname, 'fixtures')
const outPath = path.join(fixturesPath, 'out')

function noop() {}

test('throw error on unknown protocol', t => {
  t.throws(() => vauto.dest('1337://*.txt'), 'Unknown protocol: 1337')
})

test.cb('use a registered protocol', t => {
  const dest = () => assert.end(t.end)

  const file = new File({
    base: fixturesPath,
    cwd: fixturesPath,
    path: path.join(fixturesPath, 'a.txt'),
    contents: null
  })

  vauto.register(null, noop, dest)

  intoStream.obj(file)
    .pipe(vauto.dest(outPath))
})
