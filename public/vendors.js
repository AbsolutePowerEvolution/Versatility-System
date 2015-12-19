/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		1:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"bundle"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ({

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(2), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else {
	    (window.Sammy = window.Sammy || {}).Mustache = factory(window.jQuery, window.Sammy, window.Mustache);
	  }
	}(function ($, Sammy, Mustache) {

	  // <tt>Sammy.Mustache</tt> provides a quick way of using mustache style templates in your app.
	  // The plugin wraps the awesome mustache.js lib created and maintained by Jan Lehnardt
	  // at http://github.com/janl/mustache.js
	  //
	  // Note: As of Sammy 0.7 the Mustache lib is not included in the templates source. Please download
	  // mustache.js and include it before Sammy.Mustache.
	  //
	  // Mustache is a clever templating system that relys on double brackets {{}} for interpolation.
	  // For full details on syntax check out the original Ruby implementation created by Chris Wanstrath at
	  // http://github.com/defunkt/mustache
	  //
	  // By default using Sammy.Mustache in your app adds the <tt>mustache()</tt> method to the EventContext
	  // prototype. However, just like <tt>Sammy.Template</tt> you can change the default name of the method
	  // by passing a second argument (e.g. you could use the ms() as the method alias so that all the template
	  // files could be in the form file.ms instead of file.mustache)
	  //
	  // ### Example #1
	  //
	  // The template (mytemplate.ms):
	  //
	  //       <h1>{{title}}<h1>
	  //
	  //       Hey, {{name}}! Welcome to Mustache!
	  //
	  // The app:
	  //
	  //       var app = $.sammy(function() {
	  //         // include the plugin and alias mustache() to ms()
	  //         this.use('Mustache', 'ms');
	  //
	  //         this.get('#/hello/:name', function() {
	  //           // set local vars
	  //           this.title = 'Hello!'
	  //           this.name = this.params.name;
	  //           // render the template and pass it through mustache
	  //           this.partial('mytemplate.ms');
	  //         });
	  //       });
	  //
	  //       $(function() {
	  //         app.run()
	  //       });
	  //
	  // If I go to #/hello/AQ in the browser, Sammy will render this to the <tt>body</tt>:
	  //
	  //       <h1>Hello!</h1>
	  //
	  //       Hey, AQ! Welcome to Mustache!
	  //
	  //
	  // ### Example #2 - Mustache partials
	  //
	  // The template (mytemplate.ms)
	  //
	  //       Hey, {{name}}! {{>hello_friend}}
	  //
	  //
	  // The partial (mypartial.ms)
	  //
	  //       Say hello to your friend {{friend}}!
	  //
	  // The app:
	  //
	  //       var app = $.sammy(function() {
	  //         // include the plugin and alias mustache() to ms()
	  //         this.use('Mustache', 'ms');
	  //
	  //         this.get('#/hello/:name/to/:friend', function(context) {
	  //           // fetch mustache-partial first
	  //           this.load('mypartial.ms')
	  //               .then(function(partial) {
	  //                 // set local vars
	  //                 context.partials = {hello_friend: partial};
	  //                 context.name = context.params.name;
	  //                 context.friend = context.params.friend;
	  //
	  //                 // render the template and pass it through mustache
	  //                 context.partial('mytemplate.ms');
	  //               });
	  //         });
	  //       });
	  //
	  //       $(function() {
	  //         app.run()
	  //       });
	  //
	  // If I go to #/hello/AQ/to/dP in the browser, Sammy will render this to the <tt>body</tt>:
	  //
	  //       Hey, AQ! Say hello to your friend dP!
	  //
	  // Note: You need to include the mustache.js file before this plugin.
	  //
	  Sammy.Mustache = function(app, method_alias) {

	    // *Helper* Uses Mustache.js to parse a template and interpolate and work with the passed data
	    //
	    // ### Arguments
	    //
	    // * `template` A String template. {{}} Tags are evaluated and interpolated by Mustache.js
	    // * `data` An Object containing the replacement values for the template.
	    //   data is extended with the <tt>EventContext</tt> allowing you to call its methods within the template.
	    // * `partials` An Object containing one or more partials (String templates
	    //   that are called from the main template).
	    //
	    var mustache = function(template, data, partials) {
	      data     = $.extend({}, this, data);
	      partials = $.extend({}, data.partials, partials);
	      return Mustache.to_html(template, data, partials);
	    };

	    // set the default method name/extension
	    if (!method_alias) { method_alias = 'mustache'; }
	    app.helper(method_alias, mustache);
	  };

	  return Sammy.Mustache;

	}));


/***/ }

/******/ });