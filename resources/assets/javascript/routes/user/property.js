var Sammy = require('sammy');
var client = require('../../lib/client');

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
  this.get('#/user/property', function(context) {
    console.log('property');
    context.loadPartials({menu: '/templates/user/menu.ms'})
      .partial('/templates/user/property.ms').then(function() {
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
  }).catch(function(response) {
    alert('取得財產列表失敗!');
    console.log('get property list error!', response);
  });
}

function buildPropertyCard(oriPropertyData, searchPropertyData) {
  var i;
  var length = Object.size(searchPropertyData);
  $('#property_system_content').find('.propertyContent').remove();
  for(i = 0; i < length; i++) {
    var status = searchPropertyData[i].status.name;
    var color = status == 'normal' ? 'teal' : ((status == 'deleted' || status == 'maintenance') ? 'red' : 'blue');
    var divCard = '<div class="card propertyContent ' + (i < 5 ? 'block' : 'hide') + '">';
    var divCardContent = '<div class="row card-content" ' +
        'data-name="' + searchPropertyData[i].name + '"' +
        'data-propertyid="' + searchPropertyData[i].id + '"' +
        'data-describe="' + searchPropertyData[i].describe + '">';
    var spanName = '<span class="col s4 center-align">' + searchPropertyData[i].name + '</span>';
    var spanStatus = '<span class="col s4 center-align" style="color:' + color + '">' +
        searchPropertyData[i].status.name + '</span>';
    var spanBtn = '<span class="col s4 center-align"><a class="waves-effect waves-light btn modal-trigger ' +
     (status == 3 ? 'disabled' : '') + '"><i class="material-icons left">build</i>報修/清理' + '</a></span></div></div>';
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
    alert('報修財產成功!');
    location.reload();
  }).catch(function(response) {
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
  }).then(function(response) {
    console.log('get repair list ok!', response);
    var Data = response.entity.data;
    getPropertyLoan(1, 10000, Data);
  }).catch(function(response) {
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
  }).then(function(response) {
    console.log('get user loan log success!', response);
    var loanData = response.entity.data;
    buildHistoryCard(repairData, loanData);
  }).catch(function(response) {
    alert('取得個人財產借用紀錄錯誤!');
    console.log('get user loan log error!', response);
  });
}

function buildHistoryCard(repairData, propertyData) {
  var i;
  var j;
  for(i = 0; i < (Object.size(repairData) + Object.size(propertyData)); i++) {
    var swit;
    var oldIndex;
    var old = '1900/1/1';
    for(j = 0; j < Object.size(repairData); j++) {
      if(new Date(old) < new Date(repairData[j].created_at)) {
        old = repairData[j].created_at;
        oldIndex = j;
        swit = 0;
      }
    }
    for(j = 0; j < Object.size(propertyData); j++) {
      if(new Date(old) < new Date(propertyData[j].date_began_at)) {
        old = propertyData[j].date_began_at;
        oldIndex = j;
        swit = 1;
      }
    }

    if(swit === 0) {
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
  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' +
                                                'data-name="' + data.property.name + '"' +
                                                'data-time="' + data.created_at + '"' +
                                                'data-remark="' + data.remark + '">';
  var divCardContent = '<div class="row card-content">';
  var spanName = '<span class="col s4 center-align">' + data.property.name + '</span>';
  var spanDate = '<span class="col s4 center-align " style="color:' + color + '">' + data.created_at + '</span>';
  var spanType = '<span class="col s4 center-align">' + data.type.name + '</span></div></div>';
  //console.log(divCard + divCardContent + spanName + spanDate + spanType);
  $('#property_history_content').append(divCard + divCardContent + spanName + spanDate + spanType);
}

function buildPropertyHistoryCard(data) {
  var color = today > data.date_began_at ? 'teal' : 'red';
  var divCard = '<div class="card waves-effect"' + 'data-id="' + data.id + '"' +
      'data-name="' + data.property_name + '"' +
      'data-time="' + data.date_began_at + ' ' + (data.time_began_at == null ? '' : data.time_began_at) + ' - ' +
                      data.date_ended_at + ' ' + (data.time_ended_at == null ? '' : data.time_ended_at) + '"' +
                                                'data-remark="' + data.remark + '">';
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

