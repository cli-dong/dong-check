/*
 * dong-check
 * https://github.com/crossjs/dong-check
 *
 * Copyright (c) 2015 crossjs
 * Licensed under the MIT license.
 */

'use strict';

module.exports = {
  command: 'check',
  description: '代码检查',
  options: [{
    name: 'src',
    alias: 's',
    description: '文件路径，支持 glob',
    defaults: '**/*.js'
  }, {
    name: 'threshold',
    alias: 't',
    description: '最大允许显示的错误数量',
    defaults: 10
  }],
  bootstrap: require('./lib/check')
}
