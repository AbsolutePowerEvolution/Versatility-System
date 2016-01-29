var Sammy = require('sammy');
var client = require('../../lib/client');
var when = require('when');
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
if(dd < 10) {
  dd = '0' + dd;
}
if(mm < 10) {
  mm = '0' + mm;
}

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
    var RepairPromise = client({
      path: 'manager/repair',
      method: 'GET',
      name: 'repair',
      params: {
        page: 1,
        length: 1000000
      }
    });
    when.all([propertyPromise, loanPromise, RepairPromise])
      .spread((propertyData, loanData, repairData) => {
        console.log('property data:', propertyData);

        context.date = {};
        context.date.year = yyyy - 1911;
        context.date.month = mm;
        context.date.day = dd;

        context.propertyData = propertyData.entity.data.map((item) => {
          let colors = {'deleted': 'red', 'maintenance': 'red', 'normal': 'teal'};
          item.status.color = colors[item.status.name] || 'blue';
          return item;
        });

        context.loanData = loanData.entity.data.map((item) => {
          var property = context.propertyData
            .find((data) => parseInt(item.property_id) === data.id);
          item.username = item.user.username;
          item.code = property.code;
          item.time = item.date_began_at + ' ' + (item.time_began_at == null ? '' : item.time_began_at) + '  -  ' +
                      item.date_ended_at + ' ' + (item.time_ended_at == null ? '' : item.time_ended_at);
          let isReturn = {'canceled': 'hide', 'finished': 'hide', 'refused': 'hide',
                          'submitted': 'block', 'accepted': 'block'};
          item.isReturn = isReturn[item.status.name] || 'hide';
          return item;
        });
        console.log('loan data:', context.loanData);

        context.repairData = repairData.entity.data.map((item) => {
          let isReturn = {'finished': 'hide', 'submitted': 'block', 'processing': 'block'};
          item.isReturn = isReturn[item.status.name] || 'hide';
          let type = {'cleanup': '清潔', 'maintain': '維修'};
          item.type.cname = type[item.type.name] || item.type.name;
          return item;
        });
        console.log('repair data:', context.repairData);

        context.propertyPage = genPage(propertyData.entity.total / 5);
        context.loanPage = genPage(loanData.entity.total / 5);
        context.repairPage = genPage(repairData.entity.total / 5);

        context.loadPartials({menu: '/templates/admin/menu.ms'})
          .partial('/templates/admin/property.ms').then(function() {
            propertyBindEvent(context.propertyData, context.loanData);
            propertyPageEvent(context.propertyPage.length, '.property_system');
            showPage(1, context.propertyPage.length, '.property_system');
            propertyPageEvent(context.loanPage.length, '.manage_system');
            showPage(1, context.loanPage.length, '.manage_system');
            propertyPageEvent(context.repairPage.length, '.repair_system');
            showPage(1, context.repairPage.length, '.repair_system');
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
          } else if(response.request.name === 'repair') {
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
  let system2show = {'property_system': 'property_system', 'property_manage': 'manage_system',
                      'property_repair': 'repair_system'};
  $propertyContainer.find('#sub_menu').tabs();
  $propertyContainer.find('#sub_menu li').on('click', function(event) {
    var id = $(this).attr('id');
    $.each(system2show, function(key, value) {
      $propertyContainer.find('.' + value).css('display', key === id ? 'block' : 'none');
    });
  });

  searchData(propertyData, loanData);
  showPropertyDetailAndDeleteProperty();
  createProperty();
  loanProperty(propertyData);
  returnProperty(loanData);
  repairProperty();
  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'none');
    $propertyContainer.find('.modal').fadeOut();
  });
}

function searchData(propertyData, loanData) {
  var $propertyContainer = $('#property_container');
  $propertyContainer.find('#search_property_btn').on('click', function() {
    searching(propertyData, $propertyContainer.find('#search_property').val(),
              '#property_system_content .propertyContent', ['name', 'code'], '.property_system');
  });

  $propertyContainer.find('#search_loanData_btn').on('click', function() {
    searching(loanData, $propertyContainer.find('#search_loanData').val(),
        '#property_manage_content .propertyContent', ['property_name', 'code', 'username'], '.manage_system');
  });
}

function showPropertyDetailAndDeleteProperty() {
  var $propertyContainer = $('#property_container');
  var $propertyModal = $('#property_modal');
  $propertyContainer.find('#property_system_content #property_content .modal-trigger').on('click', function(event) {
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
  $propertyContainer.find('#property_manage_content .returnLoanModalTrigger').on('click', function(event) {
    let statusName = {'canceled': '使用者已取消借用該財產', 'finished': '使用者已歸還該財產',
      'refused': '管理者已取消借用該財產'};
    var ele = $(this).parent().parent();
    showPropertyDetailFunction(ele, statusName, $returnPropertyModal);
    $returnPropertyModal.data('loan_id', ele.data('loan_id'));
  });
  var $repairPropertyModal = $('#repair_property_modal');
  $propertyContainer.find('#property_repair_content .repairModalTrigger').on('click', function(event) {
    let statusName = {'finished': '已報修/清理'};
    var ele = $(this).parent().parent();
    showPropertyDetailFunction(ele, statusName, $repairPropertyModal);
    $repairPropertyModal.data('repair_id', ele.data('repair_id'));
  });
}

function createProperty() {
  var $propertyContainer = $('#property_container');
  var $createPropertyModal = $('#create_property_modal');
  $propertyContainer.find('#property_system_content #create_property').on('click', function(event) {
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
  var $loanPropertyMD = $('#loan_property_modal');
  var propertyIdContent = [];
  $propertyContainer.find('#property_system_content #loan_property').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'block');
    $loanPropertyMD.fadeIn();
    $loanPropertyMD.find('#loan_property_content div').remove('.remove');
    $loanPropertyMD.find('#loan_username').val('').focus();
    $loanPropertyMD.find('#loan_property_code').val('');
    propertyIdContent = [];
  });

  $propertyContainer.find('#loan_property_modal #loan_username').on('keyup', function(event) {
    $loanPropertyMD.find('#loan_property_code').focus();
  });
  $propertyContainer.find('#loan_property_modal #loan_property_code').on('keyup', function(event) {
    var code = $(this).val();
    var property;
    if(property = propertyData.find((data) => data.code === code)) {
      loanNreturnAppend($loanPropertyMD, '#loan_property_content', code, property.name, propertyIdContent, property.id);
      $(this).val('');
    }
  });

  $propertyContainer.find('#loan_property_btn').on('click', function(event) {
    var username = $loanPropertyMD.find('#loan_username').val();
    today = yyyy + '/' + mm + '/' + dd;

    if(!username) {
      alert('請確實填寫借用表單！');
      return;
    }

    var propertyID;
    var swit = 0;
    while(propertyID = propertyIdContent.pop()) {
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
      }).then(function(response) {
      }).catch(function(response) {
        alert('借用財產失敗!');
        console.log('loan property error, ', response);
        swit = 1;
      });
    }
    if(!swit) {
      alert('借用財產成功!');
    }
  });
}

function returnProperty(loanData) {
  var $propertyContainer = $('#property_container');
  var $returnPropertyModal = $('#return_property_modal');
  var $totalReturnPropertyModal = $('#total_return_property_modal');
  $propertyContainer.find('#return_property_modal #return_property_btn').on('click', function(event) {
    var loanID = $returnPropertyModal.data('loan_id');
    var swit = 1;
    returnPropertyAjax(loanID, swit);
    if(swit) {
      alert('歸還財產成功!');
      location.reload();
    } else {
      alert('歸還財產失敗!');
    }
  });

  var loanIdContent = [];
  $propertyContainer.find('#property_system_content #return_property').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'block');
    $totalReturnPropertyModal.fadeIn();
    $totalReturnPropertyModal.find('#total_return_property_content div').remove('.remove');
    $totalReturnPropertyModal.find('#total_return_username').val('').focus();
    $totalReturnPropertyModal.find('#total_return_property_code').val('');
    loanIdContent = [];
  });
  $totalReturnPropertyModal.find('#total_return_username').on('keyup', function(event) {
    $totalReturnPropertyModal.find('#total_return_property_code').focus();
  });
  $totalReturnPropertyModal.find('#total_return_property_code').on('keyup', function(event) {
    var code = $(this).val();
    var username = $totalReturnPropertyModal.find('#total_return_username').val();
    var loan;
    if(loan = loanData.find((data) => (data.code === code && data.user.username === username &&
                              (data.status.name === 'accepted' || data.status.name === 'submitted')))) {
      loanNreturnAppend($totalReturnPropertyModal, '#total_return_property_content', code,
                        loan.property_name, loanIdContent, loan.id);
      $(this).val('');
    }
  });

  $propertyContainer.find('#total_return_property_modal #total_return_property_btn').on('click', function(event) {
    var swit = 1;
    var loanID;
    while(loanID = loanIdContent.pop()) {
      returnPropertyAjax(loanID, swit);
    }

    if(swit) {
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
    error: function(error) {
      console.log('return property error, ', error);
      swit = 0;
    },
    success: function(data) {
      console.log('return property success!', data);
      if(data.status !== 0) {
        swit = 0;
      }
    }
  });
}

function repairProperty() {
  var $propertyContainer = $('#property_container');
  var $repairPropertyModal = $('#repair_property_modal');

  $propertyContainer.find('#repair_property_modal #repair_property_btn').on('click', function(event) {
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
      error: function(error) {
        alert('報修/清理完成財產失敗!');
        console.log('repair property error, ', error);
      },
      success: function(data) {
        console.log('repair property success!', data);
        alert('報修/清理財產成功!');
        console.log(data);
        location.reload();
      }
    });
  });
  $propertyContainer.find('#repair_property_modal #repair_property_printer_btn').on('click', function(event) {
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

function searching(data, target, searchWho, searchColumn, showWho) {
  var $propertyContainer = $('#property_container');
  var limit;
  $propertyContainer.find(searchWho).removeClass('searched');
  if(target !== '') {
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
  for(let i = 0; i < Data.length; i++) {
    for(let j = 0; j < searchColumn.length; j++) {
      if(Data[i][searchColumn[j]].indexOf(target) != -1) {
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
  modal.find('#loanOtherAction').html(statusName[status])
      .addClass('hide').removeClass(!statusName[status] || 'hide');
  modal.find('#return_property_btn').addClass('hide').removeClass(statusName[status] || 'hide');

  let htmlData = {'.userName': ele.data('user_nickname'), '.userID': ele.data('username'),
    '.phone': ele.data('phone'), '.email': ele.data('email'), '.propertyName': ele.data('name'),
    '.time': ele.data('time'), '.remark': ele.data('remark')
  };
  $.each(htmlData, function(key, value) {
    modal.find(key).html(value);
  });
}

function loanNreturnAppend(modal, who, code, name, arr, id) {
  modal.find(who).find('.property_code').html(code).removeClass('property_code').parent().addClass('remove');
  modal.find(who).find('.property_name').html(name).removeClass('property_name');
  var data = '<div class="row"><h5 class="property_code col offset-s1"></h5>' +
      '<h5 class="property_name col offset-s6"></h5></div>';
  modal.find(who).append(data);
  arr.push(id);
}

function genPage(limit) {
  var page = [];
  for(let i = 0; i < limit; i++) {
    page.push({});
    page[i].classes = '';
    if(i === 0) {
      page[i].classes = 'active';
    }
    page[i].pageNum = (i + 1);
  }
  return page;
}
