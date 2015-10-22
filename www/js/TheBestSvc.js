(function() {
  'use strict';

  angular.module('TheBestSvc', [])
    .factory('TheBestSvc', TheBestSvc);

  function TheBestSvc($http) {
    var api = 'http://52.89.226.76:10001/api/';

    return {
      getSuggestionForQuestion: getSuggestionForQuestion,
      getSuggestionForAnswer: getSuggestionForAnswer,
      getSystemSuggestionsForQuestions: getSystemSuggestionsForQuestions,
      getBestAnswer: getBestAnswer,
      postNewQuestion: postNewQuestion,
      getSystemQuestion: getSystemQuestion,
      postUserAnswer: postUserAnswer,
      postAction: postAction
    };

    ////

    function getSuggestionForQuestion(text) {
      var url = api + 'suggestions?type=q&text=' + text;
      return $http.get(url);
    }

    function getSuggestionForAnswer(question, text) {
      var url = api + 'suggestions?type=a&q=' + question + '&text=' + text;
      return $http.get(url);
    }

    function getSystemSuggestionsForQuestions() {
      var url = api + 'suggestions?type=sysq';
      return $http.get(url);
    }

    function getBestAnswer(user_question) {
      var url = api + 'best_answer?q=' + user_question;
      return $http.get(url);
    }

    function postNewQuestion(newQuestion) {
      var url = api + 'question';
      var data = '{"q": "' + newQuestion + '"}';

      return $http.post(url, data);
    }

    function getSystemQuestion(user_question) {
      var url = api + 'system_question?q=' + user_question;
      return $http.get(url);

    }

    function postUserAnswer(q, a) {
      var url = api + 'user_answer';
      var data = '{"q": "' + q + '", "a": "' + a + '"}';

      return $http.post(url, data);
    }

    function postAction(t, q, a) {
      var url = api + 'action';
      var data = '{"type": "' + t + '", "q": "' + q + '", "a": "' + a + '"}';

      return $http.post(url, data);
    }

  }
})();
