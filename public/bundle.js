webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(191);
	var Sammy = __webpack_require__(192);
	__webpack_require__(193);

	__webpack_require__(196);

	Sammy('#main').run('#/');

/***/ },

/***/ 191:
/***/ function(module, exports) {

	module.exports = null;

/***/ },

/***/ 192:
/***/ function(module, exports) {

	module.exports = Sammy;

/***/ },

/***/ 194:
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },

/***/ 195:
/***/ function(module, exports) {

	module.exports = Mustache;

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(197);
	__webpack_require__(200);

	__webpack_require__(248);

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(198);
	__webpack_require__(199);

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(192);

	Sammy('#main', function () {
	  console.log('hello');
	  this.use('Mustache', 'ms');

	  this.get('#/user/signin', function (context) {
	    console.log('signin');
	    context.partial('/templates/user/signin.ms');
	  });

	  this.post('#/user/signin', function (context) {
	    console.log(context);
	    console.log('Username: ' + context.params.username);
	    console.log('Password: ' + context.params.password);
	    return false;
	  });
	});

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	__webpack_require__(193);

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/user/property', function (context) {
	    console.log('property');
	    context.partial('/templates/user/property.ms').then(function () {
	      propertyBindEvent();
	    });
	  });
	});

	function propertyBindEvent() {
	  $('#property_container #property_system').click(function () {
	    $('#property_system').addClass('purple darken-4').css('color', 'white');
	    $('#property_history').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $('#property_system_content').css('display', 'block');
	    $('#property_history_content').css('display', 'none');
	  });

	  $('#property_container #property_history').click(function () {
	    $('#property_system').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $('#property_history').addClass('purple darken-4').css('color', 'white');
	    $('#property_system_content').css('display', 'none');
	    $('#property_history_content').css('display', 'block');
	  });

	  var modalTarget;
	  $('#property_container').find('.modal-trigger').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    modalTarget = $(this).data('modal_target');
	    $('#' + modalTarget).fadeIn();
	  });

	  $('#property_container').find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $('#' + modalTarget).fadeOut();
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(201);

/***/ },

/***/ 201:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(202);

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/admin/examine', function (context) {
	    client({ path: 'manager/loan/classrooms' }).then(function (response) {
	      return console.log(response);
	    }).catch(function (response) {
	      return console.log(response);
	    });
	    context.list = [{
	      id: 1,
	      username: 'foo',
	      propertyName: 'class1',
	      time: '12:00'
	    }, {
	      id: 2,
	      username: 'bar',
	      propertyName: 'class2',
	      time: '10:00'
	    }];

	    context.partial('/templates/admin/examine.ms').then(function () {
	      // Content has been render
	      $('.Examine-Item').each(function (idx, ele) {
	        var item = $(ele);
	        var id = item.data('id');

	        // Initialize tooltip
	        $('.tooltipped').tooltip({
	          delay: 50,
	          position: 'buttom'
	        });

	        // Re-trigger event for click
	        item.find('.Examine-Detail').click(function () {
	          return item.trigger('examine-detail', id);
	        });

	        item.find('.Examine-Pass').click(function (event) {
	          event.preventDefault();
	          item.trigger('examine-pass', id);
	        });
	        item.find('.Examine-Reject').click(function (event) {
	          event.preventDefault();
	          item.trigger('examine-reject', id);
	        });

	        // Deal custom event
	        item.on('examine-detail', function (event, id) {
	          console.log('Show detail for id: ' + id);
	        });

	        item.on('examine-pass', function (event, id) {
	          console.log('Examine pass id: ' + id);
	        });

	        item.on('examine-reject', function (event, id) {
	          console.log('Examine reject id: ' + id);
	        });
	      });
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 202:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var rest = __webpack_require__(203);
	var pathPrefix = __webpack_require__(231);
	var errorCode = __webpack_require__(233);
	var mime = __webpack_require__(234);
	var csrf = __webpack_require__(247);

	var token = $('meta[name="csrf-token"]').attr('content');
	var client = rest.wrap(pathPrefix, { prefix: '/api' }).wrap(errorCode).wrap(mime).wrap(csrf, { name: 'X-CSRF-TOKEN', token: token });

	module.exports = client;

/***/ },

/***/ 211:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(192);

	Sammy('#main', function () {
	  this.get('#/', function (context) {
	    context.redirect('#/user/signin');
	  });

	  this.get('#/user/property', function (context) {
	    context.redirect('#/user/property');
	  });
	});

/***/ }

});