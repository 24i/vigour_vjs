'use strict'
describe('instances', function () {
  var Observable = require('../../../../../../lib/observable')

  it('fires condition trigger', function (done) {
    var cnt = 0
    var a = new Observable({
      on: {
        data: {
          condition: function (data, done, event) {
            setTimeout(done, 10)
          },
          val: function () {
            cnt++
            if (cnt === 2) {
              done()
            }
          }
        }
      }
    })
    var b = new a.Constructor() // eslint-disable-line
    a.val = 'a change!'
  })

  it('fires for inherited condition, new listener', function (done) {
    var count = 0
    var passed = 0
    var A = new Observable({
      val: 10,
      on: {
        data: {
          condition (data, cb, event) {
            count += 1
            setTimeout(cb, data)
          }
        }
      }
    })
    var a = new A.Constructor({
      key: 'a',
      on: {
        data: {
          condition (data, cb, event) {
            count += 1
            // gets here twice by the act of setting the condition this has to change
            setTimeout(cb, data)
          },
          val () {
            passed++
            // only fires once for the event
            expect(count).to.equal(2)
            if (count === 2 && passed === 1) {
              done()
            }
          }
        }
      }
    })
    a.val = 20
  })

  describe('references', function () {
    var Observable = require('../../../../../../lib/observable')
    it('should fire conditions over references over instances', function (done) {
      var b = new Observable({
        val: a
      })
      var a = new Observable({
        key: 'a',
        val: b,
        on: {
          data: {
            condition: function (val) {
              expect(val).equals(200)
              done()
            }
          }
        }
      })
      var c = new a.Constructor() //eslint-disable-line
      b.val = 200
    })
  })

  require('./childconstructor')
  require('./context')
})
