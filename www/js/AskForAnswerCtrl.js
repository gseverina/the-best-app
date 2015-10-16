(function() {
  'use strict';

  angular
    .module('AskForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForAnswerCtrl', AskForAnswerCtrl);

  function AskForAnswerCtrl($state, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.question = "";

    vm.onChange = function() {
      TheBestSvc.getSuggestionForAnswer(vm.question, vm.searchText).then(success, fail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
      //vm.search.$valid = true;
      //vm.submit();
    };

    activate();

    ////

    function activate() {
      vm.question = UserDataSvc.get("app.askForAnswer:question");
      if(!vm.question) {
        $state.go('app.main');
      }
      vm.title = "Please answer this while we get you to the best " + vm.question;

      TheBestSvc.getQuestion(vm.question)
        .then(getQuestionSuccess, getQuestionFail);
    }

    function getQuestionSuccess(res) {
      vm.user_question = "What is the best " + res.data.items[0].q + " ?";
    }

    function getQuestionFail(res) {
      console.log("Get Question Fail:", res);
    }

    function success(res) {
      console.log("success:", res);
      vm.items = res.data.suggestions;
    }

    function fail(res) {
      console.log("Get Suggestion Fail:", res);
      //vm.suggestions = {"suggestions": [{"text": "ERROR"}]};
    }


  }

}());

