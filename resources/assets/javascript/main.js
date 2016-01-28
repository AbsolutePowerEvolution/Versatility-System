require('babel-polyfill');
require('materialize-css/dist/js/materialize');
var Sammy = require('sammy');
var Vue = require('vue');
require('sammy/lib/plugins/sammy.hogan.js');
require('./lib/validate');

Vue.use(require('vue-resource'));

require('./routes');

Sammy('#main').use('Hogan', 'ms').run('#/');
