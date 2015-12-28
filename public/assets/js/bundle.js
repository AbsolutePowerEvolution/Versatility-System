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
	__webpack_require__(247);

	__webpack_require__(254);

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
	  this.use('Mustache', 'ms');
	  this.get('#/user/property', function (context) {
	    console.log('property');
	    context.partial('/templates/user/property.ms').then(function () {
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
	    var status = searchPropertyData[i].status.id; //3: normal, 4:maintenance
	    var color = status == 3 ? 'teal' : status == 4 ? 'red' : 'blue';
	    var divCard = '<div class="card propertyContent ' + (i < 5 ? 'block' : 'hide') + '">';
	    var divCardContent = '<div class="row card-content" ' + 'data-name="' + searchPropertyData[i].name + '"' + 'data-propertyid="' + searchPropertyData[i].id + '"' + 'data-describe="' + searchPropertyData[i].describe + '">';
	    var spanName = '<span class="col s4 center-align">' + searchPropertyData[i].name + '</span>';
	    var spanStatus = '<span class="col s4 center-align" style="color:' + color + '">' + searchPropertyData[i].status.name + '</span>';
	    var spanBtn = '<span class="col s4 center-align"><a class="waves-effect waves-light btn modal-trigger ' + (status == 4 ? 'disabled' : '') + '"><i class="material-icons left">build</i>報修/清理' + '</a></span></div></div>';
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
	  var debugData = {
	    0: {
	      id: 1,
	      remark: 'repairReason1',
	      create_at: '2014/12/12',
	      type: {
	        id: 5,
	        name: 'cleanup'
	      },
	      status: {
	        id: 1,
	        name: 'cleaned'
	      },
	      property: {
	        name: 'remote controller 101'
	      }
	    },
	    1: {
	      id: 2,
	      remark: 'repairReason2',
	      create_at: '2015/12/20',
	      type: {
	        id: 6,
	        name: 'maintain'
	      },
	      status: {
	        id: 1,
	        name: 'finished'
	      },
	      property: {
	        name: 'remote controller 206'
	      }
	    }
	  };
	  var sortData = [];
	  var i;
	  var dataLength = Object.size(debugData);
	  for (i = 0; i < dataLength; i++) {
	    sortData[i] = [];
	    sortData[i][0] = i;
	    sortData[i][1] = 0;
	    sortData[i][2] = debugData[i].create_at;
	  }
	  getPropertyLoan(1, 10000, sortData, debugData);
	  /*client({
	    path: 'user/repair',
	    method: 'GET',
	    params: {
	      page: pageNum,
	      length: pageLength
	    }
	  }).then(function(response) {
	    console.log(response);
	    //buildRepairCard(response.entity.data);
	  }).catch((response) => console.log(response));*/
	}

	function getPropertyLoan(pageNum, pageLength, sortData, repairData) {
	  var debugData = {
	    0: {
	      id: 1,
	      property_name: 'air condition remote controller 001',
	      data_began_at: '2015/12/11',
	      data_ended_at: '2015/12/11  ',
	      time_began_at: '10:00',
	      time_ended_at: '12:00',
	      remark: 'weather is hot',
	      type: {
	        id: 5,
	        name: 'cleanup'
	      },
	      status: {
	        id: 1,
	        name: 'refused'
	      }
	    },
	    1: {
	      id: 2,
	      property_name: 'air condition remote controller 206',
	      data_began_at: '3015/03/19',
	      data_ended_at: '3015/03/19',
	      time_began_at: '14:00',
	      time_ended_at: '16:00',
	      remark: 'weather is very hot',
	      type: {
	        id: 6,
	        name: 'maintain'
	      },
	      status: {
	        id: 2,
	        name: 'can be loaned'
	      }
	    }
	  };
	  var i;
	  var j;
	  var totalLength = Object.size(sortData);
	  var dataLength = Object.size(debugData);
	  for (i = totalLength, j = 0; i < totalLength + dataLength; i++, j++) {
	    sortData[i] = [];
	    sortData[i][0] = j;
	    sortData[i][1] = 1;
	    sortData[i][2] = debugData[j].data_began_at;
	  }
	  //console.log('before sort: totalData:' + totalData);
	  sortData.sort(function (a, b) {
	    return new Date(a[2]) < new Date(b[2]);
	  });
	  //console.log('after sort: totalData:' + totalData);
	  buildHistoryCard(sortData, repairData, debugData);

	  /*client({
	   path: 'user/loan/others',
	   method: 'GET',
	   params: {
	   page: pageNum,
	   length: pageLength
	   }
	   }).then(function(response) {
	   console.log(response);
	   }).catch((response) => console.log(response));*/
	}

	function buildHistoryCard(sortData, repairData, propertyData) {
	  var i;
	  var dataLength = Object.size(sortData);
	  for (i = 0; i < dataLength; i++) {
	    if (sortData[i][1] == 0) {
	      //repair
	      buildRepairHistoryCard(repairData[sortData[i][0]]);
	    } else if (sortData[i][1] == 1) {
	      //property
	      buildPropertyHistoryCard(propertyData[sortData[i][0]]);
	    }
	  }
	  historyCardEvent();
	}

	function buildRepairHistoryCard(data) {
	  console.log('Repair history:', data);
	  var color = today > data.create_at ? 'teal' : 'red';
	  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' + 'data-name="' + data.property.name + '"' + 'data-time="' + data.create_at + '"' + 'data-remark="' + data.remark + '">';
	  var divCardContent = '<div class="row card-content">';
	  var spanName = '<span class="col s4 center-align">' + data.property.name + '</span>';
	  var spanDate = '<span class="col s4 center-align " style="color:' + color + '">' + data.create_at + '</span>';
	  var spanType = '<span class="col s4 center-align">' + data.type.name + '</span></div></div>';
	  //console.log(divCard + divCardContent + spanName + spanDate + spanType);
	  $('#property_history_content').append(divCard + divCardContent + spanName + spanDate + spanType);
	}

	function buildPropertyHistoryCard(data) {
	  console.log('Property history:', data);
	  var color = today > data.data_began_at ? 'teal' : 'red';
	  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' + 'data-name="' + data.property_name + '"' + 'data-time="' + data.data_began_at + ' ' + data.time_began_at + ' - ' + data.data_ended_at + ' ' + data.time_ended_at + '"' + 'data-remark="' + data.remark + '">';
	  var divCardContent = '<div class="row card-content">';
	  var spanName = '<span class="col s4 center-align">' + data.property_name + '</span>';
	  var spanDate = '<span class="col s4 center-align" style="color:' + color + '">' + data.data_began_at + '</span>';
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

	'use strict';

	var Sammy = __webpack_require__(192);

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/user/loan', function (context) {
	    context.partial('/templates/user/loan.ms').then(function () {
	      dateEvent();
	    });
	  });
	});

	function dateEvent() {
	  var picker = new Pikaday({
	    field: document.getElementById('datepicker'),
	    bound: false
	  });
	}

/***/ },

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(248);
	__webpack_require__(252);
	__webpack_require__(253);

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var $ = __webpack_require__(194);
	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(200);
	var api = __webpack_require__(249);

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/admin/examine', function (context) {
	    client({
	      path: 'manager/loan/classrooms',
	      params: { page: context.params.page }
	    }).entity().then(function (data) {
	      var currentPage = data.current_page;
	      console.log(data);
	      context.prevUrl = '#/admin/examine?page=' + (currentPage - 1);
	      context.nextUrl = '#/admin/examine?page=' + (currentPage + 1);
	      if (data.current_page === 1) {
	        context.disablePrev = true;
	      }
	      if (!data.next_page_url) {
	        context.disableNext = true;
	      }
	      context.list = data.data.map(function (item) {
	        item.time = item.date_began_at + '~' + item.date_ended_at;
	        return item;
	      });
	      context.loadPartials({ menu: '/templates/menu.ms' }).partial('/templates/admin/examine.ms').then(function () {
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

	        var sendRefuseVerify = function sendRefuseVerify(id) {
	          sendVerifyRequest(id, 'refused');
	        };

	        var sendAcceptVerify = function sendAcceptVerify(id) {
	          sendVerifyRequest(id, 'accepted');
	        };

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
	        });
	      });
	    }).catch(function (response) {
	      console.log(response);
	    });
	  });
	});

/***/ },

/***/ 249:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var _fetchPlus = __webpack_require__(250);

	var _fetchPlusCsrf = __webpack_require__(251);

	var _fetchPlusCsrf2 = _interopRequireDefault(_fetchPlusCsrf);

	var _when = __webpack_require__(206);

	var _when2 = _interopRequireDefault(_when);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var token = $('#csrf-token').attr('content');
	var FORM_HEADER = 'application/x-www-form-urlencoded; charset=UTF-8';
	var JSON_HEADER = 'application/json; charset=UTF-8';
	var api = (0, _fetchPlus.connectEndpoint)('/api');

	api.addMiddleware((0, _fetchPlusCsrf2.default)('X-CSRF-TOKEN', token));

	// Default add cookie default
	api.addMiddleware(function (request) {
	  if (request.options.credentials) {
	    request.options.credentials = 'include';
	  }
	});

	// custom JSON middleware
	api.addMiddleware(function (request) {
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
	});

	// P2P-style unjustifed status code check
	api.addMiddleware(function () {
	  return function (response) {
	    if (_typeof(response.body) === 'object' && response.body.status) {
	      if (response.body.status !== 0) {
	        return _when2.default.reject(response);
	      }
	    }
	    return response;
	  };
	});

	module.exports = api;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 252:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var PageLength;
	var PageNow = 1;
	var TotalPeople = 0;

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/admin/account', function (context) {
	    context.partial('/templates/admin/account.ms').then(function () {
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

/***/ 253:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(200);
	__webpack_require__(193);

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
	  this.use('Mustache', 'ms');
	  this.get('#/admin/property', function (context) {
	    console.log('admin property');
	    client({
	      path: 'manager/property/others',
	      method: 'GET',
	      params: {
	        page: 1,
	        length: 10000
	      }
	    }).then(function (propertyData) {
	      client({
	        path: 'manager/loan/others',
	        method: 'GET',
	        params: {
	          page: 1,
	          length: 1000000
	        }
	      }).then(function (loanData) {
	        console.log('property data:', propertyData);

	        context.propertyData = propertyData.entity.data.map(function (item) {
	          item.status.color = item.status.id == 3 ? 'teal' : item.status.id == 4 ? 'red' : 'blue';
	          return item;
	        });

	        context.loanData = loanData.entity.data.map(function (item) {
	          item.time = item.date_began_at + (item.time_began_at == null ? '' : ' ' + item.time_began_at) + ' ~ ' + item.date_ended_at + (item.time_ended_at == null ? '' : ' ' + item.time_ended_at);
	          var property = propertyID2propertyCode(item.property_id, context.propertyData);
	          item.code = property.code;
	          return item;
	        });
	        console.log('loan data:', context.loanData);

	        context.propertyPage = [];
	        var i;
	        for (i = 0; i < Math.ceil(propertyData.entity.total / 5); i++) {
	          context.propertyPage[i] = [];
	          context.propertyPage[i].classes = '';
	          if (i == 0) {
	            context.propertyPage[i].classes = 'active';
	          }
	          context.propertyPage[i].pageNum = i + 1;
	        }

	        context.loanPage = [];
	        for (i = 0; i < Math.ceil(loanData.entity.total / 5); i++) {
	          context.loanPage[i] = [];
	          context.loanPage[i].classes = '';
	          if (i == 0) {
	            context.loanPage[i].classes = 'active';
	          }
	          context.loanPage[i].pageNum = i + 1;
	        }

	        context.partial('/templates/admin/property.ms').then(function () {
	          propertyBindEvent(context.propertyData, context.loanData);
	          propertyPageEvent(context.propertyPage.length, '.property_system');
	          showPage(1, context.propertyPage.length, '.property_system');
	          propertyPageEvent(context.loanPage.length, '.manage_system');
	          showPage(1, context.loanPage.length, '.manage_system');
	        });
	      }).catch(function (response) {
	        alert('取得財產借用列表失敗!');
	        console.log('get loan other list error, ', response);
	      });
	    }).catch(function (response) {
	      alert('取得財產列表失敗!');
	      console.log('get property list error, ', response);
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
	  $propertyContainer.find('#property_system').on('click', function (event) {
	    $propertyContainer.find('#property_system').addClass('purple darken-4').css('color', 'white');
	    $propertyContainer.find('#property_manage').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $propertyContainer.find('.property_system').css('display', 'block');
	    $propertyContainer.find('.manage_system').css('display', 'none');
	  });
	  $propertyContainer.find('#property_manage').on('click', function (event) {
	    $propertyContainer.find('#property_system').removeClass('purple darken-4').addClass('white').css('color', 'black');
	    $propertyContainer.find('#property_manage').addClass('purple darken-4').css('color', 'white');
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
	  $propertyContainer.find('#property_system_content .modal-trigger').on('click', function (event) {
	    if ($(this).hasClass('disabled')) {
	      return;
	    }

	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $propertyModal.fadeIn();

	    var ele = $(this).parent().parent();
	    $propertyModal.find('.modal-content h4').html(ele.data('name'));
	    $propertyModal.find('p').html(ele.data('describe'));
	    $propertyModal.data('propertyid', ele.data('propertyid'));
	  });
	  $propertyContainer.find('#property_modal #delete_property_btn').on('click', function () {
	    var propertyID = $propertyModal.data('propertyid');
	    $.ajax({
	      url: '/api/manager/property/delete/' + propertyID,
	      _method: 'delete',
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
	  $propertyContainer.find('#property_manage_content #create_property').on('click', function (event) {
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
	  $propertyContainer.find('#property_manage_content #loan_property').on('click', function (event) {
	    $('#materialize-lean-overlay-30').css('display', 'block');
	    $loanPropertyModal.fadeIn();
	  });
	  $propertyContainer.find('#loan_property_modal #loan_property_code').on('keyup', function (event) {
	    var code = $(this).val();
	    var property = propertyCode2propertyID(code, propertyData);
	    $(this).parent().find('#loan_property_name').html(property.name);
	  });
	  $propertyContainer.find('#loan_property_btn').on('click', function (event) {
	    var userID = $loanPropertyModal.find('#loan_user_id').val();
	    var code = $loanPropertyModal.find('#loan_property_code').val();
	    var dateBeganAt = $loanPropertyModal.find('#date_began_at').val();
	    var dateEndedAt = $loanPropertyModal.find('#date_ended_at').val();
	    var type = $loanPropertyModal.find('#loan_property_type').val();
	    var remark = $loanPropertyModal.find('#loan_property_remark').val();

	    if (!userID || !code || !dateBeganAt || !dateEndedAt || !type || !remark) {
	      alert('請確實填寫借用表單！');
	      return;
	    }
	    var property = propertyCode2propertyID(code, propertyData);
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
	        remark: remark,
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
	        status: 'submitted',
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
	  var i;
	  for (i = 0; i < 5; i++) {
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

	function propertyCode2propertyID(code, Data) {
	  var i;
	  var property = {};
	  for (i = 0; i < Object.size(Data); i++) {
	    if (Data[i].code === code) {
	      property.id = Data[i].id;
	      property.name = Data[i].name;
	      break;
	    }
	  }
	  return property;
	}

	function propertyID2propertyCode(propertyID, Data) {
	  var i;
	  var property = {};
	  for (i = 0; i < Object.size(Data); i++) {
	    if (parseInt(Data[i].id) === parseInt(propertyID)) {
	      property.code = Data[i].code;
	      property.name = Data[i].name;
	      break;
	    }
	  }
	  return property;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 254:
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