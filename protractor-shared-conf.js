'use strict';

exports.config = {
  allScriptsTimeout: 11000,

  baseUrl: 'http://localhost:8000/build/docs/',

  framework: 'jasmine',

  onPrepare: function() {
    /* global angular: false, browser: false, jasmine: false */

    // Disable animations so e2e tests run more quickly
    var disableNgAnimate = function() {
      angular.module('disableNgAnimate', []).run(function($animate) {
        $animate.enabled(false);
      });
    };

    browser.addMockModule('disableNgAnimate', disableNgAnimate);

    // TODO(vojta): Remove once this is in Protractor.
    browser.addMockModule('enable-binding-info', function() {
      angular.module('enable-binding-info', [])
        .config(['$compileProvider', function($compileProvider) {
          $compileProvider.enableDebugInfo(true);
        }]);
    });

    // Store the name of the browser that's currently being used.
    browser.getCapabilities().then(function(caps) {
      browser.params.browser = caps.get('browserName');
    });
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 60000,
    showTiming: true
  }
};
