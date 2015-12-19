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
	__webpack_require__(246);

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
	var client = __webpack_require__(200);
	__webpack_require__(193);

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/user/property', function (context) {
	    console.log('property');
	    context.partial('/templates/user/property.ms').then(function () {
	      getPropertyList(1, 5, 1);
	    });
	  });
	});

	function getPropertyList(pageNum, pageLength, createPageSwit) {
	  client({
	    path: 'user/property/others',
	    method: 'GET',
	    params: {
	      page: pageNum,
	      length: pageLength
	    }
	  }).then(function (response) {
	    console.log(response);
	    buildPropertyCard(response.entity.data);
	    var propertyTotalPage = response.entity.total;
	    if (createPageSwit) {
	      buildPage(propertyTotalPage);
	    }
	  }).catch(function (response) {
	    return console.log(response);
	  });
	}

	function postPropertyRepair(propertyId, type, remark) {
	  client({
	    path: 'user/repair/create',
	    method: 'POST',
	    params: {
	      property_id: propertyId,
	      type: type,
	      remark: remark
	    }
	  }).then(function (response) {
	    console.log(response);
	    //location.reload();
	  }).catch(function (response) {
	    return console.log(response);
	  });
	}

	function buildPage(propertyTotalPage) {
	  console.log('propertyTotalPage:' + propertyTotalPage);
	  var i;
	  var page = '<li class="active waves-effect"><a data-pageNum="1">1</a></li>';
	  for (i = 1; i < propertyTotalPage / 5 - 1; i++) {
	    page += '<li class="waves-effect"><a data-pageNum="' + (i + 1) + '">' + (i + 1) + '</a></li>  ';
	  }
	  page += '<li class="waves-effect"><a data-pageNum="next"><i class="material-icons">chevron_right</i></a></li>';
	  $('#property_container').find('.pagination').append(page);
	  pageEvent(propertyTotalPage / 5 - 1);
	}

	function pageEvent(limit) {
	  var nowPage = 1;
	  $('#property_container').find('.pagination a').on('click', function (event) {
	    var $ActiveTarget;
	    if (nowPage == parseInt($(this).data('pagenum'))) {
	      return;
	    } else if ($(this).data('pagenum') == 'prev') {
	      if (nowPage <= 1) {
	        return;
	      }
	      $ActiveTarget = $(this).parent().parent().find('.active').prev();
	      nowPage -= 1;
	    } else if ($(this).data('pagenum') == 'next') {
	      if (nowPage >= limit) {
	        return;
	      }
	      $ActiveTarget = $(this).parent().parent().find('.active').next();
	      nowPage += 1;
	    } else {
	      $ActiveTarget = $(this).parent();
	      nowPage = $(this).data('pagenum');
	    }
	    $(this).parent().parent().find('.active').removeClass('active');
	    $ActiveTarget.addClass('active');
	    getPropertyList(nowPage, 5, 0);
	  });
	}

	function buildPropertyCard(propertyData) {
	  var i;
	  $('#property_system_content').find('.propertyContent').remove();
	  for (i = 0; i < propertyData.length; i++) {
	    var status = propertyData[i].status.id; //3: normal, 4:maintenance
	    var color = status == 3 ? 'teal' : status == 4 ? 'red' : 'blue';
	    var divCard = '<div class="card propertyContent">';
	    var divCardContent = '<div class="row card-content" ' + 'data-name="' + propertyData[i].name + '"' + 'data-propertyid="' + propertyData[i].id + '"' + 'data-describe="' + propertyData[i].describe + '">';
	    var spanName = '<span class="col s4 center-align">' + propertyData[i].name + '</span>';
	    var spanStatus = '<span class="col s4 center-align" style="color:' + color + '">' + propertyData[i].status.name + '</span>';
	    var spanBtn = '<span class="col s4 center-align"><a class="waves-effect waves-light btn modal-trigger ' + (status == 4 ? 'disabled' : '') + '" data-modal_target="property_modal"><i class="material-icons left">build</i>報修/清理' + '</a></span></div></div>';
	    $('#property_system_content').append(divCard + divCardContent + spanName + spanStatus + spanBtn);
	  }
	  propertyBindEvent();
	}

	function propertyBindEvent() {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find('#property_system').on('click', function (event) {
	    $('#property_system').addClass('purple darken-4').css('color', 'white');
	    $('#property_history').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $('#property_system_content').css('display', 'block');
	    $('#property_history_content').css('display', 'none');
	  });

	  $propertyContainer.find('#property_history').on('click', function (event) {
	    $('#property_system').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $('#property_history').addClass('purple darken-4').css('color', 'white');
	    $('#property_system_content').css('display', 'none');
	    $('#property_history_content').css('display', 'block');
	  });

	  var $modalTarget;
	  $propertyContainer.find('.modal-trigger').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }

	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $modalTarget = $('#' + $(this).data('modal_target'));
	    $modalTarget.fadeIn();

	    var ele = $(this).parent().parent();
	    $modalTarget.find('.modal-content h4').html(ele.data('name'));
	    $modalTarget.find('p').html(ele.data('describe'));
	    $modalTarget.data('propertyid', ele.data('propertyid'));
	  });

	  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $modalTarget.fadeOut();
	  });

	  $propertyContainer.find('#property_repair_submit').on('click', function (event) {
	    var type = $modalTarget.find('input[type="radio"]:checked').val();
	    var propertyid = $modalTarget.data('propertyid');
	    var remark = $modalTarget.find('#reason').val();
	    postPropertyRepair(propertyid, type, remark);
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var rest = __webpack_require__(201);
	var pathPrefix = __webpack_require__(229);
	var errorCode = __webpack_require__(231);
	var mime = __webpack_require__(232);
	var csrf = __webpack_require__(245);

	var token = $('#csrf-token').attr('content');
	var client = rest.wrap(pathPrefix, { prefix: '/api' }).wrap(errorCode).wrap(mime).wrap(csrf, { name: 'X-CSRF-TOKEN', token: token });

	module.exports = client;

/***/ },

/***/ 209:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(247);

/***/ },

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(200);

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

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(192);

	Sammy('#main', function () {
	  this.get('#/', function (context) {
	    context.redirect('#/user/signin');
	  });
	});

/***/ }

});