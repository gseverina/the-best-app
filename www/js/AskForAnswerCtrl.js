(function() {
  'use strict';

  angular
    .module('AskForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForAnswerCtrl', AskForAnswerCtrl);

  function AskForAnswerCtrl($state, $ionicLoading, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.question = "";

    vm.onChange = function() {
      TheBestSvc.getSuggestionForAnswer(vm.question, vm.searchText)
        .then(getSuggestionForAnswerSuccess, getSuggestionForAnswerFail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
    };

    activate();

    ////

    function activate() {
      vm.question = UserDataSvc.get("app.askForAnswer:question");
      if(!vm.question) {
        $state.go('app.main');
      }
      vm.title = "Please answer this while we get you to the best " + vm.question;

      TheBestSvc.getSystemQuestion()
        .then(getSystemQuestionSuccess, getSystemQuestionFail);
    }

    function getSystemQuestionSuccess(res) {
      vm.system_question = "What is the best " + res.data.items[0].q + " ?";
    }

    function getSystemQuestionFail(res) {
      console.log("Get System Question Fail:", res);
    }

    function getSuggestionForAnswerSuccess(res) {
      vm.items = res.data.suggestions;
    }

    function getSuggestionForAnswerFail(res) {
      console.log("Get Suggestion Fail:", res);
    }

  }

}());

