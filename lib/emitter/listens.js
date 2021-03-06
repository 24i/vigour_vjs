'use strict'
var Base = require('../base')
var ListensStore = module.exports = new Base({
  define: {
    createContextGetter () {}
    // clean this up, just make a thing without context for this -- saves calls on creation
    // super nice extra speed!
  },
  useVal: true
}).Constructor

ListensStore.ListensOnattach = new ListensStore({
  define: {
    removeProperty (property, key) {
      // clean my listnes
      if (key[0] !== '_') {
        var store = property.attach
        for (var storeKey in store) {
          if (store[storeKey] && store[storeKey][1] === this._parent) {
            // console.log('start it! do it!')
            store.removeProperty(store[storeKey], storeKey)

            // REAL HEAVY CHECK DO TEMPORARY TO CLEAN UP SHIT!
            // var obj = Object.getPrototypeOf(store)
            // if (obj[storeKey]) {
            //   console.log('?XXXXXX???', storeKey)
            //   obj.removeProperty(obj[storeKey], storeKey)
            // }


          }
        }
      }
      // console.log('clear', key)
      this[key] = null
    // later cleans up the listens stores
    // removeProperty.call( this, property, key )
    }
  }
}).Constructor

ListensStore.ListensOnBase = new ListensStore({
  define: {
    removeProperty (property, key) {
      if (key[0] !== '_') {
        var store = property.base
        for (var storeKey in store) {
          if (store[storeKey] && store[storeKey] === this._parent) {
            store.removeProperty(store[storeKey], storeKey)
          }
        }
      }
      if (key !== '_parent' && key !== 'key') {
        this[ key ] = null
      }
    // removeProperty.call( this, property, key )
    }
  }
}).Constructor

// removing the listnes on (do this later!)
// function removeProperty( property, key ) {
//   if( this[key] !== null ) {
//     this[key] = null
//     if( key[0] !== '_' && util.isEmpty(this) && this._parent ) {
//       this._parent.removeProperty( this, this.key, false )
//     }
//   }
// }
