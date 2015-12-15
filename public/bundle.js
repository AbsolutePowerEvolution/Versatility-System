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

	__webpack_require__(9);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(5);

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

	'use strict';

	var Sammy = __webpack_require__(2);

	Sammy('#main', function () {
	  this.get('#/', function (context) {
	    context.redirect('#/user/signin');
	  });
	});

/***/ }
]);