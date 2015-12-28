var Sammy = require('sammy');

Sammy('#main', function() {
  this.use('Mustache', 'ms');

  this.get('#/user/loan', function(context) {
    context.loadPartial({menu: '/templates/user/menu.ms'})
      .partial('/templates/user/loan.ms')
      .then(function() {
        var picker = new Pikaday({
          field: document.getElementById('datepicker'),
          bound: false,
          container: document.getElementById('datepicker_container'),
          format: 'YYYY-MM-DD'
        });

        loanDataEvent();
      });
  });
});

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

function loanDataEvent() {
  $('#datepicker').unbind('change');
  $('#datepicker').change(function() {
    var request = {};
    request.date = $(this).val();
    console.log(request.date);

    $.get('/api/user/property/classrooms', request, function(result) {
      var i;
      var j;

      console.log(result);
      for(i = 0; i < result.length; i++) {
        for(j = 0; j < result[i]['loan_classroom'].length; j++) {
          console.log(result[i]['loan_classroom'][j]);
        }
      }
    });
  });

  $('#loan_classroom').unbind('click');
  $('#loan_classroom').click(function() {
    var request = {};

    $.post('/api/user/loan/create', request, function(result) {
      console.log(result);
    });
  });
}

