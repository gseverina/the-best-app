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
      vm.result = "";
      //todo: wait 3 seconds...
      var show_best_answer = UserDataSvc.get('show_best_answer');
      if(show_best_answer == 'yes') {
        vm.result = "Your answer will be ready in 3...";
        $state.go('app.showBestAnswer');
      } else {
        vm.result = "We don't have an answer for you yet :(";
      }
    }
  }


})();
