var $ = require('jquery');
var Sammy = require('sammy');
var api = require('../../lib/fetch-plus');
var paginate = require('../../lib/paginate');

Sammy('#main', function() {
  this.get('#/admin/examine', (context) => {
    api.browse('manager/loan/classrooms', {
      params: {page: context.params.page}
    }).then((data) => {
      var pageEffect = paginate(context, data, '#/admin/examine');
      context.list = data.data.map((item) => {
        item.time = `${item.date_began_at}~${item.date_ended_at}`;
        return item;
      });
      context.loadPartials({
        menu: '/templates/admin/menu.ms',
        pagination: '/templates/pagination.ms'
      }).partial('/templates/admin/examine.ms')
        .then(() => {
          // Content has been render

          pageEffect();

          // Initialize tooltip
          $('.tooltipped').tooltip({
            delay: 50,
            position: 'buttom'
          });
          $('.collapsible').collapsible({accordion: true});

          $('.Examine-Item').each((idx, ele) => {
            var item = $(ele);
            var id = item.data('id');
            bindEvent(id, item);
          });
        });
    })
    .catch((response) => {
      console.log(response);
    });
  });
});

var bindEvent = (id, item) => {
  // Re-trigger event for click
  item.find('.Examine-Pass')
    .click((event) => {
      event.preventDefault();
      item.trigger('examine-pass', id);
    });
  item.find('.Examine-Reject')
    .click((event) => {
      event.preventDefault();
      item.trigger('examine-reject', id);
    });

  // Deal custom event
  item.on('examine-pass', (event, id) => {
    sendAcceptVerify(id);
  });

  item.on('examine-reject', (event, id) => {
    sendRefuseVerify(id);
  });
};

var sendRefuseVerify = (id) => {
  sendVerifyRequest(id, 'refused');
};

var sendAcceptVerify = (id) => {
  sendVerifyRequest(id, 'accepted');
};

var sendVerifyRequest = (id, type) => {
  api.replace(`manager/loan/class-verify/${id}`, {
    body: $.param({
      status: type
    })
  })
  .then((response) => {
    Materialize.toast('更新成功');
  })
  .catch((response) => {
    console.log('Fail', response);
    Materialize.toast('更新失敗');
  });
};
