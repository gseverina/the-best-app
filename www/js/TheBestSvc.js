(function() {
  'use strict';

  angular.module('TheBestSvc', [])
    .factory('TheBestSvc', TheBestSvc);

  function TheBestSvc($http) {

    var api = 'http://52.88.14.176:10001/api/';

    return {
      getSuggestionForQuestion: getSuggestionForQuestion,
      getSuggestionForAnswer: getSuggestionForAnswer,
      getBestAnswer: getBestAnswer,
      postNewQuestion: postNewQuestion,
      getSystemQuestion: getSystemQuestion,
      postUserAnswer: postUserAnswer,
      vote: vote
    };

    ////

    function getSuggestionForQuestion(text) {
      //ex: http://52.88.14.176:10001/api/suggestions?type=q&text=h
      var url = api + 'suggestions?type=q&text=' + text;
      return $http.get(url);
    }

    function getSuggestionForAnswer(question, text) {
      var url = api + 'suggestions?type=a&q=' + question + '&text=' + text;
      return $http.get(url);
    }

    function getBestAnswer(question) {
      var url = api + 'best_answer?q=' + question;
      return $http.get(url);
    }

    function postNewQuestion(newQuestion) {
      var url = api + 'question';
      var data = '{"q": "' + newQuestion + '"}';

      return $http.post(url, data);
    }

    function getSystemQuestion() {
      var url = api + 'system_question';
      return $http.get(url);

    }

    function postUserAnswer(q, a) {
      var url = api + 'user_answer';
      var data = '{"q": "' + q + '", "a": "' + a + '"}';

      return $http.post(url, data);
    }

    function vote(q, a) {
      var url = api + 'vote';
      var data = '{"q": "' + q + '", "a": ' + a + '}';

      return $http.post(url, data);
    }

  }
})();
