(function() {
  'use strict';

  angular
    .module('QSuggestionsCtrl', ['TheBestSvc'])
    .controller('QSuggestionsCtrl', QSuggestionsCtrl);

  function QSuggestionsCtrl (TheBestSvc) {

    var vm = this;
    vm.searchText = "";
    vm.suggestions = [];

    vm.onChange = function() {
      TheBestSvc.get(vm.searchText).then(success, fail);
    };

    activate();

    ///

    function activate() {
      TheBestSvc.getAll('c').then(success, fail);
    }

    function success(res) {
      console.log("success", res);
      vm.suggestions = res.data;
    }

    function fail() {
      console.log("fail");
      vm.suggestions = {"suggestions": [{"text": "ERROR"}]};
    }
  }

}());
