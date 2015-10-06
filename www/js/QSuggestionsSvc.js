(function() {
  'use strict';

  angular.module('QSuggestionsSvc', [])
    .factory('QSuggestionsSvc', QSuggestionsSvc);

  //QSuggestions.$inject['$http'];

  function QSuggestionsSvc($http) {

    return {
      getAll: getAll,
      get: get
    };

    ////

    function getAll() {
      return $http.get('http://52.88.14.176:10001/api/suggestions/question?text=');
    }

    function get(text) {
      return $http.get('http://52.88.14.176:10001/api/suggestions/question?text=' + text);
    }
  }
}());
