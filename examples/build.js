require=function e(t,n,r){function s(o,a){if(!n[o]){if(!t[o]){var u="function"==typeof require&&require;if(!a&&u)return u(o,!0);if(i)return i(o,!0);var c=Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}for(var i="function"==typeof require&&require,o=0;r.length>o;o++)s(r[o]);return s}({"/Users/jim/dev/gaston/node_modules/browserify/node_modules/os-browserify/browser.js":[function(e,t,n){n.endianness=function(){return"LE"},n.hostname=function(){return"undefined"!=typeof location?location.hostname:""},n.loadavg=function(){return[]},n.uptime=function(){return 0},n.freemem=function(){return Number.MAX_VALUE},n.totalmem=function(){return Number.MAX_VALUE},n.cpus=function(){return[]},n.type=function(){return"Browser"},n.release=function(){return"undefined"!=typeof navigator?navigator.appVersion:""},n.networkInterfaces=n.getNetworkInterfaces=function(){return{}},n.arch=function(){return"javascript"},n.platform=function(){return"browser"},n.tmpdir=n.tmpDir=function(){return"/tmp"},n.EOL="\n"},{}],"/Users/jim/dev/gaston/node_modules/browserify/node_modules/process/browser.js":[function(e,t){function n(){if(!o){o=!0;for(var e,t=i.length;t;){e=i,i=[];for(var n=-1;t>++n;)e[n]();t=i.length}o=!1}}function r(){}var s=t.exports={},i=[],o=!1;s.nextTick=function(e){i.push(e),o||setTimeout(n,0)},s.title="browser",s.browser=!0,s.env={},s.argv=[],s.version="",s.versions={},s.on=r,s.addListener=r,s.once=r,s.off=r,s.removeListener=r,s.removeAllListeners=r,s.emit=r,s.binding=function(){throw Error("process.binding is not supported")},s.cwd=function(){return"/"},s.chdir=function(){throw Error("process.chdir is not supported")},s.umask=function(){return 0}},{}],"/Users/jim/dev/vjs/examples/index.js":[function(e){var t=e("../lib/util/log"),n=e("../lib/base"),r=new n({name:"a",a:"a",a2:"a",deep:{level1:{name:"a",level2:{name:"a",level3:{name:"a",blurf:"a"}}}}}),s=new r.$Constructor({name:"b",b:"b",a:"b",deep:{level1:{name:"b"}}});s._$name="b";var i=new s.$Constructor({name:"c",b:"c",c:"c",birthDay:"",img:"",pass:"",email:"",deep:{level1:{level2:{name:"c"}}}});i._$name="c";var o=e("../lib/util/perf");t("OBJECTS","a:",r.$toString(),"\n\nb:",s.$toString(),"\n\nc:",i.$toString()),t("THIS SHOULD BE C!",i.deep.level1.level2.level3.$parent.$parent.$parent.$parent.name._$val);var a=i.$Constructor,u=1e5;o({log:t,name:"perf test n="+u,method:function(){for(var e=[],t=0;u>t;t++){var n={name:t,birthDay:"10-20-"+t,img:"http://kittens.com?"+t,pass:"xxxxx"+t,email:"james@james.com"+t},r=new a(n);e.push(r)}}})},{"../lib/base":"/Users/jim/dev/vjs/lib/base/index.js","../lib/util/log":"/Users/jim/dev/vjs/lib/util/log.js","../lib/util/perf":"/Users/jim/dev/vjs/lib/util/perf.js"}],"/Users/jim/dev/vjs/lib/base/context.js":[function(e){"use strict";var t=e("./index.js"),n=Object.defineProperty,r=t.prototype;n(r,"$setKeyInternal",{value:function(e,t,n){n?n._$parent!==this?this[e]=new n.$Constructor(t,this):n.$set(t):(this[e]=new this.$children.$Constructor(t,this),this[e]._$key=e,this.hasOwnProperty("_$Constructor")&&this.$createContextGetter.call(this,e))}}),n(r,"$setKey",{value:function(e,t){var n="_"+e,r=this[n];r?this.$setKeyInternal(n,t,r):this.$setKeyInternal(e,t,this[e])}}),n(r,"$createContextGetter",{value:function(e){this["_"+e]=this[e];for(var t in this[e])"_"===t[0]||this[e]["_"+t]||this[e].$createContextGetter(t);n(this,e,{get:function(){var t=this["_"+e];return this.hasOwnProperty("_"+e)?this._$context?(t._$contextPath=this._$contextPath.concat([e]),t._$context=this._$context):(t._$contextPath=null,t._$context=null):(t._$context=this,t._$contextPath=[e]),t},set:function(t){this["_"+e]=t}})}}),n(r,"$parent",{get:function(){return this._$contextPath&&1===this._$contextPath.length?this._$context:this._$parent},set:function(e){this._$parent=e}})},{"./index.js":"/Users/jim/dev/vjs/lib/base/index.js"}],"/Users/jim/dev/vjs/lib/base/index.js":[function(e,t,n){"use strict";t.exports=n=function(e,t){t&&(this._$parent=t),e&&this.$set(e)};var r=n.prototype,s=Object.defineProperty;s(r,"$fromBase",{get:function(){return this.__proto__}}),s(r,"$children",{value:{$Constructor:n},writable:!0}),s(r,"$path",{get:function(){for(var e=[],t=this;t&&t._$key;)e.unshift(t._$key),t=t.$parent;return e}}),s(r,"$Constructor",{set:function(){},get:function(){if(!this.hasOwnProperty("_$Constructor")){for(var e in this)"_"===e[0]||this["_"+e]||this.$createContextGetter.call(this,e);s(this,"_$Constructor",{value:function(e,t){t&&(this._$parent=t),e&&this.$set(e)}}),this._$Constructor.prototype=this}return this._$Constructor}}),e("./util"),e("./context"),e("./val"),e("./set")},{"./context":"/Users/jim/dev/vjs/lib/base/context.js","./set":"/Users/jim/dev/vjs/lib/base/set.js","./util":"/Users/jim/dev/vjs/lib/base/util.js","./val":"/Users/jim/dev/vjs/lib/base/val.js"}],"/Users/jim/dev/vjs/lib/base/set.js":[function(e){"use strict";var t=e("./index.js"),n=Object.defineProperty,r=t.prototype,s=e("../util");n(r,"$set",{value:function(e){if(s.isPlainObj(e))for(var t in e)"$val"===t?this._$val=e[t]:this.$setKey(t,e[t]);else this._$val=e}})},{"../util":"/Users/jim/dev/vjs/lib/util/index.js","./index.js":"/Users/jim/dev/vjs/lib/base/index.js"}],"/Users/jim/dev/vjs/lib/base/util.js":[function(e){"use strict";var t=e("./index.js"),n=t.prototype,r=Object.defineProperty;r(n,"$convert",{value:function(e){var t=e&&e.fnToString,n={};for(var r in this)"_"!==r[0]&&(n[r]=this[r].$convert&&this[r].$convert()||this[r]);return this._$val&&(n.$val=t&&"function"==typeof this._$val?this._$val+"":this._$val),n}}),r(n,"$toString",{value:function(){return JSON.stringify(this.$convert({fnToString:!0}),!1,2)}}),r(n,"$keys",{get:function(){var e=[];for(var t in this)e.push(t);return e}})},{"./index.js":"/Users/jim/dev/vjs/lib/base/index.js"}],"/Users/jim/dev/vjs/lib/base/val.js":[function(e){"use strict";var t=e("./index.js"),n=Object.defineProperty,r=t.prototype;n(r,"_$getterContext",{writable:!0,configurable:!0}),n(r,"$getVal",{value:function(){if(this._$val){if("function"==typeof this._$val){var e=this._$getterContext;return e&&(e="$parent"===this._$getterContext._$val?this.$parent:"function"==typeof this._$getterContext._$val?this._$getterContext._$val.call(this):this),this._$val.call(e||this)}return this._$val}return this}}),n(r,"$val",{get:function(){return this.$getVal()},set:function(e){this.$set(e)}})},{"./index.js":"/Users/jim/dev/vjs/lib/base/index.js"}],"/Users/jim/dev/vjs/lib/util/index.js":[function(e,t,n){var r=e("../base");n.isPlainObj=function(e){return"object"==typeof e&&!(e instanceof r)}},{"../base":"/Users/jim/dev/vjs/lib/base/index.js"}],"/Users/jim/dev/vjs/lib/util/log.js":[function(e,t){var n,r="undefined"==typeof window;r||(document.body.style.fontFamily="andale mono",document.body.style.fontSize="12px",document.body.style.lineHeight="11px",window.gc(),n=function(){var e=document.createElement("hr");document.body.appendChild(e);for(var t in arguments){var n=document.createElement("div");n.style.backgroundColor="#eee",n.style.padding="5px";var r=arguments[t];r&&r.$toString&&(r=r.$toString()),n.innerHTML="string"==typeof r?r.replace(/(\r)|(\n)/g,"<br/>").replace(/ /g,"&nbsp;").replace(/\\n/g,"<br/>&nbsp;&nbsp;"):r,document.body.appendChild(n)}window.requestAnimationFrame(function(){document.body.scrollTop=document.body.scrollHeight})}),t.exports=n||console.log},{}],"/Users/jim/dev/vjs/lib/util/perf.js":[function(e,t,n){(function(r){function s(e,t,r,s,i,o,a){var u,c,l,v,f,d=n.now(),p=n.memory();return t||(t="TEST PERFORMANCE"),f=s?e.apply(s,i):e.apply(this,i),v=n.now(),u=n.memory(),c=u-p,l=v-d-(f||0),r?r(l/1e3,u-p):o||(a||console.log)(t,"\nparse time: "+(v-d)/1e3+" sec"+(c?"\nmemory used (approximate): "+c/1024+" mb":"")),l}function i(e,t,r){e.complete?e.complete(t,r,e,n.average(t)[0],n.average(t)[1]):(e.log||console.log)(e.name," n="+e.loop+"\nparse time:"+(e.extensive?" \n\n"+t.join(" sec\n")+" sec\n\n":"")+"average: "+n.average(t)[1]+" sec\ntotal: "+n.average(t)[0]+" sec\n")}var o,a="undefined"==typeof window;a&&(o=e("os")),t.exports=n=function(e,t){if(t&&"string"==typeof e)return s(t,e);if("function"==typeof e)return s(e);if(e instanceof Object){if(e.name||(e.name="performance test"),e.loop){var r=n.memory(),o=[],a=[],u=function(e,t){o.push(e),t&&a.push(t)};if(e.interval)var c=0,l=setInterval(function(){c++,c===e.loop-1?(clearInterval(l),i(e,o,a,r)):s(e.method,!1,u)},e.interval);else{for(var v=e.loop;v>0;v--)s(e.method,!1,u);i(e,o,a,r)}return n.average(o)}return s(e.method,e.name,e.complete,e.call,e.args,e.nolog,e.log)}},n.now=function(){return a?1e3*r.hrtime()[0]+1e-6*r.hrtime()[1]:window.performance&&window.performance.now?window.performance.now():(new Date).getTime()},n.memory=function(){return a?976562e-9*r.memoryUsage().heapUsed:window&&window.performance&&window.performance.memory?976562e-9*window.performance.memory.usedJSHeapSize:0},n.average=function(e){for(var t=0,n=e.length-1;n>=0;n--)t+=e[n];return[t,t/e.length]}}).call(this,e("_process"))},{_process:"/Users/jim/dev/gaston/node_modules/browserify/node_modules/process/browser.js",os:"/Users/jim/dev/gaston/node_modules/browserify/node_modules/os-browserify/browser.js"}],"package.json":[function(e,t){t.exports={name:"ls",version:"1.0.2",author:"Vigour.io <dev@vigour.io>",repository:{type:"git",url:"https://github.com/vigour-io/vigour-js.git",branch:"master"},main:"lib/index.js",engines:{node:">=0.10.0"},scripts:{test:"test/test.js"},description:"A javascript framework created and used by Vigour",bugs:{url:"https://github.com/vigour-io/vigour-js/issues"},dependencies:{lodash:"3.6.x",promise:"6.x.x"},homepage:"https://github.com/vigour-io/vigour-js-objects",directories:{example:"examples",test:"test"},keywords:["javascript","framework","browserify","performance","crossplatform"],license:"GPL",devDependencies:{}}},{}]},{},["/Users/jim/dev/vjs/examples/index.js"]);