(function() {
  'use strict';

  angular
    .module('AskForBetterAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('AskForBetterAnswerCtrl', AskForBetterAnswerCtrl);

  function AskForBetterAnswerCtrl($state, $ionicLoading, $timeout, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.timerPromise;
    vm.items = [];
    vm.user_question = "";

    vm.onChange = function() {
      if(vm.timerPromise) {
        $timeout.cancel(vm.timerPromise);
      }
      vm.timerPromise =
        $timeout(function() {
          TheBestSvc.getSuggestionForAnswer(vm.user_question, vm.searchText)
            .then(getSuggestionForAnswerSuccess, getSuggestionForAnswerFail)
        }, 500);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.submit = function() {
      vm.show('sending your choice...');
      UserDataSvc.put('user_answer', vm.searchText);
      TheBestSvc.postUserAnswer(vm.user_question, vm.searchText)
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
      vm.next_screen = 'app.main';
    }

    function getSuggestionForAnswerSuccess(res) {
      vm.items = res.data.suggestions;
    }

    function getSuggestionForAnswerFail(res) {
      console.log("Get Suggestion Fail:", res);
    }

    function postUserAnswerSuccess(res) {
      console.log("Post User Answer Success:", res);
      UserDataSvc.put('show_best_answer', "nah");
      $state.go("app.thanksForAnswer");
    }

    function postUserAnswerFail(res) {
      console.log("Post User Answer Fail:", res);
    }
  }

})();
