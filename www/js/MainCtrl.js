(function() {
  'use strict';

  angular
    .module('MainCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($state, $ionicLoading, $ionicHistory, $timeout, TheBestSvc, UserDataSvc) {
    var SEARCHPLACEHOLDER_CONSTANT="SEARCH_PLACEHOLDER";
    var NUMBER_OF_SEARCH_PLACEHOLDER_VARIATIONS=5;
    var vm = this;
    vm.timerPromise;
    vm.name = "Actor";
    vm.items = [];
    vm.sysq = [];
    vm.searchText = "";
    vm.searchPlaceholder="";
    vm.writing = false;

    vm.onChange = function() {
      if(vm.timerPromise) {
        $timeout.cancel(vm.timerPromise);
      }
      vm.timerPromise =
        $timeout(function() {
          TheBestSvc.getSuggestionForQuestion(vm.searchText)
            .then(getSuggestionForQuestionSuccess, getSuggestionForQuestionFail)
        }, 300);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.submit = function() {
      vm.show('looking for the best...');
      UserDataSvc.put('user_question', vm.searchText);
      TheBestSvc.getBestAnswer(vm.searchText, 1)
        .then(getBestAnswerSuccess, getBestAnswerFail)
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

    vm.getSearchPlaceHolderKey = function(){
      return SEARCHPLACEHOLDER_CONSTANT+Math.floor((Math.random() * NUMBER_OF_SEARCH_PLACEHOLDER_VARIATIONS) + 1);
    };

    vm.hide = function(){
      $ionicLoading.hide();
    };

    activate();

    /////

    function activate() {
      console.log("activate: MainCtrl");

      $ionicHistory.clearHistory();
      $ionicHistory.enabledBack(false);

      UserDataSvc.put("user_question", null);
      UserDataSvc.put("user_answer", null);
      UserDataSvc.put("system_question", null);
      UserDataSvc.put("best_answer", null);
      UserDataSvc.put("show_best_answer", null);
      /*
      TheBestSvc.getSystemSuggestionsForQuestions()
        .then(getSystemSuggestionsForQuestionsSuccess, getSystemSuggestionsForQuestionsFail);
      */
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
      if(res.data.answers.length == 0) {
        //Question does not exists...
        go = 'app.noAnswerYet';
      } else {
        if(res.data.answers[0].a == null) {
          //Question exists but no answer yet...
          UserDataSvc.put('show_best_answer', 'no');
          go = 'app.noAnswerYet';
        } else {
          //there is best answer...
          UserDataSvc.put('show_best_answer', 'yes');
          UserDataSvc.put('best_answer', res.data.answers[0].a);
          if(Math.random() < 0.2) {
            go = 'app.askForAnswer';
          } else {
            go = 'app.showBestAnswer';
          }
        }
      }
      $state.go(go);
    }

    function getBestAnswerFail(res) {
      console.log("getBestAnswerFail: ", res);
    }

  }

})();

