(function() {
  'use strict';

  angular.module('UserDataSvc', [])
    .service('UserDataSvc', UserDataSvc);

  function UserDataSvc() {

    var params = {};

    return {
      get: get,
      put: put
    };

    //////

    function put(id, data) {
      params[id] = data;
    }

    function get(id) {
      return params[id];
    }
  }
}());

