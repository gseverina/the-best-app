(function() {
  'use strict';

  angular
    .module('ThanksForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('ThanksForAnswerCtrl', ThanksForAnswerCtrl);

  function ThanksForAnswerCtrl($state, $ionicLoading, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.num = "";

    activate();

    ////

    function activate() {
      vm.num = 0;
      //todo: wait 3 seconds...
      $state.go('app.showBestAnswer');
    }
  }


})();
