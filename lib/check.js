'use strict';

var path = require('path')

var jshint = require('gulp-jshint')
var map = require('map-stream')
var log = require('spm-log')
var vfs = require('vinyl-fs')

module.exports = function(options) {
  var dest = process.cwd()

  var err = 0

  vfs.src(options.src.split(' '), {
      dot: false
    })
    .pipe(jshint())
    // .pipe(jshint.reporter('default'))
    .pipe(map(function(file, cb) {
      if (!file.jshint.success) {
        log.info('check', '文件 "' + path.relative(dest, file.path) + '" 存在如下错误：')

        file.jshint.results.forEach(function(result) {
          if (result.error && err++ < options.threshold) {
            log.error('error', '  - ' +
              // ', code ' + result.error.code +
              '' + result.error.reason +
              ' (Line ' + result.error.line +
              ', Column ' + result.error.character +
              ')')
          }
        })

        if (err >= options.threshold) {
          log.info('check', '错误太多了，仅显示前 ' + options.threshold + ' 条')
          process.exit(1)
        }
      }

      cb(null, file)
    }))
    .on('end', function() {
      if (!err) {
        log.info('check', '`' + options.src + '` 已通过 JSHINT 检查')
      }
    })
}
