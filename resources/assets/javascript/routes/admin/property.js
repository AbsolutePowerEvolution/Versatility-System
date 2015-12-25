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
    }).catch((response) => console.log(response));
  });
});

function propertyBindEvent(propertyData) {
  var $propertyContainer = $('#property_container');
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
      $propertyContainer.find('#property_system_content .propertyContent').addClass('searched');
    }
    showPage(1, Math.ceil(limit / 5));
    propertyPageEvent(Math.ceil(limit / 5));
  });
}

function propertyPageEvent(limit) {
  var $propertyContainer = $('#property_container');
  console.log('--propertyPageEvent limit:', limit);
  var nowPage = 1;
  $propertyContainer.find('.page').unbind('click').on('click', function(event) {
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
    console.log('propertyPageEvent limit:', limit);
    showPage(nowPage, limit);
  });
}

function showPage(page, limit) {
  console.log('showPage limit:', limit);
  var $propertyContainer = $('#property_container');
  $propertyContainer.find('#property_system_content .propertyContent').removeClass('block').addClass('hide');
  var show = '#property_system_content .propertyContent.searched';
  $propertyContainer.find(show).each(function(idx) {
    if(((page - 1) * 5) <= idx  && idx < (page * 5)) {
      $(this).removeClass('hide').addClass('block');
    } else if(idx >= page * 5) {
      return false;
    }
  });

  $propertyContainer.find('.pagination li').removeClass('inline-block').addClass('hide');
  $propertyContainer.find('.pagination li').each(function(idx) {
    if(idx <= limit) {
      $(this).removeClass('hide').addClass('inline-block');
    } else {
      return false;
    }
  });
  $propertyContainer.find('.pagination li:last-child').removeClass('hide').addClass('inline-block');
}
