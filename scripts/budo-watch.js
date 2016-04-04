var budo = require('budo')
var reactify = require('reactify')
var babelify = require('babelify')

budo('./src/main.js', {
  live: true,
  port: 8080,
  dir: 'public',
  serve: 'public/dist/app.js',
  browserify: {
    debug: true,
    out: 'public/dist/app.js',
    transform: [ 
      reactify,
      babelify.configure({ plugins: ['transform-object-rest-spread', 'transform-es2015-destructuring'] })
    ]
  }
})
.on('connect', function (ev) { 
  console.log(ev.uri)
})
.on('update', function (buffer) {
  console.log('fired')
})
