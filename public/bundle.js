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

	__webpack_require__(249);

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
	    console.log('context:', context);
	    console.log('property');
	    context.partial('/templates/user/property.ms').then(function () {
	      getPropertyList(1, 5, 1);
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
	    buildPropertyCard(response.entity.data);
	    var propertyTotalPage = response.entity.total;
	    if (createPageSwit) {
	      buildPage(propertyTotalPage);
	    }
	  }).catch(function (response) {
	    return console.log(response);
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
	    var spanBtn = '<span class="col s4 center-align"><a class="waves-effect waves-light btn modal-trigger ' + (status == 4 ? 'disabled' : '') + '"><i class="material-icons left">build</i>報修/清理' + '</a></span></div></div>';
	    $('#property_system_content').append(divCard + divCardContent + spanName + spanStatus + spanBtn);
	  }
	  propertyBindEvent();
	}

	function propertyBindEvent() {
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
	  $propertyContainer.find('.modal-trigger').on('click', function (event) {
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
	}

	function buildPage(propertyTotalPage) {
	  console.log('propertyTotalPage:' + propertyTotalPage);
	  var i;
	  var page = '<li class="active waves-effect"><a data-pageNum="1">1</a></li>';
	  for (i = 1; i < propertyTotalPage / 5; i++) {
	    page += '<li class="waves-effect"><a data-pageNum="' + (i + 1) + '">' + (i + 1) + '</a></li>  ';
	  }
	  page += '<li class="waves-effect"><a data-pageNum="next"><i class="material-icons">chevron_right</i></a></li>';
	  $('#property_container').find('.pagination').append(page);
	  pageEvent(propertyTotalPage / 5);
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
	__webpack_require__(248);

/***/ },

/***/ 247:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var client = __webpack_require__(200);

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
	    }).catch(function (response) {
	      console.log(response);
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 248:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';

	var Sammy = __webpack_require__(192);
	var PageLength = 10;
	var PageNow = 1;

	Sammy('#main', function () {
	  this.use('Mustache', 'ms');

	  this.get('#/admin/account', function (context) {
	    context.partial('/templates/admin/account.ms').then(function () {
	      buttonEvent();
	      getDataEvent();
	      producePage();
	    });
	  });
	});

	function buttonEvent() {
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

	function getDataEvent() {}

	function producePage() {
	  var text = '';
	  var i;
	  var j;

	  for (i = Math.floor(PageNow / 10) * 10, j = 0; i <= PageLength && j < 10; i++, j++) {
	    if (i != PageNow - 1) {
	      text += '<li class="waves-effect"><a href="#!">';
	    } else {
	      text += '<li class="active"><a href="#!">';
	    }
	    text += i + 1;
	    text += '</a></li>';
	  }
	  $('#account_container').find('.page_prev').after(text);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(194)))

/***/ },

/***/ 249:
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