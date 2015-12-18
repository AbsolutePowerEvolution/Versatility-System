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
	__webpack_require__(9);

	__webpack_require__(11);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(8);

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

	'use strict';

	__webpack_require__(10);

/***/ },
/* 10 */
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
/* 11 */
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