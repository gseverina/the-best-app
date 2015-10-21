(function() {
  'use strict';

  angular
    .module('ThanksForAnswerCtrl', ['TheBestSvc','UserDataSvc'])
    .controller('ThanksForAnswerCtrl', ThanksForAnswerCtrl);

  function ThanksForAnswerCtrl($state, $ionicLoading, $timeout, TheBestSvc, UserDataSvc) {

    var vm = this;
    vm.num = 0;
    vm.title = "";

    vm.askAgain = function() {
      $state.go('app.main');
    };

    activate();

    ////

    function activate() {
      var show_best_answer = UserDataSvc.get('show_best_answer');
      if(show_best_answer == 'yes') { //yes
        var i = 3;
        vm.title = "Your answer will be ready in " + i + "...";
        for(i = 3; i>0; i = i - 1) {
          $timeout(function () {
            //console.log("--------------------------");
            i = i - 1;
            vm.title = "Your answer will be ready in " + i + "...";
          }, 1000);
        }
        $state.go('app.showBestAnswer');
      } else if(show_best_answer == "no") { //no
          vm.title = "We don't have an answer for you yet :(";
      } else { // nah
        vm.title = "";
      }
    }
  }

})();
