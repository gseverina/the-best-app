(function() {
  'use strict';

  angular.module('TheBestSvc', [])
    .factory('TheBestSvc', TheBestSvc);

  function TheBestSvc($http) {

    var api = 'http://52.88.14.176:10001';

    return {
      getAll: getAll,
      get: get,
      getAnswer: getAnswer
    };

    ////

    function getAll() {
      var url = api + '/api/suggestions/question?text=';
      return $http.get(url);
    }

    function get(text) {
      var url = api + '/api/suggestions/question?text=' + text;
      return $http.get(url);
    }

    function getAnswer(question) {
      var url = api + ' /api/best_answer?q=' + question;
      return $http.get(url);
    }
  }
}());
