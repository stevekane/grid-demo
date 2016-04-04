var fs = require('fs')
var path = require('path')
var browserify = require('browserify')
var watchify = require('watchify')
var srcPath = path.join('src', 'main.js')
var outPath = path.join('public', 'dist', 'app.js')

var b = browserify({
  entries: [ 'src/main.js' ],
  cache: {},
  packageCache: {},
  plugin: [ watchify ],
  debug: true,
  delay: 100
})
.transform('reactify')
.transform('babelify', { plugins: [ 'transform-object-rest-spread', 'transform-es2015-destructuring' ] })

function onError (e) {
  console.log(e.message)
}

function bundle () {
  console.log('building')
  b.bundle()
  .on('error', onError)
  .pipe(fs.createWriteStream(outPath))
}

bundle()
b.on('update', bundle)
