var Sammy = require('sammy');
var client = require('../../lib/client');
var when = require('when');

Sammy('#main', function() {
  this.get('#/admin/property', function(context) {
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
    when.all([propertyPromise, loanPromise])
      .spread((propertyData, loanData) => {
        console.log('property data:', propertyData);

        context.propertyData = propertyData.entity.data.map((item) => {
          let colors = {'deleted': 'red', 'maintenance': 'red', 'normal': 'teal'};
          item.status.color = colors[item.status.name] || 'blue';
          return item;
        });

        context.loanData = loanData.entity.data.map((item) => {
          var property = context.propertyData
            .find((data) => parseInt(item.property_id) === data.id);
          item.code = property.code;
          item.time = item.date_began_at + ' ' + (item.time_began_at == null ? '' : item.time_began_at) + '  -  ' +
                      item.date_ended_at + ' ' + (item.time_ended_at == null ? '' : item.time_ended_at);
          return item;
        });
        console.log('loan data:', context.loanData);

        context.propertyPage = [];
        for(let i = 0; i < Math.ceil(propertyData.entity.total / 5); i++) {
          context.propertyPage.push({});
          context.propertyPage[i].classes = '';
          if(i === 0) {
            context.propertyPage[i].classes = 'active';
          }
          context.propertyPage[i].pageNum = (i + 1);
        }

        context.loanPage = [];
        for(let i = 0; i < Math.ceil(loanData.entity.total / 5); i++) {
          context.loanPage.push({});
          context.loanPage[i].classes = '';
          if(i === 0) {
            context.loanPage[i].classes = 'active';
          }
          context.loanPage[i].pageNum = (i + 1);
        }

        context.loadPartials({menu: '/templates/admin/menu.ms'})
          .partial('/templates/admin/property.ms').then(function() {
            propertyBindEvent(context.propertyData, context.loanData);
            propertyPageEvent(context.propertyPage.length, '.property_system');
            showPage(1, context.propertyPage.length, '.property_system');
            propertyPageEvent(context.loanPage.length, '.manage_system');
            showPage(1, context.loanPage.length, '.manage_system');
          });
      }).catch((response) => {
        if(response instanceof Error) {
          console.log(response);
        }
        if(response.request) {
          if(response.request.name === 'loan') {
            alert('取得財產借用列表失敗!');
            console.log('get loan other list error, ', response);
          } else if(response.request.name === 'property') {
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
  $propertyContainer.find('#property_system').on('click', function(event) {
    $propertyContainer.find('.property_system').css('display', 'block');
    $propertyContainer.find('.manage_system').css('display', 'none');
  });
  $propertyContainer.find('#property_manage').on('click', function(event) {
    $propertyContainer.find('.property_system').css('display', 'none');
    $propertyContainer.find('.manage_system').css('display', 'block');
  });

  searchData(propertyData, loanData);
  showPropertyDetailAndDeleteProperty();
  createProperty();
  loanProperty(propertyData);
  returnProperty();
  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'none');
    $('#property_modal').fadeOut();
    $('#create_property_modal').fadeOut();
    $('#loan_property_modal').fadeOut();
    $('#return_property_modal').fadeOut();
  });
}

function searchData(propertyData, loanData) {
  var $propertyContainer = $('#property_container');
  $propertyContainer.find('#search_property_btn').on('click', function() {
    var limit;
    var target = $propertyContainer.find('#search_property').val();
    $propertyContainer.find('#property_system_content .propertyContent').removeClass('searched');
    if(target !== '') {
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

  $propertyContainer.find('#search_loanData_btn').on('click', function() {
    var limit;
    var target = $propertyContainer.find('#search_loanData').val();
    $propertyContainer.find('#property_manage_content .propertyContent').removeClass('searched');
    if(target !== '') {
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
  $propertyContainer.find('#property_system_content .modal-trigger').on('click', function(event) {
    if($(this).hasClass('disabled')) { return; }

    $('#materialize-lean-overlay-30').css('display', 'block');
    $propertyModal.fadeIn();

    var ele = $(this).parent().parent();
    $propertyModal.find('.modal-content h4').html(ele.data('name'));
    $propertyModal.find('.modal-content .code').html(ele.data('code'));
    $propertyModal.find('.modal-content .discribe').html(ele.data('describe'));
    $propertyModal.data('propertyid', ele.data('propertyid'));
  });
  $propertyContainer.find('#property_modal #delete_property_btn').on('click', function() {
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
      error: function(error) {
        alert('刪除財產失敗!');
        console.log('delete property error, ', error);
      },
      success: function(data) {
        alert('刪除財產成功!');
        location.reload();
      }
    });
  });

  var $returnPropertyModal = $('#return_property_modal');
  $propertyContainer.find('#return_property_content .returnLoanModalTrigger').on('click', function(event) {
    if($(this).hasClass('disabled')) { return; }
    $('#materialize-lean-overlay-30').css('display', 'block');
    $returnPropertyModal.fadeIn();

    var ele = $(this).parent().parent();
    var status = ele.data('status');
    $returnPropertyModal.find('#return_property_btn').addClass('hide');
    if(status === 'canceled') {
      $returnPropertyModal.find('#loanOtherAction').removeClass('hide').html('使用者已取消借用該財產');
    } else if(status === 'finished') {
      $returnPropertyModal.find('#loanOtherAction').removeClass('hide').html('使用者已歸還該財產');
    } else if(status === 'refused') {
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
  $propertyContainer.find('#property_manage_content #create_property').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'block');
    $createPropertyModal.fadeIn();
  });
  $propertyContainer.find('#create_property_modal #create_property_btn').on('click', function(event) {
    var type = $createPropertyModal.find('input[type="radio"]:checked').val();
    var propertyName = $createPropertyModal.find('#create_property_name').val();
    var propertyCode = $createPropertyModal.find('#create_property_code').val();
    var describe = $createPropertyModal.find('#create_property_describe').val();
    if(!type || !propertyName || !propertyCode || !describe) {
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
    }).then(function(response) {
      alert('新增財產成功!');
      location.reload();
    }).catch(function(response) {
      alert('新增財產失敗!');
      console.log('loan property error, ', response);
    });
  });
}

function loanProperty(propertyData) {
  var $propertyContainer = $('#property_container');
  var $loanPropertyModal = $('#loan_property_modal');
  $propertyContainer.find('#property_manage_content #loan_property').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'block');
    $loanPropertyModal.fadeIn();
  });
  $propertyContainer.find('#loan_property_modal #loan_property_code').on('keyup', function(event) {
    var code = $(this).val();
    var property = propertyData.find((data) => data.code === code);
    $(this).parent().find('#loan_property_name').html(property.name);
  });
  $propertyContainer.find('#loan_property_btn').on('click', function(event) {
    var userID = $loanPropertyModal.find('#loan_user_id').val();
    var code = $loanPropertyModal.find('#loan_property_code').val();
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
    var dateBeganAt = today;
    var dateEndedAt = today;
    var type = 'others';

    if(!userID || !code) {
      alert('請確實填寫借用表單！');
      return;
    }
    var property = propertyData.find((data) => data.code === code);
    if(!property.id || !property.name) {
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
    }).then(function(response) {
      alert('借用財產成功!');
    }).catch(function(response) {
      alert('借用財產失敗!');
      console.log('loan property error, ', response);
    });
  });
}

function returnProperty() {
  var $propertyContainer = $('#property_container');
  var $returnPropertyModal = $('#return_property_modal');
  $propertyContainer.find('#return_property_modal #return_property_btn').on('click', function(event) {
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
      error: function(error) {
        alert('歸還財產失敗!');
        console.log('return property error, ', error);
      },
      success: function(data) {
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
  $propertyContainer.find(who).find('.page').unbind('click').on('click', function(event) {
    if(nowPage == parseInt($(this).data('pagenum'))) {
      return;
    } else if($(this).data('pagenum') == 'prev') {
      if(nowPage <= 1) {
        return;
      }
      nowPage -= 1;
    } else if($(this).data('pagenum') == 'next') {
      if(nowPage >= limit) {
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

function search(Data, who, target, searchColumn) {
  var i;
  var j;
  var limit;
  var $propertyContainer = $('#property_container');
  for(i = 0, limit = 0; i < Data.length; i++) {
    for(j = 0; j < searchColumn.length; j++) {
      if(Data[i][searchColumn[j]].indexOf(target) != -1) {
        limit++;
        var tag = who + ':nth-child(' + (i + 2) + ')';
        $propertyContainer.find(tag).addClass('searched');
      }
    }
  }
  return limit;
}
