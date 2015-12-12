require('materialize-css/dist/js/materialize');
var Sammy = require('sammy');

require('./routes');

Sammy('#root').run('#/');
