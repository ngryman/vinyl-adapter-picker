# vinyl-adapter-picker

[![Greenkeeper badge](https://badges.greenkeeper.io/ngryman/vinyl-adapter-picker.svg)](https://greenkeeper.io/)

> Protocol based vinyl adapter picker.

[![travis][travis-image]][travis-url] [![codecov][codecov-image]][codecov-url]

[travis-image]: https://img.shields.io/travis/ngryman/vinyl-adapter-picker.svg?style=flat
[travis-url]: https://travis-ci.org/ngryman/vinyl-adapter-picker
[codecov-image]: https://img.shields.io/codecov/c/github/ngryman/vinyl-adapter-picker.svg
[codecov-url]: https://codecov.io/github/ngryman/vinyl-adapter-picker


**vinyl-adapter-picker** lets you register [vinyl adapters] and use them depending on the protocol
part of [globs].

## Install

```bash
npm install --save vinyl-adapter-picker
```

## Usage

```javascript
const vp = require('vinyl-adapter-picker')
const vfs = require('vinyl-fs')
const vhttp = require('vinyl-http')

// add default adapter
vp.add(null, vfs)
// add `http` adapter
vp.add('http', vfs)

// push local files to remote
vp.src('dist/*')
  .pipe(vp.dest('http://example.org/'))
```

## API

### `add(protocol, adapter)`

Register an adapter for the given protocol. It will then be available via [src] and [dest].

#### `protocol` <sup><sub>`{string|null}`</sub></sup>

Protocol to associate the adapter with. It must be the protocol part of a standard `uri`.

If `null` is specified, it registers a *default adapter* that will be used if a `glob` does not
contain any protocol part (i.e `*.txt`, `./*.txt`).

#### `adapter` <sup><sub>`{object}`</sub></sup>

Adapter that must provide `src` and `dest` functions.

**Example**

```javascript
const vfs = require('vinyl-fs')

// explicit protocol
vp.add('file', vfs)
vp.src('file://*.txt')

// default protocol
vp.add(null, vfs)
vp.src('*.txt')
```

### `remove(protocol)`

Remove the associated adapter.

#### `protocol` <sup><sub>`{string|null}`</sub></sup>

Protocol for which the associated adapter is removed.

### `src(globs[, options])` and `dest(globs[, options])`

Return a stream of *vinyl* [File] objects.

#### `globs` <sup><sub>`{string|array}`</sub></sup>

`globs` that are used to create the stream. Given the protocol part of each `glob`, the appropriate
adapter is used.

#### `options` <sup><sub>`{object}`</sub></sup>

Options passed to underlying adapter.

## License

MIT © [Nicolas Gryman](http://ngryman.sh)


[vinyl adapters]: https://github.com/gulpjs/vinyl-fs#what-is-a-vinyl-adapter
[globs]: https://github.com/gulpjs/vinyl-fs#globs
[src]: #srcglobs-options-and-destglobs-options
[dest]: #srcglobs-options-and-destglobs-options
[File]: https://github.com/gulpjs/vinyl#file
