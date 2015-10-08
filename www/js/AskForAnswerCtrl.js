(function() {
  'use strict';

  angular
    .module('AskForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForAnswerCtrl', AskForAnswerCtrl);

  function AskForAnswerCtrl($state, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.question = "";

    vm.onChange = function() {
      TheBestSvc.getSuggestionForAnswer(vm.searchText).then(success, fail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
      //vm.search.$valid = true;
      //vm.submit();
    };

    activate();

    ////

    function activate($state) {
      var question = UserDataSvc.get("app.askForAnswer:question");
      vm.title = "Please answer this while we get you to the best " + question;

      TheBestSvc.getQuestion(question)
        .then(getQuestionSuccess, getQuestionFail);
    }

    function getQuestionSuccess(res) {
      vm.question = res.data.item;
    }

    function getQuestionFail() {
      console.log("fail", res);
    }

    function success(res) {
      console.log("success", res);
      vm.items = res.data.suggestions;
    }

    function fail() {
      console.log("fail");
      vm.suggestions = {"suggestions": [{"text": "ERROR"}]};
    }


  }

}());

