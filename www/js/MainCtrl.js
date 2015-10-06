(function() {
  'use strict';

  angular
    .module('MainCtrl', [])
    .controller('MainCtrl', MainCtrl);

  function MainCtrl($state) {
    var vm = this;
    vm.title = "What is the best:";
    vm.name = "Actor";
    vm.items = [];
    vm.searchText = "";
    vm.writing = false;

    vm.onChange = function() {
      vm.items = [
        {"text": "cars"},
        {"text": "make"}
      ];
    };

    vm.selectedItem = function(item) {
      vm.searchText = item.name;
      vm.search.$valid = true;
      vm.submit();
    };

    vm.submit = function() {
      $state.go('app.result');
    };

  }

}());
