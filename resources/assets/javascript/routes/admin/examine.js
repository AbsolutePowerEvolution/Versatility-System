var Sammy = require('sammy');
var client = require('../../lib/client');

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/admin/examine', function(context) {
    client({path: 'manager/loan/classrooms'})
      .then((response) => console.log(response))
      .catch((response) => console.log(response));
    context.list = [{
      id: 1,
      username: 'foo',
      propertyName: 'class1',
      time: '12:00'
    }, {
      id: 2,
      username: 'bar',
      propertyName: 'class2',
      time: '10:00'
    }];

    context.partial('/templates/admin/examine.ms').then(() => {
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
  });
});

