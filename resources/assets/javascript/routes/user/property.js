var Sammy = require('sammy');
var client = require('../../lib/client');
require('sammy/lib/plugins/sammy.mustache.js');

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();
if(dd < 10) {
  dd = '0' + dd;
}
if(mm < 10) {
  mm = '0' + mm;
}
today = yyyy + '/' + mm + '/' + dd;

Object.size = function(obj) {
  var size = 0;
  var key;
  for(key in obj) {
    if(obj.hasOwnProperty(key)) {
      size++;
    }
  }
  return size;
};

Sammy('#main', function() {
  this.use('Mustache', 'ms');
  this.get('#/user/property', function(context) {
    console.log('property');
    context.partial('/templates/user/property.ms').then(function() {
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
  }).then(function(response) {
    console.log(response);
    buildPropertyCard(response.entity.data, response.entity.data);
    var propertyTotalPage = response.entity.total;
    if(createPageSwit) {
      propertyBuildPage(propertyTotalPage);
    }
  }).catch((response) => console.log(response));
}

function buildPropertyCard(oriPropertyData, searchPropertyData) {
  var i;
  var length = Object.size(searchPropertyData);
  $('#property_system_content').find('.propertyContent').remove();
  for(i = 0; i < length; i++) {
    var status = searchPropertyData[i].status.id;//3: normal, 4:maintenance
    var color = status == 3 ? 'teal' : (status == 4 ? 'red' : 'blue');
    var divCard = '<div class="card propertyContent ' + (i < 5 ? 'block' : 'hide') + '">';
    var divCardContent = '<div class="row card-content" ' +
        'data-name="' + searchPropertyData[i].name + '"' +
        'data-propertyid="' + searchPropertyData[i].id + '"' +
        'data-describe="' + searchPropertyData[i].describe + '">';
    var spanName = '<span class="col s4 center-align">' + searchPropertyData[i].name + '</span>';
    var spanStatus = '<span class="col s4 center-align" style="color:' + color + '">' +
        searchPropertyData[i].status.name + '</span>';
    var spanBtn = '<span class="col s4 center-align"><a class="waves-effect waves-light btn modal-trigger ' +
     (status == 4 ? 'disabled' : '') + '"><i class="material-icons left">build</i>報修/清理' + '</a></span></div></div>';
    $('#property_system_content').append(divCard + divCardContent + spanName + spanStatus + spanBtn);
  }
  propertyBindEvent(oriPropertyData);
}

function propertyBindEvent(propertyData) {
  var $propertyContainer = $('#property_container');
  $propertyContainer.find('#property_system').on('click', function(event) {
    $propertyContainer.find('#property_system').addClass('purple darken-4').css('color', 'white');
    $propertyContainer.find('#property_history').removeClass('purple darken-4').addClass('white').css('color', 'black');
    $propertyContainer.find('.property_system').css('display', 'block');
    $propertyContainer.find('#property_history_content').css('display', 'none');
  });

  $propertyContainer.find('#property_history').on('click', function(event) {
    $propertyContainer.find('#property_system').removeClass('purple darken-4').addClass('white').css('color', 'black');
    $propertyContainer.find('#property_history').addClass('purple darken-4').css('color', 'white');
    $propertyContainer.find('.property_system').css('display', 'none');
    $propertyContainer.find('#property_history_content').css('display', 'block');
  });

  var $modalTarget = $('#property_modal');
  $propertyContainer.find('#property_system_content .modal-trigger').on('click', function(event) {
    if($(this).hasClass('disabled')) { return; }

    $('#materialize-lean-overlay-30').css('display', 'block');
    $modalTarget.fadeIn();

    var ele = $(this).parent().parent();
    $modalTarget.find('.modal-content h4').html(ele.data('name'));
    $modalTarget.find('p').html(ele.data('describe'));
    $modalTarget.data('propertyid', ele.data('propertyid'));
  });

  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'none');
    $modalTarget.fadeOut();
    $('#history_modal').fadeOut();
  });

  $propertyContainer.find('#property_repair_submit').on('click', function(event) {
    var type = $modalTarget.find('input[type="radio"]:checked').val();
    var propertyid = $modalTarget.data('propertyid');
    var remark = $modalTarget.find('#reason').val();
    postPropertyRepair(propertyid, type, remark);
  });

  $propertyContainer.find('#search_property_btn').on('click', function() {
    var i;
    var j;
    var target = $propertyContainer.find('#search_property').val();
    var result = {};
    if(target !== '') {
      for(j = 0, i = 0; i < propertyData.length; i++) {
        if(propertyData[i].name.indexOf(target) != -1) {
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
  page += '<li onselectstart="return false"><a class="page" data-pageNum="prev"><i class="material-icons">' +
 'chevron_left</i></a></li><li onselectstart="return false" class="active"><a class="page" data-pageNum="1">1</a></li>';
  for(i = 1; i < propertyTotalPage / 5 ; i++) {
    page += '<li onselectstart="return false"><a class="page" data-pageNum="' + (i + 1) + '">' + (i + 1) + '</a></li> ';
  }
  page += '<li onselectstart="return false">' +
          '<a class="page" data-pageNum="next"><i class="material-icons">chevron_right</i></a></li>';
  $('#property_container').find('.pagination').empty().append(page);
  propertyPageEvent(propertyTotalPage / 5);
}

function propertyPageEvent(limit) {
  var nowPage = 1;
  $('#property_container').find('.page').on('click', function(event) {
    var $ActiveTarget;
    if(nowPage == parseInt($(this).data('pagenum'))) {
      return;
    } else if($(this).data('pagenum') == 'prev') {
      if(nowPage <= 1) {
        return;
      }
      $ActiveTarget = $(this).parent().parent().find('.active').prev();
      nowPage -= 1;
    } else if($(this).data('pagenum') == 'next') {
      if(nowPage >= limit) {
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
  for(i = 1; i <= 5; i++) {
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
  }).then(function(response) {
    console.log(response);
    //location.reload();
  }).catch((response) => console.log(response));
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
  for(i = 0; i < dataLength; i++) {
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
  for(i = totalLength, j = 0; i < totalLength + dataLength; i++, j++) {
    sortData[i] = [];
    sortData[i][0] = j;
    sortData[i][1] = 1;
    sortData[i][2] = debugData[j].data_began_at;
  }
  //console.log('before sort: totalData:' + totalData);
  sortData.sort(function(a, b) {
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
  for(i = 0; i < dataLength; i++) {
    if(sortData[i][1] == 0) { //repair
      buildRepairHistoryCard(repairData[sortData[i][0]]);
    } else if(sortData[i][1] == 1) { //property
      buildPropertyHistoryCard(propertyData[sortData[i][0]]);
    }
  }
  historyCardEvent();
}

function buildRepairHistoryCard(data) {
  console.log('Repair history:', data);
  var color = today > data.create_at ? 'teal' : 'red';
  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' +
                                                'data-name="' + data.property.name + '"' +
                                                'data-time="' + data.create_at + '"' +
                                                'data-remark="' + data.remark + '">';
  var divCardContent = '<div class="row card-content">';
  var spanName = '<span class="col s4 center-align">' + data.property.name + '</span>';
  var spanDate = '<span class="col s4 center-align " style="color:' + color + '">' + data.create_at +
                  '</span>';
  var spanType = '<span class="col s4 center-align">' + data.type.name + '</span></div></div>';
  //console.log(divCard + divCardContent + spanName + spanDate + spanType);
  $('#property_history_content').append(divCard + divCardContent + spanName + spanDate + spanType);
}

function buildPropertyHistoryCard(data) {
  console.log('Property history:', data);
  var color = today > data.data_began_at ? 'teal' : 'red';
  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' +
                                                'data-name="' + data.property_name + '"' +
                                                'data-time="' + data.data_began_at + ' ' + data.time_began_at + ' - ' +
                                                                data.data_ended_at + ' ' + data.time_ended_at + '"' +
                                                'data-remark="' + data.remark + '">';
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
  $propertyContainer.find('#property_history_content .card').on('click', function(event) {
    if($(this).hasClass('disabled')) { return; }

    $('#materialize-lean-overlay-30').css('display', 'block');
    $modalTarget.fadeIn();

    var ele = $(this);
    $modalTarget.find('.modal-content h4').html(ele.data('name'));
    $modalTarget.find('span').html(ele.data('time'));
    $modalTarget.find('p').html(ele.data('remark'));
  });
}
