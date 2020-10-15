/*
Instructions:
(1) Wrap an XHR in a Promise in the get() function below. See: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
  (a) Resolve on load and reject on error.
(2) If the XHR resolves, use addSearchHeader to add the search header to the page.
(3) If the XHR fails, console.log the error and pass 'unknown' to addSearchHeader
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function(document) {
  'use strict';

  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} response - The unparsed JSON response from get.
   */
  function addSearchHeader(response) {
    // try {
    //   response = JSON.parse(response).query;  // you'll be moving this line out of here in the next quiz!
    // } catch (e) {
    //   // it's 'unknown', so leave it alone
    // }
    home.innerHTML = '<h2 class="page-title">query: ' + response + '</h2>';
  }

  /**
   * XHR wrapped in a promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    /*
    This code needs to get wrapped in a Promise!
     */
    // return new Promise(function(resolve,reject){
    //   var req = new XMLHttpRequest();
    //   req.open('GET', url);
    //   req.onload = function() {
    //     if (req.status === 200) {
    //       // It worked!
    //       resolve(req.response);
    //     } else {
    //       // It failed :(
    //       // Be nice and reject with req.statusText
    //       reject(req.statusText);
    //     }
    //   };
    //   req.onerror = function() {
    //     // It failed :(
    //     // Pass a 'Network Error' to reject
    //     reject('Network Error');
    //   };
    //   req.send();
    // });
    return fetch(url);
  }

  function getJson(url){
    return get(url).then(function(response){
      return response.json();
    })
  }

  window.addEventListener('WebComponentsReady', function() {
    home = document.querySelector('section[data-route="home"]');
    /*
    Uncomment the next line you're ready to start chaining and testing!
    You'll need to add a .then and a .catch. Pass the response to addSearchHeader on resolve or
    pass 'unknown' to addSearchHeader if it rejects.
     */
    //http://udacity.github.io/exoplanet-explorer/site/app
    getJson('../data/earth-like-results.json').then(function(response){
      console.log(response);
      addSearchHeader(response.query);
      return response.results[0];
    })
    .then(function(url){
      console.log(url);
    })
    .catch(function(error){
      addSearchHeader('unknown');
      console.log(error);
    });
  });
})(document);
