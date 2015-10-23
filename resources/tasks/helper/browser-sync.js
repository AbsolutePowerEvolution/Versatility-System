/**
 * Helper for BrowserSync
 *
 * @author DanSnow
 */
var browserSync = require('browser-sync');

/**
 * Singleton class for BrowserSync
 *
 * It will just initialize BrowserSync once.
 * And delegate `init`, `stream`, and `reload` method.
 */
var BrowserSync = (function(){
  var instance;
  var methods = ['init', 'stream', 'reload'];
  var init = function() { // Init instance exactly once
    if(!instance) {
      instance = browserSync.create();
    }
  };

  /**
   * Create delegater for object
   *
   * This is a helper function to create delegater.
   * And it will call hook before pass function call.
   * @param [Object] obj instance to pass the method.
   * @param [Array] methods delegate methods
   * @param [Function] hook hook before delegate
   */
  var createDelegater = function(obj, methods, hook) {
    var delegater = {};
    // Iterate the methods
    Array.prototype.forEach.call(methods, function(method) {
      delegater[method] = function() { // Define delgate function
        hook();
        obj[method].apply(obj, arguments); // Pass to origin object
      };
      return delegater;
    });
  };

  // Create delegator for BrowserSync instance
  return createDelegater(instance, methods, init);
}());

module.exports = BrowserSync;
