require('babel-polyfill');
require('materialize-css/dist/js/materialize');
var Sammy = require('sammy');
require('sammy/lib/plugins/sammy.hogan.js');
require('./lib/validate');

require('./routes');

Sammy('#main').use('Hogan', 'ms').run('#/');
