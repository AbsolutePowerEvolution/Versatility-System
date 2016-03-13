var Sammy = require('sammy');
var client = require('../../lib/client');
var when = require('when');
var moment = require('moment');

var today = moment().format('YYYY/MM/DD');

Sammy('#main', function() {
  this.get('#/user/property', function(context) {
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
    var repairPromise = client({
      path: 'user/repair',
      method: 'GET',
      name: 'repair',
      params: {
        page: 1,
        length: 1000000
      }
    });

    when.all([propertyPromise, loanPromise, repairPromise])
      .spread((propertyData, loanData, repairData) => {
        console.log('propertyData:', propertyData);
        console.log('loanData:', loanData);
        console.log('repairData:', repairData);

        context.propertyData = propertyData.entity.data.map((item) => {
          let colors = {'deleted': 'red', 'maintenance': 'red', 'normal': 'teal'};
          item.status.color = colors[item.status.name] || 'blue';
          return item;
        });
        context.propertyPage = [];
        for(let i = 0; i < Math.ceil(propertyData.entity.total / 5); i++) {
          context.propertyPage.push({});
          context.propertyPage[i].classes = '';
          if(i === 0) {
            context.propertyPage[i].classes = 'active';
          }
          context.propertyPage[i].pageNum = (i + 1);
        }

        context.loanData = loanData.entity.data.map((item) => {
          let colors = {'canceled': 'teal', 'refused': 'teal', 'finished': 'teal'};
          item.status.color = colors[item.status.name] || 'red';
          return item;
        });

        context.repairData = repairData.entity.data.map((item) => {
          let colors = {'canceled': 'teal', 'finished': 'teal'};
          item.status.color = colors[item.status.name] || 'red';
          return item;
        });

        context.loadPartials({menu: '/templates/user/menu.ms'})
          .partial('/templates/user/property.ms').then(function() {
            showPage(1, context.propertyPage.length, '.property_system');
            propertyPageEvent(context.propertyPage.length, '.property_system');
            propertyBindEvent(context.propertyData);
          });
      }).catch((response) => {
        let name = response.request.name;
        if(name === 'loan') {
          Materialize.toast($('<span>取得財產借用列表失敗!</span>'), 5000);
          console.log('get loan other list error, ', response);
        } else if(name === 'property') {
          Materialize.toast('<span>取得財產列表失敗!</span>', 5000);
          console.log('get property list error, ', response);
        } else if(name === 'repair') {
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
  $propertyContainer.find('#sub_menu li').on('click', function(event) {
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
  $propertyContainer.find('#repair_property_btn').on('click', function() {
    var type = $('#property_repair_form input:radio:checked[name="repair_type"]').val();
    var title = $('#repair_title').val();
    var remark = $('#repair_remark').val();
    if(!title || !remark || !type) {
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
    }).then(function(response) {
      console.log(response);
      Materialize.toast($('<span>報修財產成功!</span>'), 5000);
    }).catch(function(response) {
      console.log(response);
      Materialize.toast($('<span>報修財產失敗!</span>'), 10000);
    });

  });

  $propertyContainer.find('.repair_content .repair_delete_btn').on('click', function() {
    console.log($(this).data('repair_id'));
    var repairID = $(this).data('repair_id');
    $.ajax({
      url: '/api/user/repair/delete/' + repairID,
      _method: 'delete',
      status: 'deleted',
      type: 'delete',
      data: {
        id: repairID,
        _token: $('meta[name="csrf-token"]').attr('content')
      },
      error: function(error) {
        Materialize.toast($('<span>取消報修紀錄失敗!</span>'), 5000);
        console.log('delete property error, ', error);
      },
      success: function(data) {
        Materialize.toast($('<span>取消報修紀錄成功!</span>'), 5000);
        location.reload();
      }
    });
  });
}

function searchData(propertyData) {
  var $propertyContainer = $('#property_container');
  $propertyContainer.find('#search_property_btn').on('click', function() {
    var i;
    var limit = 0;
    var target = $propertyContainer.find('#search_property').val();
    var who = '#property_system_content .propertyContent';
    $propertyContainer.find('#property_system_content .propertyContent').removeClass('searched');
    if(target !== '') {
      for(i = 0; i < propertyData.length; i++) {
        if(propertyData[i].name.indexOf(target) != -1) {
          var tag = `${who}:nth-child(${i + 1})`;
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
    showPage(nowPage, limit, who);
  });
}

function showPage(page, limit, who) {
  var $propertyContainer = $('#property_container');
  $propertyContainer.find(who).find('.showContent').removeClass('block').addClass('hide');
  for(let i = 0; i < 5; i++) {
    var show = who + ' .showContent.searched:eq(' + (((page - 1) * 5) + i) + ')';
    $propertyContainer.find(show).removeClass('hide').addClass('block');
  }
  $propertyContainer.find(who).find('.pagination li').removeClass('inline-block active').addClass('hide');
  $propertyContainer.find(who).find('.pagination li:eq(' + page + ')').addClass('active');
  $propertyContainer.find(who).find('.pagination li:lt(' + (limit + 1) + ')')
      .removeClass('hide').addClass('inline-block');
  $propertyContainer.find(who).find('.pagination li:last-child').removeClass('hide').addClass('inline-block');
}
