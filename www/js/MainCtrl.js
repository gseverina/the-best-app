(function() {
  'use strict';

  angular
    .module('MainCtrl', ['TheBestSvc'])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($state, TheBestSvc) {
    var vm = this;
    vm.title = "What is the best:";
    vm.name = "Actor";
    vm.items = [];
    vm.searchText = "";
    vm.writing = false;

    vm.onChange = function() {
      TheBestSvc.get(vm.searchText).then(success, fail);
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.name;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.submit = function() {
      $state.go('app.result');
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

  }

}());
