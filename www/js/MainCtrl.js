(function() {
  'use strict';

  angular
    .module('MainCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($state, TheBestSvc, UserDataSvc) {
    var vm = this;
    vm.title = "The best:";
    vm.name = "Actor";
    vm.items = [];
    vm.searchText = "";
    vm.writing = false;

    vm.onChange = function() {
      TheBestSvc.getSuggestionForQuestion(vm.searchText).then(success, fail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.text;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.submit = function() {
      TheBestSvc.getBestAnswer(vm.searchText)
        .then(getAnswerSuccess, getAnswerFail);
    };

    /////

    function success(res) {
      console.log("success", res);
      vm.items = res.data.suggestions;
    }

    function fail() {
      console.log("fail");
      vm.suggestions = {"suggestions": [{"text": "ERROR"}]};
    }

    function getAnswerSuccess(res) {
      console.log("getAnswerSuccess", res);
      if(res.data.item) {
        //$state.go('app.showBestAnswer');
        UserDataSvc.put("app.askForAnswer:question", vm.searchText);
        $state.go('app.askForAnswer');
      } else {
        UserDataSvc.put("app.askForAnswer:question", vm.searchText);
        $state.go('app.askForAnswer');
      }
    }

    function getAnswerFail(res) {
      console.log("getAnswerFail", res);
    }

  }

}());
