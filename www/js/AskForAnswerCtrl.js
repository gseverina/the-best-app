(function() {
  'use strict';

  angular
    .module('AskForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForAnswerCtrl', AskForAnswerCtrl);

  function AskForAnswerCtrl($state, $ionicLoading, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.items = [];
    vm.title = "";
    vm.title2 = "";
    vm.user_question = "";
    vm.system_question = "";

    vm.onChange = function() {
      TheBestSvc.getSuggestionForAnswer(vm.system_question, vm.searchText)
        .then(getSuggestionForAnswerSuccess, getSuggestionForAnswerFail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
      vm.search.$valid = true;
      vm.submit();
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

    vm.show = function($template) {
      $ionicLoading.show({
        template: $template
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
      vm.user_question = UserDataSvc.get("user_question");
      if(!vm.user_question) {
        $state.go('app.main');
      }
      vm.title = "Please answer this while we get you to the best " + vm.user_question;

      TheBestSvc.getSystemQuestion(vm.user_question)
        .then(getSystemQuestionSuccess, getSystemQuestionFail);
    }

    function getSystemQuestionSuccess(res) {
      vm.system_question = res.data.q;
      vm.title2 = "What is the best " + vm.system_question + " ?";
      UserDataSvc.put("system_question", vm.system_question);
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
  }

})();
