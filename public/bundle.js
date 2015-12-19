webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	var Sammy = __webpack_require__(2);

	__webpack_require__(3);

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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(4);

	__webpack_require__(10);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);
	__webpack_require__(9);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(2);
	__webpack_require__(6);

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
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = Mustache;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(2);
	__webpack_require__(6);

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
	    /*event.preventDefault();
	    var ele = $(this);
	    $(this).parent().addClass('open');
	    setTimeout(function() {
	      ele.parent().siblings().fadeIn();
	      setTimeout(function() {
	        ele.parent().removeClass('open');
	        ele.removeClass('slide');
	      }, 500)
	    }, 600);*/
	  });

	  $('#property_container').find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $('#' + modalTarget).fadeOut();;
	    /*event.preventDefault();
	    $(this).parent().fadeOut();*/
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(7)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(2);

	Sammy('#main', function () {
	  this.get('#/', function (context) {
	    context.redirect('#/user/signin');
	  });

	  this.get('#/user/property', function (context) {
	    context.redirect('#/user/property');
	  });
	});

/***/ }
]);