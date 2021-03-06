(function() {
  'use strict';

  angular.module('TheBestSvc', [])
    .factory('TheBestSvc', TheBestSvc);

  function TheBestSvc($http) {
    var api = 'http://52.89.226.76/api/v1/';

    return {
      getSuggestionForQuestion: getSuggestionForQuestion,
      getSuggestionForAnswer: getSuggestionForAnswer,
      getSystemSuggestionsForQuestions: getSystemSuggestionsForQuestions,
      getBestAnswer: getBestAnswer,
      postNewQuestion: postNewQuestion,
      getSystemQuestion: getSystemQuestion,
      postUserAnswer: postUserAnswer,
      postAction: postAction,
      postSession: postSession,
      urlShortener: urlShortener
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

    function getBestAnswer(user_question, limit) {
      if(typeof optionalArg === 'undefined') {
        limit = 1;
      }
      var url = api + 'best_answer?q=' + user_question + '&limit=' + limit;
      return $http.get(url);
    }

    function postNewQuestion(newQuestion) {
      var url = api + 'question';
      var data = '{"q": "' + newQuestion + '"}';

      return $http.post(url, data);
    }

    function getSystemQuestion(user_question, limit) {
      var url = api + 'system_question?q=' + user_question + '&limit=' + limit;
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

    function postSession(device_id) {
      var url = api + 'session';
      var data = '{"device_id": "' + device_id + '"}';

      return $http.post(url, data);
    }

    function urlShortener(long_url) {
      var url = api + 'urlshortener';
      var data = '{"longUrl": "' + long_url + '"}';

      return $http.post(url, data);
    }

  }
})();
