(function() {
  'use strict';

  angular
    .module('AskForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForAnswerCtrl', AskForAnswerCtrl);

  function AskForAnswerCtrl($state, $ionicLoading, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.question = "";
    vm.sys_q = "";

    vm.onChange = function() {
      TheBestSvc.getSuggestionForAnswer(vm.sys_q, vm.searchText)
        .then(getSuggestionForAnswerSuccess, getSuggestionForAnswerFail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
    };

    vm.submit = function() {
      TheBestSvc.postUserAnswer(vm.sys_q, vm.searchText)
        .then(postUserAnswerSuccess, postUserAnswerFail);
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
      vm.sys_q = res.data.q;
      vm.system_question = "What is the best " + vm.sys_q + " ?";
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

    function postUserAnswerSuccess(res) {
      console.log("Post USer Answer Success:", res);
      $state.go('app.thanksForAnswer');
    }

    function postUserAnswerFail(res) {
      console.log("Post User Answer Fail:", res);
    }
  }

})();
