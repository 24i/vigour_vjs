describe('$change emitter - instances', function() {

  var Observable = require('../../lib/observable')
  var measure = {
    a:{},
    b:{},
    c:{}
  }
  var a
  var b
  var c

  it( 'create new observable --> a, add change listener "val"', function() {    
    measure.a.val = { total: 0 }

    a = new Observable({
      $key:'a',
      $on: {
        $change: function( event, meta ) {
          var keyCnt =  measure.a.val[this._$key] 
          measure.a.val.total+=1
          measure.a.val[this._$key] = keyCnt ? (keyCnt+1) : 1 
        }
      }
    })
    expect( measure.a.val.total ).to.equal( 0 )

    a.$val = 'a value'
    expect( measure.a.val.a ).to.equal( 1 )
    expect( measure.a.val.total ).to.equal( 1 )
  })

  it( 'create new a --> b', function() {
    b = new a.$Constructor({
      $key:'b'
    })  
    expect( a.$on._instances.length )
      .msg('a.$on._instances has correct length').to.equal(1)
    expect( a.$on._instances[0] )
      .msg('b is a.$on._instances.total').to.equal(b)

    expect( measure.a.val.b ).to.equal( 1 )
    expect( measure.a.val.total ).to.equal( 2 )
  })

  it( 'change a', function() {
    a.$val = 'a change'
    expect( measure.a.val.a ).msg('a context').to.equal( 2 )
    expect( measure.a.val.b ).msg('b context').to.equal( 2 )
    expect( measure.a.val.total ).to.equal( 4 )
  })

  it( 'create new b --> c', function() {
    c = new b.$Constructor({
      $key:'c'
    }) 
    expect( measure.a.val.a ).msg('a context').to.equal( 2 )
    expect( measure.a.val.b ).msg('b context').to.equal( 2 )
    expect( measure.a.val.c ).msg('c context').to.equal( 1 )
    expect( measure.a.val.total ).to.equal( 5 )
  })

  it( 'change a', function() {
    a.$val = 'a changes again'
    expect( measure.a.val.a ).msg('a context').to.equal( 3 )
    expect( measure.a.val.b ).msg('b context').to.equal( 3 )
    expect( measure.a.val.c ).msg('c context').to.equal( 2 )
    expect( measure.a.val.total ).to.equal( 8 )
  })

  it( 'change b, add property "prop1"', function() {
    b.$val = {
      prop1:true
    } 
    //no update on a (since its out of the context of a)
    expect( measure.a.val.a ).msg('a context').to.equal( 3 )
    expect( measure.a.val.b ).msg('b context').to.equal( 4 )
    expect( measure.a.val.c ).msg('c context').to.equal( 3 )
    expect( measure.a.val.total ).to.equal( 10 )
  })

  it( 'add change listener "second" on b', function() {
    measure.b.second = { total: 0 }
    b.$val = {
      $on: {
        $change: {
          second: function() {
            var keyCnt =  measure.b.second[this._$key] 
            measure.b.second.total+=1
            measure.b.second[this._$key] = keyCnt ? (keyCnt+1) : 1 
          }
        }
      }
    } 

    //no update on a (since its out of the context of a)
    expect( measure.a.val.a ).msg('a context').to.equal( 3 )
    //updates since it has to create its own property .$on for b (and c)
    //hard part here is that it has to resolve instances of b (from the instances of a)
    expect( measure.a.val.b ).msg('b context').to.equal( 5 )
    expect( measure.a.val.c ).msg('c context').to.equal( 4 )
    expect( measure.a.val.total ).to.equal( 12 )

    expect( measure.b.second.total ).to.equal( 0 )

  })

  it( 'change a', function() {
    a.$val = 'again a change!'
    //no update on a (since its out of the context of a)
    expect( measure.a.val.a ).msg('a context').to.equal( 4 )
    expect( measure.a.val.b ).msg('b context').to.equal( 6 )
    expect( measure.a.val.c ).msg('c context').to.equal( 5 )
    expect( measure.a.val.total ).to.equal( 15 )

    expect( measure.b.second.c ).msg('c context (b second)').to.equal( 1 )
    expect( measure.b.second.b ).msg('b context (b second)').to.equal( 1 )
    expect( measure.b.second.total ).to.equal( 2 )
  })

  it( 'change b, add property "prop2"', function() {
    b.$val = {
      prop2:true
    } 
    //no update on a (since its out of the context of a)
    expect( measure.a.val.a ).msg('a context').to.equal( 4 )
    expect( measure.a.val.b ).msg('b context').to.equal( 7 )
    expect( measure.a.val.c ).msg('c context').to.equal( 6 )
    expect( measure.a.val.total ).to.equal( 17 )

    expect( measure.b.second.c ).msg('c context (b second)').to.equal( 2 )
    expect( measure.b.second.b ).msg('b context (b second)').to.equal( 2 )
    expect( measure.b.second.total ).to.equal( 4 )
  })

  it( 'create new c --> d', function() {
    d = new c.$Constructor({
      $key:'d'
    })
    //no update on a (since its out of the context of a)
    expect( measure.a.val.a ).msg('a context').to.equal( 4 )
    expect( measure.a.val.b ).msg('b context').to.equal( 7 )
    expect( measure.a.val.c ).msg('c context').to.equal( 6 )
    expect( measure.a.val.d ).msg('d context').to.equal( 1 )
    expect( measure.a.val.total ).to.equal( 18 )

    expect( measure.b.second.d ).msg('d context (b second)').to.equal( 1 )
    expect( measure.b.second.total ).to.equal( 5 )
  })

  it( 'overwrite change listener "val" on c', function() {

    measure.c.val = { total: 0 }

    c.$val = {
      $on: {
        $change:function( event, meta ) {
          var keyCnt =  measure.c.val[this._$key] 
          measure.c.val.total+=1
          measure.c.val[this._$key] = keyCnt ? (keyCnt+1) : 1 
        }
      }
    }

    //no update on a (since its out of the context of a)
    expect( measure.a.val.a ).msg('a context').to.equal( 4 )
    expect( measure.a.val.b ).msg('b context').to.equal( 7 )
    expect( measure.a.val.c ).msg('c context').to.equal( 6 )
    expect( measure.a.val.d ).msg('d context').to.equal( 1 )
    expect( measure.a.val.total ).to.equal( 18 )

    expect( measure.b.second.c ).msg('c context (b second)').to.equal( 3 )
    expect( measure.b.second.d ).msg('d context (b second)').to.equal( 2 )

    expect( measure.b.second.total ).to.equal( 7 )

    //this is still wrong
    // expect( measure.c.val.d ).msg('d context (c val)').to.equal( 0 )

  })

  it( 'change c', function() {
    c.$val = 'i am changing value to c'

    //no update on a (since its out of the context of a)
    expect( measure.a.val.a ).msg('a context').to.equal( 4 )
    expect( measure.a.val.b ).msg('b context').to.equal( 7 )
    expect( measure.a.val.c ).msg('c context').to.equal( 6 )
    expect( measure.a.val.d ).msg('d context').to.equal( 1 )
    expect( measure.a.val.total ).to.equal( 18 )  

    expect( measure.c.val.c ).msg('c context (c val)').to.equal( 1 )
    expect( measure.c.val.d ).msg('d context (c val)').to.equal( 1 )
    expect( measure.c.val.total ).to.equal( 2 )

    expect( measure.b.second.c ).msg('c context (b second)').to.equal( 4 )
    expect( measure.b.second.d ).msg('d context (b second)').to.equal( 3 )
    expect( measure.b.second.total ).to.equal( 9 )

  })

  it( 'add change passon listener "passon" on c', function() {

    measure.c.passon = { total: 0 }

    var passonTest = new Observable({
      $key:'passonTest'
    })

    c.$val = {
      $on: {
        $change:{
          passon: [
            function( event, meta, base, arg ) {
              var keyCnt =  measure.c.passon[this._$key] 
              measure.c.passon.total+=1
              measure.c.passon[this._$key] = keyCnt ? (keyCnt+1) : 1 
            },  
            passonTest,
            'an argument!'
          ]
        }
      }
    }

    expect( measure.c.val.c ).msg('c context (c val)').to.equal( 1 )
    expect( measure.c.val.d ).msg('d context (c val)').to.equal( 1 )
    expect( measure.c.val.total ).to.equal( 2 )

    expect( measure.b.second.c ).msg('c context (b second)').to.equal( 4 )
    expect( measure.b.second.d ).msg('d context (b second)').to.equal( 3 )
    expect( measure.b.second.total ).to.equal( 9 )

    expect( measure.c.passon.total ).to.equal( 0 )

  })

  it( 'change c', function() {
    c.$val = 'i am changing value again'

    expect( measure.c.val.c ).msg('c context (c val)').to.equal( 2 )
    expect( measure.c.val.d ).msg('d context (c val)').to.equal( 2 )
    expect( measure.c.val.total ).to.equal( 4 )

    expect( measure.b.second.c ).msg('c context (b second)').to.equal( 5 )
    expect( measure.b.second.d ).msg('d context (b second)').to.equal( 4 )
    expect( measure.b.second.total ).to.equal( 11 )

    expect( measure.c.passon.c ).msg('c context (c passon)').to.equal( 1 )
    expect( measure.c.passon.d ).msg('d context (c passon)').to.equal( 1 )
    expect( measure.c.passon.total ).to.equal( 2 )

  })

})