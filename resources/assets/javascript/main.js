require('babel-polyfill');
require('materialize-css/dist/js/materialize');
var Sammy = require('sammy');
var Vue = require('vue');
require('sammy/lib/plugins/sammy.hogan.js');
require('./lib/validate');

Vue.use(require('vue-resource'));

// Global vue config
Vue.config.debug = true;

// Http config
let token = $('#csrf-token').attr('content');
Vue.http.options.root = '/api';
Vue.http.headers.common['X-CSRF-TOKEN'] = token;
Vue.http.options.emulateJSON = true;

require('./routes');

Sammy('#main').use('Hogan', 'ms').run('#/');
