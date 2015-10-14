/* global expect, it, describe */
var Observable = require('../../../../../lib/observable')
var SubsEmitter = require('../../../../../lib/observable/subscribe/emitter')
var On = require('../../../../../lib/observable/on/constructor')

describe('multiple instances', function () {
  On.prototype.set({
    properties: {
      spesh: new SubsEmitter({
        key: 'spesh',
        pattern: {
          randomField: true
        }
      })
    }
  })

  var a = new Observable({
    key: 'a'
  })

  it('expect property listener to be added to a', function () {
    a.set({
      on: {
        spesh: function () {}
      }
    })
    console.error(window.obj._on)
    console.error(window.obj === a)
    expect(a._on.property).ok
  })
})
