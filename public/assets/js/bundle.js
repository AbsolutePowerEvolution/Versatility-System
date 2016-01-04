webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(191);
	var Sammy = __webpack_require__(192);
	__webpack_require__(193);

	__webpack_require__(196);

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

	__webpack_require__(197);
	__webpack_require__(247);

	__webpack_require__(260);
	__webpack_require__(263);

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(198);
	__webpack_require__(199);
	__webpack_require__(246);

/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(192);

	Sammy('#main', function () {
	  this.get('#/user/signin', function (context) {
	    context.partial('/templates/user/signin.ms');
	  });

	  this.post('#/user/signin', function (context) {
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
	  $propertyContainer.find('#property_system').on('click', function (event) {
	    $propertyContainer.find('#property_system').addClass('purple darken-4').css('color', 'white');
	    $propertyContainer.find('#property_history').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $propertyContainer.find('.property_system').css('display', 'block');
	    $propertyContainer.find('#property_history_content').css('display', 'none');
	  });

	  $propertyContainer.find('#property_history').on('click', function (event) {
	    $propertyContainer.find('#property_system').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $propertyContainer.find('#property_history').addClass('purple darken-4').css('color', 'white');
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
	  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' + 'data-name="' + data.property_name + '"' + 'data-time="' + data.date_began_at + ' ' + (data.time_began_at == null ? '' : data.time_began_at) + ' - ' + data.date_ended_at + ' ' + (data.time_ended_at == null ? '' : data.time_ended_at) + '"' + 'data-remark="' + data.remark + '">';
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

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var rest = __webpack_require__(201);
	var pathPrefix = __webpack_require__(229);
	var errorCode = __webpack_require__(231);
	var mime = __webpack_require__(232);
	var csrf = __webpack_require__(245);
	var when = __webpack_require__(206);
	var interceptor = __webpack_require__(230);

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

/***/ 209:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 246:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var NumberPeriodStart = [['07:10:00', '08:10:00', '09:10:00'], ['10:10:00', '11:10:00', '12:10:00'], ['13:10:00', '14:10:00', '15:10:00'], ['16:10:00', '17:10:00', '18:10:00'], ['19:10:00', '20:10:00', '21:10:00']];
	var NumberPeriodEnd = [['08:00:00', '09:00:00', '10:00:00'], ['11:00:00', '12:00:00', '13:00:00'], ['14:00:00', '15:00:00', '16:00:00'], ['17:00:00', '18:00:00', '19:00:00'], ['20:00:00', '21:00:00', '22:00:00']];
	var EnglishPeriodStart = [['07:15:00', '08:45:00'], ['10:15:00', '11:45:00'], ['13:15:00', '14:45:00'], ['16:15:00', '17:45:00'], ['19:15:00', '20:45:00']];
	var EnglishPeriodEnd = [['08:30:00', '10:00:00'], ['11:30:00', '13:00:00'], ['14:30:00', '16:00:00'], ['17:30:00', '19:00:00'], ['20:30:00', '22:00:00']];
	var UserPeriodStart = [['07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00'], ['10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00'], ['13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00'], ['16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00'], ['19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00']];
	var UserPeriodEnd = [['07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00'], ['10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00'], ['13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00'], ['16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00'], ['19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00']];
	var LoanTable; // Table Data
	var LoanTablePage;
	var LoanType; // short or long
	var LoanTimeType; // number, english, user
	var LoanHistory; // History Data
	var NowPage;
	var AllPage;

	Sammy('#main', function () {
	  var time = {};

	  this.get('#/user/loan', function (context) {
	    context.time = {};

	    context.time.numberPeriodStart = function () {
	      var result = [];
	      var data = _.flattenDeep(NumberPeriodStart);
	      var i;
	      for (i = 0; i < data.length; i++) {
	        result[i] = {};
	        result[i].index = i;
	        result[i].time = data[i];
	      }

	      return result;
	    };
	    context.time.numberPeriodEnd = function () {
	      var result = [];
	      var data = _.flattenDeep(NumberPeriodEnd);
	      var i;

	      for (i = 0; i < data.length; i++) {
	        result[i] = {};
	        result[i].index = i;
	        result[i].time = data[i];
	      }

	      return result;
	    };
	    context.time.englishPeriodStart = function () {
	      var result = [];
	      var data = _.flattenDeep(EnglishPeriodStart);
	      var i;
	      for (i = 0; i < data.length; i++) {
	        result[i] = {};
	        result[i].index = i;
	        result[i].time = data[i];
	      }

	      return result;
	    };
	    context.time.englishPeriodEnd = function () {
	      var result = [];
	      var data = _.flattenDeep(EnglishPeriodEnd);
	      var i;

	      for (i = 0; i < data.length; i++) {
	        result[i] = {};
	        result[i].index = i;
	        result[i].time = data[i];
	      }

	      return result;
	    };
	    context.time.userPeriodStart = function () {
	      var result = [];
	      var data = _.flattenDeep(UserPeriodStart);
	      var i;
	      for (i = 0; i < data.length; i++) {
	        result[i] = {};
	        result[i].index = i;
	        result[i].time = data[i];
	      }

	      return result;
	    };
	    context.time.userPeriodEnd = function () {
	      var result = [];
	      var data = _.flattenDeep(UserPeriodEnd);
	      var i;

	      for (i = 0; i < data.length; i++) {
	        result[i] = {};
	        result[i].index = i;
	        result[i].time = data[i];
	      }

	      return result;
	    };
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
	    var i;
	    var text;

	    for (i = 0; i < result.length; i++) {
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
	  $('.modal').find('#input[name="start_date"]').val('');
	  $('.modal').find('#input[name="end_date"]').val('');
	  $('.modal').find('input[type="checkbox"]').prop('checked', false);
	  $('.modal').find('select').find('option:nth-of-type(2)').prop('selected', true);
	  $('.modal').find('select').material_select();
	}

	function loanButtonEvent() {
	  var modalTarget;
	  var switchTimeTarget;
	  $('#main').find('.modal-trigger').on('click', function (event) {
	    if ($(this).data('button') == 'add') {
	      initModal();
	    }

	    $('#materialize-lean-overlay-30').css('display', 'block');
	    modalTarget = $(this).data('modal_target');
	    $('#' + modalTarget).fadeIn();
	  });

	  $('#main').find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $('#' + modalTarget).fadeOut();
	  });

	  $('#screen_classroom').unbind('click');
	  $('#screen_classroom').click(function () {
	    $('#loan_container').show();
	    $('#history_container').hide();
	    $('.modal').find('.belong_loan').show();
	    $('.modal').find('.belong_history').hide();
	  });

	  $('#screen_history').unbind('click');
	  $('#screen_history').click(function () {
	    $('#history_container').show();
	    $('#loan_container').hide();
	    $('.modal').find('.belong_loan').hide();
	    $('.modal').find('.belong_history').show();

	    NowPage = 1;
	    getLoanHistory();
	  });

	  $('.modal #short').unbind('click');
	  $('.modal #short').click(function () {
	    LoanType = 1;
	    $(this).parent().find('button').removeClass('active');
	    $(this).addClass('active');
	    $('.modal .long').hide();
	    $('.modal .short').show();
	  });

	  $('.modal #long').unbind('click');
	  $('.modal #long').click(function () {
	    LoanType = 2;
	    $(this).parent().find('button').removeClass('active');
	    $(this).addClass('active');
	    $('.modal .short').hide();
	    $('.modal .long').show();
	  });

	  $('.modal .switch_time').unbind('click');
	  $('.modal .switch_time').click(function () {
	    $(this).parent().find('button').removeClass('active');
	    $(this).addClass('active');

	    switchTimeTarget = $(this).data('switch_time_target');
	    $('.modal .time_container').hide();
	    $('.modal .' + switchTimeTarget).show();

	    if (switchTimeTarget == 'user_period') {
	      LoanTimeType = 1;
	    } else if (switchTimeTarget == 'number_period') {
	      LoanTimeType = 2;
	    } else {
	      LoanTimeType = 3;
	    }
	  });

	  $('.history_btn').unbind('click');
	  $('.history_btn').click(function () {
	    var id = $(this).data('loan_id');
	    InsertDataToModal(id);
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
	      LoanTable = [];
	      var i;
	      for (i = 0; i < result.length; i++) {
	        if (result[i].loan_classroom != 0) {
	          LoanTable.push(result[i]);
	        }
	      }
	      console.log(LoanTable);
	      produceClassroomStatus();
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
	    });
	  });

	  $('#create_loan').unbind('click');
	  $('#create_loan').click(function () {
	    var request = {};
	    var temp;
	    var i;
	    var errMsg = '';
	    var LoanTimeTypeList = ['user', 'number', 'english'];

	    request.property_id = $('.modal').find('#classroom').val();

	    switch (LoanType) {
	      case 1:
	        {
	          // 短期
	          temp = $('.modal').find('input[name="start_date"]').val();
	          temp = moment(new Date(temp)).format('YYYY-MM-DD');
	          if (temp != 'Invalid date') {
	            var a = new Date();
	            var b = new Date(temp);

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
	          // 長期
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
	          request.long_term_token = '' + temp[6];
	          for (i = 5; i >= 0; i--) {
	            request.long_term_token += '' + temp[i];
	          }

	          break;
	        }
	    }

	    request.time_began_at = $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period').find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_start"]').val();

	    request.time_ended_at = $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period').find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_end"]').val();

	    // check start and end date diff
	    if (errMsg == '') {
	      var startTime = $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period').find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_start"]').val();
	      var endTime = $('.modal').find('.' + LoanTimeTypeList[LoanTimeType - 1] + '_period').find('select[name="' + LoanTimeTypeList[LoanTimeType - 1] + '_end"]').val();
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

	  $('#edit_loan').unbind('click');
	  $('#edit_loan').click(function () {});
	}

	function getLoanHistory() {
	  var request = {};
	  request.page = NowPage;
	  request.length = 10;
	  $.get('/api/user/loan/classrooms', request, function (result) {
	    console.log(result);
	    LoanHistory = result.data;

	    if (NowPage == 1) {
	      AllPage = result.total;
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
	    text += _.trim(LoanHistory[i].time_began_at) + ' ~ ' + _.trim(LoanHistory[i].time_ended_at);
	    text += '</span>';
	    text += '<span class="col s4 history_btn" data-loan_id="' + i + '">';
	    text += '<a class="waves-effect waves-light btn modal-trigger" data-modal_target="loan_class">';
	    text += '<i class="material-icons">build</i>更改/刪除</i>';
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
	  for (i = 0; i < AllPage; i++) {}
	}

	function LoanPageEvent() {}

	function InsertDataToModal(id) {
	  var temp;
	  var group;
	  var start;
	  var end;
	  var i;
	  console.log(LoanHistory[id]);
	  if (LoanHistory[id].long_term_token != null) {
	    $('.modal #long').click();
	    $('input[name="start_date"]').val(LoanHistory[id].date_began_at);
	    $('input[name="end_date"]').val(LoanHistory[id].date_ended_at);

	    $('.modal input[type="checkbox"]').prop('checked', false);
	    temp = LoanHistory[id].long_term_token.split('').reverse();
	    for (i = 0; i < 7; i++) {
	      if (temp[i] == 1) {
	        $('.modal').find('#day' + i).prop('checked', true);
	      }
	    }
	  } else {
	    $('.modal #short').click();
	    $('input[name="start_date"]').val(LoanHistory[id].date_began_at);
	  }

	  $('#classroom option[value="' + LoanHistory[id].property_id + '"]').prop('selected', true);

	  temp = LoanHistory[id].time_began_at.split(':');
	  group = groupTool(temp[1]);
	  start = LoanHistory[id].time_began_at;
	  end = LoanHistory[id].time_ended_at;

	  switch (group) {
	    case 3:
	      {
	        $('.switch_time_container').find('#user_btn').click();
	        console.log(start + end);
	        $('.modal select[name="user_start"]').find('[value="' + start + '"]').prop('selected', true);
	        $('.modal select[name="user_end"]').find('[value="' + end + '"]').prop('selected', true);
	        break;
	      }
	    case 1:
	      {
	        $('.switch_time_container').find('#number_btn').click();
	        break;
	      }
	    case 2:
	      {
	        $('.switch_time_container').find('#english_btn').click();
	        break;
	      }
	  }
	  // update select status
	  $('.modal select').material_select();

	  $('.modal').find('input[name="remark"]').val(LoanHistory[id].remark);

	  $('#edit_loan').attr('data-loan_id', id);
	  $('#delete_loan').attr('data-loan_id', id);
	}

	function produceClassroomStatus() {
	  var i;
	  var j;
	  var k;
	  var temp;
	  var group;
	  var selectedDay = new Date($('#datepicker').val());
	  var began;
	  var ended;

	  // Empty Html
	  $('.content1, .content2, .content3, .content4, .content5').find('div').remove();

	  for (i = LoanTablePage * 5, j = 0; i < LoanTable.length && j < 5; i++, j++) {
	    for (k = 0; k < LoanTable[i].loan_classroom.length; k++) {
	      console.log('here');
	      // examine selected day's status
	      began = new Date(LoanTable[i].loan_classroom[k].date_began_at);
	      ended = new Date(LoanTable[i].loan_classroom[k].date_ended_at);
	      if (LoanTable[i].loan_classroom[k].time_began_at != null && began <= selectedDay && selectedDay <= ended) {

	        temp = LoanTable[i].loan_classroom[k].time_began_at.split(':');
	        group = groupTool(temp[1]);

	        switch (group) {
	          case 1:
	            {
	              // NumberPeriod
	              break;
	            }
	          case 2:
	            {
	              // EnglishPeriod
	              break;
	            }
	          case 3:
	            {
	              // UserPeriod
	              began = matchTool(LoanTable[i].loan_classroom[k].time_began_at, UserPeriodStart);
	              ended = matchTool(LoanTable[i].loan_classroom[k].time_ended_at, UserPeriodEnd);
	              console.log('began = ' + began);
	              console.log('ended = ' + ended);

	              produceTable(group, began, ended, j);
	              break;
	            }
	        }
	      }
	    }
	  }
	}

	function produceTable(group, began, ended, contentIndex) {
	  var i;
	  var j;
	  var perLineLength;
	  var filedIndex;
	  var parseIndex;
	  var labelFront;
	  var labelAfter;

	  switch (group) {
	    case 1:
	      {
	        perLineLength = 3;
	        labelFront = '<div class="number_container number_period';
	        labelAfter = '"></div>';
	        break;
	      }

	    case 2:
	      {
	        perLineLength = 2;
	        labelFront = '<div class="english_container english_period';
	        labelAfter = '"></div>';
	        break;
	      }

	    case 3:
	      {
	        perLineLength = 6;
	        labelFront = '<div class="user_container user_period';
	        labelAfter = '"></div>';
	        break;
	      }
	  }

	  // Parse Html
	  for (i = began, j = 0; j <= ended - began; i++, j++) {
	    filedIndex = Math.floor(i / perLineLength) + 1;
	    parseIndex = i % perLineLength + 1;
	    console.log('filedIndex = ' + filedIndex);
	    console.log('parseIndex = ' + parseIndex);

	    $('#table_filed' + filedIndex).find('.content' + contentIndex).append(labelFront + parseIndex + labelAfter);
	  }
	}

	function matchTool(time, table) {
	  var i;
	  var j;
	  var result;

	  for (i = 0; i < table.length; i++) {
	    for (j = 0; j < table[i].length; j++) {
	      if (time === table[i][j]) {
	        result = i * table[i].length + j;
	        break;
	      }
	    }
	  }

	  return result;
	}

	function groupTool(value) {
	  switch (value) {
	    case '10':
	      {
	        // NumberPeriod
	        return 1;
	      }
	    case '15': // EnglishPeriod
	    case '45':
	      {
	        return 2;
	      }
	    default:
	      {
	        // UserPeriod
	        return 3;
	      }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(248);
	__webpack_require__(258);
	__webpack_require__(259);

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var Sammy = __webpack_require__(192);
	var api = __webpack_require__(249);
	var paginate = __webpack_require__(256);

	Sammy('#main', function () {
	  this.get('#/admin/examine', function (context) {
	    api.browse('manager/loan/classrooms', {
	      params: { page: context.params.page }
	    }).then(function (data) {
	      var pageEffect = paginate(context, data, '#/admin/examine');
	      console.log(data);
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
	    console.log('Examine pass id: ' + id);
	    sendAcceptVerify(id);
	  });

	  item.on('examine-reject', function (event, id) {
	    console.log('Examine reject id: ' + id);
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
	    console.log('Success', response);
	  }).catch(function (response) {
	    console.log('Fail', response);
	  });
	};

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _jquery = __webpack_require__(194);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _fetchPlus = __webpack_require__(250);

	var _fetchPlusCsrf = __webpack_require__(251);

	var _fetchPlusCsrf2 = _interopRequireDefault(_fetchPlusCsrf);

	var _cookie = __webpack_require__(252);

	var _cookie2 = _interopRequireDefault(_cookie);

	var _param = __webpack_require__(253);

	var _param2 = _interopRequireDefault(_param);

	var _header = __webpack_require__(254);

	var _header2 = _interopRequireDefault(_header);

	var _statusCode = __webpack_require__(255);

	var _statusCode2 = _interopRequireDefault(_statusCode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var token = (0, _jquery2.default)('#csrf-token').attr('content');
	var api = (0, _fetchPlus.connectEndpoint)('/api');

	api.addMiddleware((0, _fetchPlusCsrf2.default)('X-CSRF-TOKEN', token));
	api.addMiddleware(_cookie2.default);
	api.addMiddleware(_param2.default);
	api.addMiddleware(_header2.default);
	api.addMiddleware(_statusCode2.default);

	module.exports = api;

/***/ },

/***/ 252:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Default add cookie

	exports.default = function (request) {
	  if (!request.options.credentials) {
	    request.options.credentials = 'include';
	  }
	};

/***/ },

/***/ 253:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(194);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	exports.default = function (request) {
	  if (request.options.method === 'GET' && _typeof(request.options.params) === 'object') {
	    request.path = request.path + '?' + _jquery2.default.param(request.options.params);
	  }
	};

/***/ },

/***/ 254:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var FORM_HEADER = 'application/x-www-form-urlencoded; charset=UTF-8';
	var JSON_HEADER = 'application/json; charset=UTF-8';

	// custom JSON middleware

	exports.default = function (request) {
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

/***/ 255:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _when = __webpack_require__(206);

	var _when2 = _interopRequireDefault(_when);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	// P2P-style unjustifed status code check

	exports.default = function () {
	  return function (response) {
	    if (_typeof(response.body) === 'object' && response.body.status) {
	      if (response.body.status !== 0) {
	        return _when2.default.reject(response);
	      }
	    }
	    return response;
	  };
	};

/***/ },

/***/ 256:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _lodash = __webpack_require__(257);

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

/***/ 257:
/***/ function(module, exports) {

	module.exports = _;

/***/ },

/***/ 258:
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

/***/ 259:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(200);
	var when = __webpack_require__(206);

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
	    when.all([propertyPromise, loanPromise]).spread(function (propertyData, loanData) {
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
	        item.code = property.code;
	        item.time = item.date_began_at + ' ' + (item.time_began_at == null ? '' : item.time_began_at) + '  -  ' + item.date_ended_at + ' ' + (item.time_ended_at == null ? '' : item.time_ended_at);
	        var isReturn = { 'canceled': 'hide', 'finished': 'hide', 'refused': 'hide',
	          'submit': 'block', 'accepted': 'block' };
	        item.isReturn = isReturn[item.status.name] || 'hide';
	        return item;
	      });
	      console.log('loan data:', context.loanData);

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

	      context.loadPartials({ menu: '/templates/admin/menu.ms' }).partial('/templates/admin/property.ms').then(function () {
	        propertyBindEvent(context.propertyData, context.loanData);
	        propertyPageEvent(context.propertyPage.length, '.property_system');
	        showPage(1, context.propertyPage.length, '.property_system');
	        propertyPageEvent(context.loanPage.length, '.manage_system');
	        showPage(1, context.loanPage.length, '.manage_system');
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
	  });
	  $propertyContainer.find('#property_manage').on('click', function (event) {
	    $propertyContainer.find('.property_system').css('display', 'none');
	    $propertyContainer.find('.manage_system').css('display', 'block');
	  });

	  searchData(propertyData, loanData);
	  showPropertyDetailAndDeleteProperty();
	  createProperty();
	  loanProperty(propertyData);
	  returnProperty();
	  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $('#property_modal').fadeOut();
	    $('#create_property_modal').fadeOut();
	    $('#loan_property_modal').fadeOut();
	    $('#return_property_modal').fadeOut();
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
	      var searchColumn = ['property_name', 'code', 'user_id'];
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
	  $propertyContainer.find('#return_property_content .returnLoanModalTrigger').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $returnPropertyModal.fadeIn();

	    var ele = $(this).parent().parent();
	    var status = ele.data('status');
	    $returnPropertyModal.find('#return_property_btn').addClass('hide');
	    if (status === 'canceled') {
	      $returnPropertyModal.find('#loanOtherAction').removeClass('hide').html('使用者已取消借用該財產');
	    } else if (status === 'finished') {
	      $returnPropertyModal.find('#loanOtherAction').removeClass('hide').html('使用者已歸還該財產');
	    } else if (status === 'refused') {
	      $returnPropertyModal.find('#loanOtherAction').removeClass('hide').html('管理者已取消借用該財產');
	    } else {
	      $returnPropertyModal.find('#loanOtherAction').addClass('hide');
	      $returnPropertyModal.find('#return_property_btn').removeClass('hide');
	    }

	    $returnPropertyModal.find('.userName').html(ele.data('username'));
	    $returnPropertyModal.find('.userID').html(ele.data('user_id'));
	    $returnPropertyModal.find('.phone').html(ele.data('phone'));
	    $returnPropertyModal.find('.email').html(ele.data('email'));
	    $returnPropertyModal.find('.propertyName').html(ele.data('name'));
	    $returnPropertyModal.find('.time').html(ele.data('time'));
	    $returnPropertyModal.find('.remark').html(ele.data('remark'));
	    $returnPropertyModal.data('loan_id', ele.data('loan_id'));
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
	  $propertyContainer.find('#property_system_content #loan_property').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $loanPropertyModal.fadeIn();
	  });
	  $propertyContainer.find('#loan_property_modal #loan_property_code').on('keyup', function (event) {
	    var code = $(this).val();
	    var property = propertyData.find(function (data) {
	      return data.code === code;
	    });
	    $(this).parent().find('#loan_property_name').html(property.name);
	  });
	  $propertyContainer.find('#loan_property_btn').on('click', function (event) {
	    var userID = $loanPropertyModal.find('#loan_user_id').val();
	    var code = $loanPropertyModal.find('#loan_property_code').val();
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

	    if (!userID || !code) {
	      alert('請確實填寫借用表單！');
	      return;
	    }
	    var property = propertyData.find(function (data) {
	      return data.code === code;
	    });
	    if (!property.id || !property.name) {
	      alert('沒有此一財產，請從新填寫！');
	      return;
	    }

	    client({
	      path: 'manager/loan/other-create',
	      method: 'POST',
	      params: {
	        property_id: property.id,
	        user_id: userID,
	        date_began_at: dateBeganAt,
	        date_ended_at: dateEndedAt,
	        remark: '',
	        type: type
	      }
	    }).then(function (response) {
	      alert('借用財產成功!');
	    }).catch(function (response) {
	      alert('借用財產失敗!');
	      console.log('loan property error, ', response);
	    });
	  });
	}

	function returnProperty() {
	  var $propertyContainer = $('#property_container');
	  var $returnPropertyModal = $('#return_property_modal');
	  $propertyContainer.find('#return_property_modal #return_property_btn').on('click', function (event) {
	    var loanID = $returnPropertyModal.data('loan_id');
	    console.log('loan id:' + $returnPropertyModal.data('loan_id'));
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
	        alert('歸還財產失敗!');
	        console.log('return property error, ', _error2);
	      },
	      success: function success(data) {
	        console.log('return property success!', data);
	        alert('歸還財產成功!');
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

/***/ 260:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(192);
	var when = __webpack_require__(206);
	var lodash = __webpack_require__(257);
	var moment = __webpack_require__(261);
	var api = __webpack_require__(249);
	var vars = __webpack_require__(262);

	var toMoment = function toMoment(time) {
	  return moment(time, 'HH:mm:ss');
	};

	Sammy('#main', function (app) {
	  app.get('#/schedule', function (context) {
	    api.browse('manager/loan/classrooms', {
	      params: {
	        type: 'course',
	        status: 'accepted'
	      } }).then(function (data) {
	      var promises = [];
	      var convertLongTermToken = function convertLongTermToken(x) {
	        var token = x.long_term_token;
	        if (token) {
	          x.token = lodash.padRight((parseInt(token) >>> 0). /* Force to be unsigned */
	          toString(2), 7, '0').split('').map(function (y) {
	            return !!parseInt(y);
	          });
	        }
	        return x;
	      };
	      var convertTime = function convertTime(x) {
	        x.start = toMoment(x.time_began_at);
	        x.end = toMoment(x.time_ended_at);
	        return x;
	      };
	      promises.push(when.promise(function (resolve) {
	        return resolve(data.data.map(convertLongTermToken).map(convertTime));
	      }));
	      lodash.range(2, data.last_page).map(function (i) {
	        promises.push(api.browse('manager/loan/classrooms', {
	          params: {
	            type: 'course',
	            status: 'accepted',
	            page: i
	          } }).then(function (data) {
	          return data.data.map(convertLongTermToken).map(convertTime);
	        }));
	      });
	      when.reduce(promises, function (datas, data) {
	        return datas.concat(data);
	      }, []).then(function (datas) {
	        var weekName = ['mon', 'tue', 'wed', 'thu', 'fri'];
	        var klass = [];

	        vars.CLASS_RANGE.forEach(function (_ref) {
	          var start = _ref.start;
	          var end = _ref.end;

	          start = toMoment(start);
	          end = toMoment(end);
	          // debugger;
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

/***/ 261:
/***/ function(module, exports) {

	module.exports = moment;

/***/ },

/***/ 262:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CLASS_RANGE = exports.CLASS_RANGE = [{ start: '07:00:00', end: '07:30:00' }, { start: '07:30:00', end: '08:00:00' }, { start: '08:00:00', end: '08:30:00' }, { start: '08:30:00', end: '09:00:00' }, { start: '09:00:00', end: '09:30:00' }, { start: '09:30:00', end: '10:00:00' }, { start: '10:00:00', end: '10:30:00' }, { start: '10:30:00', end: '11:00:00' }, { start: '11:00:00', end: '11:30:00' }, { start: '11:30:00', end: '12:00:00' }, { start: '12:00:00', end: '12:30:00' }, { start: '12:30:00', end: '13:00:00' }, { start: '13:00:00', end: '13:30:00' }, { start: '13:30:00', end: '14:00:00' }, { start: '14:00:00', end: '14:30:00' }, { start: '14:30:00', end: '15:00:00' }, { start: '15:00:00', end: '15:30:00' }, { start: '15:30:00', end: '16:00:00' }, { start: '16:00:00', end: '16:30:00' }, { start: '16:30:00', end: '17:00:00' }, { start: '17:00:00', end: '17:30:00' }, { start: '17:30:00', end: '18:00:00' }, { start: '18:00:00', end: '18:30:00' }, { start: '18:30:00', end: '19:00:00' }, { start: '19:00:00', end: '19:30:00' }, { start: '19:30:00', end: '20:00:00' }, { start: '20:00:00', end: '20:30:00' }, { start: '20:30:00', end: '21:00:00' }, { start: '21:00:00', end: '21:30:00' }, { start: '21:30:00', end: '22:00:00' }];

/***/ },

/***/ 263:
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