// var Observable = require('../../../../lib/observable/')
// var tracking = require('../../../../lib/tracking/')
// var trackerEmitter = require('../../../../lib/tracking/emitter')
var Event = require('../../../../lib/event/')
// this is just to log stuff (.toString yields nicer result for events)

// parent and error are still weird

Event.prototype.inject(require('../../../../lib/event/toString'))
describe('Direct tracking', function () {
  describe('Default', function () {
    require('./default')
  })
  describe('Objects', function () {
    require('./object')
  })
  describe('Arrays', function () {
    require('./array')
  })
  describe('Strings', function () {
    require('./string')
  })
})

console.clear()
