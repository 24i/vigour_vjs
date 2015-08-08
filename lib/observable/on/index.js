"use strict";

var Base = require('../../base')
var Emitter = require('../../emitter')
var util = require('../../util')

var removeInternal = Base.prototype.$removeInternal

//-----------injectable part of the module----------

exports.$flags = {
  $on: require('./constructor')
  //call it constructor or call $Constructor $Class
}

exports.$define = {
  on: function( type, val, key, unique, event ) {
    if( typeof type !== 'string' ) {
      return this.on( '$change', type, val, key, unique )
    } else {
      var path
      var context
      var observable = this
      var level
      if( !this.$on || !this.$on[type] ) {
        var set = { $on: {} }
        set.$on[type] = {}
        context = this._$context
        if( context ) {
          level = this._$contextLevel
          observable = this.$resolveContextSet( set, false )
        } else {
          this.set( set, false )
        }
      }
      observable.$on[type].$addListener( val, key, unique, event )
    }
  }
}