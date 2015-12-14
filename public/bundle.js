webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	var Sammy = __webpack_require__(5);

	__webpack_require__(6);

	Sammy('#root').run('#/');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(7);

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

	var Sammy = __webpack_require__(5);
	__webpack_require__(9);

	Sammy('#root', function () {
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
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(5);

	Sammy('#root', function () {
	  this.get('#/', function (context) {
	    context.redirect('#/user/signin');
	  });
	});

/***/ }
]);