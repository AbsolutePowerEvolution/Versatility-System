webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(191);
	var Sammy = __webpack_require__(192);
	__webpack_require__(193);
	__webpack_require__(196);

	__webpack_require__(218);

	Sammy('#main').use('Hogan', 'ms').run('#/');

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

	module.exports = Hogan;

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var when = __webpack_require__(197);
	var validate = __webpack_require__(217);

	validate.Promise = when.Promise;

/***/ },

/***/ 200:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 217:
/***/ function(module, exports) {

	module.exports = validate;

/***/ },

/***/ 218:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(219);
	__webpack_require__(256);

	__webpack_require__(265);
	__webpack_require__(267);

/***/ },

/***/ 219:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(220);
	__webpack_require__(228);
	__webpack_require__(255);

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	(function () {
	  'use strict';

	  var Sammy = __webpack_require__(192);
	  var api = __webpack_require__(221);

	  Sammy('#main', function (app) {
	    app.get('#/user/signin', function (context) {
	      context.partial('/templates/user/signin.ms').then(function () {
	        console.log('render');
	      });
	    });

	    app.post('#/user/signin', function (context) {
	      var params = Object.assign({}, context.params);
	      api.add('auth/login', {
	        body: $.param(params)
	      }).then(function (data) {
	        console.log(data);
	        if (data.status) {
	          if (data.is_manager) {
	            context.redirect('#/admin/examine');
	          } else if (data.is_student) {
	            context.redirect('#/user/loan');
	          }
	        } else {
	          Materialize.toast('帳號 or 密碼錯誤');
	        }
	      }).catch(function (response) {
	        Materialize.toast('伺服器錯誤');
	      });
	      return false;
	    });
	  });
	}).call(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var connectEndpoint = __webpack_require__(222).connectEndpoint;
	var plusCsrf = __webpack_require__(223);

	var cookie = __webpack_require__(224);
	var param = __webpack_require__(225);
	var header = __webpack_require__(226);
	var statusCode = __webpack_require__(227);

	var token = $('#csrf-token').attr('content');
	var api = connectEndpoint('/api');

	api.addMiddleware(plusCsrf('X-CSRF-TOKEN', token));
	api.addMiddleware(cookie);
	api.addMiddleware(param);
	api.addMiddleware(header);
	api.addMiddleware(statusCode);

	module.exports = api;

/***/ },

/***/ 224:
/***/ function(module, exports) {

	'use strict';

	// Default add cookie
	module.exports = function (request) {
	  if (!request.options.credentials) {
	    request.options.credentials = 'include';
	  }
	};

/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var $ = __webpack_require__(194);

	module.exports = function (request) {
	  if (request.options.method === 'GET' && _typeof(request.options.params) === 'object') {
	    request.path = request.path + '?' + $.param(request.options.params);
	  }
	};

/***/ },

/***/ 226:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var FORM_HEADER = 'application/x-www-form-urlencoded; charset=UTF-8';
	var JSON_HEADER = 'application/json; charset=UTF-8';

	// custom JSON middleware
	module.exports = function (request) {
	  var body = request.options.body;
	  // If options have key named type
	  if (request.options.type && (typeof body === 'undefined' ? 'undefined' : _typeof(body)) === 'object') {
	    // Stringify body and add header
	    if (request.options.type === 'form') {
	      request.options.body = $.param(body);
	      request.options.headers['Content-Type'] = FORM_HEADER;
	    } else if (request.options.type === 'json') {
	      request.options.body = JSON.stringify(body);
	      request.options.headers['Content-Type'] = JSON_HEADER;
	    }
	  } else if (typeof request.options.body === 'string') {
	    // Just add header
	    request.options.headers['Content-Type'] = FORM_HEADER;
	  } else if (_typeof(request.options.body) === 'object') {
	    // Stringify body and add header
	    request.options.body = $.param(body);
	    request.options.headers['Content-Type'] = FORM_HEADER;
	  }

	  return function (response) {
	    return response.json();
	  };
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var when = __webpack_require__(197);

	// P2P-style unjustifed status code check

	module.exports = function () {
	  return function (response) {
	    if (_typeof(response.body) === 'object' && response.body.status) {
	      if (response.body.status !== 0) {
	        return when.reject(response);
	      }
	    }
	    return response;
	  };
	};

/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(229);

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	}
	if (mm < 10) {
	  mm = '0' + mm;
	}
	today = yyyy + '/' + mm + '/' + dd;

	Object.size = function (obj) {
	  var size = 0;
	  var key;
	  for (key in obj) {
	    if (obj.hasOwnProperty(key)) {
	      size++;
	    }
	  }
	  return size;
	};

	Sammy('#main', function () {
	  this.get('#/user/property', function (context) {
	    console.log('property');
	    context.loadPartials({ menu: '/templates/user/menu.ms' }).partial('/templates/user/property.ms').then(function () {
	      getPropertyList(1, 10000, 1);
	      getRepairList(1, 10000);
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
	    buildPropertyCard(response.entity.data, response.entity.data);
	    var propertyTotalPage = response.entity.total;
	    if (createPageSwit) {
	      propertyBuildPage(propertyTotalPage);
	    }
	  }).catch(function (response) {
	    alert('取得財產列表失敗!');
	    console.log('get property list error!', response);
	  });
	}

	function buildPropertyCard(oriPropertyData, searchPropertyData) {
	  var i;
	  var length = Object.size(searchPropertyData);
	  $('#property_system_content').find('.propertyContent').remove();
	  for (i = 0; i < length; i++) {
	    var status = searchPropertyData[i].status.name;
	    var color = status == 'normal' ? 'teal' : status == 'deleted' || status == 'maintenance' ? 'red' : 'blue';
	    var divCard = '<div class="card propertyContent ' + (i < 5 ? 'block' : 'hide') + '">';
	    var divCardContent = '<div class="row card-content" ' + 'data-name="' + searchPropertyData[i].name + '"' + 'data-propertyid="' + searchPropertyData[i].id + '"' + 'data-describe="' + searchPropertyData[i].describe + '">';
	    var spanName = '<span class="col s4 center-align">' + searchPropertyData[i].name + '</span>';
	    var spanStatus = '<span class="col s4 center-align" style="color:' + color + '">' + searchPropertyData[i].status.name + '</span>';
	    var spanBtn = '<span class="col s4 center-align"><a class="waves-effect waves-light btn modal-trigger ' + (status !== 'normal' ? 'disabled' : '') + '"><i class="material-icons left">build</i>報修/清理' + '</a></span></div></div>';
	    $('#property_system_content').append(divCard + divCardContent + spanName + spanStatus + spanBtn);
	  }
	  propertyBindEvent(oriPropertyData);
	}

	function propertyBindEvent(propertyData) {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find('#sub_menu').tabs();
	  $propertyContainer.find('#property_system').on('click', function (event) {
	    $propertyContainer.find('.property_system').css('display', 'block');
	    $propertyContainer.find('#property_history_content').css('display', 'none');
	  });

	  $propertyContainer.find('#property_history').on('click', function (event) {
	    $propertyContainer.find('.property_system').css('display', 'none');
	    $propertyContainer.find('#property_history_content').css('display', 'block');
	  });

	  var $modalTarget = $('#property_modal');
	  $propertyContainer.find('#property_system_content .modal-trigger').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }

	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $modalTarget.fadeIn();

	    var ele = $(this).parent().parent();
	    $modalTarget.find('.modal-content h4').html(ele.data('name'));
	    $modalTarget.find('p').html(ele.data('describe'));
	    $modalTarget.data('propertyid', ele.data('propertyid'));
	  });

	  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $modalTarget.fadeOut();
	    $('#history_modal').fadeOut();
	  });

	  $propertyContainer.find('#property_repair_submit').on('click', function (event) {
	    var type = $modalTarget.find('input[type="radio"]:checked').val();
	    var propertyid = $modalTarget.data('propertyid');
	    var remark = $modalTarget.find('#reason').val();
	    postPropertyRepair(propertyid, type, remark);
	  });

	  $propertyContainer.find('#search_property_btn').on('click', function () {
	    var i;
	    var j;
	    var target = $propertyContainer.find('#search_property').val();
	    var result = {};
	    if (target !== '') {
	      for (j = 0, i = 0; i < propertyData.length; i++) {
	        if (propertyData[i].name.indexOf(target) != -1) {
	          result[j++] = propertyData[i];
	        }
	      }
	    } else {
	      result = propertyData;
	    }
	    buildPropertyCard(propertyData, result);
	    propertyBuildPage(Object.size(result));
	  });
	}

	function propertyBuildPage(propertyTotalPage) {
	  //console.log('propertyTotalPage:' + propertyTotalPage);
	  var i;
	  var page = '';
	  page += '<li onselectstart="return false"><a class="page" data-pageNum="prev"><i class="material-icons">' + 'chevron_left</i></a></li><li onselectstart="return false" class="active"><a class="page" data-pageNum="1">1</a></li>';
	  for (i = 1; i < propertyTotalPage / 5; i++) {
	    page += '<li onselectstart="return false"><a class="page" data-pageNum="' + (i + 1) + '">' + (i + 1) + '</a></li> ';
	  }
	  page += '<li onselectstart="return false">' + '<a class="page" data-pageNum="next"><i class="material-icons">chevron_right</i></a></li>';
	  $('#property_container').find('.pagination').empty().append(page);
	  propertyPageEvent(propertyTotalPage / 5);
	}

	function propertyPageEvent(limit) {
	  var nowPage = 1;
	  $('#property_container').find('.page').on('click', function (event) {
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
	    showPage(nowPage);
	    //getPropertyList(nowPage, 5, 0);
	  });
	}

	function showPage(page) {
	  $('#property_container').find('#property_system_content .propertyContent').removeClass('block').addClass('hide');
	  var i;
	  for (i = 1; i <= 5; i++) {
	    var show = '#property_system_content .propertyContent:nth-child(' + ((parseInt(page) - 1) * 5 + i + 1) + ')';
	    $('#property_container').find(show).removeClass('hide').addClass('block');
	  }
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
	    alert('報修財產成功!');
	    location.reload();
	  }).catch(function (response) {
	    alert('報修財產失敗!');
	    console.log('repair property error!', response);
	  });
	}

	function getRepairList(pageNum, pageLength) {
	  client({
	    path: 'user/repair',
	    method: 'GET',
	    params: {
	      page: 1,
	      length: 100000
	    }
	  }).then(function (response) {
	    console.log('get repair list ok!', response);
	    var Data = response.entity.data;
	    getPropertyLoan(1, 10000, Data);
	  }).catch(function (response) {
	    alert('個人報修歷史紀錄取得失敗');
	    console.log('get repair list error!', response);
	  });
	}

	function getPropertyLoan(pageNum, pageLength, repairData) {
	  client({
	    path: 'user/loan/others',
	    method: 'GET',
	    params: {
	      page: 1,
	      length: 100000
	    }
	  }).then(function (response) {
	    console.log('get user loan log success!', response);
	    var loanData = response.entity.data;
	    buildHistoryCard(repairData, loanData);
	  }).catch(function (response) {
	    alert('取得個人財產借用紀錄錯誤!');
	    console.log('get user loan log error!', response);
	  });
	}

	function buildHistoryCard(repairData, propertyData) {
	  var i;
	  var j;

	  for (i = 0; i < Object.size(repairData) + Object.size(propertyData); i++) {
	    var swit;
	    var oldIndex;
	    var old = '1900/1/1';
	    for (j = 0; j < Object.size(repairData); j++) {
	      if (new Date(old) < new Date(repairData[j].created_at)) {
	        old = repairData[j].created_at;
	        oldIndex = j;
	        swit = 0;
	      }
	    }
	    for (j = 0; j < Object.size(propertyData); j++) {
	      if (new Date(old) < new Date(propertyData[j].date_began_at)) {
	        old = propertyData[j].date_began_at;
	        oldIndex = j;
	        swit = 1;
	      }
	    }

	    if (swit === 0) {
	      buildRepairHistoryCard(repairData[oldIndex]);
	      repairData[oldIndex].created_at = '1900/1/1';
	    } else {
	      buildPropertyHistoryCard(propertyData[oldIndex]);
	      propertyData[oldIndex].date_began_at = '1900/1/1';
	    }
	  }
	  historyCardEvent();
	}

	function buildRepairHistoryCard(data) {
	  var color = today > data.created_at ? 'teal' : 'red';
	  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' + 'data-name="' + data.property.name + '"' + 'data-time="' + data.created_at + '"' + 'data-remark="' + data.remark + '">';
	  var divCardContent = '<div class="row card-content">';
	  var spanName = '<span class="col s4 center-align">' + data.property.name + '</span>';
	  var spanDate = '<span class="col s4 center-align " style="color:' + color + '">' + data.created_at + '</span>';
	  var spanType = '<span class="col s4 center-align">' + data.type.name + '</span></div></div>';
	  //console.log(divCard + divCardContent + spanName + spanDate + spanType);
	  $('#property_history_content').append(divCard + divCardContent + spanName + spanDate + spanType);
	}

	function buildPropertyHistoryCard(data) {
	  var color = today > data.date_began_at ? 'teal' : 'red';
	  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' + 'data-name="' + data.property_name + '"' + 'data-time="' + data.date_began_at + ' ' + (data.time_began_at ? '' : data.time_began_at) + ' - ' + data.date_ended_at + ' ' + (data.time_ended_at ? '' : data.time_ended_at) + '"' + 'data-remark="' + data.remark + '">';
	  var divCardContent = '<div class="row card-content">';
	  var spanName = '<span class="col s4 center-align">' + data.property_name + '</span>';
	  var spanDate = '<span class="col s4 center-align" style="color:' + color + '">' + data.date_began_at + '</span>';
	  var spanType = '<span class="col s4 center-align">' + data.status.name + '</span></div></div>';
	  //console.log(divCard + divCardContent + spanName + spanDate + spanType);
	  $('#property_history_content').append(divCard + divCardContent + spanName + spanDate + spanType);
	}

	function historyCardEvent() {
	  var $propertyContainer = $('#property_container');
	  var $modalTarget = $('#history_modal');
	  $propertyContainer.find('#property_history_content .card').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }

	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $modalTarget.fadeIn();

	    var ele = $(this);
	    $modalTarget.find('.modal-content h4').html(ele.data('name'));
	    $modalTarget.find('span').html(ele.data('time'));
	    $modalTarget.find('p').html(ele.data('remark'));
	  });
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 229:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var rest = __webpack_require__(230);
	var pathPrefix = __webpack_require__(238);
	var errorCode = __webpack_require__(240);
	var mime = __webpack_require__(241);
	var csrf = __webpack_require__(254);
	var when = __webpack_require__(197);
	var interceptor = __webpack_require__(239);

	var statusCheck = interceptor({
	  response: function response(_response, config) {
	    if (_response.request.method !== 'GET' && _response.status.code === 200 && _response.entity.status !== 0) {
	      return when.reject(_response);
	    }
	    return _response;
	  }
	});

	var token = $('#csrf-token').attr('content');
	var client = rest.wrap(pathPrefix, { prefix: '/api' }).wrap(errorCode).wrap(mime).wrap(csrf, { name: 'X-CSRF-TOKEN', token: token }).wrap(statusCheck);

	module.exports = client;

/***/ },

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var PeriodStart = ['07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00'];
	var PeriodEnd = ['07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00'];
	var LoanTable; // Table Data
	var LoanTablePage;
	var AllLoanTablePage;

	var LoanHistory; // History Data
	var HistoryPage;
	var AllHistoryPage;

	var LoanType; // one_day, few_days, many_days
	var LoanTimeType; // 30 minutes, all day

	Sammy('#main', function () {
	  this.get('#/user/loan', function (context) {
	    context.time = {};
	    context.time.PeriodStart = PeriodStart;
	    context.time.PeriodEnd = PeriodEnd;
	    context.FiveTimes = _.times(5);
	    context.ThirtyTimes = _.times(30);
	    // context.thirty_times = _.times(30, _.uniqueId.bind(null, 'ball'));

	    context.loadPartials({ menu: '/templates/user/menu.ms' }).partial('/templates/user/loan.ms').then(function () {
	      // bind Event
	      loanButtonEvent();
	      loanDataEvent();
	      userLoanInitEvent();

	      // new inline display calendar
	      var picker = new Pikaday({
	        field: document.getElementById('datepicker'),
	        bound: false,
	        container: document.getElementById('datepicker_container'),
	        format: 'YYYY-MM-DD'
	      });

	      var today = new moment(new Date()).format('YYYY-MM-DD');
	      $('#datepicker').val(today).change();
	    });
	  });
	});

	function userLoanInitEvent() {
	  $('#screen_classroom').click();
	  $('.modal #user_btn').click();
	  $('.modal #short').click();

	  var request = {};
	  request.date = moment(new Date()).format('YYYY-MM-DD');

	  $.get('/api/user/property/classrooms', request, function (result) {
	    console.log(result);
	    var text;

	    for (var i = 0; i < result.length; i++) {
	      text = '<option value=' + result[i].id + '>';
	      text += result[i].name;
	      text += '</option>';

	      $('.modal').find('#classroom').find('option:last').after(text);
	    }

	    loanMaterializeEvent();
	  });
	}

	function loanMaterializeEvent() {
	  $('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15 // Creates a dropdown of 15 years to control year
	  });
	}

	function initModal() {
	  $('.modal').find('.switch_date:first').click();
	  $('.modal').find('.switch_time:first').click();
	  $('.modal').find('#input[name="start_date"]').val('');
	  $('.modal').find('#input[name="end_date"]').val('');
	  $('.modal').find('input[type="checkbox"]').prop('checked', false);
	  $('.modal').find('select').find('option:nth-of-type(2)').prop('selected', true);
	  $('.modal').find('select').material_select(); // refresh select
	}

	function loanButtonEvent() {
	  var modalTarget;
	  var switchTimeTarget;
	  $('#main').find('.modal-trigger').on('click', function (event) {
	    initModal();

	    $('#materialize-lean-overlay-30').css('display', 'block');
	    modalTarget = $(this).data('modal_target');
	    $('#' + modalTarget).fadeIn();
	  });

	  $('#main').find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $('#' + modalTarget).fadeOut();
	  });

	  $('.switch_screen').unbind('click');
	  $('.switch_screen').click(function () {
	    var screenType = $(this).data('screen_type');
	    if (screenType == 'loan') {
	      $('#loan_container').show();
	      $('#history_container').hide();
	    } else {
	      $('#loan_container').hide();
	      $('#history_container').show();

	      HistoryPage = 1;
	      getLoanHistory();
	    }
	  });

	  $('.modal .swtich_date').unbind('click');
	  $('.modal .switch_date').click(function () {
	    var dateType = $(this).data('date_type');
	    if (dateType == 'many_days') {
	      LoanType = 3;
	    } else if (dateType == 'few_days') {
	      LoanType = 2;
	    } else {
	      LoanType = 1;
	    }

	    $('.modal .days').hide();
	    $('.modal .for_' + dateType).show();

	    // button color
	    $(this).parent().find('button').removeClass('pink darken-4');
	    $(this).addClass('pink darken-4');
	  });

	  $('.modal .switch_time').unbind('click');
	  $('.modal .switch_time').click(function () {
	    $(this).parent().find('button').removeClass('pink darken-4');
	    $(this).addClass('pink darken-4');

	    switchTimeTarget = $(this).data('time_period');
	    if (switchTimeTarget == 'thirty_minutes') {
	      $('.modal .time_container').show();
	      LoanTimeType = 1;
	    } else {
	      $('.modal .time_container').hide();
	      LoanTimeType = 2;
	    }
	  });

	  $('.history_btn').unbind('click');
	  $('.history_btn').click(function () {
	    var id = $(this).data('loan_id');
	    $('#delete_loan').attr('data-loan_id', id);
	  });
	}

	function loanDataEvent() {
	  $('#datepicker').unbind('change');
	  $('#datepicker').change(function () {
	    var request = {};
	    request.date = $(this).val();
	    console.log(request.date);

	    $.get('/api/user/property/classrooms', request, function (result) {
	      LoanTablePage = 0;
	      AllLoanTablePage = result.length;
	      LoanTable = [];
	      LoanTable = result;

	      produceLoanTable();
	      console.log(LoanTable);
	    }).fail(function () {
	      alert('資料取得失敗，可能要先登入');
	    });
	  });

	  $('#delete_loan').unbind('click');
	  $('#delete_loan').click(function () {
	    var request = {};
	    request.id = $(this).data('loan_id');

	    $.post('/api/user/loan/delete/' + request.id, request, function (result) {
	      console.log(result);
	    }).fail(function () {
	      alert('刪除失敗');
	    });
	  });

	  $('#create_loan').unbind('click');
	  $('#create_loan').click(function () {
	    var request = {};
	    var i;
	    var a; // for temp
	    var b; // for temp
	    var temp;
	    var errMsg = '';

	    request.property_id = $('.modal').find('#classroom').val();

	    switch (LoanType) {
	      case 1:
	        {
	          // one_day
	          temp = $('.modal').find('input[name="start_date"]').val();
	          temp = moment(new Date(temp)).format('YYYY-MM-DD');
	          if (temp != 'Invalid date') {
	            a = new Date();
	            b = new Date(temp);

	            if (b >= a) {
	              request.date_began_at = temp;
	              request.date_ended_at = temp;
	            } else {
	              errMsg += '日期太早';
	            }
	          } else {
	            errMsg += '還沒選擇日期';
	          }

	          break;
	        }
	      case 2:
	        {
	          // few_days
	          request.time_began_at = $('.modal').find('select[name="time_start"]').val();
	          request.time_ended_at = $('.modal').find('select[name="time_end"]').val();

	          break;
	        }
	      case 3:
	        {
	          // many_days
	          temp = $('.modal').find('input[name="start_date"]').val();
	          temp = moment(new Date(temp)).format('YYYY-MM-DD');
	          if (temp != 'Invalid date') {
	            request.date_began_at = temp;
	          } else {
	            errMsg += '還沒選擇開始日期';
	          }
	          temp = $('.modal').find('input[name="end_date"]').val();
	          temp = moment(new Date(temp)).format('YYYY-MM-DD');
	          if (temp != 'Invalid Date') {
	            request.date_ended_at = temp;
	          } else {
	            errMsg += '還沒選擇結束日期';
	          }

	          // check date 先後
	          if (errMsg == '') {}

	          temp = [];
	          for (i = 0; i < 7; i++) {
	            if ($('#day' + i).prop('checked')) {
	              temp[i] = 1;
	            } else {
	              temp[i] = 0;
	            }
	          }
	          request.long_term_token = temp[6].toString();
	          for (i = 5; i >= 0; i--) {
	            request.long_term_token += temp[i].toString();
	          }

	          break;
	        }
	    }

	    // check start and end date diff
	    if (errMsg == '') {
	      var startTime = $('.modal').find('select[name="time_start"]').val();
	      var endTime = $('.modal').find('select[name="time_end"]').val();
	      if (endTime < startTime) {
	        errMsg += '時段前後順序不對，可能太早';
	      }
	    }

	    request.remark = $('input[name="remark"]').val();

	    console.log(errMsg);
	    console.log(request);
	    return;
	    $.post('/api/user/loan/create', request, function (result) {
	      console.log(result);
	    });
	  });
	}

	function getLoanHistory() {
	  var request = {};
	  request.page = HistoryPage;
	  request.length = 10;
	  $.get('/api/user/loan/classrooms', request, function (result) {
	    console.log(result);
	    LoanHistory = result.data;

	    if (HistoryPage == 1) {
	      AllHistoryPage = result.total;
	    }

	    produceLoanHistory();
	  });
	}

	function produceLoanHistory() {
	  var i;
	  var j;
	  var text;

	  $('#history_card_container').html('');
	  for (i = 0; i < 10 && i < LoanHistory.length; i++) {
	    text = '<div class="row card-content">';
	    text += '<span class="col s4">' + LoanHistory[i].property_name + '</span>';
	    text += '<span class="col s4">';
	    if (LoanHistory[i].time_began_at == null) {
	      text += '整天';
	    } else {
	      text += LoanHistory[i].time_began_at + ' ~ ' + LoanHistory[i].time_ended_at;
	    }
	    text += '</span>';
	    text += '<span class="col s4 history_btn" data-loan_id="' + i + '">';
	    text += '<a class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_detail">';
	    text += '<i class="material-icons">build</i>查看/刪除</i>';
	    text += '</a></span>';
	    text += '</div>';
	    $('#history_card_container').append(text);
	  }

	  loanButtonEvent();
	  produceHistoryPage();
	}

	function produceHistoryPage() {
	  var i;
	  var text;
	  for (i = 0; i < AllHistoryPage; i++) {}
	}

	function LoanPageEvent() {}

	function produceLoanTable() {
	  // empty td
	  $('table').find('.tr_classroom').find('.td_time_period').html('');

	  for (var i = LoanTablePage * 5, j = 0; i < LoanTable.length && j < 5; i++, j++) {
	    $('table').find('.tr_classroom').eq(j).find('.td_classroom_name').html(LoanTable[i].name);
	    colorLoanTable(i, j);
	  }
	}

	function colorLoanTable(id, index) {
	  var selectedDay = new Date($('#datepicker').val());
	  var began;
	  var ended;

	  // init X
	  $('table').find('.tr_classroom').eq(index).find('.td_time_period').html('X');

	  console.log(id + ', ' + index);
	  for (var i = 0; i < LoanTable[id].loan_classroom.length; i++) {
	    // examine selected day's status
	    began = new Date(LoanTable[id].loan_classroom[i].date_began_at); // date began
	    ended = new Date(LoanTable[id].loan_classroom[i].date_ended_at); // date ended
	    if (began <= selectedDay && selectedDay <= ended) {
	      if (LoanTable[id].loan_classroom[i].time_began_at != null) {
	        began = LoanTable[id].loan_classroom[i].time_began_at;
	        ended = LoanTable[id].loan_classroom[i].time_ended_at;
	        console.log(began + '~' + ended);
	        began = matchTool(began, PeriodStart); // add one, because nth-of-type start from 1
	        ended = matchTool(ended, PeriodEnd);

	        for (var j = began; j <= ended; j++) {
	          $('table').find('.tr_classroom').eq(index).find('.td_time_period').eq(j).html('O');
	        }
	      } else {
	        // all days
	        console.log(id + ', ' + index + 'all day [i = ' + i);
	        $('table').find('.tr_classroom').eq(index).find('.td_time_period').html('O');
	      }
	    }
	  }
	}

	function matchTool(time, table) {
	  var result;

	  for (var i = 0; i < table.length; i++) {
	    if (time === table[i]) {
	      result = i;
	      break;
	    }
	  }

	  return result;
	}

	function validateData(type) {}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(257);
	__webpack_require__(260);
	__webpack_require__(261);
	__webpack_require__(262);

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var Sammy = __webpack_require__(192);
	var api = __webpack_require__(221);
	var paginate = __webpack_require__(258);

	Sammy('#main', function () {
	  this.get('#/admin/examine', function (context) {
	    api.browse('manager/loan/classrooms', {
	      params: { page: context.params.page }
	    }).then(function (data) {
	      var pageEffect = paginate(context, data, '#/admin/examine');
	      context.list = data.data.map(function (item) {
	        item.time = item.date_began_at + '~' + item.date_ended_at;
	        return item;
	      });
	      context.loadPartials({
	        menu: '/templates/admin/menu.ms',
	        pagination: '/templates/pagination.ms'
	      }).partial('/templates/admin/examine.ms').then(function () {
	        // Content has been render

	        pageEffect();

	        // Initialize tooltip
	        $('.tooltipped').tooltip({
	          delay: 50,
	          position: 'buttom'
	        });
	        $('.collapsible').collapsible({ accordion: true });

	        $('.Examine-Item').each(function (idx, ele) {
	          var item = $(ele);
	          var id = item.data('id');
	          bindEvent(id, item);
	        });
	      });
	    }).catch(function (response) {
	      console.log(response);
	    });
	  });
	});

	var bindEvent = function bindEvent(id, item) {
	  // Re-trigger event for click
	  item.find('.Examine-Pass').click(function (event) {
	    event.preventDefault();
	    item.trigger('examine-pass', id);
	  });
	  item.find('.Examine-Reject').click(function (event) {
	    event.preventDefault();
	    item.trigger('examine-reject', id);
	  });

	  // Deal custom event
	  item.on('examine-pass', function (event, id) {
	    sendAcceptVerify(id);
	  });

	  item.on('examine-reject', function (event, id) {
	    sendRefuseVerify(id);
	  });
	};

	var sendRefuseVerify = function sendRefuseVerify(id) {
	  sendVerifyRequest(id, 'refused');
	};

	var sendAcceptVerify = function sendAcceptVerify(id) {
	  sendVerifyRequest(id, 'accepted');
	};

	var sendVerifyRequest = function sendVerifyRequest(id, type) {
	  api.replace('manager/loan/class-verify/' + id, {
	    body: $.param({
	      status: type
	    })
	  }).then(function (response) {
	    Materialize.toast('更新成功');
	  }).catch(function (response) {
	    console.log('Fail', response);
	    Materialize.toast('更新失敗');
	  });
	};

/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _lodash = __webpack_require__(259);

	module.exports = function (context, data, baseUrl) {
	  if (!data.current_page) {
	    return;
	  }

	  var currentPage = data.current_page;
	  var lastPage = data.last_page;
	  var prevUrl = data.prev_page_url ? baseUrl + '?page=' + (currentPage - 1) : null;
	  var nextUrl = data.next_page_url ? baseUrl + '?page=' + (currentPage + 1) : null;
	  var minPage = currentPage > lastPage - 10 ? lastPage - 10 : currentPage;
	  var maxPage = Math.min(currentPage + 10, lastPage);
	  var pages = Array.prototype.map.call((0, _lodash.range)(minPage, maxPage + 1), function (num) {
	    return { num: num, url: baseUrl + '?page=' + num };
	  });
	  (0, _lodash.assign)(context, {
	    prevUrl: prevUrl,
	    nextUrl: nextUrl,
	    pages: pages
	  });
	  return function () {
	    var ele = document.getElementById('pagination-' + currentPage);
	    ele.className = 'active';
	  };
	};

/***/ },

/***/ 259:
/***/ function(module, exports) {

	module.exports = _;

/***/ },

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var PageLength;
	var PageNow = 1;
	var TotalPeople = 0;

	Sammy('#main', function () {
	  this.get('#/admin/account', function (context) {
	    context.loadPartials({ menu: '/templates/admin/menu.ms' }).partial('/templates/admin/account.ms').then(function () {
	      accountButtonEvent();
	      accountDataEvent();
	      $('.account_page').click();
	    });
	  });
	});

	function accountButtonEvent() {
	  var modalTarget;
	  $('#account_container').find('.modal-trigger').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    modalTarget = $(this).data('modal_target');
	    $('#' + modalTarget).fadeIn();
	  });

	  $('#account_container').find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $('#' + modalTarget).fadeOut();
	  });
	}

	function accountDataEvent() {
	  // get Account List
	  $('.account_page').unbind('click');
	  $('.account_page').click(function () {
	    PageNow = $(this).html();
	    console.log(PageNow);
	    $.get('/api/manager/user', function (result) {
	      if (PageNow == 1) {
	        TotalPeople = result.total;
	        PageLength = Math.ceil(TotalPeople / 10);
	      }
	      console.log(result);
	      // Produce Html
	      producePage();
	      produceAccountList(result.data);

	      // Bind Event on New Element
	      accountDataEvent();
	      accountButtonEvent();
	    });
	  });

	  // get Account Detail
	  $('.account_list').unbind('click');
	  $('.account_list').click(function () {
	    var id = $(this).data('user_id');
	    $.get('/api/manager/user/' + id, function (result) {
	      console.log(result);
	    });
	  });

	  // create Account
	  $('#create_account').unbind('click');
	  $('#create_account').click(function () {
	    var request = {};

	    $.post('/api/manager/user', request, function (result) {
	      console.log(result);
	    });
	  });

	  // update Account
	  $('.update_account').unbind('click');
	  $('.update_account').click(function () {
	    var request = {};
	    var id = $(this).data('account_id');

	    $.put('/api/manager/user' + id, function (result) {
	      console.log(result);
	    });
	  });

	  // delete Account
	  $('.delete_account').unbind('click');
	  $('.delete_account').click(function () {
	    $.delete('/api/manager/user' + id, function (result) {
	      console.log(result);
	    });
	  });
	}

	function produceAccountList(people) {
	  var text = '';
	  var i;
	  var j;

	  for (i = Math.floor(PageNow / 10) * 10, j = 0; i < TotalPeople && j < 10; i++, j++) {
	    text += '<div class="card">';
	    text += '<div class="row card-content">';
	    text += '<span class="col s4 center-align">帳號</span>';
	    text += '<span class="col s4 center-align">權限</span>';
	    text += '<a class="waves-effect waves-light btn modal-trigger account_list"';
	    text += 'data-modal_target="card_detail" data-user_id="' + people[j].id + '">';
	    text += '<i class="material-icons left">build</i>修改 / 刪除';
	    text += '</a>';
	    text += '</span>';
	    text += '</div>';
	    text += '</div>';
	  }

	  $('#first_row').after(text);
	}

	function producePage() {
	  var text = '';
	  var i;
	  var j;

	  for (i = Math.floor(PageNow / 10) * 10, j = 0; i < PageLength && j < 10; i++, j++) {
	    if (i != PageNow - 1) {
	      text += '<li class="waves-effect">';
	    } else {
	      text += '<li class="active">';
	    }
	    text += i + 1;
	    text += '</li>';
	  }
	  $('#account_container').find('.page_prev').after(text);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(229);
	var when = __webpack_require__(197);

	Sammy('#main', function () {
	  this.get('#/admin/property', function (context) {
	    console.log('admin property');
	    var propertyPromise = client({
	      path: 'manager/property/others',
	      method: 'GET',
	      name: 'property',
	      params: {
	        page: 1,
	        length: 10000
	      }
	    });
	    var loanPromise = client({
	      path: 'manager/loan/others',
	      method: 'GET',
	      name: 'loan',
	      params: {
	        page: 1,
	        length: 1000000
	      }
	    });
	    var RepairPromise = client({
	      path: 'manager/repair',
	      method: 'GET',
	      name: 'repair',
	      params: {
	        page: 1,
	        length: 1000000
	      }
	    });
	    when.all([propertyPromise, loanPromise, RepairPromise]).spread(function (propertyData, loanData, repairData) {
	      console.log('property data:', propertyData);

	      context.propertyData = propertyData.entity.data.map(function (item) {
	        var colors = { 'deleted': 'red', 'maintenance': 'red', 'normal': 'teal' };
	        item.status.color = colors[item.status.name] || 'blue';
	        return item;
	      });

	      context.loanData = loanData.entity.data.map(function (item) {
	        var property = context.propertyData.find(function (data) {
	          return parseInt(item.property_id) === data.id;
	        });
	        item.username = item.user.username;
	        item.code = property.code;
	        item.time = item.date_began_at + ' ' + (item.time_began_at == null ? '' : item.time_began_at) + '  -  ' + item.date_ended_at + ' ' + (item.time_ended_at == null ? '' : item.time_ended_at);
	        var isReturn = { 'canceled': 'hide', 'finished': 'hide', 'refused': 'hide',
	          'submitted': 'block', 'accepted': 'block' };
	        item.isReturn = isReturn[item.status.name] || 'hide';
	        return item;
	      });
	      console.log('loan data:', context.loanData);

	      context.repairData = repairData.entity.data.map(function (item) {
	        var isReturn = { 'finished': 'hide', 'submitted': 'block', 'processing': 'block' };
	        item.isReturn = isReturn[item.status.name] || 'hide';
	        return item;
	      });
	      console.log('repair data:', context.repairData);

	      context.propertyPage = [];
	      for (var i = 0; i < Math.ceil(propertyData.entity.total / 5); i++) {
	        context.propertyPage.push({});
	        context.propertyPage[i].classes = '';
	        if (i === 0) {
	          context.propertyPage[i].classes = 'active';
	        }
	        context.propertyPage[i].pageNum = i + 1;
	      }

	      context.loanPage = [];
	      for (var i = 0; i < Math.ceil(loanData.entity.total / 5); i++) {
	        context.loanPage.push({});
	        context.loanPage[i].classes = '';
	        if (i === 0) {
	          context.loanPage[i].classes = 'active';
	        }
	        context.loanPage[i].pageNum = i + 1;
	      }

	      context.repairPage = [];
	      for (var i = 0; i < Math.ceil(repairData.entity.total / 5); i++) {
	        context.repairPage.push({});
	        context.repairPage[i].classes = '';
	        if (i === 0) {
	          context.repairPage[i].classes = 'active';
	        }
	        context.repairPage[i].pageNum = i + 1;
	      }

	      context.loadPartials({ menu: '/templates/admin/menu.ms' }).partial('/templates/admin/property.ms').then(function () {
	        propertyBindEvent(context.propertyData, context.loanData);
	        propertyPageEvent(context.propertyPage.length, '.property_system');
	        showPage(1, context.propertyPage.length, '.property_system');
	        propertyPageEvent(context.loanPage.length, '.manage_system');
	        showPage(1, context.loanPage.length, '.manage_system');
	        propertyPageEvent(context.repairPage.length, '.repair_system');
	        showPage(1, context.repairPage.length, '.repair_system');
	      });
	    }).catch(function (response) {
	      if (response instanceof Error) {
	        console.log(response);
	      }
	      if (response.request) {
	        if (response.request.name === 'loan') {
	          alert('取得財產借用列表失敗!');
	          console.log('get loan other list error, ', response);
	        } else if (response.request.name === 'property') {
	          alert('取得財產列表失敗!');
	          console.log('get property list error, ', response);
	        } else if (response.request.name === 'repair') {
	          alert('取得財產報修列表失敗!');
	          console.log('get repair list error, ', response);
	        }
	      }
	    });
	  });
	});

	function propertyBindEvent(propertyData, loanData) {
	  var $propertyContainer = $('#property_container');
	  //Material initialize
	  $propertyContainer.find('select').material_select();
	  $propertyContainer.find('.datepicker').pickadate({
	    selectMonths: true,
	    selectYears: 15,
	    format: 'yyyy-mm-dd'
	  });
	  $propertyContainer.find('#sub_menu').tabs();
	  $propertyContainer.find('#property_system').on('click', function (event) {
	    $propertyContainer.find('.property_system').css('display', 'block');
	    $propertyContainer.find('.manage_system').css('display', 'none');
	    $propertyContainer.find('.repair_system').css('display', 'none');
	  });
	  $propertyContainer.find('#property_manage').on('click', function (event) {
	    $propertyContainer.find('.property_system').css('display', 'none');
	    $propertyContainer.find('.manage_system').css('display', 'block');
	    $propertyContainer.find('.repair_system').css('display', 'none');
	  });
	  $propertyContainer.find('#property_repair').on('click', function (event) {
	    $propertyContainer.find('.property_system').css('display', 'none');
	    $propertyContainer.find('.manage_system').css('display', 'none');
	    $propertyContainer.find('.repair_system').css('display', 'block');
	  });

	  searchData(propertyData, loanData);
	  showPropertyDetailAndDeleteProperty();
	  createProperty();
	  loanProperty(propertyData);
	  returnProperty(loanData);
	  repairProperty();
	  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $('#property_modal').fadeOut();
	    $('#create_property_modal').fadeOut();
	    $('#loan_property_modal').fadeOut();
	    $('#return_property_modal').fadeOut();
	    $('#total_return_property_modal').fadeOut();
	    $('#repair_property_modal').fadeOut();
	  });
	}

	function searchData(propertyData, loanData) {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find('#search_property_btn').on('click', function () {
	    var limit;
	    var target = $propertyContainer.find('#search_property').val();
	    $propertyContainer.find('#property_system_content .propertyContent').removeClass('searched');
	    if (target !== '') {
	      var who = '#property_system_content .propertyContent';
	      var searchColumn = ['name', 'code'];
	      limit = search(propertyData, who, target, searchColumn);
	    } else {
	      limit = propertyData.length;
	      $propertyContainer.find('#property_system_content .propertyContent').addClass('searched');
	    }
	    showPage(1, Math.ceil(limit / 5), '.property_system');
	    propertyPageEvent(Math.ceil(limit / 5), '.property_system');
	  });

	  $propertyContainer.find('#search_loanData_btn').on('click', function () {
	    var limit;
	    var target = $propertyContainer.find('#search_loanData').val();
	    $propertyContainer.find('#property_manage_content .propertyContent').removeClass('searched');
	    if (target !== '') {
	      var who = '#property_manage_content .propertyContent';
	      var searchColumn = ['property_name', 'code', 'username'];
	      limit = search(loanData, who, target, searchColumn);
	    } else {
	      limit = loanData.length;
	      $propertyContainer.find('#property_manage_content .propertyContent').addClass('searched');
	    }
	    showPage(1, Math.ceil(limit / 5), '.manage_system');
	    propertyPageEvent(Math.ceil(limit / 5), '.manage_system');
	  });
	}

	function showPropertyDetailAndDeleteProperty() {
	  var $propertyContainer = $('#property_container');
	  var $propertyModal = $('#property_modal');
	  $propertyContainer.find('#property_system_content #property_content .modal-trigger').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }

	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $propertyModal.fadeIn();

	    var ele = $(this).parent().parent();
	    $propertyModal.find('.modal-content h4').html(ele.data('name'));
	    $propertyModal.find('.modal-content .code').html(ele.data('code'));
	    $propertyModal.find('.modal-content .discribe').html(ele.data('describe'));
	    $propertyModal.data('propertyid', ele.data('propertyid'));
	  });
	  $propertyContainer.find('#property_modal #delete_property_btn').on('click', function () {
	    var propertyID = $propertyModal.data('propertyid');
	    $.ajax({
	      url: '/api/manager/property/delete/' + propertyID,
	      _method: 'delete',
	      status: 'deleted',
	      type: 'delete',
	      data: {
	        id: propertyID,
	        _token: $('meta[name="csrf-token"]').attr('content')
	      },
	      error: function error(_error) {
	        alert('刪除財產失敗!');
	        console.log('delete property error, ', _error);
	      },
	      success: function success(data) {
	        alert('刪除財產成功!');
	        location.reload();
	      }
	    });
	  });

	  var $returnPropertyModal = $('#return_property_modal');
	  $propertyContainer.find('#property_manage_content .returnLoanModalTrigger').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $returnPropertyModal.fadeIn();

	    var ele = $(this).parent().parent();
	    var status = ele.data('status');
	    var statusName = { 'canceled': '使用者已取消借用該財產', 'finished': '使用者已歸還該財產',
	      'refused': '管理者已取消借用該財產' };
	    if (status === 'accepted' || status === 'submitted') {
	      $returnPropertyModal.find('#loanOtherAction').addClass('hide');
	      $returnPropertyModal.find('#return_property_btn').removeClass('hide');
	    } else {
	      $returnPropertyModal.find('#loanOtherAction').removeClass('hide').html(statusName[status]);
	      $returnPropertyModal.find('#return_property_btn').addClass('hide');
	    }

	    $returnPropertyModal.find('.userName').html(ele.data('user_nickname'));
	    $returnPropertyModal.find('.userID').html(ele.data('username'));
	    $returnPropertyModal.find('.phone').html(ele.data('phone'));
	    $returnPropertyModal.find('.email').html(ele.data('email'));
	    $returnPropertyModal.find('.propertyName').html(ele.data('name'));
	    $returnPropertyModal.find('.time').html(ele.data('time'));
	    $returnPropertyModal.find('.remark').html(ele.data('remark'));
	    $returnPropertyModal.data('loan_id', ele.data('loan_id'));
	  });
	  var $repairPropertyModal = $('#repair_property_modal');
	  $propertyContainer.find('#property_repair_content .repairModalTrigger').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $repairPropertyModal.fadeIn();

	    var ele = $(this).parent().parent();
	    var status = ele.data('status');
	    var statusName = { 'submitted': '', 'processing': 'hide', 'finished': '已報修/清理' };
	    if (status === 'submitted' || status === 'processing') {
	      $repairPropertyModal.find('#repairOtherAction').addClass('hide');
	      $repairPropertyModal.find('#repair_property_btn').removeClass('hide');
	    } else {
	      $repairPropertyModal.find('#repairOtherAction').removeClass('hide').html(statusName[status]);
	      $repairPropertyModal.find('#repair_property_btn').addClass('hide');
	    }
	    $repairPropertyModal.find('.userName').html(ele.data('user_nickname'));
	    $repairPropertyModal.find('.userID').html(ele.data('username'));
	    $repairPropertyModal.find('.phone').html(ele.data('phone'));
	    $repairPropertyModal.find('.email').html(ele.data('email'));
	    $repairPropertyModal.find('.propertyName').html(ele.data('name'));
	    $repairPropertyModal.find('.time').html(ele.data('time'));
	    $repairPropertyModal.find('.remark').html(ele.data('remark'));
	    $repairPropertyModal.data('repair_id', ele.data('repair_id'));
	  });
	}

	function createProperty() {
	  var $propertyContainer = $('#property_container');
	  var $createPropertyModal = $('#create_property_modal');
	  $propertyContainer.find('#property_system_content #create_property').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $createPropertyModal.fadeIn();
	  });
	  $propertyContainer.find('#create_property_modal #create_property_btn').on('click', function (event) {
	    var type = $createPropertyModal.find('input[type="radio"]:checked').val();
	    var propertyName = $createPropertyModal.find('#create_property_name').val();
	    var propertyCode = $createPropertyModal.find('#create_property_code').val();
	    var describe = $createPropertyModal.find('#create_property_describe').val();
	    if (!type || !propertyName || !propertyCode || !describe) {
	      alert('請輸入財產名稱和財產條碼和敘述！');
	      return;
	    }
	    client({
	      path: 'manager/property/create',
	      method: 'POST',
	      params: {
	        name: propertyName,
	        code: propertyCode,
	        describe: describe,
	        category: type
	      }
	    }).then(function (response) {
	      alert('新增財產成功!');
	      location.reload();
	    }).catch(function (response) {
	      alert('新增財產失敗!');
	      console.log('loan property error, ', response);
	    });
	  });
	}

	function loanProperty(propertyData) {
	  var $propertyContainer = $('#property_container');
	  var $loanPropertyModal = $('#loan_property_modal');
	  var propertyIdContent = [];
	  $propertyContainer.find('#property_system_content #loan_property').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $loanPropertyModal.fadeIn();
	    $loanPropertyModal.find('#loan_property_content div').remove('.remove');
	    $loanPropertyModal.find('#loan_username').val('').focus();
	    $loanPropertyModal.find('#loan_property_code').val('');
	    propertyIdContent = [];
	  });

	  $propertyContainer.find('#loan_property_modal #loan_username').on('keyup', function (event) {
	    $loanPropertyModal.find('#loan_property_code').focus();
	  });
	  $propertyContainer.find('#loan_property_modal #loan_property_code').on('keyup', function (event) {
	    var code = $(this).val();
	    var property;
	    if (property = propertyData.find(function (data) {
	      return data.code === code;
	    })) {
	      $loanPropertyModal.find('#loan_property_content').find('.property_code').html(code).removeClass('property_code').parent().addClass('remove');
	      $loanPropertyModal.find('#loan_property_content').find('.property_name').html(property.name).removeClass('property_name');
	      var data = '<div class="row"><h5 class="property_code col offset-s1"></h5>' + '<h5 class="property_name col offset-s6"></h5></div>';
	      $loanPropertyModal.find('#loan_property_content').append(data);
	      propertyIdContent.push(property.id);
	      $(this).val('');
	    }
	  });

	  $propertyContainer.find('#loan_property_btn').on('click', function (event) {
	    var username = $loanPropertyModal.find('#loan_username').val();
	    var today = new Date();
	    var dd = today.getDate();
	    var mm = today.getMonth() + 1; //January is 0!
	    var yyyy = today.getFullYear();
	    if (dd < 10) {
	      dd = '0' + dd;
	    }
	    if (mm < 10) {
	      mm = '0' + mm;
	    }
	    today = yyyy + '/' + mm + '/' + dd;
	    var dateBeganAt = today;
	    var dateEndedAt = today;
	    var type = 'others';

	    if (!username) {
	      alert('請確實填寫借用表單！');
	      return;
	    }

	    var propertyID;
	    var swit = 0;
	    while (propertyID = propertyIdContent.pop()) {
	      console.log(propertyID);
	      client({
	        path: 'manager/loan/other-create',
	        method: 'POST',
	        params: {
	          property_id: propertyID,
	          username: username,
	          date_began_at: dateBeganAt,
	          date_ended_at: dateEndedAt,
	          remark: '',
	          type: type
	        }
	      }).then(function (response) {}).catch(function (response) {
	        alert('借用財產失敗!');
	        console.log('loan property error, ', response);
	        swit = 1;
	      });
	    }
	    if (!swit) {
	      alert('借用財產成功!');
	    }
	  });
	}

	function returnProperty(loanData) {
	  var $propertyContainer = $('#property_container');
	  var $returnPropertyModal = $('#return_property_modal');
	  var $totalReturnPropertyModal = $('#total_return_property_modal');
	  $propertyContainer.find('#return_property_modal #return_property_btn').on('click', function (event) {
	    var loanID = $returnPropertyModal.data('loan_id');
	    var swit = 1;
	    returnPropertyAjax(loanID, swit);
	    if (swit) {
	      alert('歸還財產成功!');
	      location.reload();
	    } else {
	      alert('歸還財產失敗!');
	    }
	    /*$.ajax({
	      url: '/api/manager/loan/other-restitution/' + loanID,
	      _method: 'put',
	      type: 'put',
	      data: {
	        id: loanID,
	        status: 'finished',
	        _token: $('meta[name="csrf-token"]').attr('content')
	      },
	      error: function(error) {
	        alert('歸還財產失敗!');
	        console.log('return property error, ', error);
	      },
	      success: function(data) {
	        console.log('return property success!', data);
	        alert('歸還財產成功!');
	        location.reload();
	      }
	    });*/
	  });

	  var loanIdContent = [];
	  $propertyContainer.find('#property_system_content #return_property').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $totalReturnPropertyModal.fadeIn();
	    $totalReturnPropertyModal.find('#total_return_property_content div').remove('.remove');
	    $totalReturnPropertyModal.find('#total_return_username').val('').focus();
	    $totalReturnPropertyModal.find('#total_return_property_code').val('');
	    loanIdContent = [];
	  });
	  $totalReturnPropertyModal.find('#total_return_username').on('keyup', function (event) {
	    $totalReturnPropertyModal.find('#total_return_property_code').focus();
	  });
	  $totalReturnPropertyModal.find('#total_return_property_code').on('keyup', function (event) {
	    var code = $(this).val();
	    var username = $totalReturnPropertyModal.find('#total_return_username').val();
	    var loan;
	    if (loan = loanData.find(function (data) {
	      return data.code === code && data.user.username === username && (data.status.name === 'accepted' || data.status.name === 'submitted');
	    })) {
	      $totalReturnPropertyModal.find('#total_return_property_content').find('.property_code').html(code).removeClass('property_code').parent().addClass('remove');
	      $totalReturnPropertyModal.find('#total_return_property_content').find('.property_name').html(loan.property_name).removeClass('property_name');
	      var data = '<div class="row"><h5 class="property_code col offset-s1"></h5>' + '<h5 class="property_name col offset-s6"></h5></div>';
	      $totalReturnPropertyModal.find('#total_return_property_content').append(data);
	      loanIdContent.push(loan.id);
	      $(this).val('');
	    }
	  });

	  $propertyContainer.find('#total_return_property_modal #total_return_property_btn').on('click', function (event) {
	    var swit = 1;
	    var loanID;
	    while (loanID = loanIdContent.pop()) {
	      returnPropertyAjax(loanID, swit);
	    }

	    if (swit) {
	      alert('歸還財產成功!');
	      location.reload();
	    } else {
	      alert('歸還財產失敗!');
	    }
	  });
	}

	function returnPropertyAjax(loanID, swit) {
	  $.ajax({
	    url: '/api/manager/loan/other-restitution/' + loanID,
	    _method: 'put',
	    type: 'put',
	    data: {
	      id: loanID,
	      status: 'finished',
	      _token: $('meta[name="csrf-token"]').attr('content')
	    },
	    error: function error(_error2) {
	      console.log('return property error, ', _error2);
	      swit = 0;
	    },
	    success: function success(data) {
	      console.log('return property success!', data);
	      if (data.status !== 0) {
	        swit = 0;
	      }
	    }
	  });
	}

	function repairProperty() {
	  var $propertyContainer = $('#property_container');
	  var $repairPropertyModal = $('#repair_property_modal');
	  $propertyContainer.find('#repair_property_modal #repair_property_btn').on('click', function (event) {
	    var repairList = [];
	    repairList[0] = $repairPropertyModal.data('repair_id');
	    $.ajax({
	      url: '/api/manager/repair',
	      _method: 'put',
	      type: 'put',
	      data: {
	        repair_list: repairList,
	        status: 'finished',
	        _token: $('meta[name="csrf-token"]').attr('content')
	      },
	      error: function error(_error3) {
	        alert('報修/清理完成財產失敗!');
	        console.log('repair property error, ', _error3);
	      },
	      success: function success(data) {
	        console.log('repair property success!', data);
	        alert('報修/清理財產成功!');
	        console.log(data);
	        location.reload();
	      }
	    });
	  });
	}

	function propertyPageEvent(limit, who) {
	  var $propertyContainer = $('#property_container');
	  var nowPage = 1;
	  $propertyContainer.find(who).find('.page').unbind('click').on('click', function (event) {
	    if (nowPage == parseInt($(this).data('pagenum'))) {
	      return;
	    } else if ($(this).data('pagenum') == 'prev') {
	      if (nowPage <= 1) {
	        return;
	      }
	      nowPage -= 1;
	    } else if ($(this).data('pagenum') == 'next') {
	      if (nowPage >= limit) {
	        return;
	      }
	      nowPage += 1;
	    } else {
	      nowPage = $(this).data('pagenum');
	    }
	    showPage(nowPage, limit, who);
	  });
	}

	function showPage(page, limit, who) {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find(who).find('.showContent').removeClass('block').addClass('hide');
	  for (var i = 0; i < 5; i++) {
	    var show = who + ' .showContent.searched:eq(' + ((page - 1) * 5 + i) + ')';
	    $propertyContainer.find(show).removeClass('hide').addClass('block');
	  }
	  $propertyContainer.find(who).find('.pagination li').removeClass('inline-block active').addClass('hide');
	  $propertyContainer.find(who).find('.pagination li:eq(' + page + ')').addClass('active');
	  $propertyContainer.find(who).find('.pagination li:lt(' + (limit + 1) + ')').removeClass('hide').addClass('inline-block');
	  $propertyContainer.find(who).find('.pagination li:last-child').removeClass('hide').addClass('inline-block');
	}

	function search(Data, who, target, searchColumn) {
	  var i;
	  var j;
	  var limit;
	  var $propertyContainer = $('#property_container');
	  for (i = 0, limit = 0; i < Data.length; i++) {
	    for (j = 0; j < searchColumn.length; j++) {
	      if (Data[i][searchColumn[j]].indexOf(target) != -1) {
	        limit++;
	        var tag = who + ':nth-child(' + (i + 2) + ')';
	        $propertyContainer.find(tag).addClass('searched');
	      }
	    }
	  }
	  return limit;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var lodash = __webpack_require__(259);
	var validate = __webpack_require__(217);
	var moment = __webpack_require__(263);
	var when = __webpack_require__(197);
	var api = __webpack_require__(221);
	var ValidationError = __webpack_require__(264);

	validate.validators.daterange = function (value, opts) {
	  return new when.Promise(function (resolve) {
	    if (opts.latest) {
	      var lastestDate = moment($('#' + opts.latest).val());
	      if (lastestDate.isSameOrBefore(value)) {
	        resolve();
	      } else {
	        resolve('^必須大於等於開始時間');
	      }
	    }
	  });
	};

	var SETTING_RULE = {
	  time_name: {
	    presence: {
	      message: '^必填'
	    }
	  },
	  begin_date_submit: {
	    presence: {
	      message: '^必填'
	    }
	  },
	  ended_date_submit: {
	    presence: {
	      message: '^必填'
	    },
	    daterange: {
	      latest: 'begin_date'
	    }
	  },
	  stu_start: {
	    presence: {
	      message: '^必填'
	    },
	    daterange: {
	      latest: 'begin_date'
	    }
	  },
	  lab_start: {
	    presence: {
	      message: '^必填'
	    },
	    daterange: {
	      latest: 'begin_date'
	    }
	  }
	};

	Sammy('#main', function (app) {
	  app.get('#/admin/setting', function (context) {
	    api.read('manager/setting').then(function (data) {
	      console.log(data);
	      lodash.assign(context, lodash.omit(data, function (x) {
	        return !!!x;
	      }));
	      context.loadPartials({ menu: '/templates/admin/menu.ms' }).partial('/templates/admin/setting.ms').render(function () {
	        $('.datepicker').each(function (_idx, ele) {
	          $(ele).pickadate({
	            format: 'yyyy-mm-dd',
	            formatSubmit: 'yyyy-mm-dd',
	            closeOnSelect: true,
	            closeOnClear: true,
	            onClose: function onClose() {
	              console.log('Close');
	              ele.blur();
	            } });
	        });
	      });
	    });
	  });

	  app.put('#/admin/setting', function (context) {
	    $('input').removeClass('validate invalid');
	    validate.async(context.params, SETTING_RULE, { wrapErrors: ValidationError }).then(function () {
	      var params = lodash.assign({}, context.params);
	      params.began_date = params.begin_date_submit;
	      params.ended_date = params.ended_date_submit;
	      console.log('Validation setting');
	      api.replace('manager/setting', {
	        body: $.param(params)
	      }).then(function () {
	        Materialize.toast('更新成功');
	      }).catch(function (error) {
	        Materialize.toast('更新失敗');
	      });
	    }).catch(function (err) {
	      return err.name === 'ValidationError';
	    }, function (error) {
	      lodash.each(error.errors, function (val, key) {
	        if (key === 'begin_date_submit' || key === 'ended_date_submit') {
	          key = key.slice(0, -7);
	        }
	        $('#' + key).addClass('validate invalid').parent().find('label').attr('data-error', val[0]);
	      });
	    }).catch(function (error) {
	      console.log('System error', error);
	    });
	    return false;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 263:
/***/ function(module, exports) {

	module.exports = moment;

/***/ },

/***/ 264:
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	module.exports = (function (_Error) {
	  _inherits(ValidationError, _Error);

	  function ValidationError(errors, options, attributes, constraints) {
	    _classCallCheck(this, ValidationError);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ValidationError).call(this, 'Validation error'));

	    Error.captureStackTrace(_this, _this.constructor);
	    _this.name = 'ValidationError';
	    _this.errors = errors;
	    _this.options = options;
	    _this.attributes = attributes;
	    _this.constraints = constraints;
	    return _this;
	  }

	  return ValidationError;
	})(Error);

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(192);
	var when = __webpack_require__(197);
	var moment = __webpack_require__(263);
	var api = __webpack_require__(221);
	var vars = __webpack_require__(266);

	var toMoment = function toMoment(time) {
	  return moment(time, 'HH:mm:ss');
	};

	Sammy('#main', function (app) {
	  app.get('#/schedule', function (context) {
	    api.browse('manager/loan/courses').then(function (data) {
	      var convertData = function convertData(x) {
	        x.start = toMoment(x.time_began_at);
	        x.end = toMoment(x.time_ended_at);
	        x.token = x.long_term_token;
	        return x;
	      };
	      when.promise(function (resolve) {
	        return resolve(data.map(convertData));
	      }).then(function (datas) {
	        var weekName = ['mon', 'tue', 'wed', 'thu', 'fri'];
	        var klass = [];

	        vars.CLASS_RANGE.forEach(function (_ref) {
	          var start = _ref.start;
	          var end = _ref.end;

	          start = toMoment(start);
	          end = toMoment(end);
	          var genWeekSchedule = function genWeekSchedule(week, course) {
	            weekName.forEach(function (name, idx) {
	              week.classes[name] = week.classes[name] || [];
	              if (start.isSameOrAfter(course.start, 'minute') && end.isSameOrBefore(course.end, 'minute') && course.token[idx]) {
	                week.classes[name].push(course.remark + ':' + course.property_name);
	              }
	            });
	            return week;
	          };

	          var week = datas.reduce(genWeekSchedule, {
	            time: start.format('HH:mm:ss') + '~' + end.format('HH:mm:ss'),
	            classes: Object.create(null)
	          });
	          for (var key in week.classes) {
	            week.classes[key] = week.classes[key].join('<br>');
	          }
	          klass.push(week);
	        });
	        context.list = klass;
	        context.partial('/templates/schedule.ms').render(function () {
	          console.log('done');
	        });
	      });
	    });
	  });
	});

/***/ },

/***/ 266:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CLASS_RANGE = exports.CLASS_RANGE = [{ start: '07:00:00', end: '07:30:00' }, { start: '07:30:00', end: '08:00:00' }, { start: '08:00:00', end: '08:30:00' }, { start: '08:30:00', end: '09:00:00' }, { start: '09:00:00', end: '09:30:00' }, { start: '09:30:00', end: '10:00:00' }, { start: '10:00:00', end: '10:30:00' }, { start: '10:30:00', end: '11:00:00' }, { start: '11:00:00', end: '11:30:00' }, { start: '11:30:00', end: '12:00:00' }, { start: '12:00:00', end: '12:30:00' }, { start: '12:30:00', end: '13:00:00' }, { start: '13:00:00', end: '13:30:00' }, { start: '13:30:00', end: '14:00:00' }, { start: '14:00:00', end: '14:30:00' }, { start: '14:30:00', end: '15:00:00' }, { start: '15:00:00', end: '15:30:00' }, { start: '15:30:00', end: '16:00:00' }, { start: '16:00:00', end: '16:30:00' }, { start: '16:30:00', end: '17:00:00' }, { start: '17:00:00', end: '17:30:00' }, { start: '17:30:00', end: '18:00:00' }, { start: '18:00:00', end: '18:30:00' }, { start: '18:30:00', end: '19:00:00' }, { start: '19:00:00', end: '19:30:00' }, { start: '19:30:00', end: '20:00:00' }, { start: '20:00:00', end: '20:30:00' }, { start: '20:30:00', end: '21:00:00' }, { start: '21:00:00', end: '21:30:00' }, { start: '21:30:00', end: '22:00:00' }];

/***/ },

/***/ 267:
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