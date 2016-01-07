/*jshint expr: true*/
var sinon = require('sinon');
var jsdom = require('mocha-jsdom');
var requireSub = require('require-subvert')(__dirname);

describe('#/user/signin', () => {
  var sandbox;
  var app;

  jsdom({
    html: '<!doctype html><html><head><meta charset="utf-8"></head>' +
    '<body><div id="main"></div></body></html',
    url: 'http://example.com/',
    scripts: [
      'https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js',
    ]
  });

  beforeEach((done) => {
    sandbox = sinon.sandbox.create();
    sandbox.useFakeTimers();
    require('sammy');
    requireSub.subvert('sammy', window.Ssammy);
    require('../signin');
    app = window.Sammy('#main');
    done();
  });

  afterEach((done) => {
    sandbox.restore();
    done();
  });

  it('does define sigin route', () => {
    expect(app.lookupRoute('get', '#/user/signin')).to.be.ok;
    expect(app.lookupRoute('post', '#/user/signin')).to.be.ok;
  });
});
