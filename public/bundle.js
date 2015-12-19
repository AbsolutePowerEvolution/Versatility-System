webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	var Sammy = __webpack_require__(2);
	__webpack_require__(3);

	__webpack_require__(6);

	Sammy('#main').run('#/');

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = null;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Sammy;

/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = Mustache;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(7);
	__webpack_require__(10);

	__webpack_require__(12);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);
	__webpack_require__(9);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(2);

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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(2);
	__webpack_require__(3);

	Sammy('#main', function () {
	  this.use('mustache', 'ms');

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(2);

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/admin/examine', function (context) {
	    console.log('examine');
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

	    context.partial('/templates/admin/examine.ms', context, function () {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(2);

	Sammy('#main', function () {
	  this.get('#/', function (context) {
	    context.redirect('#/user/signin');
	  });
	});

/***/ }
]);