(function() {
  'use strict';

  angular
    .module('QSuggestionsCtrl', ['QSuggestionsSvc'])
    .controller('QSuggestionsCtrl', QSuggestionsCtrl);

  function QSuggestionsCtrl (QSuggestionsSvc) {

    var vm = this;
    vm.searchText = "";
    vm.suggestions = [];

    vm.onChange = function() {
      QSuggestionsSvc.get(vm.searchText).then(success, fail);
    };

    activate();

    ///

    function activate() {
      QSuggestionsSvc.getAll('c').then(success, fail);
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
