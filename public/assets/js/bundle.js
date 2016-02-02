webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	__webpack_require__(2);
	__webpack_require__(192);
	var Sammy = __webpack_require__(193);
	var Vue = __webpack_require__(194);
	__webpack_require__(195);
	__webpack_require__(197);

	Vue.use(__webpack_require__(219));

	// Global vue config
	Vue.config.debug = true;

	// Http config
	var token = $('#csrf-token').attr('content');
	Vue.http.options.root = '/api';
	Vue.http.headers.common['X-CSRF-TOKEN'] = token;
	Vue.http.options.emulateJSON = true;

	__webpack_require__(220);

	Sammy('#main').use('Hogan', 'ms').run('#/');
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 1:
/***/ function(module, exports) {

	module.exports = jQuery;

/***/ },

/***/ 192:
/***/ function(module, exports) {

	module.exports = null;

/***/ },

/***/ 193:
/***/ function(module, exports) {

	module.exports = Sammy;

/***/ },

/***/ 194:
/***/ function(module, exports) {

	module.exports = Vue;

/***/ },

/***/ 196:
/***/ function(module, exports) {

	module.exports = Hogan;

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var when = __webpack_require__(198);
	var validate = __webpack_require__(218);

	validate.Promise = when.Promise;

/***/ },

/***/ 201:
/***/ function(module, exports) {

	/* (ignored) */

/***/ },

/***/ 218:
/***/ function(module, exports) {

	module.exports = validate;

/***/ },

/***/ 219:
/***/ function(module, exports) {

	module.exports = VueResource;

/***/ },

/***/ 220:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(221);
	__webpack_require__(285);

	__webpack_require__(325);
	__webpack_require__(331);

/***/ },

/***/ 221:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(222);
	__webpack_require__(257);
	__webpack_require__(284);

/***/ },

/***/ 222:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _signin = __webpack_require__(223);

	var _signin2 = _interopRequireDefault(_signin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Sammy = __webpack_require__(193);

	Sammy('#main', function (app) {
	  app.get('#/user/signin', function (context) {
	    context.partial('/templates/vue.ms').then(function () {
	      var App = Vue.extend({
	        template: '<signin v-ref:signin></signin>',
	        components: { Signin: _signin2.default },
	        compiled: function compiled() {
	          var signin = this.$refs.signin;
	          signin.$on('login', function (type) {
	            if (type === signin.USER) {
	              context.redirect('#/user/loan');
	            } else {
	              context.redirect('#/admin/examine');
	            }
	          });

	          signin.$on('fail', function () {
	            Materialize.toast('帳號 or 密碼錯誤', 500);
	          });

	          signin.$on('error', function () {
	            Materialize.toast('伺服器錯誤', 500);
	          });
	        }
	      });

	      new Vue({
	        el: '#main',
	        components: { App: App }
	      });
	    });
	  });
	});

/***/ },

/***/ 223:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(224)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/signin.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(256)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/signin.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _symbol = __webpack_require__(225);

	var _symbol2 = _interopRequireDefault(_symbol);

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var userSym = (0, _symbol2.default)('user');
	var managerSym = (0, _symbol2.default)('manager');
	exports.default = {
	  data: function data() {
	    return {
	      username: '',
	      password: '',
	      USER: userSym,
	      MANAGER: managerSym
	    };
	  },

	  methods: {
	    doSignin: function doSignin(event) {
	      var _this = this;

	      var username = this.$data.username;
	      var password = this.$data.password;
	      var data = {
	        username: username,
	        password: password
	      };
	      this.$http.post('/api/auth/login', data).then(function (response) {
	        console.log(response);
	        if (response.data.status) {
	          var sym = response.data.is_student ? userSym : managerSym;
	          _this.$emit('login', sym);
	        } else {
	          _this.$emit('fail');
	        }
	      }, function (response) {
	        console.log(response);
	        _this.$emit('error', response);
	      });
	    }
	  }
	};

/***/ },

/***/ 256:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"signin-card\">\n  <div class=\"row\">\n    <div class=\"col s12 m4 offset-m4\">\n      <div class=\"card z-depth-3\">\n        <div class=\"container\">\n          <div class=\"row\">\n            <div class=\"card-content black-text center-align\">\n              <span class=\"card-title\">資訊工程學系<br>系務系統</span>\n            </div>\n            <form @submit.prevent=\"doSignin\">\n              <div class=\"input-field\">\n                <i class=\"material-icons prefix\">account_box</i>\n                <input type=\"text\"\n                  id=\"username\"\n                  name=\"username\"\n                  v-model=\"username\">\n                <label for=\"username\">Username</label>\n              </div>\n              <div class=\"input-field\">\n                <i class=\"material-icons prefix\">lock</i>\n                <input type=\"password\"\n                  id=\"password\"\n                  name=\"password\"\n                  v-model=\"password\">\n                <label for=\"password\">Password</label>\n              </div>\n              <div class=\"card-action center\">\n                <button class=\"waves-effect btn\"\n                   type=\"button\" @click.stop=\"doSignin\">\n                   Login\n                 </button>\n              </div>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n";

/***/ },

/***/ 257:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(193);
	var client = __webpack_require__(258);
	var when = __webpack_require__(198);

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

	Sammy('#main', function () {
	  this.get('#/user/property', function (context) {
	    console.log('user property');

	    var propertyPromise = client({
	      path: 'user/property/others',
	      method: 'GET',
	      name: 'property',
	      params: {
	        page: 1,
	        length: 10000
	      }
	    });
	    var loanPromise = client({
	      path: 'user/loan/others',
	      method: 'GET',
	      name: 'loan',
	      params: {
	        page: 1,
	        length: 1000000
	      }
	    });
	    var RepairPromise = client({
	      path: 'user/repair',
	      method: 'GET',
	      name: 'repair',
	      params: {
	        page: 1,
	        length: 1000000
	      }
	    });

	    when.all([propertyPromise, loanPromise, RepairPromise]).spread(function (propertyData, loanData, repairData) {
	      console.log('propertyData:', propertyData);
	      console.log('loanData:', loanData);
	      console.log('repairData:', repairData);

	      context.propertyData = propertyData.entity.data.map(function (item) {
	        var colors = { 'deleted': 'red', 'maintenance': 'red', 'normal': 'teal' };
	        item.status.color = colors[item.status.name] || 'blue';
	        return item;
	      });
	      context.propertyPage = [];
	      for (var i = 0; i < Math.ceil(propertyData.entity.total / 5); i++) {
	        context.propertyPage.push({});
	        context.propertyPage[i].classes = '';
	        if (i === 0) {
	          context.propertyPage[i].classes = 'active';
	        }
	        context.propertyPage[i].pageNum = i + 1;
	      }

	      context.loanData = loanData.entity.data.map(function (item) {
	        var colors = { 'canceled': 'teal', 'refused': 'teal', 'finished': 'teal' };
	        item.status.color = colors[item.status.name] || 'red';
	        return item;
	      });

	      context.repairData = repairData.entity.data.map(function (item) {
	        var colors = { 'canceled': 'teal', 'finished': 'teal' };
	        item.status.color = colors[item.status.name] || 'red';
	        return item;
	      });

	      context.loadPartials({ menu: '/templates/user/menu.ms' }).partial('/templates/user/property.ms').then(function () {
	        showPage(1, context.propertyPage.length, '.property_system');
	        propertyPageEvent(context.propertyPage.length, '.property_system');
	        propertyBindEvent(context.propertyData);
	      });
	    }).catch(function (response) {
	      if (response.request.name === 'loan') {
	        Materialize.toast($('<span>取得財產借用列表失敗!</span>'), 5000);
	        console.log('get loan other list error, ', response);
	      } else if (response.request.name === 'property') {
	        Materialize.toast('<span>取得財產列表失敗!</span>', 5000);
	        console.log('get property list error, ', response);
	      } else if (response.request.name === 'repair') {
	        Materialize.toast($('<span>取得財產報修列表失敗!</span>'), 5000);
	        console.log('get repair list error, ', response);
	      }
	    });
	  });
	});

	function propertyBindEvent(propertyData) {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find('#sub_menu').tabs();
	  $propertyContainer.find('#repair_remark').trigger('autoresize');
	  $propertyContainer.find('#sub_menu li').on('click', function (event) {
	    var id = $(this).attr('id');
	    $propertyContainer.find('.property').css('display', 'none');
	    $propertyContainer.find('.' + id).css('display', 'block');
	  });

	  $propertyContainer.find('.collapsible').collapsible({
	    accordion: false
	  });

	  searchData(propertyData);
	  repairProperty();
	}

	function repairProperty() {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find('#repair_property_btn').on('click', function () {
	    var type = $('#property_repair_form input:radio:checked[name="repair_type"]').val();
	    var title = $('#repair_title').val();
	    var remark = $('#repair_remark').val();
	    if (!title || !remark || !type) {
	      Materialize.toast($('<span>請確實填寫每個欄位內容!</span>'), 5000);
	      return;
	    }

	    client({
	      path: 'user/repair/create',
	      method: 'post',
	      params: {
	        type: type,
	        title: title,
	        remark: remark
	      }
	    }).then(function (response) {
	      console.log(response);
	      Materialize.toast($('<span>報修財產成功!</span>'), 5000);
	    }).catch(function (response) {
	      console.log(response);
	      Materialize.toast($('<span>報修財產失敗!</span>'), 10000);
	    });
	  });
	}

	function searchData(propertyData) {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find('#search_property_btn').on('click', function () {
	    var i;
	    var limit = 0;
	    var target = $propertyContainer.find('#search_property').val();
	    var who = '#property_system_content .propertyContent';
	    $propertyContainer.find('#property_system_content .propertyContent').removeClass('searched');
	    if (target !== '') {
	      for (i = 0; i < propertyData.length; i++) {
	        if (propertyData[i].name.indexOf(target) != -1) {
	          var tag = who + ':nth-child(' + (i + 1) + ')';
	          $propertyContainer.find(tag).addClass('searched');
	          limit++;
	        }
	      }
	    } else {
	      limit = propertyData.length;
	      $propertyContainer.find('#property_system_content .propertyContent').addClass('searched');
	    }
	    showPage(1, Math.ceil(limit / 5), '.property_system');
	    propertyPageEvent(Math.ceil(limit / 5), '.property_system');
	  });
	}

	function propertyPageEvent(limit, who) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 258:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var rest = __webpack_require__(259);
	var pathPrefix = __webpack_require__(267);
	var errorCode = __webpack_require__(269);
	var mime = __webpack_require__(270);
	var csrf = __webpack_require__(283);
	var when = __webpack_require__(198);
	var interceptor = __webpack_require__(268);

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

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _sammy = __webpack_require__(193);

	var _sammy2 = _interopRequireDefault(_sammy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PeriodStart = ['00:00:00', '00:30:00', '01:00:00', '01:30:00', '02:00:00', '02:30:00', '03:00:00', '03:30:00', '04:00:00', '04:30:00', '05:00:00', '05:30:00', '06:00:00', '06:30:00', '07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00', '22:30:00', '23:00:00', '23:30:00'];
	var PeriodEnd = ['00:30:00', '01:00:00', '01:30:00', '02:00:00', '02:30:00', '03:00:00', '03:30:00', '04:00:00', '04:30:00', '05:00:00', '05:30:00', '06:00:00', '06:30:00', '07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00', '22:30:00', '23:00:00', '23:30:00', '24:00:00'];
	var LoanTable; // Table Data
	var LoanTablePage;
	var AllLoanTablePage;

	var LoanHistory; // History Data
	var CurrentHistoryPage;
	var FinalHistoryPage;

	var LoanType; // one_day, many_days

	(0, _sammy2.default)('#main', function () {
	  this.get('#/user/loan', function (context) {
	    context.time = {};
	    context.time.PeriodStart = PeriodStart;
	    context.time.PeriodEnd = PeriodEnd;
	    context.FiveTimes = _.times(5);
	    context.FortyEightTimes = _.times(48);
	    // context.thirty_times = _.times(30, _.uniqueId.bind(null, 'ball'));

	    context.loadPartials({ menu: '/templates/user/menu.ms' }).partial('/templates/user/loan.ms').then(function () {
	      // bind Event
	      loanButtonEvent();
	      loanDataEvent();
	      userLoanInitEvent();
	      loanTablePageEvent();

	      // new inline display calendar
	      var picker = new Pikaday({
	        field: document.getElementById('datepicker'),
	        bound: false,
	        container: document.getElementById('datepicker_container'),
	        format: 'YYYY-MM-DD'
	      });

	      var today = moment(new Date()).format('YYYY-MM-DD');
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

	  $('ul.tabs').tabs();
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

	      LoanTablePage = 0;
	      produceLoanTable();
	    } else {
	      $('#loan_container').hide();
	      $('#history_container').show();

	      CurrentHistoryPage = 1;
	      getLoanHistory();
	    }
	  });

	  $('.modal .swtich_date').unbind('click');
	  $('.modal .switch_date').click(function () {
	    var dateType = $(this).data('date_type');
	    if (dateType == 'many_days') {
	      LoanType = 'many_days';
	    } else {
	      LoanType = 'one_day';
	    }

	    $('.modal .days').hide();
	    $('.modal .for_' + dateType).show();

	    // button color
	    $(this).parent().find('button').removeClass('pink darken-4');
	    $(this).addClass('pink darken-4');
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
	      AllLoanTablePage = Math.floor(result.length / 5);
	      LoanTable = [];
	      LoanTable = result;

	      produceLoanTable();
	      console.log(LoanTable);
	    }).fail(function () {
	      Materialize.toast('資料取得失敗，可能要先登入', 1000);
	    });
	  });

	  $('#delete_loan').unbind('click');
	  $('#delete_loan').click(function () {
	    var request = {};
	    request.id = $(this).data('loan_id');

	    $.post('/api/user/loan/delete/' + request.id, request, function (result) {
	      console.log(result);
	    }).fail(function () {
	      Materialize.toast('刪除失敗', 1000);
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

	    request._token = $('meta[name="csrf-token"]').attr('content');
	    // classroom id
	    request.property_id = $('.modal').find('#classroom').val();

	    // begin date and end date
	    if (LoanType == 'one_day') {
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
	          Materialize.toast('日期太早', 1000);
	          return;
	        }
	      } else {
	        Materialize.toast('還沒選擇日期', 1000);
	        return;
	      }
	    } else {
	      // many_days
	      temp = $('.modal').find('input[name="start_date"]').val();
	      temp = moment(new Date(temp)).format('YYYY-MM-DD');
	      if (temp != 'Invalid date') {
	        request.date_began_at = temp;
	      } else {
	        Materialize.toast('還沒選擇開始日期', 1000);
	        return;
	      }
	      temp = $('.modal').find('input[name="end_date"]').val();
	      temp = moment(new Date(temp)).format('YYYY-MM-DD');
	      if (temp != 'Invalid Date') {
	        request.date_ended_at = temp;
	      } else {
	        Materialize.toast('還沒選擇結束日期', 1000);
	        return;
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
	    }

	    // check start and end date diff
	    if (errMsg == '') {
	      var startTime = $('.modal').find('select[name="time_start"]').val();
	      var endTime = $('.modal').find('select[name="time_end"]').val();
	      if (endTime < startTime) {
	        Materialize.toast('時段前後順序不對，可能太早', 1000);
	      }
	    }

	    request.remark = $('input[name="remark"]').val();

	    console.log(request);
	    $.post('/api/user/loan/create', request, function (result) {
	      if (result.status == 0) {
	        Materialize.toast('請求借用成功', 1000);
	      } else {
	        Materialize.toast('請求借用失敗', 1000);
	      }
	      console.log(result);
	    }).fail(function () {
	      Materialize.toast('新增借用失敗', 1000);
	    });
	  });
	}

	function getLoanHistory() {
	  var request = {};
	  request.page = CurrentHistoryPage;
	  request.length = 10;
	  $.get('/api/user/loan/classrooms', request, function (result) {
	    console.log(result);
	    LoanHistory = result.data;

	    if (CurrentHistoryPage == 1) {
	      FinalHistoryPage = Math.ceil(result.total / 10);
	    }

	    if (result.total == 0) {
	      Materialize.toast('Not History', 1000);
	    } else {
	      produceLoanHistory();
	    }
	  });
	}

	function produceLoanHistory() {
	  var i;
	  var text;

	  $('#history_card_container').html('');
	  for (i = 0; i < 10 && i < LoanHistory.length; i++) {
	    text = '<li>';
	    // header
	    text += '<div class="collapsible-header">';
	    text += '<span class="col s4">' + LoanHistory[i].property_name + '</span>';
	    text += '<span class="col s4">';
	    if (LoanHistory[i].time_began_at == null) {
	      text += '整天';
	    } else {
	      text += LoanHistory[i].time_began_at + ' ~ ' + LoanHistory[i].time_ended_at;
	    }
	    text += '</span>';
	    text += '</div>';
	    // body
	    text += '<div class="collapsible-body">';
	    text += '</div>';
	    text += '</li>';
	    $('#history_card_container').append(text);
	  }

	  $('.collapsible').collapsible({
	    accordion: false
	  });
	  loanButtonEvent();
	  produceHistoryPage();
	}

	function produceHistoryPage() {
	  var i;
	  var minPage = Math.max(CurrentHistoryPage - 5, 1);
	  var maxPage = Math.min(minPage + 10, FinalHistoryPage);
	  var text;

	  // empty
	  $('#history_page_container').html('');
	  text = '<li id="history_prev" class="waves-effect"><a><i class="material-icons">chevron_left</i></a></li>';
	  for (i = minPage; i <= maxPage; i++) {
	    if (i != CurrentHistoryPage) {
	      text += '<li class="waves-effect history_page" data-history_page="' + i + '">';
	      text += '<a>' + i + '</a>';
	      text += '</li>';
	    } else {
	      text += '<li class="active">';
	      text += '<a>' + i + '</a>';
	      text += '</li>';
	    }
	  }
	  text += '<li id="history_next" class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>';
	  $('#history_page_container').append(text);

	  // Disable change page btn
	  if (CurrentHistoryPage == 1) {
	    $('#history_prev').removeClass('waves-effect').addClass('disabled');
	  } else if (CurrentHistoryPage == FinalHistoryPage) {
	    $('#history_next').removeClass('waves-effect').addClass('disabled');
	  }

	  // bind Page Event
	  loanHistoryPageEvent();
	}

	function loanHistoryPageEvent() {
	  $('#history_prev').unbind('click');
	  $('#history_prev').click(function () {
	    if (CurrentHistoryPage == 1) {
	      Materialize.toast('已在最前頁', 1000);
	      return;
	    } else {
	      CurrentHistoryPage--;
	      getLoanHistory();
	    }
	  });

	  $('#history_next').unbind('click');
	  $('#history_next').click(function () {
	    if (CurrentHistoryPage == FinalHistoryPage) {
	      Materialize.toast('已在最末頁', 1000);
	      return;
	    } else {
	      CurrentHistoryPage++;
	      getLoanHistory();
	    }
	  });

	  $('.history_page').unbind('click');
	  $('.history_page').click(function () {
	    CurrentHistoryPage = $(this).data('history_page');
	    getLoanHistory();
	  });
	}

	function loanTablePageEvent() {
	  $('#classroom_prev').unbind('click');
	  $('#classroom_prev').click(function () {
	    if (LoanTablePage == 0) {
	      Materialize.toast('已在最前頁', 1000);
	    } else {
	      LoanTablePage--;
	      produceLoanTable();
	    }
	  });

	  $('#classroom_next').unbind('click');
	  $('#classroom_next').click(function () {
	    if (LoanTablePage == AllLoanTablePage) {
	      Materialize.toast('已在最末頁', 1000);
	    } else {
	      LoanTablePage++;
	      produceLoanTable();
	    }
	  });
	}

	function produceLoanTable() {
	  // empty td
	  $('table').find('.tr_classroom').find('.td_time_period, .td_classroom_name').html('');

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

	  //console.log(id + ', ' + index);
	  for (var i = 0; i < LoanTable[id].loan_classroom.length; i++) {
	    // examine selected day's status
	    began = new Date(LoanTable[id].loan_classroom[i].date_began_at); // date began
	    ended = new Date(LoanTable[id].loan_classroom[i].date_ended_at); // date ended
	    if (began <= selectedDay && selectedDay <= ended) {
	      // check the day
	      if (LoanTable[id].loan_classroom[i].time_began_at != null) {
	        began = LoanTable[id].loan_classroom[i].time_began_at;
	        ended = LoanTable[id].loan_classroom[i].time_ended_at;
	        //console.log(began + '~' + ended);
	        began = matchTool(began, PeriodStart); // add one, because nth-of-type start from 1
	        ended = matchTool(ended, PeriodEnd);

	        for (var j = began; j <= ended; j++) {
	          $('table').find('.tr_classroom').eq(index).find('.td_time_period').eq(j).html('O');
	        }
	      } else {
	        // all days
	        //console.log(id + ', ' + index + 'all day');
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(286);
	__webpack_require__(300);
	__webpack_require__(301);
	__webpack_require__(302);
	__webpack_require__(324);

/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sammy = __webpack_require__(193);

	var _sammy2 = _interopRequireDefault(_sammy);

	var _vue = __webpack_require__(194);

	var _vue2 = _interopRequireDefault(_vue);

	var _lodash = __webpack_require__(287);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _examine = __webpack_require__(288);

	var _examine2 = _interopRequireDefault(_examine);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _sammy2.default)('#main', function () {
	  this.get('#/admin/examine', function (context) {
	    context.partial('/templates/vue.ms').then(function () {
	      var query = _lodash2.default.omit(Object.assign({}, context.params), 'page');
	      var page = context.params.page || 1;
	      var baseUrl = '#/admin/examine';
	      var App = _vue2.default.extend({
	        template: '<examine v-ref:examine :query="query"\n            :current-page="' + page + '" base-url="' + baseUrl + '"></examine>',
	        components: { Examine: _examine2.default },
	        data: function data() {
	          return { query: query };
	        },
	        compiled: function compiled() {
	          var examine = this.$refs.examine;
	          examine.$on('verify-success', function () {
	            Materialize.toast('更新成功', 500);
	          });
	          examine.$on('verify-error', function (error) {
	            console.warn(error);
	            Materialize.toast('更新失敗', 500);
	          });
	        }
	      });
	      new _vue2.default({
	        el: '#main',
	        components: { App: App }
	      });
	    });
	  });
	});

/***/ },

/***/ 287:
/***/ function(module, exports) {

	module.exports = _;

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(289)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/examine.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(299)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/examine.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _create = __webpack_require__(290);

	var _create2 = _interopRequireDefault(_create);

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _when = __webpack_require__(198);

	var _when2 = _interopRequireDefault(_when);

	var _transformExamine = __webpack_require__(292);

	var _transformExamine2 = _interopRequireDefault(_transformExamine);

	var _adminMenu = __webpack_require__(293);

	var _adminMenu2 = _interopRequireDefault(_adminMenu);

	var _pagination = __webpack_require__(296);

	var _pagination2 = _interopRequireDefault(_pagination);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    baseUrl: {
	      type: String,
	      required: true
	    },
	    query: {
	      type: Object,
	      required: false,
	      default: (0, _create2.default)(null)
	    },
	    currentPage: {
	      type: Number,
	      required: true
	    }
	  },
	  components: { AdminMenu: _adminMenu2.default, Pagination: _pagination2.default },
	  methods: {
	    accept: function accept(id) {
	      this.sendVerify(id, 'accepted');
	    },
	    reject: function reject(id) {
	      this.sendVerify(id, 'refused');
	    },
	    sendVerify: function sendVerify(id, status) {
	      var self = this;
	      (0, _when2.default)(this.$http.put('manager/loan/class-verify/' + id, { status: status })).then(function (response) {
	        self.$emit('verify-success', response);
	      }).catch(function (error) {
	        self.$emit('verify-error', error);
	      });
	    }
	  },
	  data: function data() {
	    return {
	      examines: [],
	      maxPage: 0
	    };
	  },
	  compiled: function compiled() {
	    var _this = this;

	    (0, _when2.default)(this.$http.get('manager/loan/classrooms', { page: this.currentPage })).then(function (response) {
	      return response.data;
	    }).then(_transformExamine2.default).then(function (_ref) {
	      var examines = _ref.examines;
	      var maxPage = _ref.maxPage;

	      _this.$set('examines', examines);
	      _this.$set('maxPage', maxPage);
	      $('.tooltipped').tooltip({
	        delay: 50,
	        position: 'buttom'
	      });
	      $('.collapsible').collapsible({ accordion: true });
	    }).catch(function (error) {
	      if (error instanceof Error) {
	        console.warn(error);
	        throw error;
	      } else {
	        console.warn(error);
	      }
	    });
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _when = __webpack_require__(198);

	var _when2 = _interopRequireDefault(_when);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (data) {
	  return _when2.default.promise(function (resolve) {
	    var maxPage = data.last_page;
	    var examines = data.data.map(function (item) {
	      item.time = item.date_began_at + '~' + item.date_ended_at;
	      return item;
	    });
	    resolve({ examines: examines, maxPage: maxPage });
	  });
	};

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(294)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/admin-menu.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(295)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/admin-menu.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 294:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {};

/***/ },

/***/ 295:
/***/ function(module, exports) {

	module.exports = "\n<nav>\n  <div class=\"container\">\n    <div class=\"nav-wrapper\">\n      <ul class=\"right\">\n        <li><a href=\"#/admin/examine\">審核系統</a></li>\n        <li><a href=\"#/admin/loan\">教室預借系統</a></li>\n        <li><a href=\"#/admin/property\">財產管理系統</a></li>\n        <li><a href=\"#/admin/account\">帳號管理系統</a></li>\n      </ul>\n    </div>\n  </div>\n</nav>\n";

/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(297)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/pagination.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(298)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/pagination.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _create = __webpack_require__(290);

	var _create2 = _interopRequireDefault(_create);

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _lodash = __webpack_require__(287);

	var _lodash2 = _interopRequireDefault(_lodash);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    currentPage: {
	      type: Number,
	      required: true
	    },
	    baseUrl: {
	      type: String,
	      required: true
	    },
	    max: {
	      type: Number,
	      required: true
	    },
	    query: {
	      type: Object,
	      required: false,
	      default: (0, _create2.default)(null)
	    }
	  },
	  computed: {
	    pages: function pages() {
	      var _this = this;

	      var minPage = Math.max(this.currentPage - 5, 1);
	      var maxPage = Math.min(minPage + 10, this.max);
	      if (maxPage === this.max) {
	        minPage = Math.max(maxPage - 10, 1);
	      }
	      return _lodash2.default.times(maxPage - minPage + 1, function (i) {
	        var page = minPage + i;
	        return {
	          num: page,
	          url: _this.pageUrl.call(_this, page)
	        };
	      });
	    },
	    prevUrl: function prevUrl() {
	      var currentPage = this.currentPage;
	      return currentPage === 1 ? null : this.pageUrl.call(this, currentPage - 1);
	    },
	    nextUrl: function nextUrl() {
	      var currentPage = this.currentPage;
	      return currentPage === this.max ? null : this.pageUrl.call(this, currentPage + 1);
	    }
	  },
	  methods: {
	    pageUrl: function pageUrl(page) {
	      var query = _lodash2.default.assign({}, this.query, { page: page });
	      var param = _jquery2.default.param(query);
	      return this.baseUrl + '?' + param;
	    }
	  }
	};

/***/ },

/***/ 298:
/***/ function(module, exports) {

	module.exports = "\n<ul class=\"pagination center\">\n  <li :class=\"{'waves-effect': prevUrl, disabled: !prevUrl}\">\n    <a :href=\"prevUrl\"><i class=\"material-icons\">chevron_left</i></a>\n  </li>\n  <li v-for=\"page in pages\"\n    id=\"pagination-{{page.num}}\"\n    :class=\"{'waves-effect': page.num !== currentPage, 'active': page.num === currentPage}\"><a :href=\"page.url\">{{page.num}}</a></li>\n  <li :class=\"{'waves-effect': nextUrl, disabled: !nextUrl}\">\n    <a :href=\"nextUrl\"><i class=\"material-icons\">chevron_right</i></a>\n  </li>\n</ul>\n";

/***/ },

/***/ 299:
/***/ function(module, exports) {

	module.exports = "\n<admin-menu></admin-menu>\n<div id=\"Examine\" class=\"container Examine\">\n  <span>教室審核</span>\n  <ul class=\"collapsible popout\" data-collapsible=\"accordion\">\n    <li v-for=\"examine in examines\" class=\"Examine-Item\">\n      <a class=\"Examine-Pass secondary-content\" @click=\"accept(examine.id)\">\n        <i class=\"material-icons\">done</i>\n      </a>\n      <a class=\"Examine-Reject secondary-content\" @click=\"reject(examine.id)\">\n        <i class=\"material-icons\">clear</i>\n      </a>\n      <div class=\"collapsible-header\">\n        <span class=\"Examine-Username\">{{examine.user.nickname}}</span>\n        <span class=\"Examine-Classroom\">{{examine.property_name}}</span>\n        <span class=\"Examine-Time\">{{examine.time}}</span>\n      </div>\n      <div class=\"collapsible-body\">\n        <p>{{examine.remark}}</p>\n      </div>\n    </li>\n  </ul>\n  <pagination :current-page=\"currentPage\"\n    :base-url=\"baseUrl\"\n    :query=\"query\"\n    :max=\"maxPage\">\n  </pagination>\n</div>\n";

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(193);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 301:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(193);
	var client = __webpack_require__(258);
	var when = __webpack_require__(198);
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
	  dd = '0' + dd;
	}
	if (mm < 10) {
	  mm = '0' + mm;
	}

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

	      context.date = {};
	      context.date.year = yyyy - 1911;
	      context.date.month = mm;
	      context.date.day = dd;

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
	        var type = { 'cleanup': '清潔', 'maintain': '維修' };
	        item.type.cname = type[item.type.name] || item.type.name;
	        return item;
	      });
	      console.log('repair data:', context.repairData);

	      context.propertyPage = genPage(propertyData.entity.total / 5);
	      context.loanPage = genPage(loanData.entity.total / 5);
	      context.repairPage = genPage(repairData.entity.total / 5);

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
	  var system2show = { 'property_system': 'property_system', 'property_manage': 'manage_system',
	    'property_repair': 'repair_system' };
	  $propertyContainer.find('#sub_menu').tabs();
	  $propertyContainer.find('#sub_menu li').on('click', function (event) {
	    var id = $(this).attr('id');
	    $.each(system2show, function (key, value) {
	      $propertyContainer.find('.' + value).css('display', key === id ? 'block' : 'none');
	    });
	  });

	  searchData(propertyData, loanData);
	  showPropertyDetailAndDeleteProperty();
	  createProperty();
	  loanProperty(propertyData);
	  returnProperty(loanData);
	  repairProperty();
	  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'none');
	    $propertyContainer.find('.modal').fadeOut();
	  });
	}

	function searchData(propertyData, loanData) {
	  var $propertyContainer = $('#property_container');
	  $propertyContainer.find('#search_property_btn').on('click', function () {
	    searching(propertyData, $propertyContainer.find('#search_property').val(), '#property_system_content .propertyContent', ['name', 'code'], '.property_system');
	  });

	  $propertyContainer.find('#search_loanData_btn').on('click', function () {
	    searching(loanData, $propertyContainer.find('#search_loanData').val(), '#property_manage_content .propertyContent', ['property_name', 'code', 'username'], '.manage_system');
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
	    var statusName = { 'canceled': '使用者已取消借用該財產', 'finished': '使用者已歸還該財產',
	      'refused': '管理者已取消借用該財產' };
	    var ele = $(this).parent().parent();
	    showPropertyDetailFunction(ele, statusName, $returnPropertyModal);
	    $returnPropertyModal.data('loan_id', ele.data('loan_id'));
	  });
	  var $repairPropertyModal = $('#repair_property_modal');
	  $propertyContainer.find('#property_repair_content .repairModalTrigger').on('click', function (event) {
	    var statusName = { 'finished': '已報修/清理' };
	    var ele = $(this).parent().parent();
	    showPropertyDetailFunction(ele, statusName, $repairPropertyModal);
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
	  var $loanPropertyMD = $('#loan_property_modal');
	  var propertyIdContent = [];
	  $propertyContainer.find('#property_system_content #loan_property').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $loanPropertyMD.fadeIn();
	    $loanPropertyMD.find('#loan_property_content div').remove('.remove');
	    $loanPropertyMD.find('#loan_username').val('').focus();
	    $loanPropertyMD.find('#loan_property_code').val('');
	    propertyIdContent = [];
	  });

	  $propertyContainer.find('#loan_property_modal #loan_username').on('keyup', function (event) {
	    $loanPropertyMD.find('#loan_property_code').focus();
	  });
	  $propertyContainer.find('#loan_property_modal #loan_property_code').on('keyup', function (event) {
	    var code = $(this).val();
	    var property;
	    if (property = propertyData.find(function (data) {
	      return data.code === code;
	    })) {
	      loanNreturnAppend($loanPropertyMD, '#loan_property_content', code, property.name, propertyIdContent, property.id);
	      $(this).val('');
	    }
	  });

	  $propertyContainer.find('#loan_property_btn').on('click', function (event) {
	    var username = $loanPropertyMD.find('#loan_username').val();
	    today = yyyy + '/' + mm + '/' + dd;

	    if (!username) {
	      alert('請確實填寫借用表單！');
	      return;
	    }

	    var propertyID;
	    var swit = 0;
	    while (propertyID = propertyIdContent.pop()) {
	      client({
	        path: 'manager/loan/other-create',
	        method: 'POST',
	        params: {
	          property_id: propertyID,
	          username: username,
	          date_began_at: today,
	          date_ended_at: today,
	          remark: '',
	          type: 'others'
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
	      loanNreturnAppend($totalReturnPropertyModal, '#total_return_property_content', code, loan.property_name, loanIdContent, loan.id);
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
	    console.log(repairList);
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
	  $propertyContainer.find('#repair_property_modal #repair_property_printer_btn').on('click', function (event) {
	    var title = $repairPropertyModal.find('.propertyName').html();
	    var remark = $repairPropertyModal.find('.remark').html();

	    $propertyContainer.find('#repair_printer').css('display', 'block');
	    $propertyContainer.find('#repair_printer').find('.repair_title p:nth-child(2)').html(title);
	    $propertyContainer.find('#repair_printer').find('.repair_remark').html(remark);
	    window.print();
	    $propertyContainer.find('#repair_printer').css('display', 'none');
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

	function searching(data, target, searchWho, searchColumn, showWho) {
	  var $propertyContainer = $('#property_container');
	  var limit;
	  $propertyContainer.find(searchWho).removeClass('searched');
	  if (target !== '') {
	    limit = search(data, searchWho, target, searchColumn);
	  } else {
	    limit = data.length;
	    $propertyContainer.find(searchWho).addClass('searched');
	  }
	  showPage(1, Math.ceil(limit / 5), showWho);
	  propertyPageEvent(Math.ceil(limit / 5), showWho);
	}

	function search(Data, who, target, searchColumn) {
	  var limit = 0;
	  var $propertyContainer = $('#property_container');
	  for (var i = 0; i < Data.length; i++) {
	    for (var j = 0; j < searchColumn.length; j++) {
	      if (Data[i][searchColumn[j]].indexOf(target) != -1) {
	        limit++;
	        var tag = who + ':nth-child(' + (i + 2) + ')';
	        $propertyContainer.find(tag).addClass('searched');
	      }
	    }
	  }
	  return limit;
	}

	function showPropertyDetailFunction(ele, statusName, modal) {
	  $('#materialize-lean-overlay-30').css('display', 'block');
	  modal.fadeIn();
	  var status = ele.data('status');
	  modal.find('#loanOtherAction').html(statusName[status]).addClass('hide').removeClass(!statusName[status] || 'hide');
	  modal.find('#return_property_btn').addClass('hide').removeClass(statusName[status] || 'hide');

	  var htmlData = { '.userName': ele.data('user_nickname'), '.userID': ele.data('username'),
	    '.phone': ele.data('phone'), '.email': ele.data('email'), '.propertyName': ele.data('name'),
	    '.time': ele.data('time'), '.remark': ele.data('remark')
	  };
	  $.each(htmlData, function (key, value) {
	    modal.find(key).html(value);
	  });
	}

	function loanNreturnAppend(modal, who, code, name, arr, id) {
	  modal.find(who).find('.property_code').html(code).removeClass('property_code').parent().addClass('remove');
	  modal.find(who).find('.property_name').html(name).removeClass('property_name');
	  var data = '<div class="row"><h5 class="property_code col offset-s1"></h5>' + '<h5 class="property_name col offset-s6"></h5></div>';
	  modal.find(who).append(data);
	  arr.push(id);
	}

	function genPage(limit) {
	  var page = [];
	  for (var i = 0; i < limit; i++) {
	    page.push({});
	    page[i].classes = '';
	    if (i === 0) {
	      page[i].classes = 'active';
	    }
	    page[i].pageNum = i + 1;
	  }
	  return page;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 302:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _vue = __webpack_require__(194);

	var _vue2 = _interopRequireDefault(_vue);

	var _setting = __webpack_require__(303);

	var _setting2 = _interopRequireDefault(_setting);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Sammy = __webpack_require__(193);
	var lodash = __webpack_require__(287);
	var validate = __webpack_require__(218);
	var moment = __webpack_require__(315);
	var when = __webpack_require__(198);
	var api = __webpack_require__(316);
	var ValidationError = __webpack_require__(323);

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
	    context.partial('/templates/vue.ms').render(function () {
	      new _vue2.default({
	        el: '#main',
	        components: {
	          app: {
	            template: '<setting></setting>',
	            components: { Setting: _setting2.default }
	          }
	        }
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 303:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(304)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/setting.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(314)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/setting.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 304:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _adminMenu = __webpack_require__(293);

	var _adminMenu2 = _interopRequireDefault(_adminMenu);

	var _settingForm = __webpack_require__(305);

	var _settingForm2 = _interopRequireDefault(_settingForm);

	var _settingList = __webpack_require__(311);

	var _settingList2 = _interopRequireDefault(_settingList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  components: { AdminMenu: _adminMenu2.default, SettingForm: _settingForm2.default, SettingList: _settingList2.default }
	};

/***/ },

/***/ 305:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(306)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/setting-form.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(310)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/setting-form.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 306:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _dateField = __webpack_require__(307);

	var _dateField2 = _interopRequireDefault(_dateField);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mapData = {
	  timeName: 'time_name',
	  beganDate: 'began_date',
	  ended_date: 'ended_date',
	  stuStart: 'stu_start',
	  labStart: 'lab_start'
	};
	exports.default = {
	  props: {
	    timeName: {
	      type: String,
	      default: ''
	    },
	    beganDate: {
	      type: String,
	      default: ''
	    },
	    endedDate: {
	      type: String,
	      default: ''
	    },
	    stuStart: {
	      type: String,
	      default: ''
	    },
	    labStart: {
	      type: String,
	      default: ''
	    }
	  },
	  methods: {
	    applySetting: function applySetting(event) {
	      event.preventDefault();
	      console.log(this.$data);
	    }
	  },
	  components: { DateField: _dateField2.default },
	  compiled: function compiled() {}
	};

/***/ },

/***/ 307:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(308)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/date-field.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(309)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/date-field.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 308:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _jquery = __webpack_require__(1);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    date: {
	      type: String,
	      required: true,
	      twoWay: true
	    },
	    name: {
	      type: String,
	      required: true
	    },
	    className: {
	      type: String,
	      required: true
	    }
	  },
	  compiled: function compiled() {
	    (0, _jquery2.default)(this.$el).find('.datepicker').pickadate({
	      format: 'yyyy-mm-dd',
	      formatSubmit: 'yyyy-mm-dd',
	      closeOnSelect: true,
	      closeOnClear: true
	    });
	  }
	};

/***/ },

/***/ 309:
/***/ function(module, exports) {

	module.exports = "\n<div class=\"input-field\">\n  <label :for=\"name\" :class=\"{active: date}\">\n    <slot></slot>\n  </label>\n  <input :id=\"name\" v-model=\"date\" :data-value=\"date\"\n     class=\"datepicker Setting-DateField {{className}}\" type=\"date\" :name=\"name\">\n</div>\n";

/***/ },

/***/ 310:
/***/ function(module, exports) {

	module.exports = "\n<form @submit=\"applySetting\" action=\"#/admin/setting\" method=\"PUT\">\n  <div class=\"input-field\">\n    <input id=\"time-name\"\n      class=\"validate Setting-TimeName\"\n      type=\"text\" name=\"time_name\"\n      v-model=\"timeName\">\n    <label for=\"time-name\"\n      :class=\"{active: timeName}\">\n      名稱 (ex: 104上學期):\n    </label>\n  </div>\n  <date-field\n    :date.sync=\"beganDate\"\n     name=\"began_date\"\n     class-name=\"Setting-BeganDate\">\n    開始時間：\n  </date-field>\n  <date-field\n    :date.sync=\"endedDate\"\n    name=\"ended_date\"\n    class-name=\"Setting-EndedDate\">\n    結束時間：\n  </date-field>\n  <date-field\n    :date.sync=\"stuStart\"\n    name=\"stu_start\"\n    class-name=\"Setting-StuStart\">\n    學生借用開始時間：\n  </date-field>\n  <date-field\n     :date.sync=\"labStart\"\n     name=\"lab_start\"\n     class-name=\"Setting-LabStart\">\n    Lab 借用開始時間：\n  </date-field>\n  <button id=\"apply-btn\"\n    type=\"submit\"\n    class=\"waves-effect waves-light btn\">\n    <i class=\"material-icons left\">done</i>套用設定\n  </button>\n</form>\n";

/***/ },

/***/ 311:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(312)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/setting-list.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(313)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/setting-list.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _when = __webpack_require__(198);

	var _when2 = _interopRequireDefault(_when);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	  props: {
	    title: {
	      type: String,
	      required: true
	    },
	    filter: {
	      type: String,
	      required: true
	    }
	  },
	  data: function data() {
	    return { settings: [] };
	  },
	  compiled: function compiled() {
	    var self = this;
	    console.log(this.filter);
	    var filter = this.filter;
	    (0, _when2.default)(this.$http.get('manager/setting', { con_str: filter })).then(function (response) {
	      self.settings = response.data;
	    });
	  }
	};

/***/ },

/***/ 313:
/***/ function(module, exports) {

	module.exports = "\n<h5>{{title}}</h5>\n<div class=\"Setting-List\">\n  <ul class=\"collection\">\n    <li class=\"collection-item\" v-for=\"setting in settings\">\n      <div>\n        <div>{{setting.zone_name}}: {{setting.date_began_at}} ~ {{setting.date_ended_at}}</div>\n        <div>學生借用開始：{{setting.stu_start}}, Lab 借用開始：{{setting.lab_start}}</div>\n      </div>\n    </li>\n  </ul>\n</div>\n";

/***/ },

/***/ 314:
/***/ function(module, exports) {

	module.exports = "\n<admin-menu></admin-menu>\n<div class=\"container Setting-Container\">\n  <div class=\"m6 Setting-Column\">\n    <setting-list title=\"目前設定\" filter=\">\"></setting-list>\n    <setting-list title=\"歷史設定\" filter=\"<=\">\n  </div>\n  <div class=\"m6 Setting-Column\">\n    <setting-form></setting-form>\n  </div>\n</div>\n";

/***/ },

/***/ 315:
/***/ function(module, exports) {

	module.exports = moment;

/***/ },

/***/ 316:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(1);
	var connectEndpoint = __webpack_require__(317).connectEndpoint;
	var plusCsrf = __webpack_require__(318);

	var cookie = __webpack_require__(319);
	var param = __webpack_require__(320);
	var header = __webpack_require__(321);
	var statusCode = __webpack_require__(322);

	var token = $('#csrf-token').attr('content');
	var api = connectEndpoint('/api');

	api.addMiddleware(plusCsrf('X-CSRF-TOKEN', token));
	api.addMiddleware(cookie);
	api.addMiddleware(param);
	api.addMiddleware(header);
	api.addMiddleware(statusCode);

	module.exports = api;

/***/ },

/***/ 319:
/***/ function(module, exports) {

	'use strict';

	// Default add cookie
	module.exports = function (request) {
	  if (!request.options.credentials) {
	    request.options.credentials = 'include';
	  }
	};

/***/ },

/***/ 320:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var $ = __webpack_require__(1);

	module.exports = function (request) {
	  if (request.options.method === 'GET' && _typeof(request.options.params) === 'object') {
	    request.path = request.path + '?' + $.param(request.options.params);
	  }
	};

/***/ },

/***/ 321:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 322:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var when = __webpack_require__(198);

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

/***/ 323:
/***/ function(module, exports) {

	'use strict';

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	module.exports = function (_Error) {
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
	}(Error);

/***/ },

/***/ 324:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _sammy = __webpack_require__(193);

	var _sammy2 = _interopRequireDefault(_sammy);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var PeriodStart = ['00:00:00', '00:30:00', '01:00:00', '01:30:00', '02:00:00', '02:30:00', '03:00:00', '03:30:00', '04:00:00', '04:30:00', '05:00:00', '05:30:00', '06:00:00', '06:30:00', '07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00', '22:30:00', '23:00:00', '23:30:00'];
	var PeriodEnd = ['00:30:00', '01:00:00', '01:30:00', '02:00:00', '02:30:00', '03:00:00', '03:30:00', '04:00:00', '04:30:00', '05:00:00', '05:30:00', '06:00:00', '06:30:00', '07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00', '10:30:00', '11:00:00', '11:30:00', '12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00', '16:00:00', '16:30:00', '17:00:00', '17:30:00', '18:00:00', '18:30:00', '19:00:00', '19:30:00', '20:00:00', '20:30:00', '21:00:00', '21:30:00', '22:00:00', '22:30:00', '23:00:00', '23:30:00', '24:00:00'];
	var LoanTable; // Table Data
	var LoanTablePage;
	var AllLoanTablePage;

	var LoanHistory; // History Data
	var CurrentHistoryPage;
	var FinalHistoryPage;

	var LoanType; // one_day, many_days
	var SemesterStart;
	var SemesterEnd;

	(0, _sammy2.default)('#main', function () {
	  this.get('#/admin/loan', function (context) {
	    context.time = {};
	    context.time.PeriodStart = PeriodStart;
	    context.time.PeriodEnd = PeriodEnd;
	    context.FiveTimes = _.times(5);
	    context.FortyEightTimes = _.times(48);
	    // context.thirty_times = _.times(30, _.uniqueId.bind(null, 'ball'));

	    context.loadPartials({ menu: '/templates/admin/menu.ms' }).partial('/templates/admin/loan.ms').then(function () {
	      // bind Event
	      loanButtonEvent();
	      loanDataEvent();
	      userLoanInitEvent();
	      loanTablePageEvent();

	      // new inline display calendar
	      var picker = new Pikaday({
	        field: document.getElementById('datepicker'),
	        bound: false,
	        container: document.getElementById('datepicker_container'),
	        format: 'YYYY-MM-DD'
	      });

	      var today = moment(new Date()).format('YYYY-MM-DD');
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

	  $.get('/api/manager/property/classrooms', request, function (result) {
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

	  $('ul.tabs').tabs();
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

	      LoanTablePage = 0;
	      produceLoanTable();
	    } else {
	      $('#loan_container').hide();
	      $('#history_container').show();

	      CurrentHistoryPage = 1;
	      getLoanHistory();
	    }
	  });

	  $('.modal .swtich_date').unbind('click');
	  $('.modal .switch_date').click(function () {
	    var dateType = $(this).data('date_type');
	    if (dateType == 'many_days') {
	      LoanType = 'many_days';
	    } else {
	      LoanType = 'one_day';
	    }

	    $('.modal .days').hide();
	    $('.modal .for_' + dateType).show();

	    // button color
	    $(this).parent().find('button').removeClass('pink darken-4');
	    $(this).addClass('pink darken-4');
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

	    $.get('/api/manager/property/classrooms', request, function (result) {
	      LoanTablePage = 0;
	      AllLoanTablePage = Math.floor(result.length / 5);
	      LoanTable = [];
	      LoanTable = result;

	      produceLoanTable();
	      console.log(LoanTable);
	    }).fail(function () {
	      Materialize.toast('資料取得失敗，可能要先登入', 1000);
	    });
	  });

	  $('#delete_loan').unbind('click');
	  $('#delete_loan').click(function () {
	    var request = {};
	    request.id = $(this).data('loan_id');

	    $.post('/api/user/loan/delete/' + request.id, request, function (result) {
	      console.log(result);
	    }).fail(function () {
	      Materialize.toast('刪除失敗', 1000);
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

	    request._token = $('meta[name="csrf-token"]').attr('content');
	    // classroom id
	    request.property_id = $('.modal').find('#classroom').val();

	    // begin date and end date
	    if (LoanType == 'one_day') {
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
	          Materialize.toast('日期太早', 1000);
	          return;
	        }
	      } else {
	        Materialize.toast('還沒選擇日期', 1000);
	        return;
	      }
	    } else {
	      // many_days
	      temp = $('.modal').find('input[name="start_date"]').val();
	      temp = moment(new Date(temp)).format('YYYY-MM-DD');
	      if (temp != 'Invalid date') {
	        request.date_began_at = temp;
	      } else {
	        Materialize.toast('還沒選擇開始日期', 1000);
	        return;
	      }
	      temp = $('.modal').find('input[name="end_date"]').val();
	      temp = moment(new Date(temp)).format('YYYY-MM-DD');
	      if (temp != 'Invalid Date') {
	        request.date_ended_at = temp;
	      } else {
	        Materialize.toast('還沒選擇結束日期', 1000);
	        return;
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
	    }

	    // check start and end date diff
	    if (errMsg == '') {
	      var startTime = $('.modal').find('select[name="time_start"]').val();
	      var endTime = $('.modal').find('select[name="time_end"]').val();
	      if (endTime < startTime) {
	        Materialize.toast('時段前後順序不對，可能太早', 1000);
	      }
	    }

	    request.remark = $('input[name="remark"]').val();

	    console.log(request);
	    $.post('/api/user/loan/create', request, function (result) {
	      if (result.status == 0) {
	        Materialize.toast('請求借用成功', 1000);
	      } else {
	        Materialize.toast('請求借用失敗', 1000);
	      }
	      console.log(result);
	    }).fail(function () {
	      Materialize.toast('新增借用失敗', 1000);
	    });
	  });
	}

	function getLoanHistory() {
	  var request = {};
	  request.page = CurrentHistoryPage;
	  request.length = 10;
	  $.get('/api/manager/loan/classrooms', request, function (result) {
	    console.log(result);
	    LoanHistory = result.data;

	    // update every times, maybe data will be deleted
	    FinalHistoryPage = Math.ceil(result.total / 10);

	    if (result.total == 0) {
	      Materialize.toast('Not History', 1000);
	    } else {
	      produceLoanHistory(LoanHistory);
	    }
	  });
	}

	function produceLoanHistory(list) {
	  var i;
	  var text;

	  $('#history_card_container').html('');
	  for (i = 0; i < 10 && i < list.length; i++) {
	    text = '<li>';
	    // header
	    text += '<div class="collapsible-header"><div class="row">';
	    text += '<span class="col s2"><b>教室:</b>' + list[i].property_name + '</span>';
	    if (list[i].long_term_token !== null) {
	      text += '<span class="col s2"><b>類型:</b>短期</span>';
	      text += '<span class="col s3"><b>日期:</b>' + list[i].date_began_at + '</span>';
	    } else {
	      text += '<span class="col s2"><b>類型:</b>長期</span>';
	      text += '<span class="col s3"><b>日期:</b>' + list[i].date_began_at + '~' + list[i].date_ended_at + '</span>';
	    }
	    text += '<span class="col s3"><b>時段:</b>';
	    if (list[i].time_began_at == null) {
	      text += '整天';
	    } else {
	      text += list[i].time_began_at + ' ~ ' + list[i].time_ended_at;
	    }
	    text += '</span></div></div>';

	    // body
	    text += '<div class="collapsible-body"><div class="row">';
	    text += '<span class="col offset-s1 s2">借用人</span><span class="col s8">' + list[i].user.nickname + '</span>';
	    text += '</div><div class="row">';
	    text += '<span class="col offset-s1 s2">聯絡方式</span><span class="col s8">' + list[i].user.email + '</span>';
	    text += '</div><div class="row">';
	    text += '<span class="col offset-s1 s2">借用理由:</span><span class="col s8">' + list[i].remark + '</span>';
	    text += '</div><div class="row center-align">';
	    text += '<button class="btn red history_delete_btn" data-history_id="' + list[i].id + '">刪除</button>';
	    text += '</div></li>';
	    $('#history_card_container').append(text);
	  }

	  $('.collapsible').collapsible({
	    accordion: false
	  });
	  loanButtonEvent();
	  produceHistoryPage();
	}

	function produceHistoryPage() {
	  var i;
	  var minPage = Math.max(CurrentHistoryPage - 5, 1);
	  var maxPage = Math.min(minPage + 10, FinalHistoryPage);
	  var text;

	  // empty
	  $('#history_page_container').html('');
	  text = '<li id="history_prev" class="waves-effect"><a><i class="material-icons">chevron_left</i></a></li>';
	  for (i = minPage; i <= maxPage; i++) {
	    if (i != CurrentHistoryPage) {
	      text += '<li class="waves-effect history_page" data-history_page="' + i + '">';
	      text += '<a>' + i + '</a>';
	      text += '</li>';
	    } else {
	      text += '<li class="active">';
	      text += '<a>' + i + '</a>';
	      text += '</li>';
	    }
	  }
	  text += '<li id="history_next" class="waves-effect"><a><i class="material-icons">chevron_right</i></a></li>';
	  $('#history_page_container').append(text);

	  // Disable change page btn
	  if (CurrentHistoryPage == 1) {
	    $('#history_prev').removeClass('waves-effect').addClass('disabled');
	  } else if (CurrentHistoryPage == FinalHistoryPage) {
	    $('#history_next').removeClass('waves-effect').addClass('disabled');
	  }

	  // bind History Event
	  loanHistoryEvent();
	}

	function loanHistoryEvent() {
	  $('#history_prev').unbind('click');
	  $('#history_prev').click(function () {
	    if (CurrentHistoryPage == 1) {
	      Materialize.toast('已在最前頁', 1000);
	      return;
	    } else {
	      CurrentHistoryPage--;
	      getLoanHistory();
	    }
	  });

	  $('#history_next').unbind('click');
	  $('#history_next').click(function () {
	    if (CurrentHistoryPage == FinalHistoryPage) {
	      Materialize.toast('已在最末頁', 1000);
	      return;
	    } else {
	      CurrentHistoryPage++;
	      getLoanHistory();
	    }
	  });

	  $('.history_page').unbind('click');
	  $('.history_page').click(function () {
	    CurrentHistoryPage = $(this).data('history_page');
	    getLoanHistory();
	  });

	  $('.history_delete_btn').unbind('click');
	  $('.history_delete_btn').click(function () {
	    var request = {};
	    request._token = $('meta[name="csrf-token"]').attr('content');
	  });
	}

	function loanTablePageEvent() {
	  $('#classroom_prev').unbind('click');
	  $('#classroom_prev').click(function () {
	    if (LoanTablePage == 0) {
	      Materialize.toast('已在最前頁', 1000);
	    } else {
	      LoanTablePage--;
	      produceLoanTable();
	    }
	  });

	  $('#classroom_next').unbind('click');
	  $('#classroom_next').click(function () {
	    if (LoanTablePage == AllLoanTablePage) {
	      Materialize.toast('已在最末頁', 1000);
	    } else {
	      LoanTablePage++;
	      produceLoanTable();
	    }
	  });
	}

	function produceLoanTable() {
	  // empty td
	  $('table').find('.tr_classroom').find('.td_time_period, .td_classroom_name').html('');

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

	  //console.log(id + ', ' + index);
	  for (var i = 0; i < LoanTable[id].loan_classroom.length; i++) {
	    // examine selected day's status
	    began = new Date(LoanTable[id].loan_classroom[i].date_began_at); // date began
	    ended = new Date(LoanTable[id].loan_classroom[i].date_ended_at); // date ended
	    if (began <= selectedDay && selectedDay <= ended) {
	      // check the day
	      if (LoanTable[id].loan_classroom[i].time_began_at != null) {
	        began = LoanTable[id].loan_classroom[i].time_began_at;
	        ended = LoanTable[id].loan_classroom[i].time_ended_at;
	        //console.log(began + '~' + ended);
	        began = matchTool(began, PeriodStart); // add one, because nth-of-type start from 1
	        ended = matchTool(ended, PeriodEnd);

	        for (var j = began; j <= ended; j++) {
	          $('table').find('.tr_classroom').eq(index).find('.td_time_period').eq(j).html('O');
	        }
	      } else {
	        // all days
	        //console.log(id + ', ' + index + 'all day');
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },

/***/ 325:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sammy = __webpack_require__(193);

	var _sammy2 = _interopRequireDefault(_sammy);

	var _vue = __webpack_require__(194);

	var _vue2 = _interopRequireDefault(_vue);

	var _schedule = __webpack_require__(326);

	var _schedule2 = _interopRequireDefault(_schedule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(0, _sammy2.default)('#main', function (app) {
	  app.get('#/schedule', function (context) {
	    context.partial('/templates/vue.ms').then(function () {
	      var App = _vue2.default.extend({
	        template: '<schedule></schedule>',
	        components: { Schedule: _schedule2.default }
	      });

	      new _vue2.default({
	        el: '#main',
	        components: { App: App }
	      });
	    });
	  });
	});

/***/ },

/***/ 326:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_script__ = __webpack_require__(327)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/components/schedule.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(330)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/home/snow/Desktop/Work/VersatilitySystem/resources/assets/components/schedule.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },

/***/ 327:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _when = __webpack_require__(198);

	var _when2 = _interopRequireDefault(_when);

	var _transformSchedule = __webpack_require__(328);

	var _transformSchedule2 = _interopRequireDefault(_transformSchedule);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var schedules = {};
	exports.default = {
	  data: function data() {
	    return { schedules: schedules };
	  },
	  compiled: function compiled() {
	    var self = this;
	    (0, _when2.default)(self.$http.get('manager/loan/courses')).then(function (response) {
	      return (0, _transformSchedule2.default)(response.data);
	    }).then(function (schedules) {
	      console.log(schedules);
	      self.$set('schedules', schedules);
	    }).catch(function (error) {
	      if (error instanceof Error) {
	        console.warn(error);
	        throw error;
	      } else {
	        console.warn(error);
	      }
	    });
	  }
	};

/***/ },

/***/ 328:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _when = __webpack_require__(198);

	var _when2 = _interopRequireDefault(_when);

	var _moment = __webpack_require__(315);

	var _moment2 = _interopRequireDefault(_moment);

	var _vars = __webpack_require__(329);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Convert time string to moment object
	 *
	 * @param {String} time - time string
	 */
	var toMoment = function toMoment(time) {
	  return (0, _moment2.default)(time, 'HH:mm:ss');
	};

	/**
	 * Convert data to more useful format
	 *
	 * @param {Object} x - data object
	 */
	var convertData = function convertData(x) {
	  x.start = toMoment(x.time_began_at);
	  x.end = toMoment(x.time_ended_at);
	  x.token = x.long_term_token;
	  return x;
	};

	var weekName = ['mon', 'tue', 'wed', 'thu', 'fri'];

	/**
	 * Check course time is in range
	 *
	 * @param {Object} course - course object
	 * @param {Object} start - moment object for start time
	 * @param {Object} end - moment object for end time
	 */
	var isInRange = function isInRange(course, start, end) {
	  return start.isSameOrAfter(course.start, 'minute') && end.isSameOrBefore(course.end, 'minute');
	};

	/**
	 * Transform raw data from server
	 *
	 * @param {Object} data - data from server /api/manager/loan/courses
	 */

	exports.default = function (data) {
	  return _when2.default.promise(function (resolve) {
	    return resolve(data.map(convertData));
	  }).then(function (datas) {
	    var klass = [];

	    _vars.CLASS_RANGE.forEach(function (_ref) {
	      var start = _ref.start;
	      var end = _ref.end;

	      start = toMoment(start);
	      end = toMoment(end);

	      /**
	       * Collect course in time range for a week
	       *
	       * @param {Object} week - a object for week
	       * @param {Object} course - course data
	       */
	      var genWeekSchedule = function genWeekSchedule(week, course) {
	        weekName.forEach(function (name, idx) {
	          // If not initialize then init with array
	          week[name] = week[name] || [];
	          // If in range and at that day, ref server side api
	          if (isInRange(course, start, end) && course.token[idx]) {
	            week[name].push(course.remark + ':' + course.property_name);
	          }
	        });
	        return week;
	      };

	      // Generate a week schedule in range
	      var week = datas.reduce(genWeekSchedule, {
	        time: start.format('HH:mm:ss') + '~' + end.format('HH:mm:ss')
	      });

	      weekName.forEach(function (key) {
	        week[key] = week[key].join('<br>');
	      });

	      // Collect it
	      klass.push(week);
	    });
	    return klass;
	  });
	};

/***/ },

/***/ 329:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var CLASS_RANGE = exports.CLASS_RANGE = [{ start: '07:00:00', end: '07:30:00' }, { start: '07:30:00', end: '08:00:00' }, { start: '08:00:00', end: '08:30:00' }, { start: '08:30:00', end: '09:00:00' }, { start: '09:00:00', end: '09:30:00' }, { start: '09:30:00', end: '10:00:00' }, { start: '10:00:00', end: '10:30:00' }, { start: '10:30:00', end: '11:00:00' }, { start: '11:00:00', end: '11:30:00' }, { start: '11:30:00', end: '12:00:00' }, { start: '12:00:00', end: '12:30:00' }, { start: '12:30:00', end: '13:00:00' }, { start: '13:00:00', end: '13:30:00' }, { start: '13:30:00', end: '14:00:00' }, { start: '14:00:00', end: '14:30:00' }, { start: '14:30:00', end: '15:00:00' }, { start: '15:00:00', end: '15:30:00' }, { start: '15:30:00', end: '16:00:00' }, { start: '16:00:00', end: '16:30:00' }, { start: '16:30:00', end: '17:00:00' }, { start: '17:00:00', end: '17:30:00' }, { start: '17:30:00', end: '18:00:00' }, { start: '18:00:00', end: '18:30:00' }, { start: '18:30:00', end: '19:00:00' }, { start: '19:00:00', end: '19:30:00' }, { start: '19:30:00', end: '20:00:00' }, { start: '20:00:00', end: '20:30:00' }, { start: '20:30:00', end: '21:00:00' }, { start: '21:00:00', end: '21:30:00' }, { start: '21:30:00', end: '22:00:00' }];

/***/ },

/***/ 330:
/***/ function(module, exports) {

	module.exports = "\n<table>\n  <thead>\n    <tr>\n      <td>Time</td>\n      <td>Mon</td>\n      <td>Tue</td>\n      <td>Wed</td>\n      <td>Thu</td>\n      <td>Fri</td>\n    </tr>\n  </thead>\n  <tbody>\n    <tr v-for=\"schedule in schedules\">\n      <td>\n        {{schedule.time}}\n      </td>\n      <td>\n        {{{schedule.mon}}}\n      </td>\n      <td>\n        {{{schedule.tue}}}\n      </td>\n      <td>\n        {{{schedule.wed}}}\n      </td>\n      <td>\n        {{{schedule.thu}}}\n      </td>\n      <td>\n        {{{schedule.fri}}}\n      </td>\n    </tr>\n  </tbody>\n</table>\n";

/***/ },

/***/ 331:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Sammy = __webpack_require__(193);

	Sammy('#main', function () {
	  this.get('#/', function (context) {
	    context.redirect('#/user/signin');
	  });
	});

/***/ }

});