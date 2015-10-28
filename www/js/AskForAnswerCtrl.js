(function() {
  'use strict';

  angular
    .module('AskForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForAnswerCtrl', AskForAnswerCtrl);

  function AskForAnswerCtrl($state, $stateParams, $ionicLoading, $timeout, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.timerPromise;
    vm.items = [];
    vm.title = "";
    vm.title2 = "";
    vm.user_question = "";
    vm.system_question = "";
    vm.next_screen = "";
    vm.best_answers = [];

    vm.onChange = function() {
      if(vm.timerPromise) {
        $timeout.cancel(vm.timerPromise);
      }
      vm.timerPromise =
        $timeout(function() {
          TheBestSvc.getSuggestionForAnswer(vm.system_question, vm.searchText)
            .then(getSuggestionForAnswerSuccess, getSuggestionForAnswerFail)
        }, 500);
    };

    vm.selectedItem = function(text) {
      vm.searchText = text;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.selectedAnswer = function(answer) {
      vm.selectedItem(answer.a);
    };

    vm.submit = function() {
      vm.show('looking for the best...');
      UserDataSvc.put('user_answer', vm.searchText);
      TheBestSvc.postUserAnswer(vm.system_question, vm.searchText)
        .then(postUserAnswerSuccess, postUserAnswerFail)
        .finally(function(){
          clearForm();
          vm.hide();
        });
    };

    vm.show = function(template) {
      $ionicLoading.show({
        template: template
      });
    };

    vm.hide = function(){
      $ionicLoading.hide();
    };

    activate();

    ////

    function clearForm(){
      vm.search.$setPristine();
      vm.searchText = "";
      vm.items = [];
    }

    function activate() {
      vm.show('loading...');
      if(typeof $stateParams.user_question !== 'undefined') {
        console.log("---> State Params:", $stateParams.user_question);
        vm.user_question = $stateParams.user_question;
      } else {
        vm.user_question = UserDataSvc.get("user_question");
      }

      if(!vm.user_question) {
        vm.hide();
        $state.go('app.main');
        return;
      }

      var show_best_answer = UserDataSvc.get("show_best_answer");
      if(!show_best_answer || show_best_answer == 'no') {
        vm.next_screen = "app.main";
      } else {
        vm.next_screen = "app.showBestAnswer";
      }

      TheBestSvc.getSystemQuestion(vm.user_question, 1)
        .then(getSystemQuestionSuccess, getSystemQuestionFail)
        .finally(function(){
          vm.hide();
        });
    }

    function getSystemQuestionSuccess(res) {
      vm.system_question = res.data.questions[0].q;
      vm.title2 = "What is the best " + vm.system_question + " ?";
      UserDataSvc.put("system_question", vm.system_question);

      TheBestSvc.getBestAnswer(vm.system_question, 5)
        .then(getBestAnswerSuccess, getBestAnswerFail);
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
      console.log("Post User Answer Success:", res);
      $state.go('app.thanksForAnswer');
    }

    function postUserAnswerFail(res) {
      console.log("Post User Answer Fail:", res);
    }

    function getBestAnswerSuccess(res) {
      console.log("getBestAnswerSuccess: ", res);
      vm.best_answers = res.data.answers;
    }

    function getBestAnswerFail(res) {
      console.log("getBestAnswerFail: ", res);
    }

  }

})();
