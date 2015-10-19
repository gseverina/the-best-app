(function() {
  'use strict';

  angular
    .module('MainCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($state, $ionicLoading, TheBestSvc, UserDataSvc) {
    var vm = this;
    vm.name = "Actor";
    vm.items = [];
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
      TheBestSvc.getBestAnswer(vm.searchText)
        .then(getBestAnswerSuccess, getBestAnswerFail)
        .finally(function(){
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


    /////

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
      if(res.data == null) {
        UserDataSvc.put("app.noAnswerYet:newQuestion", vm.searchText);
        $state.go('app.noAnswerYet');
      } else {
        UserDataSvc.put("app.askForAnswer:question", vm.searchText);
        $state.go('app.askForAnswer');
      }
    }

    function getBestAnswerFail(res) {
      console.log("getBestAnswerFail: ", res);
    }

  }

})();

