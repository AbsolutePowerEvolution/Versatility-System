var Sammy = require('sammy');
var client = require('../../lib/client');
require('sammy/lib/plugins/sammy.mustache.js');

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
  this.get('#/admin/property', function(context) {
    console.log('admin property');
    client({
      path: 'manager/property/others',
      method: 'GET',
      params: {
        page: 1,
        length: 10000
      }
    }).then(function(response) {
      context.propertyData = response.entity.data.map((item) => {
        item.status.color = (item.status.id == 3 ? 'teal' : (item.status.id == 4 ? 'red' : 'blue'));
        return item;
      });
      console.log(context.propertyData);

      context.page = [];
      var i;
      for(i = 0; i < Math.ceil(response.entity.total / 5); i++) {
        context.page[i] = [];
        context.page[i].classes = '';
        if(i == 0) {
          context.page[i].classes = 'active';
        }
        context.page[i].pageNum = (i + 1);
      }

      context.partial('/templates/admin/property.ms').then(function() {
        propertyBindEvent(context.propertyData);
        propertyPageEvent(context.page.length);
        showPage(1, context.page.length);
      });
    }).catch(function(response) {
      alert('取得財產列表失敗!');
      console.log('get property list error, ', response);
    });
  });
});

function propertyBindEvent(propertyData) {
  var $propertyContainer = $('#property_container');
  //Material initialize
  $propertyContainer.find('select').material_select();
  $propertyContainer.find('.datepicker').pickadate({
    selectMonths: true,
    selectYears: 15,
    format: 'yyyy-mm-dd'
  });
  $propertyContainer.find('#property_system').on('click', function(event) {
    $propertyContainer.find('#property_system').addClass('purple darken-4').css('color', 'white');
    $propertyContainer.find('#property_manage').removeClass('purple darken-4').addClass('white').css('color', 'black');
    $propertyContainer.find('.property_system').css('display', 'block');
    $propertyContainer.find('#property_manage_content').css('display', 'none');
  });
  $propertyContainer.find('#property_manage').on('click', function(event) {
    $propertyContainer.find('#property_system').removeClass('purple darken-4').addClass('white').css('color', 'black');
    $propertyContainer.find('#property_manage').addClass('purple darken-4').css('color', 'white');
    $propertyContainer.find('.property_system').css('display', 'none');
    $propertyContainer.find('#property_manage_content').css('display', 'block');
  });

  $propertyContainer.find('#search_property_btn').on('click', function() {
    var i;
    var limit;
    var target = $propertyContainer.find('#search_property').val();
    $propertyContainer.find('#property_system_content .propertyContent').removeClass('searched');
    if(target !== '') {
      for(i = 0, limit = 0; i < propertyData.length; i++) {
        if(propertyData[i].name.indexOf(target) != -1) {
          limit++;
          var tag = '#property_system_content .propertyContent:nth-child(' + (i + 2) + ')';
          $propertyContainer.find(tag).addClass('searched');
        }
      }
    } else {
      limit = propertyData.length;
      $propertyContainer.find('#property_system_content .propertyContent').addClass('searched');
    }
    showPage(1, Math.ceil(limit / 5));
    propertyPageEvent(Math.ceil(limit / 5));
  });
  showPropertyDeailAndDeleteProperty();
  createProperty();
  loanProperty(propertyData);
  $propertyContainer.find('.modal-close, #materialize-lean-overlay-30').on('click', function(event) {
    $('#materialize-lean-overlay-30').css('display', 'none');
    $('#property_modal').fadeOut();
    $('#create_property_modal').fadeOut();
    $('#loan_property_modal').fadeOut();
  });
}

function showPropertyDeailAndDeleteProperty() {
  var $propertyContainer = $('#property_container');
  var $propertyModal = $('#property_modal');
  $propertyContainer.find('#property_system_content .modal-trigger').on('click', function(event) {
    if($(this).hasClass('disabled')) { return; }

    $('#materialize-lean-overlay-30').css('display', 'block');
    $propertyModal.fadeIn();

    var ele = $(this).parent().parent();
    $propertyModal.find('.modal-content h4').html(ele.data('name'));
    $propertyModal.find('p').html(ele.data('describe'));
    $propertyModal.data('propertyid', ele.data('propertyid'));
  });
  $propertyContainer.find('#property_modal #delete_property_btn').on('click', function() {
    var propertyID = $propertyModal.data('propertyid');
    $.ajax({
      url: '/api/manager/property/delete/' + propertyID,
      _method: 'delete',
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
    var property = propertyCode2propertyID(code, propertyData);
    $(this).parent().find('#loan_property_name').html(property.name);
  });
  $propertyContainer.find('#loan_property_btn').on('click', function(event) {
    var userID = $loanPropertyModal.find('#loan_user_id').val();
    var code = $loanPropertyModal.find('#loan_property_code').val();
    var dateBeganAt = $loanPropertyModal.find('#date_began_at').val();
    var dateEndedAt = $loanPropertyModal.find('#date_ended_at').val();
    var type = $loanPropertyModal.find('#loan_property_type').val();
    var remark = $loanPropertyModal.find('#loan_property_remark').val();

    if(!userID || !code || !dateBeganAt || !dateEndedAt || !type || !remark) {
      alert('請確實填寫借用表單！');
      return;
    }
    var property = propertyCode2propertyID(code, propertyData);
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
        remark: remark,
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

function propertyCode2propertyID(code, Data) {
  var i;
  var property = {};
  for(i = 0; i < Object.size(Data); i++) {
    if(Data[i].code === code) {
      property.id = Data[i].id;
      property.name = Data[i].name;
      break;
    }
  }
  return property;
}

function propertyPageEvent(limit) {
  var $propertyContainer = $('#property_container');
  var nowPage = 1;
  $propertyContainer.find('.page').unbind('click').on('click', function(event) {
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
    showPage(nowPage, limit);
  });
}

function showPage(page, limit) {
  var $propertyContainer = $('#property_container');
  $propertyContainer.find('#property_system_content .propertyContent').removeClass('block').addClass('hide');
  var i;
  for(i = 0; i < 5; i++) {
    var show = '#property_system_content .propertyContent.searched:eq(' + (((page - 1) * 5) + i) + ')';
    $propertyContainer.find(show).removeClass('hide').addClass('block');
  }

  $propertyContainer.find('.pagination li').removeClass('inline-block active').addClass('hide');
  $propertyContainer.find('.pagination li:eq(' + page + ')').addClass('active');
  $propertyContainer.find('.pagination li:lt(' + (limit + 1) + ')').removeClass('hide').addClass('inline-block');
  $propertyContainer.find('.pagination li:last-child').removeClass('hide').addClass('inline-block');
}
