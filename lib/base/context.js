"use strict";

var Base = require('./index.js')
var define = Object.defineProperty
var proto = Base.prototype

define( proto, '$setKeyInternal', {
  value:function( key, value, field ) {
    if(field) {
      if(field._$parent !== this) {
        this[key] = new field.$Constructor( value, this )
      } else {
        field.$set( value )
      }
    } else {
      this[key] = new this.$children.$Constructor( value, this )
      this[key]._$key = key 

      //adds 3% extra slowness (purely for the check)
      //try to remove constructor when instance is created and check if a normal if(!) is faster
      if(this.hasOwnProperty( '_$Constructor' )) {
        //this can be optimized
        this.$createContextGetter.call(this, key)
      }

    }
  }
})

define( proto, '$setKey', {
  value:function( key, value ) {
    var privateField = '_'+key
    var field = this[ privateField ]
    if(field) {
      this.$setKeyInternal( privateField, value, field )
    } else {
      this.$setKeyInternal( key, value, this[key] )
    } 
  }
})

define( proto, '$createContextGetter', {
  value:function( key$ ) {
    this['_'+key$] = this[key$]

    for( var key$$ in this[key$] ) {
      if(key$$[0]!=='_' && !this[key$]['_'+key$$]) {
        this[key$].$createContextGetter( key$$ )
      }
    }

    define( this, key$, {
      get:function() {
        var field = this['_'+key$]
        if(!this.hasOwnProperty( '_'+key$ )) {
          field._$context = this
          //can be optmized (check if context path and equal)
          field._$contextPath = [ key$ ]
        } else if( this._$context ) {
          //this has to become faster..
          //also a lot of potential to break (e.g. doing the same get twice...)
          field._$contextPath = this._$contextPath.concat([ key$ ])
          field._$context = this._$context
        } else {
          //clears context info
          field._$contextPath = null
          field._$context = null
        }
        return field
      },
      set:function(val) {
        this['_'+key$] = val
      }
    })

  }
})

define( proto, '$parent', {
  get:function() {
    if(this._$contextPath) {
      if(this._$contextPath.length === 1) {
        return this._$context
      }
    }
    return this._$parent 
  },
  set:function(val) {
    this._$parent = val
  }
})