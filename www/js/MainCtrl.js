(function() {
  'use strict';

  angular
    .module('MainCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($state, $ionicLoading, $ionicHistory, TheBestSvc, UserDataSvc) {
    var vm = this;
    vm.name = "Actor";
    vm.items = [];
    vm.sysq = [];
    vm.searchText = "";
    vm.writing = false;

    vm.onChange = function() {
      TheBestSvc.getSuggestionForQuestion(vm.searchText)
        .then(getSuggestionForQuestionSuccess, getSuggestionForQuestionFail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.submit = function() {
      vm.show('looking for the best...');
      UserDataSvc.put('user_question', vm.searchText);
      TheBestSvc.getBestAnswer(vm.searchText)
        .then(getBestAnswerSuccess, getBestAnswerFail)
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

    /////

    function activate() {
      $ionicHistory.clearHistory();
      $ionicHistory.enabledBack(false);
      UserDataSvc.put("user_question", null);
      UserDataSvc.put("user_answer", null);
      UserDataSvc.put("system_question", null);
      UserDataSvc.put("best_answer", null);
      UserDataSvc.put("show_best_answer", null);
      TheBestSvc.getSystemSuggestionsForQuestions()
        .then(getSystemSuggestionsForQuestionsSuccess, getSystemSuggestionsForQuestionsFail)
    }

    function clearForm(){
      vm.search.$setPristine();
      vm.searchText = "";
      vm.items = [];
    }

    function getSystemSuggestionsForQuestionsSuccess(res) {
      console.log("getSystemSuggestionsForQuestionsSuccess: ", res);
      vm.sysq = res.data.suggestions;
    }

    function getSystemSuggestionsForQuestionsFail(res) {
      console.log("getSystemSuggestionsForQuestionsFail Fail:", res);
      vm.sysq = {"suggestions": [{"text": "ERROR"}]};
    }

    function getSuggestionForQuestionSuccess(res) {
      console.log("getSuggestionForQuestionSuccess: ", res);
      vm.items = res.data.suggestions;
    }

    function getSuggestionForQuestionFail(res) {
      console.log("getSuggestionForQuestion Fail:", res);
      vm.suggestions = {"suggestions": [{"text": "ERROR"}]};
    }

    function getBestAnswerSuccess(res) {
      console.log("getBestAnswerSuccess: ", res);
      var go = "";
      if(res.data == null) {
        //Question does not exists...
        go = 'app.noAnswerYet';
      } else {
        if(res.data.a == null) {
          //Question exists but no answer yet...
          UserDataSvc.put('show_best_answer', 'no');
          go = 'app.noAnswerYet';
        } else {
          //there is best answer...
          UserDataSvc.put('show_best_answer', 'yes');
          UserDataSvc.put('best_answer', res.data.a);
          go = 'app.askForAnswer';
        }
      }
      $state.go(go);
    }

    function getBestAnswerFail(res) {
      console.log("getBestAnswerFail: ", res);
    }

  }

})();

