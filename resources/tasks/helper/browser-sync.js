/**
 * Helper for BrowserSync
 *
 * @author DanSnow
 */
var browserSync = require('browser-sync');
var once = require('once');

/**
 * Singleton class for BrowserSync
 *
 * It will just initialize BrowserSync once.
 * And delegate `init`, `stream`, and `reload` method.
 */

var BrowserSync = (function() {
  var instance = null;
  var methods = ['init', 'stream', 'reload'];
  var init = once(function() { // Init instance exactly once
    instance = browserSync.create();
  });

  /**
   * Create delegater for object
   *
   * This is a helper function to create delegater.
   * And it will call hook before pass function call.
   *
   * @param {Object} obj instance to pass the method.
   * @param {Function} methods delegate methods
   */
  var createDelegater = function(obj, methods) {
    var delegater = {};
    // Iterate the methods
    Array.prototype.forEach.call(methods, function(method) {
      delegater[method] = function() { // Define delgate function
        obj[method].apply(obj, arguments); // Pass to origin object
      };
      return delegater;
    });
    return delegater;
  };

  // Create delegator for BrowserSync instance
  init();
  return createDelegater(instance, methods);
}());

module.exports = BrowserSync;
