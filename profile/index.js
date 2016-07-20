'use strict'
var npm = require('npm')
var path = require('path')

function installPackage(path) {
  var pkg = require('../adam/package.json')
  installDependencies(pkg.dependencies, '../adam').then(function() {
    console.log('moment of truth.................')
    require('../adam')() // meow
  })
}

function installDependencies(dependencies, baseDir) {
  var packages = Object.keys(dependencies).map(function(name) {
    return name + '@' + dependencies[name]
  })
  return new Promise(function(resolve, reject) {
    npm.load({silent: true}, function(npmEr) {
      if (npmEr) return reject(npmEr)
      npm.commands.install(path.resolve(baseDir), packages, resolve)
    })
  })
}

installPackage('../adam/')
