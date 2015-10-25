var Observable = require('../../../../../lib/observable/')
var tracking = require('../../../../../lib/tracking/')
var trackerEmitter = require('../../../../../lib/tracking/emitter')

describe('default', function () {
  var exampleReference = new Observable({
    exampleKey: {
      key: 'aReference'
    }
  })

  var exampleObservable = new Observable({
    key: 'a',
    b: {
      val: exampleReference.exampleKey,
      inject: tracking,
      on: {
        data: function (data, event) {},
        error: function (data, event) {}
      },
      track: true
    }
  })

  it('reference (other event origin)', function () {
    trackerEmitter.services.test = function (obj) {
      expect(obj.eventobject.eventOriginator.val).to.equal('aReference')
    }
    exampleReference.exampleKey.val = 'rick'
    delete trackerEmitter.services.test
  })

  it('should contain all default keys', function () {
    trackerEmitter.services.test = function (obj) {
      expect(obj.id.val).to.equal('a.b._on.data')
      expect(obj.app.val).to.equal('my app id')
      expect(obj).to.have.deep.property('eventobject')
      expect(obj.eventobject.eventOriginator.val).to.equal('a')
      expect(obj.eventobject.eventType.val).to.equal('data')
    }
    exampleObservable.b.emit('data')
    delete trackerEmitter.services.test
  })

  it('should track an error event correctly', function () {
    trackerEmitter.services.test = function (obj) {
      expect(obj.eventobject.metaMessage).to.be.ok
      expect(obj.eventobject.eventType.val).to.equal('error')
    }
    exampleObservable.b.emit('error')
    delete trackerEmitter.services.test
  })

  //
})
