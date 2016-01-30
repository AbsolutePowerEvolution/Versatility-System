/**
 * Helper for BrowserSync
 *
 * @author DanSnow
 */
import browserSync from 'browser-sync';
import once from 'once';

/**
 * Singleton class for BrowserSync
 *
 * It will just initialize BrowserSync once.
 * And delegate `init`, `stream`, and `reload` method.
 */

let BrowserSync = (() => {
  let instance = null;
  let methods = ['init', 'stream', 'reload', 'stream'];
  let init = once(() => { // Init instance exactly once
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
  let createDelegater = function(obj, methods) {
    let delegater = {};
    // Iterate the methods
    Array.prototype.forEach.call(methods, function(method) {
      delegater[method] = function() { // Define delgate function
        obj[method].apply(obj, arguments); // Pass to origin object
      };
    });
    return delegater;
  };

  // Create delegator for BrowserSync instance
  init();
  return createDelegater(instance, methods);
})();

export default BrowserSync;
