/* global describe, it, expect */
// the above shouldn't be necessary, but apparently there is a problem with the js-standard linter...

var Config = require('../../../lib/config')

describe('Config in node.js', function () {
  process.env.CONFIG_PARAM = 'thisIsFromEnvironment'
  var config
  it('should not crash', function () {
    config = new Config()
  })

  it('should look for package.json at the location specified by `_packageDir`',
    function () {
      expect(config).to.have.property('name')
        .which.has.property('val', 'config')
    }
  )

  it('should look for environment variables', function () {
    expect(config).to.have.property('fromEnvironment')
      .which.has.property('val', 'thisIsFromEnvironment')
  })

  it('should have settings from configFiles', function () {
    expect(config).to.have.property('from_configFile')
      .which.has.property('val', true)
  })

  it.skip('should have settings from mergeFiles', function () {
    // run this with `gaston test node config --mergeFiles '["./extra_config2"]'`
    expect(config).to.have.property('from_configFile2')
      .which.has.property('val', true)
  })

  it('should have vigour settings from package', function () {
    expect(config).to.have.property('vigoursetting')
      .which.has.property('val', true)
  })

  it.skip('should resolve inline parameters', function () {
    // run this with `gaston test node config --inlineparam true`
    expect(config).to.have.property('inlineparam')
      .which.has.property('val', true)
  })

  it('should look for package.json at `_packageDir` if provided',
    function () {
      var configTwo = new Config({
        _packageDir: __dirname + '/otherFolder'
      })
      expect(configTwo).to.have.property('name')
        .which.has.property('val', 'otherPackage')
    }
  )

})
