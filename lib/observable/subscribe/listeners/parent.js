'use strict'
var resolvePattern = function () {}

module.exports = {
  direct (data, event, emitter, pattern, current, mapvalue, map) {
    resolvePattern(this, mapvalue)
    map[this.key] = mapvalue

    // do something with context resolvement
    // var resolver = {
    //   enpoint: this,
    //   map: mapvalue
    // }
    emitter.subField({}, event, this.parent, pattern.sub_parent, current, mapvalue, map)
  },
  reference (data, event, emitter, pattern, current, mapvalue, map) {
    // I don't think this can resolve the pattern
    // pattern = resolvePattern(this, mapvalue)
    map[this.key] = mapvalue
    emitter.subFieldRef({}, event, this.parent, pattern.sub_parent, current, mapvalue, map)
  }
}