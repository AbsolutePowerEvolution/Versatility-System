var Sammy = require('sammy');
var client = require('../../lib/client');

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/admin/examine', function(context) {
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
        context
          .partial('/templates/admin/examine.ms')
          .then(() => {
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
              item.find('.Examine-Detail')
                .click(() => item.trigger('examine-detail', id));

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
              item.on('examine-detail', (event, id) => {
                console.log(`Show detail for id: ${id}`);
              });

              item.on('examine-pass', (event, id) => {
                console.log(`Examine pass id: ${id}`);
              });

              item.on('examine-reject', (event, id) => {
                console.log(`Examine reject id: ${id}`);
              });
            });
          });
      })
      .catch((response) => {
        console.log(response);
      });
  });
});

