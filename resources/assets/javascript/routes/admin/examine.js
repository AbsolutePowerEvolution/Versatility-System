var $ = require('jquery');
var Sammy = require('sammy');
var client = require('../../lib/client');
var api = require('../../lib/fetch-plus');

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/admin/examine', (context) => {
    client({
      path: 'manager/loan/classrooms',
      params: {page: context.params.page}
    }).entity()
      .then((data) => {
        let currentPage = data.current_page;
        console.log(data);
        context.prevUrl = `#/admin/examine?page=${currentPage - 1}`;
        context.nextUrl = `#/admin/examine?page=${currentPage + 1}`;
        if(data.current_page === 1) {
          context.disablePrev = true;
        }
        if(!data.next_page_url) {
          context.disableNext = true;
        }
        context.list = data.data.map((item) => {
          item.time = `${item.date_began_at}~${item.date_ended_at}`;
          return item;
        });
        context.loadPartials({menu: '/templates/menu.ms'})
          .partial('/templates/admin/examine.ms')
          .then(() => {
            var sendVerifyRequest = (id, type) => {
              api.replace(`manager/loan/class-verify/${id}`, {
                body: $.param({
                  status: type
                })
              })
              .then((response) => {
                console.log('Success', response);
              })
              .catch((response) => {
                console.log('Fail', response);
              });
            };

            var sendRefuseVerify = (id) => {
              sendVerifyRequest(id, 'refused');
            };

            var sendAcceptVerify = (id) => {
              sendVerifyRequest(id, 'accepted');
            };

            // Content has been render
            $('.Examine-Item').each((idx, ele) => {
              var item = $(ele);
              var id = item.data('id');

              // Initialize tooltip
              $('.tooltipped').tooltip({
                delay: 50,
                position: 'buttom'
              });

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
                console.log(`Examine pass id: ${id}`);
                sendAcceptVerify(id);
              });

              item.on('examine-reject', (event, id) => {
                console.log(`Examine reject id: ${id}`);
                sendRefuseVerify(id);
              });
            });
          });
      })
      .catch((response) => {
        console.log(response);
      });
  });
});

