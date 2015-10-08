(function() {
  'use strict';

  angular.module('TheBestSvc', [])
    .factory('TheBestSvc', TheBestSvc);

  function TheBestSvc($http) {

    var api = 'http://52.88.14.176:10001';

    return {
      getSuggestionForQuestion: getSuggestionForQuestion,
      getSuggestionForAnswer: getSuggestionForAnswer,
      getBestAnswer: getBestAnswer,
      getQuestion: getQuestion
    };

    ////

    function getSuggestionForQuestion(text) {
      var url = api + '/api/suggestions/question?text=' + text;
      return $http.get(url);
    }

    function getSuggestionForAnswer(question, text) {
      var url = api + '/api/suggestions/answer?q=' + question + '&text=' + text;
      return $http.get(url);
    }

    function getQuestion(usrQuestion) {
      //todo: avoid asking the user the same question the user is asking...
      var url = api + '/api/user_question';
      return $http.get(url);
    }

    function getBestAnswer(question) {
      var url = api + '/api/best_answer?q=' + question;
      return $http.get(url);
    }
  }
}());
