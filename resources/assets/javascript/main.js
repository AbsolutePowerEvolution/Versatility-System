require('babel-polyfill');
require('materialize-css/dist/js/materialize');
var Sammy = require('sammy');
require('sammy/lib/plugins/sammy.mustache.js');

require('./routes');

Sammy('#main').run('#/');
